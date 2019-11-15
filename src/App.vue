<template>
  <div id="app">
    <the-header />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/lobby">Lobby</router-link>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  name: 'app',
  components: {
    TheHeader
  },
  data () {
    return {
      showHeader: false,
      pageNotRequiredHeader: ['login', 'register']
    }
  },
  watch: {
    '$route.name': function (name) {
      this.showHeader = !(this.pageNotRequiredHeader.indexOf(name) > -1)
    }
  }
}
</script>

<style>
</style>
