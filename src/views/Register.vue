<template>

  <div>
    <img alt="Avalon logo" src="../assets/avalon.png" class="mx-auto d-block">
    <div>
     <form>
         <p>Email</p>
         <input type="text" placeholder="Enter your email" v-model="name"/>
         <p>Password</p>
         <input type="password" placeholder="Enter your password" v-model="password"/>
    </form>
    </div>
  </div>
 </template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>

<style scoped>
.form{
    width: 425px;
    height: 508px;
    left: 427px;
    top: 142px;
    background: rgba(37, 41, 50, 0.7);
}

</style>
