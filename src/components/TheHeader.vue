<template>
  <b-navbar variant="dark" type="dark" class="sticky-top" >
    <b-navbar-brand to="/" class="ml-2">
      <img
        src="../assets/player-icons/knight.png"
        class="d-inline-block align-top pr-3"
        alt="knight"
      >
      <img
        src="../assets/avalon Header.png"
        class="d-inline-block align-top pr-3"
        alt="avalon"
      >
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Lang" class="mr-2" right>
        <template v-slot:button-content>
          <b-img
            :src="changeUrl || ''"
            alt=""
            width="30"
            height="30"
            rounded="circle"
          >
          </b-img>
          <span class="pl-3">{{ changeName }}</span>
        </template>
        <b-dropdown-item href="#">View Profile</b-dropdown-item>
        <b-dropdown-item href="#">Setting</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="logout">Log out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      user: {
        photoUrl: '',
        name: ''
      }
    }
  },
  computed: {
    changeName () {
      console.log('ton1')
      return this.$store.getters['Auth/getUserName'] || ''
    },
    changeUrl () {
      console.log('ton2')
      console.log(this.$store.getters['Auth/getUrl'])
      return this.$store.getters['Auth/getUrl'] || ''
    }
  },
  methods: {
    logout () {
      if (confirm('Are you sure to logout?')) {
        this.$store.dispatch('Auth/logout')
          .then(() => {
            this.$router.push('/login')
          })
      }
    }
  }
}
</script>
