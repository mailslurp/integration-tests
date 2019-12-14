context('MailSlurp sign-up process', () => {
  let inboxId;
  let emailAddress;
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
      expect(email.subject).to.contain('Hello')
    })
  })
})
