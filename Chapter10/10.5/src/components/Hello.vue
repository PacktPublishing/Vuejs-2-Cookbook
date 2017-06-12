<template>
  <div class="hello">
    <img 
      :class="{ off: !$store.state.brain.left.reason }"
      srcset="http://i.imgur.com/n8B6wuY.png 2x"
      @click="left"><img
      :class="{ off: !$store.state.brain.right.fantasy }"
      srcset="http://i.imgur.com/4BbfVur.png 2x"
      @click="right">
    <p>❤️ loves: {{$store.state.heart.loves}}</p>
    <input v-model="partner" @input="love">
    <button @click="clear">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      partner: undefined
    }
  },
  methods: {
    left () {
      this.$store.commit('left/toggle')
    },
    right () {
      this.$store.commit('right/toggle')
    },
    love () {
      this.$store.commit('love', this.partner)
    },
    clear () {
      this.$store.commit('unlove')
      this.partner = undefined
    }
  }
}
</script>

<style>

.off {
  filter: grayscale(100%)
}
</style>
