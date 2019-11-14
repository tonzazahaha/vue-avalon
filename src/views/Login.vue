<template>
  <div class="login text-white">
    <layout-not-auth>
      <b-form @submit.prevent="onSubmit">
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
        <b-button block class="mt-4" type="submit" variant="primary">Register</b-button>
        <span class="mt-5">
          Don't have any account? <router-link to="/register">Create an account</router-link>
        </span>
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
        password: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
