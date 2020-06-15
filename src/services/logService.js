//import Raven from 'raven-js';

function init() {
  // Raven.config('https://843744690b9d4123b77873b3a2be391f@sentry.io/5175314', {
  //   release: '1-0-0',
  //   environment: 'developement-test'
  // }).install()
}

function log(error) {
  //Raven.captureException(error)
  console.error(error)
}


export default {
  init,
  log
}