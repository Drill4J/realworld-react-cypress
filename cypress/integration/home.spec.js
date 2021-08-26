import { login, logout, createArticles, wipeArticles } from '../util'

context('Home - no auth', () => {
  before(() => {
    cy.wrap(null) 
    .then(() => login())
    .then(() => wipeArticles())
    .then(() => createArticles())
    .then(() => logout())
    .then(() => cy.visit('/'))
    .then(() => cy.get('[data-test="global-feed-button"]').click())
  })
  
  it('page loads', () => {
    cy.get('div[class="home-page"]').should('exist')
    cy.get('div[data-test="article-list"]').find('div[data-test="article-preview"]').should('have.length.gt', 0)
  })
})

context('Home - logged in', () => {
  before(() => {
    cy.wrap(null) 
    .then(() => login())
    .then(() => wipeArticles())
    .then(() => createArticles())
    .then(() => cy.visit('/'))
    .then(() => cy.get('[data-test="global-feed-button"]').click())
  })

  it('can favorite articles', () => {
    cy.get('[data-test="toggle-favorite-button"]')
      .eq(0)
      .should('have.text', ' 0')
      .click()
      .should('not.have.text', ' 0')
  })

  describe('wrap', () => {
    beforeEach(function() {
      // favorite article
      cy.get('[data-test="toggle-favorite-button"]')
        .eq(0)
        .click()
    })

    it('can unfavorite articles', () => {
      cy.get('[data-test="toggle-favorite-button"]')
        .eq(0)
        .should('have.text', ' 1')
        .wait(1000)
        .click()
        .should('not.have.text', ' 1')
    })
  })
})
