Cypress.Commands.add('loginWithGoogle', () => {
  return cy
    .visit('/auth/login')
    .get('#loginButton')
    .should('be.visible')
    .click()
    .then(() => {
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

      return cy.task('GoogleSocialLogin', socialLoginOptions, {
        timeout: 220000,
      });
    })
    .then(({ cookies }) => {
      const cookie = cookies.find(
        (cookie) => cookie.name === Cypress.env('COOKIE_NAME'),
      );
      if (cookie) {
        return cy.setCookie(cookie.name, cookie.value).then(() => {
          return cookie.value;
        });
      }
    });
});
