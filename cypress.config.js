const { defineConfig } = require('cypress');
const { GoogleSocialLogin } = require('cypress-social-logins').plugins;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        GoogleSocialLogin: GoogleSocialLogin,
      });
      return config;
    },
    baseUrl: 'http://localhost:3000',
    // chromeWebSecurity: true,
    isPopup: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
