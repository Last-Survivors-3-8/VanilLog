describe('댓글 관련 API 테스트', () => {
  const apiUrl = '/api/v1/comment/64e9eca02a92d2c08889beae';
  const invalidApiUrl = '/api/v1/comment/64e9f33d06f34626a6e01e6c';

  context('댓글 생성 API 테스트', () => {
    const comment = '댓글 테스트';
    const authorId = '64e8fed80be7b91ec1a4ecad';
    let newCommentId;
    let postApiUrl;
    let userApiUrl;
    let cookieValue;

    it('파라미터 누락 테스트 400', () => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: { comment: comment, author: '' },
      }).then((response) => {
        expect(response.body.status).to.eq(400);
        expect(response.body.message).to.eq('필요한 파라미터가 부족합니다.');
      });
    });

    it('authorId 형식 테스트 401', () => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: { comment: comment, author: 'authorId' },
      }).then((response) => {
        expect(response.body.status).to.eq(401);
        expect(response.body.message).to.eq('userId 형식이 일치하지 않습니다.');
      });
    });

    it('포스트가 존재하지 않을 때 테스트 404', () => {
      cy.request({
        method: 'POST',
        url: invalidApiUrl,
        body: { comment: comment, author: authorId },
      }).then((response) => {
        expect(response.body.status).to.eq(404);
        expect(response.body.message).to.eq('해당 포스트를 찾을 수 없습니다.');
      });
    });

    it('댓글 생성 성공 테스트', () => {
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: { comment: comment, author: authorId },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.data.comment).to.eq(comment);
        expect(response.body.data.author).to.eq(authorId);
        newCommentId = response.body.data._id;
        postApiUrl = `/api/v1/post/${response.body.data.blogPost}`;
        userApiUrl = `/api/v1/profile/${authorId}`;
      });
    });

    it('포스트 업데이트 확인', () => {
      cy.request({
        method: 'GET',
        url: postApiUrl,
      }).then((response) => {
        expect(response.body.data.comments).to.include(newCommentId);
      });
    });

    before(() => {
      cy.loginWithGoogle().then((cookie) => {
        cookieValue = cookie;
      });
    });

    it('사용자 업데이트 확인', () => {
      cy.request({
        method: 'GET',
        url: userApiUrl,
        headers: { Cookie: `${Cypress.env('COOKIE_NAME')}=${cookieValue}` },
      }).then((response) => {
        expect(response.body.data.comments).to.include(newCommentId);
      });
    });
  });

  context('댓글 조회 API 테스트', () => {
    it('포스트가 존재하지 않을 때 테스트 404', () => {
      cy.request({
        method: 'GET',
        url: invalidApiUrl,
      }).then((response) => {
        expect(response.body.status).to.eq(404);
        expect(response.body.message).to.eq('해당 포스트를 찾을 수 없습니다.');
      });
    });

    it('댓글 조회 성공 테스트', () => {
      cy.request({
        method: 'GET',
        url: apiUrl,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('success');
        expect(response.body.data).to.be.an('array');
      });
    });
  });
});
