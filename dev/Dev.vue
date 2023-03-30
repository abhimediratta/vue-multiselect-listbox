<template>
  <div id="app">
    <MultiSelect v-show="showWidget" v-model="value" :options="options" :show-select-all-buttons="showSelectAll"
      search-input-class="custom-input-class"
      :reduce-display-property="option => option.name"
      :reduce-value-property="option => option.id"
      :reduceGroupProperty="option => option.group"
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

  created() {
    setTimeout(() => {
      this.value = ['ch', 'wi'];

      this.$refs.multi.resetOriginalCopy();
    }, 1000);
  },

  data() {
    return {
      value: [],
      stringOptions: ['Chicago', 'Wisconsin', 'Houston'],
      options: [{ name: 'Chicago', id: 'ch', group: 'United States' }, { name: 'Wisconsin', id: 'wi', group: 'United States' }, { name: 'Houston', id: 'ho', group: 'India' }],
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
