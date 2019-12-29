context('MailSlurp sign-up process', () => {
  let inboxId;
  let emailAddress;
  let accessPath;
  let userApiKey;
  it('renders the homescreen', () => {
    cy.visit('/')
    cy.get('.card-header')
      .should('contain', 'Welcome')
  })
  it('lets user click sign up', () => {
   cy.createInbox().then(inbox => {
     // store the inbox email address in a variable for next steps
     inboxId = inbox.id
     emailAddress = inbox.emailAddress
     cy.get('.btn[href="/sign-up"]').click()
     cy.get('.card-header').should('contain', 'Sign Up')
   })
  })
  it('lets user submit email address', () => {
    cy.get('input[name="email"]').type(emailAddress)
    cy.get('.btn[type="submit"]').click()
  })
  it('says that an email access link has been sent', () => {
    cy.get('[data-icon="check-circle"]')
    cy.get('.card-body')
      .should('contain', 'check your email')
  })
  it('sends and email with an access link', () => {
    cy.receiveEmail(inboxId).then(email => {
      expect(email.subject).to.contain('Access MailSlurp')
      const pattern = new RegExp(`https://app.mailslurp.com(/verify[^'"]+)`)
      const matches = pattern.exec(email.body)
      // replace HTML entities
      accessPath = matches[1].replace(/&#x3D;/g, '=')
    })
  })
  it('accepts access code in email and logs in user', () => {
    cy.visit(accessPath)
    cy.get('.card-header').should('contain', 'Welcome')
  });
  it('allows navigation to settings page', () => {
    cy.clickSidebar('/settings')
  });
  it('settings page shows api key', () => {
    cy.getInputValue('api-key')
      .then(value => {
        userApiKey = value
        expect(userApiKey).to.exist
      });
  })
  it('allows api calls using api key', () => {
    cy.request({
      url: 'https://api.mailslurp.com/inboxes',
      method: 'POST',
      headers: {
        'x-api-key': userApiKey
      }
    }).its('status').should('equal', 201)
  })
})
