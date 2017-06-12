describe('my app', () => {
  let vm
  beforeEach(() => {
    vm = new Vue(myApp).$mount()
    vm.number = 5
  })
  it('should output Lower... if guess is 6', () => {
    vm.guess = 6
    expect(vm.output).toBe('Lower...')
  })
  it('should output Higher... if guess is 4', () => {
    vm.guess = 4
    expect(vm.output).toBe('Higher...')
  })
  it('should output That’s right! if guess is 5', () => {
    vm.guess = 5
    expect(vm.output).toBe('That’s right!')
  })
})