<template>
  <div id="app">
    <the-header />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/register"> Register</router-link>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  name: 'app',
  components: {
    TheHeader
  }
}
</script>

<style>
</style>
