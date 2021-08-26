import user from '../fixtures/user.json'
import { login } from '../util'

context('Profile settings', () => {
  before(() => {
    login()
  })

  beforeEach(() => {
    cy.visit('/settings')
  })

  it('can update profile', function() {
    cy.get('[data-test="bio-input"]').type(user.bio)
    cy.get('[data-test="username-input"]').clear().type(user.username)
    
    cy.intercept('PUT', '/api/user').as('profileUpdated')
    cy.get('button[type="submit"]').click()
    cy.wait('@profileUpdated')
    cy.visit('/settings')

    cy.get('[data-test="bio-input"]').should('have.text', user.bio)
    cy.get('[data-test="username-input"]').should('have.value', user.username)
  })
})
