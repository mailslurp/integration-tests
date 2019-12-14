# MailSlurp integration tests
The real integration tests we run against the MailSlurp dashboard to test that it is working. 

Tests use MailSlurp with Cypress and Chromedriver to:
- Sign up for MailSlurp
- Receive confirmation codes
- Login and perform actions in our API to:
-- Create email addresses on demand
-- Send and receive emails and attachments

## Setup

```
npm install
cp cypress.env.sample.json cypress.env.json
```

Then set MailSlurp API Key and test email domain values in config.

## Run

```
npm t
```
