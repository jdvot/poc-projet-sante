describe('Profile Form E2E Tests', () => {
  beforeEach(() => {
    // Visiter la page de profil
    cy.visit('/profile');
  });

  it('should display the profile form with all fields', () => {
    // Vérifier que le formulaire est affiché
    cy.get('[data-testid="profile-form"]').should('be.visible');

    // Vérifier la présence de tous les champs
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="age"]').should('be.visible');
    cy.get('input[name="height"]').should('be.visible');
    cy.get('input[name="weight"]').should('be.visible');
    cy.get('select[name="gender"]').should('be.visible');
  });

  it('should validate form fields in real-time', () => {
    // Tester la validation du nom (trop court)
    cy.get('input[name="name"]').clear().type('A');
    cy.get('input[name="name"]').blur();
    cy.contains('Le nom doit contenir au moins 2 caractères').should(
      'be.visible'
    );

    // Tester la validation de l'email (invalide)
    cy.get('input[name="email"]').clear().type('invalid-email');
    cy.get('input[name="email"]').blur();
    cy.contains('Veuillez entrer une adresse email valide').should(
      'be.visible'
    );

    // Tester la validation de l'âge (hors limites)
    cy.get('input[name="age"]').clear().type('200');
    cy.get('input[name="age"]').blur();
    cy.contains("L'âge ne peut pas dépasser 150 ans").should('be.visible');
  });

  it('should calculate and display health metrics in real-time', () => {
    // Remplir les champs de taille et poids
    cy.get('input[name="height"]').clear().type('175');
    cy.get('input[name="weight"]').clear().type('70');

    // Verify that BMI is calculated and displayed
    cy.contains('Your BMI: 22.9').should('be.visible');
    cy.contains('Normal weight').should('be.visible');

    // Verify that ideal weight is displayed
    cy.contains('Estimated ideal weight').should('be.visible');

    // Verify that basal metabolic rate is displayed
    cy.contains('Basal metabolic rate').should('be.visible');
  });

  it('should submit form successfully with valid data', () => {
    // Remplir le formulaire avec des données valides
    cy.get('input[name="name"]').clear().type('John Doe');
    cy.get('input[name="email"]').clear().type('john.doe@example.com');
    cy.get('input[name="age"]').clear().type('30');
    cy.get('input[name="height"]').clear().type('175');
    cy.get('input[name="weight"]').clear().type('70');
    cy.get('select[name="gender"]').select('male');

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Verify that success notification appears
    cy.contains('Profile updated').should('be.visible');
    cy.contains('Your information has been saved successfully').should(
      'be.visible'
    );
  });

  it('should show loading state during form submission', () => {
    // Remplir le formulaire
    cy.get('input[name="name"]').clear().type('John Doe');
    cy.get('input[name="email"]').clear().type('john.doe@example.com');
    cy.get('input[name="age"]').clear().type('30');
    cy.get('input[name="height"]').clear().type('175');
    cy.get('input[name="weight"]').clear().type('70');
    cy.get('select[name="gender"]').select('male');

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Verify loading state
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains('Saving...').should('be.visible');
  });

  it('should show unsaved changes indicator when form is modified', () => {
    // Modifier un champ
    cy.get('input[name="name"]').clear().type('Modified Name');

    // Verify that unsaved changes indicator appears
    cy.contains('You have unsaved changes').should('be.visible');
  });

  it('should handle cancel with confirmation when form is dirty', () => {
    // Modifier un champ pour rendre le formulaire "dirty"
    cy.get('input[name="name"]').clear().type('Modified Name');

    // Cliquer sur Annuler
    cy.get('button').contains('Annuler').click();

    // Vérifier que la confirmation apparaît
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(
        'Voulez-vous vraiment annuler ? Vos modifications seront perdues.'
      );
    });
  });

  it('should display user information correctly', () => {
    // Verify that user information is displayed
    cy.contains('Connected user:').should('be.visible');
    // Note: User data depends on authentication context
  });

  it('should handle form errors gracefully', () => {
    // Simuler une erreur API en interceptant la requête
    cy.intercept('POST', '/api/profile', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('profileSaveError');

    // Remplir et soumettre le formulaire
    cy.get('input[name="name"]').clear().type('John Doe');
    cy.get('input[name="email"]').clear().type('john.doe@example.com');
    cy.get('input[name="age"]').clear().type('30');
    cy.get('input[name="height"]').clear().type('175');
    cy.get('input[name="weight"]').clear().type('70');
    cy.get('select[name="gender"]').select('male');
    cy.get('button[type="submit"]').click();

    // Verify that error is displayed
    cy.contains('Save error').should('be.visible');
    cy.contains('Unable to save profile').should('be.visible');
  });

  it('should be accessible with keyboard navigation', () => {
    // Tester la navigation au clavier
    cy.get('input[name="name"]').focus();
    cy.get('input[name="name"]').should('be.focused');

    cy.get('input[name="email"]').focus();
    cy.get('input[name="email"]').should('be.focused');

    cy.get('input[name="age"]').focus();
    cy.get('input[name="age"]').should('be.focused');
  });

  it('should have proper ARIA labels and descriptions', () => {
    // Vérifier les labels ARIA
    cy.get('input[name="name"]').should('have.attr', 'aria-describedby');
    cy.get('input[name="email"]').should('have.attr', 'aria-describedby');
    cy.get('input[name="age"]').should('have.attr', 'aria-describedby');
  });
});
