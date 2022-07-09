<template>
  <div id="app">
    <MultiSelect v-show="showWidget"
      v-model="value"
      :options="options"
      :show-select-all-buttons="showSelectAll"
      search-input-class="custom-input-class"
      :reduce-display-property="option => option.name"
      :reduce-value-property="option => option.id"
      ref="multi"
      highlight-diff
      @diff-changed="handleChange" />
  </div>
</template>

<script>
import MultiSelect from '../src/components/MultiSelect/MultiSelect.vue';

export default {
  components: {
    MultiSelect,
  },

  mounted() {
    this.value = ['ch', 'wi'];
  },

  data() {
    return {
      value: [],
      stringOptions: ['Chicago', 'Wisconsin', 'Houston'],
      options: [{ name: 'Chicago', id: 'ch' }, { name: 'Wisconsin', id: 'wi' }, { name: 'Houston', id: 'ho' }],
      showSelectAll: true,
      showWidget: true,
    };
  },

  methods: {
    handleChange(changes) {
      console.log('Changes', changes);
    },
  },
};
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
