describe('Mobile Authentication', () => {
  beforeEach(() => {
    // Visiter la page d'authentification
    cy.visit('/auth');
  });

  it('should display mobile indicators on mobile viewport', () => {
    // Simuler un viewport mobile
    cy.viewport('iphone-x');

    // Vérifier que les indicateurs mobile sont affichés
    cy.get('[data-testid="device-indicator"]').should('contain', 'Mode mobile');
    cy.get('[data-testid="device-indicator"]').should(
      'contain',
      'Redirection automatique'
    );

    // Vérifier que l'icône mobile est présente
    cy.get('[data-testid="device-indicator"]').find('svg').should('exist');
  });

  it('should show connectivity status', () => {
    cy.viewport('iphone-x');

    // Vérifier que l'indicateur de connectivité est présent
    cy.get('[data-testid="connectivity-indicator"]').should('exist');

    // Simuler une perte de connexion
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false);
    });

    // Recharger la page pour voir l'effet
    cy.reload();

    // Vérifier que l'alerte de déconnexion est affichée
    cy.get('[data-testid="offline-alert"]').should('be.visible');
    cy.get('[data-testid="offline-alert"]').should(
      'contain',
      'Pas de connexion internet'
    );
  });

  it('should show mobile loading state when clicking sign in', () => {
    cy.viewport('iphone-x');

    // Intercepter la requête d'authentification
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/**', {
      statusCode: 200,
      body: {
        idToken: 'mock-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: '3600',
      },
    }).as('authRequest');

    // Cliquer sur le bouton de connexion Google
    cy.get('[data-testid="google-signin-button"]').click();

    // Vérifier que l'état de chargement mobile est affiché
    cy.get('[data-testid="mobile-loading"]').should('be.visible');
    cy.get('[data-testid="mobile-loading"]').should(
      'contain',
      'Redirection vers Google'
    );

    // Vérifier que l'indicateur de progression est présent
    cy.get('[data-testid="progress-indicator"]').should('be.visible');

    // Après authentification, vérifier la redirection vers l'accueil
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show mobile info modal', () => {
    cy.viewport('iphone-x');

    // Cliquer sur le bouton de connexion
    cy.get('[data-testid="google-signin-button"]').click();

    // Vérifier que la modal mobile s'affiche
    cy.get('[data-testid="mobile-modal"]').should('be.visible');
    cy.get('[data-testid="mobile-modal"]').should(
      'contain',
      'Authentification Mobile'
    );
    cy.get('[data-testid="mobile-modal"]').should(
      'contain',
      'redirigé vers Google'
    );

    // Vérifier que la modal se ferme automatiquement après 2 secondes
    cy.wait(2500);
    cy.get('[data-testid="mobile-modal"]').should('not.be.visible');
  });

  it('should handle mobile authentication errors gracefully', () => {
    cy.viewport('iphone-x');

    // Simuler une erreur de popup bloquée
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/**', {
      statusCode: 400,
      body: {
        error: {
          message: 'popup-blocked',
        },
      },
    }).as('authError');

    // Cliquer sur le bouton de connexion
    cy.get('[data-testid="google-signin-button"]').click();

    // Vérifier que le message d'erreur mobile approprié est affiché
    cy.get('[data-testid="error-message"]').should(
      'contain',
      "Sur mobile, l'authentification se fait par redirection"
    );
  });

  it('should have proper mobile UI elements', () => {
    cy.viewport('iphone-x');

    // Vérifier que le bouton a la bonne taille pour mobile
    cy.get('[data-testid="google-signin-button"]')
      .should('have.css', 'min-height', '56px')
      .and('have.css', 'font-size', '16px');

    // Vérifier que l'icône de flèche est présente sur mobile
    cy.get('[data-testid="google-signin-button"]')
      .find('[data-testid="arrow-icon"]')
      .should('exist');

    // Vérifier que les éléments sont bien espacés pour le tactile
    cy.get('[data-testid="auth-card"]').should('have.css', 'padding', '24px');
  });

  it('should show progress animation during mobile authentication', () => {
    cy.viewport('iphone-x');

    // Intercepter et retarder la requête d'authentification
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/**', (req) => {
      req.reply({
        delay: 3000,
        statusCode: 200,
        body: {
          idToken: 'mock-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: '3600',
        },
      });
    }).as('delayedAuth');

    // Cliquer sur le bouton de connexion
    cy.get('[data-testid="google-signin-button"]').click();

    // Vérifier que l'animation de progression est visible
    cy.get('[data-testid="ring-progress"]').should('be.visible');
    cy.get('[data-testid="progress-bar"]').should('be.visible');

    // Vérifier que l'icône de rafraîchissement tourne
    cy.get('[data-testid="refresh-icon"]').should('have.class', 'rotatingIcon');
  });

  it('should handle network connectivity changes', () => {
    cy.viewport('iphone-x');

    // Vérifier l'état en ligne initial
    cy.get('[data-testid="connectivity-indicator"]').should(
      'contain',
      'En ligne'
    );

    // Simuler une perte de connexion
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false);
      // Déclencher l'événement offline
      win.dispatchEvent(new Event('offline'));
    });

    // Vérifier que l'alerte de déconnexion apparaît
    cy.get('[data-testid="offline-alert"]').should('be.visible');

    // Vérifier que le bouton de connexion est désactivé
    cy.get('[data-testid="google-signin-button"]').should('be.disabled');

    // Simuler un retour de connexion
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(true);
      // Déclencher l'événement online
      win.dispatchEvent(new Event('online'));
    });

    // Vérifier que l'alerte disparaît
    cy.get('[data-testid="offline-alert"]').should('not.exist');

    // Vérifier que le bouton de connexion est réactivé
    cy.get('[data-testid="google-signin-button"]').should('not.be.disabled');
  });

  it('should redirect to home page after successful authentication', () => {
    cy.viewport('iphone-x');

    // Intercepter la requête d'authentification avec succès
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/**', {
      statusCode: 200,
      body: {
        idToken: 'mock-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: '3600',
        localId: 'user123',
        email: 'test@example.com',
        displayName: 'Test User',
      },
    }).as('successfulAuth');

    // Cliquer sur le bouton de connexion Google
    cy.get('[data-testid="google-signin-button"]').click();

    // Attendre que l'authentification soit terminée
    cy.wait('@successfulAuth');

    // Vérifier que l'utilisateur est redirigé vers la page d'accueil
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show home button when user is authenticated', () => {
    cy.viewport('iphone-x');

    // Simuler un utilisateur déjà authentifié
    cy.intercept('GET', '**/identitytoolkit/v3/relyingparty/getAccountInfo**', {
      statusCode: 200,
      body: {
        users: [
          {
            localId: 'user123',
            email: 'test@example.com',
            displayName: 'Test User',
            photoUrl: 'https://example.com/photo.jpg',
          },
        ],
      },
    }).as('getUserInfo');

    // Visiter la page d'authentification avec un utilisateur connecté
    cy.visit('/auth');

    // Vérifier que le bouton d'accueil est affiché
    cy.get('[data-testid="google-signin-button"]').should(
      'contain',
      "Aller à l'Accueil"
    );
  });
});
