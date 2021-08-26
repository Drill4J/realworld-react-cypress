import credsJson from '../fixtures/credentials.json'

context('Sign in', () => {
  beforeEach(() => {
    window.appAgent.logout()
    cy.visit('/login')
  })

  it('page loads', () => {
    cy.get('h1').contains('Sign In').should('exist')
    cy.get('button').contains('Sign in').should('exist')
  })

  // using describe to isolate interceptors
  describe('wrap', () => {
    it('with valid credentials succeeds', () => {
      cy.intercept('POST', '/users/login', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.equal(200)
        })
      })
      cy.get('input[type="email"]').type(credsJson.valid.email)
      cy.get('input[type="password"]').type(credsJson.valid.password)
      cy.get('button[type="submit"]').click()
    })
  })

  describe('wrap', () => {
    it('with invalid credentials fails', () => {
      cy.intercept('POST', '/users/login', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.equal(422)
        })
      })
      cy.get('input[type="email"]').type(credsJson.invalid.email)
      cy.get('input[type="password"]').type(credsJson.invalid.password)
      cy.get('button[type="submit"]').click()
    })
  })
})
