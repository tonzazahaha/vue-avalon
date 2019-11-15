<template>
  <b-tabs
    nav-class="rounded-0 border-0"
    nav-wrapper-class="bg-tabhead"
    active-nav-item-class="rounded-0 border-secondary bg-secondary"
    active-tab-class="bg-secondary"
  >
    <b-tab v-for="(tab, i) in tabs" :key="i">
      <template v-slot:title>
        {{ tab.title }}
      </template>
      <p class="p-3">{{ tab.body }}</p>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        { title: 'title3', body: 'ljkjlk' },
        { title: 'title2', body: 'blkjlakjsdlfkjalskdjflkajsdlfkjalskdjflkajsdflk' }
      ]
    }
  }
}
</script>

<style>
</style>
