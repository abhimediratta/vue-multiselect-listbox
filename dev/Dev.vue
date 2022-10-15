<template>
  <div id="app">
    <MultiSelect
      v-show="showWidget"
      ref="multi"
      v-model="value"
      :options="stringOptions"
      :show-select-all-buttons="showSelectAll"
      search-input-class="custom-input-class"
      :reduce-display-property="
        (option) => (typeof option === 'object' && option.name) || option
      "
      :reduce-value-property="
        (option) => (typeof option === 'object' && option.id) || option
      "
      highlight-diff
      @diff-changed="handleChange"
    />

    <button @click="resetCopy">Reset</button>
  </div>
</template>

<script>
import MultiSelect from '../src/components/MultiSelect-v3.vue'

export default {
  components: {
    MultiSelect,
  },

  data() {
    return {
      value: [],
      stringOptions: ['Chicago', 'Wisconsin', 'Houston'],
      options: [
        { name: 'Chicago', id: 'ch' },
        { name: 'Wisconsin', id: 'wi' },
        { name: 'Houston', id: 'ho' },
      ],
      showSelectAll: true,
      showWidget: true,
    }
  },

  created() {
    this.value = ['Chicago', 'Wisconsin']
  },

  methods: {
    handleChange(changes) {
      console.log('Changes', changes)
    },

    resetCopy() {
      this.$refs.multi.resetOriginalCopy()
    },
  },
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  font-family: -apple-system, sans-serif;
}

#app {
  height: 100%;
}

hr {
  border: none;
  border-bottom: 1px solid #cacaca;
  margin-bottom: 1em;
  padding-top: 1em;
  width: 90%;
}
</style>
