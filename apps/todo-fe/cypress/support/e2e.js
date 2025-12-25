// ***********************************************************
// This support file is processed and loaded automatically
// before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/code-coverage/support';
import './commands';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Invariant: cookies() expects to have requestAsyncStorage')) {
    return false;
  }
  if (err.message.includes('ResizeObserver loop limit exceeded') ||
      err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false;
  }
});
