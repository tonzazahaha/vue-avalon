<template>
  <div id="app">
    <the-header v-if="showHeader" />
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
      this.showHeader = !this.isInArray(name, this.pageNotRequiredHeader)
    }
  },
  methods: {
    isInArray (e, array) {
      return array.indexOf(e) > -1
    }
  }
}
</script>

<style>
</style>
