module.exports = {
  'Demo test Google' : function (client) {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('h2', 'Welcome to')
      .assert.hidden('p')
      .moveToElement('tag name', 'button', 0, 0)
      .doubleClick()
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