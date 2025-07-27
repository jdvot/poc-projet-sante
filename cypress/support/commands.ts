/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to set mobile viewport
       * @example cy.mobileViewport()
       */
      mobileViewport(): Chainable<Subject>;

      /**
       * Custom command to set desktop viewport
       * @example cy.desktopViewport()
       */
      desktopViewport(): Chainable<Subject>;

      /**
       * Custom command to wait for authentication
       * @example cy.waitForAuth()
       */
      waitForAuth(): Chainable<Subject>;

      /**
       * Custom command to mock offline state
       * @example cy.mockOffline()
       */
      mockOffline(): Chainable<Subject>;

      /**
       * Custom command to mock online state
       * @example cy.mockOnline()
       */
      mockOnline(): Chainable<Subject>;
    }
  }
}

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
