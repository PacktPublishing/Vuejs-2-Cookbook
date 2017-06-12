<template>
  <div class="hello">
    <h1>XKCD</h1>
    <span @click="prev">Prev</span>
    <img :src="currentImg">
    <span @click="next">Next</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'hello',
  computed: mapState(['currentImg']),
  created () {
    this.$store.dispatch('goToLastPanel')
  },
  methods: {
    prev () {
      this.$store.dispatch('goToPrevPanel')
    },
    next () {
      this.$store.dispatch('goToNextPanel')
    }
  }
}
</script>
