<template>
  <div id="app">
    <!-- <sandbox hide-help v-slot="config"> -->
    <MultiSelect v-model="value" :options="options" :show-select-all-buttons="showSelectAll" />
    <!-- </sandbox> -->
  </div>
</template>

<script>
import MultiSelect from '../src/components/MultiSelect/MultiSelect';

export default {
  components: {
    MultiSelect,
  },
  data() {
    return {
      value: [],
      options: ['Chicago', 'Wisconsin', 'Houston'],
      showSelectAll: true,
    };
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
