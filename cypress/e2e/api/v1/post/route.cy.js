describe('포스트 관련 API 테스트', () => {
  const apiUrl = '/api/v1/post';

  const authorId = '64e8fed80be7b91ec1a4ecad';
  const title = '서버 유닛 테스트 POST';
  const content = {
    time: { $numberDouble: '1692806018049.0' },
    blocks: [
      { id: 'mDjmDzvpg8', type: 'paragraph', data: { text: '테스트 내용' } },
    ],
    version: '2.27.2',
  };

  let postId;
  let mergedUrl;
  let cookieValue;

  before(() => {
    cy.loginWithGoogle().then((cookie) => {
      cookieValue = cookie;
    });
  });

  context('포스트 생성 API 테스트', () => {
    it('파라미터 누락 테스트 400', () => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: { title: title, content: content, author: '' },
      }).then((response) => {
        expect(response.body.status).to.eq(400);
        expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
      });
    });

    it('authorId 형식 테스트 401', () => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: { title: title, content: content, author: 'userId' },
      }).then((response) => {
        expect(response.body.status).to.eq(401);
        expect(response.body.message).to.eq('userId 형식이 일치하지 않습니다.');
      });
    });

    it('생성 성공 테스트', () => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: { title: title, content: content, author: authorId },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.data.title).to.eq(title);
        expect(response.body.data.content).to.deep.eq(content);
        expect(response.body.data.author).to.eq(authorId);
        postId = response.body.data._id;
        mergedUrl = `${apiUrl}/${postId}`;
      });
    });
  });

  context('포스트 조회 API 테스트', () => {
    it('포스트 조회 성공 테스트', () => {
      cy.request({ method: 'GET', url: mergedUrl }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.data._id).to.eq(postId);
      });
    });
  });

  context('포스트 수정 API 테스트', () => {
    it('포스트 수정 성공 테스트', () => {
      const updateTitle = '수정 테스트 제목';
      const updateContent = {
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
        body: { title: updateTitle, content: updateContent },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.data.post.title).to.eq(updateTitle);
        expect(response.body.data.post.content).to.deep.eq(updateContent);
      });
    });
  });

  context('포스트 삭제 API 테스트', () => {
    it('포스트 삭제 테스트', () => {
      cy.request({
        method: 'DELETE',
        url: mergedUrl,
        headers: {
          Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}`,
        },
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
      });
    });
  });
});
