<template>
  <b-container fluid>
    <b-row class="flex-xl-nowrap">
      <b-col cols="9" class="px-0">
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
