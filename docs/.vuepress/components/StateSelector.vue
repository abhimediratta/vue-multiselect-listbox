<template>
  <v-multiselect-listbox 
    v-model="selectedStates"
    :options="options"
    :reduce-value-property="(option) => option.abbreviation"
    :reduce-display-property="(option) => option.name"
    no-options-found-text="No state found"
    no-selected-options-found-text="No selected state found"
    no-options-text="No states"
    selected-no-options-text="No states selected"
    search-options-placeholder="Search states"
    selected-options-placeholder="Search selected states"
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