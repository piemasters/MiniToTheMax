describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
    // cy.wait(500);
  });
  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y();
  });
  it('Navigates to Blog and checks for accessibility violations', () => {
    cy.findByText(/Blog/i).click();
    cy.checkA11y();
  });
  it('Checks if Showcase link is focusable and has the correct attributes', () => {
    cy.findAllByText('Showcase').focus();
    cy.focused()
      .should('have.text', 'Showcase')
      .should('have.attr', 'href', '/showcase/')
      .should('not.have.css', 'outline-width', '1px');
  });
});
