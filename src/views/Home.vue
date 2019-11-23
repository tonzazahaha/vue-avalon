<template>
  <div class="home">
    <b-container class="ava">
        <b-row>
        <b-col cols="8" class="my-4 mx-auto">
          <img alt="Avalon logo" class="mx-auto" src="../assets/AVALON-red.png">
          <button type="button" class="btn btn-outline-danger btn-block" onclick="window.location='./login/'">Press to enter</button>
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
.ava{
  position: fixed;
  left: 120px;
  top: 200px;

}
</style>
