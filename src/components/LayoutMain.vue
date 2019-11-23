<template>
  <b-container fluid>
    <b-row class="flex-xl-nowrap">
      <b-col cols="9" class="px-1 body">
        <slot></slot>
      </b-col>
      <b-col cols="4" class="sidebar bg-secondary px-0 fixed-bottom">
        <the-sidebar />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TheSidebar from './TheSidebar'

export default {
  components: {
    TheSidebar
  }
}
</script>

<style>
.body {
  max-width: calc(100vw - 300px);
  min-width: calc(100vw - 300px);
}
.sidebar {
  /* display: block; */
  /* position: sticky; */
  height: calc(100vh - 50px);
  top: 60px;
  left: calc(100vw - 300px);
  max-width: 300px;
  min-width: 300px;
  word-wrap: break-word;
  z-index: 1000;
}
.body {
  height: calc(100vh - 65px);
}
</style>
