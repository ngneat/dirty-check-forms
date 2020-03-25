import {
  getConfirmationLeave,
  getConfirmationStay,
  getConfirmModal,
  getInput,
  navigateHome,
  getSaveBtn,
  navigateSettings
} from '../support/app.po';

function fill(text: string) {
  getInput().clear({ force: true });
  getInput().type(text);
  cy.tick(300);
}

const makeDirty = () => fill('Dirty');
const revertToInitial = () => fill('Initial Value');

describe('playground', () => {
  before(() => {
    cy.clock();
    cy.visit('/settings');
  });

  context('Save Button', () => {
    it('should show toggle Save button', () => {
      makeDirty();
      getSaveBtn().should('be.visible');
      revertToInitial();
      getSaveBtn().should('not.be.visible');
    });
  });

  context('Confirmation Dialog', () => {
    it('should show confirm navigation', () => {
      cy.clock();
      makeDirty();
      navigateHome();
      getConfirmModal().should('be.visible');
    });

    it('should stay on confirmation stay', () => {
      getConfirmationStay().click();
      cy.url().should('contain', 'settings');
    });

    it('should leave on confirmation leave', () => {
      navigateHome();
      getConfirmationLeave().click();
      cy.url().should('not.contain', 'settings');
    });

    it('should not show the modal when it is not dirty again', () => {
      cy.clock();
      navigateSettings();
      makeDirty();
      navigateHome();
      getConfirmModal().should('be.visible');
      getConfirmationStay().click();
      revertToInitial();
      navigateHome();
      cy.url().should('not.contain', 'settings');
    });
  });
});
