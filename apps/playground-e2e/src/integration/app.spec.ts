import {
  getConfirmationLeave,
  getConfirmationStay,
  getConfirmModal,
  getInput,
  navigateHome
} from '../support/app.po';

describe('playground', () => {
  beforeEach(() => cy.visit('/settings'));

  it('should confirm navigation', () => {
    getInput().type('New input');
    cy.wait(300);
    navigateHome();
    getConfirmModal().should('be.visible');
  });

  it('should stay on confirmation stay', () => {
    getInput().type('New');
    cy.wait(300);
    navigateHome();
    getConfirmationStay().click();
    cy.url().should('contain', 'settings');
  });

  it('should leave on confirmation leave', () => {
    getInput().type('New');
    cy.wait(300);
    navigateHome();
    getConfirmationLeave().click();
    cy.url().should('not.contain', 'settings');
  });
});
