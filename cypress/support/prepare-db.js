import credentials from '../fixtures/credentials.json';
import { apiRequest } from '../util';

before(() => {
  cy.log('prepare DB...');
  cy.wrap(null)
    .then(() => apiRequest('DELETE', '/wipe'))
    .then(() => apiRequest('POST', '/users', { user: credentials.valid }))
  cy.log('prepare DB done')
})
