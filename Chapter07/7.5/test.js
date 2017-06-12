describe('my app', () => {
  let vm
  beforeEach(() => {
    vm = new Vue({
      template: `
        <div>
          <input id="name" v-model="name">
          <p>Hello from <span id="output">{{name}}</span></p>
        </div>
      `,
      data: {
        name: undefined
      }
    }).$mount()
  })
  it('should display Hello from Herman after Herman is typed in the text-box', done => {
    const outputEl = vm.$el.querySelector('#output')
    vm.$el.querySelector('#name').value = 'Herman'
    expect(vm.name = 'Herman')
    expect(outputEl.textContent).not.toContain('Herman')
    vm.$nextTick(() => {
      expect(outputEl.textContent).toContain('Herman')
      done()
    })
  })
})