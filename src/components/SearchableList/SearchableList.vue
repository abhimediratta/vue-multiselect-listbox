<template>
  <div class="msl-searchable-list">
    <input
      v-if="!hideSearchInput"
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
        :class="{'msl-searchable-list__item--disabled': option.disabled, [highlightClass]: highlightDiff && highlightedItemsMap[getValue(option)] }"
        @click="clickOption(option)"
      >
        {{ getOptionDisplay(option) }}
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
import isEmptyObject from '../../utils/isEmptyObject';

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
    highlightItems: {
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
    highlightDiff: {
      type: Boolean,
      default: false,
    },
    highlightClass: {
      type: String,
      default: '',
    },
    hideSearchInput: {
      type: Boolean,
      default: false,
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

    highlightedItemsMap() {
      return convertArrayToMap(this.highlightItems, this.valueProperty);
    },

    availableItems() {
      const selectedItemsMap = convertArrayToMap(this.selectedListItems, this.valueProperty);
      let finalItems = [...this.listItems];

      if (!isEmptyObject(selectedItemsMap)) {
        finalItems = this.listItems.filter((item) => {
          const value = getValue(item, this.valueProperty);

          const isNotSelected = !selectedItemsMap[value];

          return isNotSelected;
        });
      }

      return finalItems.sort((a, b) => {
        const aDisplayName = this.getOptionDisplay(a);
        const bDisplayName = this.getOptionDisplay(b);

        return aDisplayName.localeCompare(bDisplayName);
      });
    },

    filteredListItems() {
      if (this.searchText != null && this.searchText !== '') {
        return this.availableItems.filter(function filterItem(item) {
          const display = this.getOptionDisplay(item);

          return display && display.toLowerCase().includes(this.searchText.toLowerCase());
        }.bind(this));
      }

      return this.availableItems;
    },
  },

  methods: {
    getOptionDisplay(option) {
      return this.displayProperty(option) || '';
    },

    getValue(option) {
      return getValue(option, this.valueProperty);
    },

    clickOption(option) {
      this.$emit('onClickOption', option);
    },
  },
};
</script>

<style lang="scss">
</style>
