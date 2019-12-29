<template>
  <div class="searchable-list">
    <input
      v-model="debouncedSearchText"
      class="search-list-input"
      :class="searchInputClass"
      :placeholder="placeholderText"
    >
    <div class="searchable-list__items">
      <div
        v-for="(option, index) in filteredListItems"
        :key="index"
        class="multi-select-option searchable-list__item"
        @click="clickOption(option)"
      >
        {{ getOptionDisplay(option, displayProperty) }}
      </div>

      <div
        v-if="noItems"
        class="searchable-list__no-item"
      >
        {{ noOptionsText }}
      </div>

      <div
        v-if="noFilteredItems"
        class="searchable-list__no-item"
      >
        No items found
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '../../utils/debounce';

function getValue(item, valueProperty) {
  return valueProperty ? ((item && item[valueProperty]) || '') : item;
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
      default() {
        return 'Search';
      },
    },
    displayProperty: {
      type: String,
      default: '',
    },
    valueProperty: {
      type: String,
      default: '',
    },
    noOptionsText: {
      type: String,
      default() {
        return 'No options';
      },
    },
    searchInputClass: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    noItems() {
      return !this.listItems || this.listItems.length < 1;
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
      }, 1000),
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
      return displayProperty ? ((option && option[displayProperty]) || '') : option;
    },
    clickOption(option) {
      this.$emit('onClickOption', option);
    },
  },
};
</script>

<style lang="scss">
.search-list-input {
  margin-bottom: 10px;
}

.searchable-list {
  display: flex;
  flex-direction: column;
}

.searchable-list__items {
  border: 1px solid $multi-select-items-box-border-color;
  flex-basis: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.searchable-list__no-item {
  font-size: 0.9em;
  padding: 5px 10px;
  color: $multi-select-no-item-font-color;
}

.searchable-list__item {
  font-size: 0.9em;
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid $multi-select-item-border-bottom-color;
  &:hover {
    background: $multi-select-item-hover-bg;
    color: $multi-select-item-hover-font-color;
  }
}
</style>
