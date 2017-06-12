import { mutations } from 'src/store'

describe('mutations', () => {
  it(`MARK_ITEM_AS_DONE mutation must change the
        done field from false to true for a todo`, () => {
    const state = {
      todo: [
        { id: 43, text: 'Buy iPhone', done: false }
      ],
      archived: [
        { id: 40, text: 'Buy cat', done: false }
      ]
    }
    mutations.MARK_ITEM_AS_DONE(state, 43)
    expect(state.todo[0].done).to.be.true
  })
})

describe('actions', () => {
  const actionsInjector = require('inject-loader!src/store/actions')
  const buyHouseTodo = { id: 84, text: 'Buy house', done: true }
  const actions = actionsInjector({
    'axios': {
      get () {
        return new Promise(resolve => {
          resolve({
            data: [buyHouseTodo]
          })
        })
      }
    }
  }).default
  it(`downloadNew should commit ADD_ITEMS
    with the 'Buy house' todo when successful`, done => {
    const commit = (type, payload) => {
      try {
        expect(type).to.equal('ADD_ITEMS')
        expect(payload).to.deep.equal([buyHouseTodo])
        done()
      } catch (error) {
        done(error)
      }
    }
    actions.downloadNew({ commit })
  })
})
