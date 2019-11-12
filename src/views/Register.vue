<template>

  <div>
    <br>
    <br>
    <img alt="Avalon logo" class="rounded mx-auto d-block" src="../assets/avalon.png">
    <div class="container" >
      <div class="mx-auto">
          <div><p style="color:White">Email</p>
            <b-form-input v-model="text" placeholder="Enter the email"></b-form-input><br>
          </div>
          <div><p style="color:White">Password</p>
            <b-form-input type="password" placeholder="Enter the password"></b-form-input><br>
          </div>
          <div>
            <p style="color:White">Username</p>
            <b-form-input v-model="text" placeholder="Enter the username"></b-form-input><br>
          </div>
          <b-button block variant="primary">Register</b-button>
      </div>
    <p style="color:White" text-align="center">Already have an account? <a href="/login">Login</a></p>
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

</style>
