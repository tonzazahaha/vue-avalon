<template>
  <div class="register text-white">
    <layout-not-auth>
      <b-form @submit.prevent="onSubmit">
        <!-- profile -->
        <div class="upload-image">+</div>
        <!-- email -->
        <b-form-group
          id="email-group"
          label="Email"
          label-for="email"
        >
          <b-form-input
            id="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter the email"
          ></b-form-input>
        </b-form-group>
        <!-- password -->
        <b-form-group
          id="password-group"
          label="Password"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter the password"
          ></b-form-input>
        </b-form-group>
        <!-- username -->
        <b-form-group
          id="username-group"
          label="Username"
          label-for="username"
        >
          <b-form-input
            id="username"
            type="text"
            v-model="form.username"
            required
            placeholder="Enter the username"
          ></b-form-input>
        </b-form-group>

        <b-button block class="mt-4" type="submit" variant="primary">Register</b-button>
      </b-form>
    </layout-not-auth>
  </div>
</template>

<script>
import LayoutNotAuth from '../components/LayoutNotAuth'

export default {
  name: 'home',
  components: {
    LayoutNotAuth
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        username: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.form)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.upload-image {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  line-height: 95px;
  background-color: grey;
  margin: 0px auto 20px auto;
  font-size: 30px;
  cursor: pointer;
  transition: .3s all;
}
.upload-image:hover {
  opacity: .7;
}
</style>
