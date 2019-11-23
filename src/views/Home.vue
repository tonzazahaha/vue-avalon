<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col cols="6" class="my-4 mx-auto">
          <img alt="Avalon logo" class="rounded mx-auto d-block" src="../assets/avalon.png">
          <button type="button" class="btn btn-outline-secondary btn-block" onclick="window.location='./login/'">Press to enter</button>
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
