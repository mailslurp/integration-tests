const { MailSlurp } = require('mailslurp-client')
const uuidv4 = require('uuid/v4')
const apiKey = Cypress.env('mailslurp_api_key')
const domain = Cypress.env('mailslurp_email_domain')
const mailslurp = new MailSlurp({ apiKey })

Cypress.Commands.add("createInbox", _ => {
  const emailAddress = uuidv4() + '@' + domain
  return mailslurp.createInbox(emailAddress)
})
Cypress.Commands.add("receiveEmail", inboxId => mailslurp.waitForLatestEmail(inboxId))
Cypress.Commands.add("clickSidebar", path => cy.get(`.nav-link[href="${path}"]`).click())
Cypress.Commands.add("getInputValue", name => cy.get(`input[name="${name}"]`).then($input => $input.val()))
