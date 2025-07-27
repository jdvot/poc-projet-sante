// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test on uncaught exceptions
  return false;
});

// Configure viewport for mobile testing
Cypress.Commands.add('mobileViewport', () => {
  cy.viewport('iphone-x');
});

// Configure viewport for desktop testing
Cypress.Commands.add('desktopViewport', () => {
  cy.viewport(1280, 720);
});

// Custom command to wait for authentication
Cypress.Commands.add('waitForAuth', () => {
  cy.wait(2000); // Wait for authentication process
});

// Custom command to mock offline state
Cypress.Commands.add('mockOffline', () => {
  cy.window().then((win) => {
    cy.stub(win.navigator, 'onLine').value(false);
    win.dispatchEvent(new Event('offline'));
  });
});

// Custom command to mock online state
Cypress.Commands.add('mockOnline', () => {
  cy.window().then((win) => {
    cy.stub(win.navigator, 'onLine').value(true);
    win.dispatchEvent(new Event('online'));
  });
});
