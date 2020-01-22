<template>
  <v-multiselect-listbox 
    v-model="selectedStates"
    :options="options"
    :reduce-value-property="(option) => option.abbreviation"
    :reduce-display-property="(option) => option.name"
    show-select-all-buttons />
</template>

<script>
import USStates from '../data/USStates';

export default {
  name: 'StateSelector',
  data() {
    return {
      selectedStates: [],
      options: USStates
    }
  },
}
</script>

<style>

</style>