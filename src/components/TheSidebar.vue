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
          <em class="material-icons pt-2 pb-2" style="font-size: 20px;">{{ tab.icon }}</em>
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
        <p class="mt-3">
          <ul class="sidebar-list">
            <li v-for="(e, index) in tab.body" :key="index">
              [{{ toTimeFormat(e.time) }}] {{ e.text }}
            </li>
          </ul>
        </p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        { title: '', canClose: false, icon: 'people', body: [{ time: 0, text: 'Online player is unavailable!' }] },
        { title: 'Game Logs', canClose: true, icon: 'assignment_turned_in', body: [{ time: 1574835213228, text: 'game start' }, { time: 1574835429460, text: 'Game log is unavailable!' }] }
      ]
    }
  },
  methods: {
    closeTab (index) {
      this.tabs.pop(index)
    },
    toTimeFormat (timestamp) {
      if (timestamp === 0) {
        return ''
      } else {
        return `${(new Date(timestamp)).getHours()}:${(new Date(timestamp).getMinutes())}`
      }
    }
  },
  computed: {
    tabIndex: {
      get () {
        return this.$store.getters['Sidebar/getTabIndex']
      },
      set (value) {
        this.$store.commit('Sidebar/SETTABINDEX', value)
      }
    }
  }
}
</script>

<style>
.sidebar-content {
  overflow-y: auto;
  max-height: calc(100vh - 10rem);
  margin-top: 10px;
}
.sidebar-list {
  list-style: none;
  padding: 0 20px;
}
.sidebar-list li {
  word-wrap: break-word;
}
</style>
