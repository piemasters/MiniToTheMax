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
    cy.findByText('Blog').click();
    cy.location('pathname').should('eq', '/blog/');
    // A new page, so axe has to be added again
    cy.injectAxe();
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

// axe walks ~1,100 inline SVGs, which takes longer than the default 4s
describe('Paints page accessibility', { defaultCommandTimeout: 60000 }, () => {
  beforeEach(() => {
    cy.visit('/paints');
    cy.injectAxe();
  });
  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y();
  });
  it('Has no detectable a11y violations with a search and filters applied', () => {
    cy.findByLabelText('Search').type('red');
    cy.checkA11y();
  });
});
