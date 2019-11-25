<template>
  <div class="home">
    <div class="ava">
      <div class="my-1 mx-auto">
        <img alt="Avalon logo" class="mx-auto" src="../assets/AVALON-red.png">
        <button type="button" class="my-4 btn btn-outline-danger btn-block" @click="$router.push('/login')">Press to enter</button>
      </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home'
}
</script>

<style>
.ava {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);

}
</style>
