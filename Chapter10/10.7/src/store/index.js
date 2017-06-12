import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

export const mutations = {
  MARK_ITEM_AS_DONE (state, itemId) {
    state.todo.filter(item => {
      return item.id === itemId
    }).forEach(item => {
      item.done = true
    })
    state.archived.filter(item => {
      return item.id === itemId
    }).forEach(item => {
      item.done = true
    })
  }
}

const store = new Vuex.Store({
  state: {
    state: {
      todo: [{
        id: 43,
        text: 'Buy iPhone',
        done: false
      } ],
      archived: [{
        id: 2,
        text: 'Buy gramophone',
        done: true
      } ]
    }
  },
  mutations,
  actions
})

export default store
