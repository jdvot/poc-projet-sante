describe('AI Chat with File Upload', () => {
  beforeEach(() => {
    cy.visit('/ai-doctor');
  });

  it('should display the chat interface', () => {
    cy.get('h1').should('contain', '🤖 AI Chat with Upload');
    cy.get('[data-testid="icon-brain"]').should('be.visible');
    cy.get('input[placeholder="Type your message here..."]').should(
      'be.visible'
    );
    cy.get('button').contains('Attach file').should('be.visible');
    cy.get('button').contains('Send').should('be.visible');
  });

  it('should show welcome message when no messages', () => {
    cy.contains('Welcome to AI Chat!').should('be.visible');
    cy.contains('Ask your questions or upload a file').should('be.visible');
  });

  it('should display French interface when language is set to French', () => {
    // Set language to French
    cy.window().then((win) => {
      win.localStorage.setItem(
        'language-storage',
        JSON.stringify({ state: { language: 'fr' } })
      );
    });

    cy.reload();

    cy.get('h1').should('contain', '🤖 Chat IA avec Upload');
    cy.contains('Bienvenue dans le chat IA !').should('be.visible');
    cy.contains('Posez vos questions ou uploadez un fichier').should(
      'be.visible'
    );
    cy.get('button').contains('Joindre un fichier').should('be.visible');
    cy.get('button').contains('Envoyer').should('be.visible');
  });

  it('should send a text message', () => {
    const testMessage = 'Hello, how are you?';

    cy.get('input[placeholder="Type your message here..."]').type(testMessage);
    cy.get('button').contains('Send').click();

    // Verify user message appears
    cy.contains(testMessage).should('be.visible');

    // In development mode, a simulated response should appear
    cy.contains('Simulated response for:').should('be.visible');
  });

  it('should send message with Enter key', () => {
    const testMessage = 'Test with Enter key';

    cy.get('input[placeholder="Type your message here..."]').type(
      testMessage + '{enter}'
    );

    cy.contains(testMessage).should('be.visible');
  });

  it('should clear chat history', () => {
    // Send a message first
    cy.get('input[placeholder="Type your message here..."]').type(
      'Test message'
    );
    cy.get('button').contains('Send').click();

    // Verify message is visible
    cy.contains('Test message').should('be.visible');

    // Clear chat
    cy.get('button').contains('Clear chat').click();

    // Verify chat is empty
    cy.contains('Welcome to AI Chat!').should('be.visible');
    cy.contains('Test message').should('not.exist');
  });

  it('should show loading state when sending message', () => {
    // Intercept API request to simulate delay
    cy.intercept('POST', '/api/n8n/chat', (req) => {
      req.reply({
        delay: 2000,
        body: {
          response: 'Response after delay',
          processingTime: 2000,
        },
      });
    }).as('sendMessage');

    cy.get('input[placeholder="Type your message here..."]').type(
      'Test with delay'
    );
    cy.get('button').contains('Send').click();

    // Verify loading state
    cy.get('button').contains('Send').should('be.disabled');
    cy.get('input[placeholder="Type your message here..."]').should(
      'be.disabled'
    );

    // Wait for response
    cy.wait('@sendMessage');

    // Verify loading state is finished
    cy.get('button').contains('Send').should('not.be.disabled');
    cy.get('input[placeholder="Type your message here..."]').should(
      'not.be.disabled'
    );
  });

  it('should handle API errors gracefully', () => {
    // Intercept API request to simulate error
    cy.intercept('POST', '/api/n8n/chat', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('sendMessageError');

    cy.get('input[placeholder="Type your message here..."]').type('Test error');
    cy.get('button').contains('Send').click();

    cy.wait('@sendMessageError');

    // Verify error is displayed
    cy.contains('Error').should('be.visible');
    cy.contains('Error sending to LLM').should('be.visible');
  });

  it('should display n8n integration information', () => {
    cy.contains('n8n Integration').should('be.visible');
    cy.contains('This chat is connected to an n8n workflow').should(
      'be.visible'
    );
    cy.contains('Files are analyzed and context is transmitted to AI').should(
      'be.visible'
    );
  });

  it('should auto-scroll to new messages', () => {
    // Send multiple messages to create scroll
    for (let i = 1; i <= 5; i++) {
      cy.get('input[placeholder="Type your message here..."]').type(
        `Message ${i}`
      );
      cy.get('button').contains('Send').click();
      cy.wait(500); // Wait for message to be added
    }

    // Last message should be visible (auto-scroll)
    cy.contains('Message 5').should('be.visible');
  });
});
