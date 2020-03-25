const getCyElement = (id: string) => cy.get(`[data-cy=${id}]`);

export const getNavigationTab = (id: string) =>
  cy.get('nz-radio-group').within(() => getCyElement(id));

export const navigateHome = () => getNavigationTab('home').click();
export const navigateSettings = () => getNavigationTab('settings').click();

export const getSaveBtn = () => getCyElement('saveBtn');
export const getInput = () => getCyElement('input');

export const getConfirmModal = () => cy.get('.ant-modal-body');
export const getConfirmationStay = () =>
  getConfirmModal().find('.ant-modal-confirm-btns > .ant-btn-primary');

export const getConfirmationLeave = () =>
  getConfirmModal().find('.ant-btn-default');
