describe('프로필 조회 API 테스트', () => {
  const userId = '64e8fed80be7b91ec1a4ecad';
  const apiUrl = `/api/v1/profile/${userId}`;
  let cookieValue;

  before(() => {
    cy.loginWithGoogle().then((cookie) => {
      cookieValue = cookie;
    });
  });

  it('로그인 테스트', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
    }).then((response) => {
      console.log('response', response.body);
      expect(response.body.status).to.eq(500);
      expect(response.body.message).to.eq('로그인 후 이용 가능합니다.');
    });
  });

  it('userId 형식 테스트', () => {
    cy.request({
      method: 'GET',
      url: '/api/v1/profile/userId',
    }).then((response) => {
      expect(response.body.status).to.eq(401);
      expect(response.body.message).to.eq('userId 형식이 일치하지 않습니다.');
    });
  });

  it('다른 유저 조회 테스트', () => {
    cy.request({
      method: 'GET',
      url: '/api/v1/profile/64e5be3a207d593a0c27d617',
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
    }).then((response) => {
      expect(response.body.status).to.eq(500);
      expect(response.body.message).to.eq(
        '자신의 프로필만 조회할 수 있습니다.',
      );
    });
  });

  it('프로필 조회 성공 테스트', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      expect(response.body.data._id).to.eq(userId);
    });
  });
});
