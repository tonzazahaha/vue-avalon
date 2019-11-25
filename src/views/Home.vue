<template>
  <div class="home">
    <b-container class="ava">
        <b-row class="">
        <b-col cols="auto" class="my-1 mx-auto" align-self="center">
          <img alt="Avalon logo" class="mx-auto" src="../assets/AVALON-red.png">
          <button type="button" class="my-4 btn btn-outline-danger btn-block" onclick="window.location='./login/'">Press to enter</button>
        </b-col>
      </b-row>
  </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home'
}
</script>

<style scoped>
</style>
