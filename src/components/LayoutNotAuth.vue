<template>
  <b-container>
      <b-row>
        <b-col cols="6" class="my-4 mx-auto">
          <img alt="Avalon logo" class="rounded mx-auto d-block" src="../assets/avalon.png">
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="mx-auto p-5 bg-dark">
          <slot></slot>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
