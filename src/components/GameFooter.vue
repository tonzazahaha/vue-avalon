<template>
  <div class="mx-auto">
    <div v-if="phase == 2">
      <b-col cols="auto" class="mx-auto">
        <b-button variant="success" class="btn-vote mx-3">Approve</b-button>
        <b-button variant="danger" class="btn-vote mx-3">Reject</b-button>
      </b-col>
    </div>
    <div v-if="phase == 3">
      <b-col cols="auto" class="mx-auto">
        <b-button variant="success" class="btn-vote mx-3">success</b-button>
        <b-button variant="danger" class="btn-vote mx-3">Fail</b-button>
      </b-col>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      phase: 2,
      vote: 0
    }
  }
}
</script>

<style>
.btn-vote {
  width: 130px;
  padding: 7px 0;
}
</style>
