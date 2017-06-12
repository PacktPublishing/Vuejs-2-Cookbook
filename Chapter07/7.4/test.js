describe('my app', () => {
  let vm
  beforeEach(() => {
    vm = new Vue({
      template: '<div>{{greetings}}</div>',
      data: {
        greetings: 'Hello World'
      }
    }).$mount()
  })
  it('should say Hello World', () => {
    expect(vm.$el.innerText).toContain('Hello World')
  })
})