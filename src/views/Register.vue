<template>

  <div>
    <img alt="Avalon logo" src="../assets/avalon.png" class="mx-auto d-block">
    <div class = "regis">
     <form>
         <p style="color:White">Email</p>
         <input type="text" placeholder="Enter your email" v-model="name"/>
         <p style="color:White">Password</p>
         <input type="password" placeholder="Enter your password" v-model="password"/><br>
         <button type="submit" class="btn btn-primary mb-2">Login</button>
    </form>
    <p style="color:White">Don’t have account?<p> <p style="color:Blue" >Create a account</p>
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
.regis{
  margin: auto;
  text-align: center;
  width: 40%;
  border-radius: 5px;
  background: rgba(37, 41, 50, 0.7);
}
</style>
