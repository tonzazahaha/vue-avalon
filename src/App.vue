<template>
  <div id="app">
    <the-header />
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
