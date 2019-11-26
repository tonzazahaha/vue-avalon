<template>
    <div class="popup">
  <!-- win -->
    <b-modal
      centered
      ref="my-modal"
      v-model="showWin"
      header-bg-variant="secondary"
      header-border-variant="secondary"
      body-bg-variant="secondary"
      footer-bg-variant="secondary"
      footer-border-variant="secondary"
      hide-footer title= "Using Component Methods"
    >
      <template v-slot:modal-header class="mx-auto">
        <h5 class="mx-auto">YOU WIN!</h5>
      </template>
        <b-row align-h="center">
          <b-col cols='auto'>
            <img src="../assets/win.png" alt="win">
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols='auto'>
            <b-button class="mt-3" variant="outline-primary" @click="hideModal">OK</b-button>
          </b-col>
        </b-row>
    </b-modal>

<!-- lose -->
    <b-modal
      centered
      ref="my-modal"
      v-model="showLose"
      header-bg-variant="secondary"
      header-border-variant="secondary"
      body-bg-variant="secondary"
      footer-bg-variant="secondary"
      footer-border-variant="secondary"
      hide-footer title= "Using Component Methods"
    >
      <template v-slot:modal-header class="mx-auto">
        <h5 class="mx-auto">YOU LOSE!</h5>
      </template>
      <b-row align-h="center">
          <b-col cols='auto'>
            <img src="../assets/lose.png" alt="lose">
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols='auto'>
            <b-button class="mt-3" variant="outline-primary" @click="hideModal">OK</b-button>
          </b-col>
        </b-row>
    </b-modal>
    </div>

</template>

<script>
export default {
    data () {
    return {
      showWin: false,
      showLose: false
    }
  },
  methods: {
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }

}
</script>

<style>

</style>