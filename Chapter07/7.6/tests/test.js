module.exports = {
  'Happy scenario': client => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('h2', 'Welcome to')
      .assert.hidden('p')
      .click('button')
      .waitForElementVisible('p', 1000)
      .assert.containsText('p', 'Nightwatch')
      .end();
  }
}
/*
 start selenium-standalone
 start http-server
 nightwatch
*/