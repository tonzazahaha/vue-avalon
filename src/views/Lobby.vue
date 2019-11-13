<template>
  <div class="lobby">
    <b-container fluid>
      <b-row class="flex-xl-nowrap">
        <b-col>
          room name
        </b-col>
        <b-col cols="4" class="sidebar bg-dark px-0">
          <b-tabs
            active-nav-item-class="bg-secondary"
            active-tab-class="bg-secondary"
          >
            <b-tab v-for="(tab, i) in tabs" :key="i" :title="tab.title">
              <p class="p-3">{{ tab.body }}</p>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
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

<style scoped>
.sidebar {
  /* display: block; */
  position: sticky;
  height: calc(100vh - 62px);
  max-width: 345px;
  min-width: 345px;
  word-wrap:break-word;
}
.nav-tabs, .nav-tabs .nav-link {
  border: none;
}
</style>
