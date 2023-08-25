describe('포스트 목록 조회 API 테스트', function () {
  const apiUrl = '/api/v1/posts';
  const testPage = 1;
  const testLimit = 10;
  const testUserId = '64de597992a689b228c2e71e';

  it('쿼리 파라미터 누락 테스트 400', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        page: testPage,
        limit: null,
      },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
    });
  });

  it('userId 형식 테스트 401', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        userId: 'testUserId',
        page: testPage,
        limit: testLimit,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.status).to.eq(401);
      expect(response.body.message).to.eq('userId 형식이 일치하지 않습니다.');
    });
  });

  it('메인화면 포스트 목록 조회 성공 테스트 200', function () {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        page: testPage,
        limit: testLimit,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      expect(response.body.data).to.be.an('array');
      expect(response.body.totalPosts).to.be.a('number');
    });
  });

  it('특정 블로그 포스트 목록 조회 성공 테스트 200', function () {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        userId: testUserId,
        page: testPage,
        limit: testLimit,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      expect(response.body.data).to.be.an('array');
      response.body.data.forEach((post) => {
        expect(post.author).to.eq(testUserId);
      });
      expect(response.body.totalPosts).to.be.a('number');
    });
  });
});
