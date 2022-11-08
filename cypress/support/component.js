/* eslint-disable import/no-extraneous-dependencies */
import './commands';
import { mount } from 'cypress/react18';
import Cypress from 'cypress';

Cypress.Commands.add('mount', mount);
