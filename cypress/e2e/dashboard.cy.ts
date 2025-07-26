describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('affiche le titre du dashboard', () => {
    cy.contains('h2', 'Biomarkers').should('be.visible');
  });

  it('affiche les données après chargement', () => {
    cy.contains('Glucose: 0.95 g/L').should('be.visible');
    cy.contains('Cholestérol: 1.8 g/L').should('be.visible');
    cy.contains('Dernier check: 2024-07-25').should('be.visible');
  });

  it("permet la navigation vers d'autres pages", () => {
    cy.contains('a', 'AI Doctor').click();
    cy.url().should('include', '/ai-doctor');
  });
});
