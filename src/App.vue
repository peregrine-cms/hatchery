<template>
  <div id="app">
    <Shell></Shell>
  </div>
</template>

<script>
import Shell from './components/Shell.vue';

export default {
  name: 'app',
  components: {
    Shell
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
