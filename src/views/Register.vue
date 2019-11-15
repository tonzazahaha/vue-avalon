<template>
  <div>
    <img alt="Avalon logo" src="../assets/avalon.png" class="mx-auto d-block">
    <b-card style="max-width: 20rem; background-color: #2A2E39" >
    <b-form-group id="input-group-1" label="Email" label-for="input-1" style="color:white" width="10rem">
        <b-form-input
          id="input-1"
          placeholder="Enter the email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2" style="color:white">
        <b-form-input
          id="input-2"
          placeholder="Enter the password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Username" label-for="input-3" style="color:white">
        <b-form-input
          id="input-3"
          placeholder="Enter the username"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" style="color:white">Register</b-button> //color buttom #524370
      <p style="color:white">Already have an account?</p>
    </b-card>
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
      if (this.form.profile !== '') {
        this.$store.dispatch('Auth/register', {
          email: this.form.email,
          password: this.form.password,
          name: this.form.username,
          profilePic: this.form.profile
        })
          .then(result => {
            alert('Register Success')
            this.$router.push('/login')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('Must be image url')
      }
    },
    isImageUrl (imageUrl) {
      var isImgUrl = /(http(s?):)([/|.|\w|s|-])*\.(?:jpg|jpeg|gif|png)/g
      if (imageUrl !== '') return isImgUrl.test(imageUrl)
      return false
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
