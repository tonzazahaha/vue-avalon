<template>
  <div class="">
    <b-tabs
      v-model="tabIndex"
      nav-class="rounded-0 border-0 text-color"
      nav-wrapper-class="bg-tabhead"
      active-nav-item-class="rounded-0 border-secondary bg-secondary"
      active-tab-class="bg-secondary"
      content-class="sidebar-content"
    >
      <b-tab v-for="(tab, i) in tabs" :key="i">
        <template v-slot:title>
          <em class="material-icons pt-2" style="font-size: 15px;">{{ tab.icon }}</em>
          <span class="pl-2" v-if="i === tabIndex && tab.title">
            {{ tab.title }}
          </span>
          <em
            v-if="i === tabIndex && tab.canClose"
            class="material-icons pt-2 pl-2 text-danger"
            style="font-size: 15px;"
            @click="closeTab(i)"
          >close</em>
        </template>
        <p class="px-3 mt-3">{{ tab.body }}</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        { title: '', canClose: false, icon: 'people', body: 'ljkjlk' },
        { title: 'Chat', canClose: true, icon: 'chat_bubble', body: 'blkjlakjsdlfkjalskdjflkajsdlfkjalskdjflkajsdflk loremlsdfkjaslkjfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\n\n\nlasjdlfkjalskdjflkajsdlfjalskdjlkjlkjljkjlkj]\nlaskdjfljsadlfkjlkjlkjlkjalksjfdlk Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32 The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.' }
      ],
      tabIndex: 0
    }
  },
  methods: {
    closeTab (index) {
      this.tabs.pop(index)
    }
  }
}
</script>

<style scoped>
.sidebar-content {
  overflow-y: auto;
  max-height: calc(100vh - 10rem);
  margin-top: 10px;
}
</style>
