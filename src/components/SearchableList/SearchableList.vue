<template>
  <div class="msl-searchable-list">
    <input
      v-model="debouncedSearchText"
      class="msl-search-list-input"
      :class="searchInputClass"
      :placeholder="placeholderText"
    >
    <div class="msl-searchable-list__items">
      <div
        v-for="(option, index) in filteredListItems"
        :key="index"
        class="msl-searchable-list__item"
        :class="{'msl-searchable-list__item--disabled': option.disabled}"
        @click="clickOption(option)"
      >
        {{ getOptionDisplay(option, displayProperty) }}
      </div>

      <div
        v-if="noItems"
        class="msl-searchable-list__no-item"
      >
        {{ noOptionsText }}
      </div>

      <div
        v-if="noFilteredItems"
        class="msl-searchable-list__no-item"
      >
        {{ noItemsFoundText }}
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '../../utils/debounce';

function getValue(item, valueProperty) {
  return valueProperty(item);
}

function convertArrayToMap(items, valueProperty) {
  return items.reduce((result, item) => {
    const value = getValue(item, valueProperty);
    result[value] = true;
    return result;
  }, {});
}

export default {
  name: 'SearchableList',
  props: {
    listItems: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    selectedListItems: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholderText: {
      type: String,
      default: 'Search',
    },
    displayProperty: {
      type: Function,
      default: (value) => value,
    },
    valueProperty: {
      type: Function,
      default: (value) => value,
    },
    noOptionsText: {
      type: String,
      default: 'No options',
    },
    searchInputClass: {
      type: String,
      default: '',
    },
    noItemsFoundText: {
      type: String,
      default: 'No options found',
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    noItems() {
      return (this.selectedListItems.length && this.availableItems.length < 1)
            || (!this.listItems || this.listItems.length < 1);
    },
    noFilteredItems() {
      return this.availableItems
      && this.availableItems.length > 0
      && (!this.filteredListItems || this.filteredListItems.length < 1);
    },
    debouncedSearchText: {
      get() {
        return this.searchText;
      },
      set: debounce(function setNewValue(newValue) {
        this.searchText = newValue;
      }, 500),
    },
    availableItems() {
      if (this.listItems && this.selectedListItems) {
        const selectedItemsMap = convertArrayToMap(this.selectedListItems, this.valueProperty);

        return this.listItems.filter((item) => {
          const value = getValue(item, this.valueProperty);
          return !selectedItemsMap[value];
        });
      }

      return this.listItems;
    },
    filteredListItems() {
      if (this.searchText !== undefined) {
        return this.availableItems.filter(function filterItem(item) {
          const display = this.getOptionDisplay(item, this.displayProperty);

          return display && display.toLowerCase().includes(this.searchText.toLowerCase());
        }.bind(this));
      }
      return this.availableItems || this.listItems;
    },
  },
  methods: {
    getOptionDisplay(option, displayProperty) {
      return displayProperty(option) || '';
    },
    clickOption(option) {
      this.$emit('onClickOption', option);
    },
  },
};
</script>

<style lang="scss">
</style>
