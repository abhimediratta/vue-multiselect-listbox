<template>
  <div class="searchable-list">
    <input
      v-model="debouncedSearchText"
      class="form-control m-b-20"
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
        class="text-muted"
      >
        {{ noOptionsText }}
      </div>

      <div
        v-if="noFilteredItems"
        v-t="'NO_FILTERED_ITEMS'"
        class="text-muted"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'utils/debounce';

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
        return this.$i18n.t('SEARCH');
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
        return this.$i18n.t('NO_ITEMS');
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
      return this.availableItems && this.availableItems.length > 0 && (!this.filteredListItems || this.filteredListItems.length < 1);
    },
    debouncedSearchText: {
      get() {
        return this.searchText;
      },
      set: debounce(function setNewSearchTextValue(newValue) {
        this.searchText = (newValue && newValue.toLowerCase()) || '';
      }, 250),
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
      if (this.searchText) {
        return this.availableItems.filter(function filterItem(item) {
          const display = this.getOptionDisplay(item, this.displayProperty);
          return display && display.toLowerCase().indexOf(this.searchText) > -1;
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

function convertArrayToMap(items, valueProperty) {
  return reduce(items, (result, item) => {
    const value = getValue(item, valueProperty);
    result[value] = true;
    return result;
  }, {});
}

function getValue(item, valueProperty) {
  return valueProperty ? ((item && item[valueProperty]) || '') : item;
}
</script>

<style lang="scss" scoped>
.searchable-list {
  display: flex;
  flex-direction: column;
}

.searchable-list__items {
  border: 1px solid var(--component-multi-select__list-border-color);
  flex-basis: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  > div {
    font-size: 0.9em;
    padding: 5px 10px;
  }
}

.searchable-list__item {
  cursor: pointer;
  border-bottom: 1px solid var(--component-multi-select__option-border-color);
  background-color: (--component-multi-select__option-bg);
  &:hover {
    background: var(--component-multi-select__option--hover-bg);
    color: $white;
  }
}
</style>
