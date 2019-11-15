<template>
  <div class="ingame">
    <b-container fluid>
      <b-row class="flex-xl-nowrap">
        <b-col>
          room name
        </b-col>
        <b-col cols="4" class="sidebar bg-dark px-0">
          <the-sidebar />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar'

export default {
  data () {
    return {
    }
  },
  components: {
    TheSidebar
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
</style>
