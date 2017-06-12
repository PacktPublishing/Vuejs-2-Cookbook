<template>
  <div class="pomodoro">
    <p>Time remaining: {{formattedTime}}</p>
    <button v-if="remainingTime === 1500" @click="start">Start</button>
    <button v-else @click="stop">Stop</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      remainingTime: 1500,
      timer: undefined
    }
  },
  methods: {
    start () {
      this.remainingTime -= 1
      this.timer = setInterval(() => {
        this.remainingTime -= 1
        if (this.remainingTime === 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    stop () {
      clearInterval(this.timer)
      this.remainingTime = 1500
    }
  },
  computed: {
    formattedTime () {
      const pad = num => ('0' + num).substr(-2)
      const minutes = Math.floor(this.remainingTime / 60)
      const seconds = this.remainingTime - minutes * 60
      return `${minutes}:${pad(seconds)}`
    }
  }
}
</script>
