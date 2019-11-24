<template>
  <div class="room">
    <b-container class="h-100" fluid>
      <b-row align-v="start" class="px-5 room-detail" style="height: 115px;">
        <!-- room detail -->
        <slot name="room-detail"></slot>
      </b-row>
      <!-- <b-row align-v="center" class="room-member pl-5"> -->
        <!-- room wrapper -->
        <slot name="room-wrapper"></slot>
      <!-- </b-row> -->
      <b-row align-v="end" class="px-5 py-3 room-actions">
        <!-- room footer -->
        <slot name="room-footer"></slot>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {

}
</script>

<style>
.room-detail {
  color: white;
}
.room-detail span {
  color: #e5e5e5;
  opacity: .7;
}

</style>
