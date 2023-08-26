describe('포스트 검색 목록 조회 API 테스트', () => {
  const apiUrl = '/api/v1/posts/search';
  const searchValue = '테스트';
  let page = 1;
  let limit = 10;

  it('q 파라미터 누락 테스트 400', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        q: null,
        page: page,
        limit: limit,
      },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
    });
  });

  it('page 파라미터 누락 테스트 400', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        q: searchValue,
        page: null,
        limit: limit,
      },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
    });
  });

  it('limit 파라미터 누락 테스트 400', () => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      qs: {
        q: searchValue,
        page: page,
        limit: null,
      },
    }).then((response) => {
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
    });
  });
});
