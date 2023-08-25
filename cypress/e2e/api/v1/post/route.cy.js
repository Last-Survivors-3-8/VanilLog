describe('포스트 관련 API 테스트', function () {
  const apiUrl = '/api/v1/post';
  const test_author_id = '64e8fed80be7b91ec1a4ecad';
  const testTitle = '서버 유닛 테스트 POST';
  const testContent = {
    time: { $numberDouble: '1692806018049.0' },
    blocks: [
      { id: 'mDjmDzvpg8', type: 'paragraph', data: { text: '테스트 내용' } },
    ],
    version: '2.27.2',
  };
  let postId;
  let mergedUrl;
  let cookieValue;

  // 로그인 관련 설정
  before(() => {
    cy.visit('/auth/login');
    cy.get('#loginButton').should('be.visible').click();
    const socialLoginOptions = {
      username: Cypress.env('GOOGLE_USER'),
      password: Cypress.env('GOOGLE_PW'),
      loginUrl: `${Cypress.env('SITE_NAME')}/auth/login`,
      headless: false,
      logs: true,
      isPopup: true,
      loginSelector: '#googleLoginButton',
      postLoginSelector: '#logoutButton',
    };

    cy.task('GoogleSocialLogin', socialLoginOptions, { timeout: 220000 }).then(
      ({ cookies }) => {
        const cookie = cookies.find(
          (cookie) => cookie.name === Cypress.env('COOKIE_NAME'),
        );
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value);
          cookieValue = cookie.value;
        }
      },
    );
  });

  // 포스트 생성 전 설정
  before(() => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { title: testTitle, content: testContent, author: test_author_id },
    }).then((response) => {
      expect(response.status).to.eq(200);
      postId = response.body.data._id;
      mergedUrl = `${apiUrl}/${postId}`;
    });
  });

  // 본문 파라미터 누락 테스트
  it('본문 파라미터 누락 테스트 400', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { title: testTitle, content: testContent, author: '' },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
    });
  });

  // userId 형식 테스트
  it('userId 형식 테스트 401', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { title: testTitle, content: testContent, author: 'userId' },
    }).then((response) => {
      expect(response.body.status).to.eq(401);
      expect(response.body.message).to.eq('userId 형식이 일치하지 않습니다.');
    });
  });

  it('포스트 생성 성공 테스트 200', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: { title: testTitle, content: testContent, author: test_author_id },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.title).to.eq(testTitle);
      expect(response.body.data.content).to.deep.eq(testContent);
      expect(response.body.data.author).to.eq(test_author_id);
    });
  });

  it('포스트 조회 성공 테스트', () => {
    cy.request({ method: 'GET', url: mergedUrl }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data._id).to.eq(postId);
    });
  });

  it('포스트 수정 성공 테스트', () => {
    const updateTestTitle = '수정 테스트 제목';
    const updateTestContent = {
      time: { $numberDouble: '1692806018049.0' },
      blocks: [
        {
          id: 'mDjmDzvpg8',
          type: 'paragraph',
          data: { text: '업데이트 테스트 내용' },
        },
      ],
      version: '2.27.2',
    };

    cy.request({
      method: 'PUT',
      url: mergedUrl,
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
      body: { title: updateTestTitle, content: updateTestContent },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.post.title).to.eq(updateTestTitle);
      expect(response.body.data.post.content).to.deep.eq(updateTestContent);
    });
  });
});
