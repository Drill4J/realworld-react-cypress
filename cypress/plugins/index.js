/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { executeCommand } = require('./util');
const path = require('path');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    launchServices: async () => {
      await down();
      await up();
      return null;
    },
    stopServices: async () => {
      await down();
      return null;
    },

  })
}

async function up() {
  return executeCommand('docker-compose -f cypress/plugins/docker-compose.yml up -d', 5000);
}

async function down() {
  return executeCommand('docker-compose -f cypress/plugins/docker-compose.yml down', 5000);
}
