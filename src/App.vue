<template>
  <div id="app">
    <the-header v-if="showHeader && user" />
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
      pageNotRequiredHeader: ['login', 'register', 'home']
    }
  },
  watch: {
    '$route.name': function (name) {
      this.showHeader = !(this.pageNotRequiredHeader.indexOf(name) > -1)
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/getUser']
    }
  }
}
</script>

<style>
</style>
