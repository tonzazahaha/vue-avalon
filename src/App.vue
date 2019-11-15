<template>
  <div id="app">
<<<<<<< HEAD
    <the-header />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link>
=======
    <the-header v-if="showHeader" />
>>>>>>> 81aac5c20064838a1d1fd69d19fdfdbc154d53a4
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
