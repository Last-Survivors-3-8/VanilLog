describe('프로필 수정 API 테스트', () => {
  const apiUrl = `/api/v1/profile/`;
  const userId = '64e8fed80be7b91ec1a4ecad';
  const invalidUserId = '64e5be3a207d593a0c27d617';

  const newNickname = '수정 닉네임';
  const duplicateNickname = '1004';
  const sameNickname = 'vanillog test';
  let cookieValue;

  before(() => {
    cy.loginWithGoogle().then((cookie) => {
      cookieValue = cookie;
    });
  });

  it('로그인하지 않은 사용자 테스트', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/${userId}`,
      body: { nickname: newNickname },
    }).then((response) => {
      expect(response.body.status).to.eq(500);
      expect(response.body.message).to.eq('로그인 후 이용 가능합니다.');
    });
  });

  it('권한 없는 사용자 테스트', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/${invalidUserId}`,
      body: { nickname: newNickname },
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
    }).then((response) => {
      expect(response.body.status).to.eq(500);
      expect(response.body.message).to.eq(
        '자신의 프로필만 조회할 수 있습니다.',
      );
    });
  });

  it('닉네임 중복 테스트', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/${userId}`,
      body: { nickname: duplicateNickname },
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('이미 사용 중인 닉네임입니다.');
    });
  });

  it('동일한 닉네임 테스트', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/${userId}`,
      body: { nickname: sameNickname },
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq(
        '이전과 같은 닉네임으로 변경할 수 없습니다.',
      );
    });
  });

  it('프로필 수정 성공 테스트', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/${userId}`,
      body: { nickname: newNickname },
      headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
    }).then((response) => {
      console.log('response.body', response.body);
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('success');
      expect(response.body.data.message).to.eq(
        '닉네임이 성공적으로 업데이트되었습니다',
      );
    });
  });
});
