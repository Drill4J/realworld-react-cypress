import articles from '../fixtures/articles.json'
import { login, wipeArticles } from '../util'

context('New post', () => {
  before(() => {
    login()
    wipeArticles()
    cy.visit('/editor')
  })

  it('can create new article', function() {
    const article = articles[0]
    cy.get('[data-test="article-title-input"]').type(article.title)
    cy.get('[data-test="article-description-input"]').type(article.description)
    cy.get('[data-test="article-body-input"]').type(article.body)
    cy.get('[data-test="article-tags-input"]').type(article.tagList.join(', '))
    cy.get('[data-test="publish-article-button"]').click()
    cy.get('h1').contains(article.title)
  })
})
