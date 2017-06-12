describe('my app', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app"></div>
    `
    new Vue(myApp)
      .$mount('#app')
  })
  it('should say Hello World', () => {
    expect(document.querySelector('p').innerText)
      .toContain('Hello World')  })
})
