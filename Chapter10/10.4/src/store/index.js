import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const endpoint = '/comic/'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentPanel: undefined,
    currentImg: undefined,
    errorStack: []
  },
  actions: {
    goToLastPanel ({ commit }) {
      axios.get(endpoint)
        .then(({ data }) => {
          commit('setPanel', data.num)
          commit('setImg', data.img)
        }).catch(error => {
          commit('pushError', error)
        })
    },
    goToNextPanel ({ commit, state }) {
      const nextPanel = state.currentPanel + 1
      axios.get(`${endpoint}${nextPanel}`)
        .then(({ data }) => {
          commit('nextPanel')
          commit('setImg', data.img)
        }).catch(error => {
          commit('pushError', error)
        })
    },
    goToPrevPanel ({ commit, state }) {
      if (state.currentPanel === 1) {
        commit('pushError', 'First panel')
        return
      }
      const prevPanel = state.currentPanel - 1
      axios.get(`${endpoint}${prevPanel}`)
        .then(({ data }) => {
          commit('prevPanel')
          commit('setImg', data.img)
        }).catch(error => {
          commit('pushError', error)
        })
    }
  },
  mutations: {
    setPanel (state, num) {
      state.currentPanel = num
    },
    setImg (state, img) {
      state.currentImg = img
    },
    nextPanel (state) {
      state.currentPanel += 1
    },
    prevPanel (state) {
      state.currentPanel -= 1
    },
    pushError (state, error) {
      state.errorStack.push(error)
    }
  }
})

export default store
