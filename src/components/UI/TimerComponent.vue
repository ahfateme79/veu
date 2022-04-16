<template>
  <div></div>
</template>

<script>
import {timer} from 'vue-timers'

export default {
  name: "TimerComponent",
  timers: [
    timer('resendCode', 120000)
  ],
  methods: {
    resendCode() {
      console.log('It works!')
    }
  }
}
</script>

<style scoped>

</style>