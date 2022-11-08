/* eslint-disable import/no-extraneous-dependencies */
import './commands';
import { mount } from 'cypress/react18';

// eslint-disable-next-line no-undef
Cypress.Commands.add('mount', mount);
