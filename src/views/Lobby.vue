<template>
  <div class="lobby">
    <b-container fluid>
      <b-row class="flex-xl-nowrap">
        <b-col>
          room name
        </b-col>
        <b-col cols="4" class="sidebar bg-secondary px-0 fixed-bottom">
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
  /* position: sticky; */
  height: calc(100vh - 50px);
  top: 60px;
  left: calc(100vw - 345px);
  max-width: 345px;
  min-width: 345px;
  word-wrap: break-word;
  z-index: 1000;
}
</style>
