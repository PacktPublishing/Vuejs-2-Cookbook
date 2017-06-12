describe('my app', () => {
  let vm
  beforeEach(() => {
    vm = new Vue({
      template: `
        <div>
          <p>{{greetings}}</p>
          <button @click="toItalian">
            Translate to Italian
          </button>
        </div>
      `,
      data: {
        greetings: 'Hello World!'
      },
      methods: {
        toItalian () {
          this.greetings = 'Ciao Mondo!'
        }
      }
    }).$mount()
  })
  it('should greet in Italian after toItalian is called', () => {
    vm.toItalian()
    expect(vm.greetings).toContain('Ciao Mondo')
  })
  it('should greet in English', () => {
    expect(vm.greetings).toContain('Hello World')
  })
})