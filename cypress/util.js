import axios from 'axios';
import credentials from './fixtures/credentials.json';
import articles from './fixtures/articles.json'

export async function apiRequest(method, route, payload, debug) {
  const expectedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  if (!expectedMethods.includes(method)) {
    throw new Error(`Unexpected HTTP method ${method}. Expected either of ${expectedMethods.join(', ')}`)
  }
  
  const reqConfig = {
    method,
    url: `${Cypress.env('apiUrl')}${route}`,
  }
  if (payload) {
    reqConfig.data = payload;
  }
  const token = window.localStorage.getItem('jwt');

  if (token) {
    reqConfig.headers = {
      'authorization': `Token ${token}`
    }
  }
  return axios(reqConfig)
}

export function clearLocalStorageJwt() {
  window.localStorage.setItem('jwt', '');
}

export function wipeArticles() {
  return cy.wrap(apiRequest('DELETE', '/wipe/articles'))
}

export function createArticles() {
  return cy.wrap(Cypress.Promise.all(articles.map(article => apiRequest('POST', '/articles', { article }, true))))
}

export function login() {
  const { email, password } = credentials.valid;
  return cy.wrap(null)
    .then(() => apiRequest('POST', '/users/login', {
      user: { email, password }
    }))
    .then((response) => {
      const token = response?.data?.user?.token;
      if (!token) {
        throw new Error('NO TOKEN AFTER LOGIN')
      }
      window.appAgent.setAuthToken(token);
    })
}

export function logout() {
  return cy.wrap(null).then(() => window.appAgent.logout())
}
