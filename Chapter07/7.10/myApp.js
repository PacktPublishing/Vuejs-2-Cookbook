function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const myApp = {
  template: `
    <div>
      <p>
        I am thinking of a number between 1 and 20.
      </p>
      <input v-model="guess">
      <p v-if="guess">{{output}}</p>
    </div>
  `,
  data: {
    number: getRandomInt(1, 20),
    guess: undefined
  },
  computed: {
    output () {
      if (this.guess < this.number) {
        return 'Higher...'
      }
      if (this.guess > this.number) {
        return 'Lower...'
      }
      return 'That’s right!'
    }
  }
}