<template>
  <div class="register text-white">
    <layout-not-auth>
      <b-form @submit.prevent="onSubmit">
        <img :src="form.profile" class="profile-preview" alt="">
        <b-form-group
          id="profile-group"
          label="Profile"
          label-for="profile"
        >
          <b-form-input
            id="profile"
            type="text"
            v-model="form.profile"
            required
            placeholder="Enter the profile url"
          ></b-form-input>
        </b-form-group>
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
        <span class="mt-5">
          Already have an account? <router-link to="/login">Login</router-link>
          {{ isPreviewProfile }}
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
        profile: '',
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
  },
  computed: {
    isPreviewProfile () {
      var isImgUrl = /(http(s?):)([/|.|\w|s|-])*\.(?:jpg|jpeg|gif|png)/g
      if (this.form.profile !== '') {
        return isImgUrl.test(this.form.profile)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.profile-preview {
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  text-align: center;
  line-height: 95px;
  background-color: grey;
  margin: 0px auto 20px auto;
  font-size: 30px;
  transition: .3s all;
}
</style>
