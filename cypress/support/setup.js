import credentials from '../fixtures/credentials.json';
import { apiRequest } from '../util';

before(() => {
  const { displayName, name, family } = Cypress.browser
  console.log('displayName, name, family', displayName, '|', name,'|', family);

  cy.log('start services...');
  cy.task('launchServices');
  cy.log('start services done');

  cy.log('prepare DB...');
  cy.wrap(null)
    .then(() => apiRequest('DELETE', '/wipe'))
    .then(() => apiRequest('POST', '/users', { user: credentials.valid }))
  cy.log('prepare DB done')
})
