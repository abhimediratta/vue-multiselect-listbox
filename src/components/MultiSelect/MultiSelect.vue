<template>
  <div class="multi-select">
    <SearchableList
      :list-items="availableOptions"
      :selected-list-items="value"
      :display-property="displayProperty"
      :value-property="valueProperty"
      :placeholder="searchPlaceholder"
      class="multi-select__list"
      @onClickOption="onOptionSelect"
    />

    <div class="multi-select__actions">
      <a
        class="btn btn-function m-t-30"
        :class="{'invisible': !showSelectAll}"
        @click="onSelectAllOptions"
      >
        <i class="fa fa-angle-double-right p-0" />
      </a>

      <font-awesome-icon icon="exchange-alt" />

      <a
        class="btn btn-function m-t-20"
        :class="{'invisible': !showSelectAll}"
        @click="onUnselectAllOptions"
      >
        <i class="fa fa-angle-double-left p-0" />
      </a>
    </div>

    <SearchableList
      :list-items="selectedItems"
      :no-options-text="'Select'"
      :display-property="displayProperty"
      :value-property="valueProperty"
      :placeholder="selectedPlaceholder"
      class="multi-select__selected multi-select__list"
      @onClickOption="onOptionRemove"
    />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import SearchableList from '../SearchableList/SearchableList';


library.add(faExchangeAlt);

function getSelectedItemsFromValue(values, valueProperty, availableOptions) {
  if (valueProperty) {
    const selectedItems = [];

    values.forEach((value) => {
      const item = availableOptions.find(function findOptions(option) {
        return option[valueProperty] === value;
      });
      selectedItems.push(item);
    });

    return selectedItems;
  }

  return [...values];
}

function getValueFromOption(valueProperty, option) {
  return valueProperty ? option[valueProperty] : option;
}

function getValuesFromOptions(valueProperty, options) {
  const values = [];

  options.forEach((option) => {
    values.push(getValueFromOption(valueProperty, option));
  });

  return values;
}


export default {
  name: 'MultiSelect',
  components: {
    SearchableList,
    FontAwesomeIcon,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    listItems: {
      type: Array,
      default() {
        return [];
      },
    },
    searchPlaceholder: {
      type: String,
      default() {
        return 'Search';
      },
    },
    selectedPlaceholder: {
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
      default: '',
    },
    showSelectAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedItems: getSelectedItemsFromValue(this.value, this.valueProperty, this.listItems),
    };
  },
  computed: {
    availableOptions() {
      if (!this.value || !this.value.length) {
        return [...this.listItems];
      }

      return this.listItems.filter((option) => {
        if (this.valueProperty) {
          return this.value.indexOf(option[this.valueProperty]) < 0;
        }

        return !this.value.find((value) => value === option);
      });
    },
  },
  methods: {
    onOptionSelect(option) {
      this.selectedItems.push(option);
      const items = [...this.value, getValueFromOption(this.valueProperty, option)];
      this.$emit('input', items);
      this.$emit('change', items);
    },
    onOptionRemove(option) {
      const items = [...this.value];
      const { selectedItems } = this;

      let valueIndex = items.findIndex((item) => {
        if (this.valueProperty) {
          return item && option && (item === option[this.valueProperty]);
        }

        return item === option;
      });

      items.splice(valueIndex, 1);

      valueIndex = selectedItems.findIndex((item) => {
        if (this.valueProperty) {
          return item && option && (item[this.valueProperty] === option[this.valueProperty]);
        }

        return item === option;
      });

      selectedItems.splice(valueIndex, 1);

      // Copy the array because Vue doesn't react on the array modification by lodash
      // https://vuejs.org/v2/guide/list.html#Array-Change-Detection
      this.selectedItems = [...selectedItems];

      this.$emit('input', items);
      this.$emit('change', items);
    },
    onSelectAllOptions() {
      this.selectedItems = [...this.listItems];

      const selectedValues = getValuesFromOptions(this.valueProperty, this.listItems);
      this.$emit('input', selectedValues);
      this.$emit('change', selectedValues);
    },
    onUnselectAllOptions() {
      this.selectedItems = [];

      this.$emit('input', []);
      this.$emit('change', []);
    },
  },
};

</script>

<style lang="scss" scoped>
.multi-select {
  display: inline-flex;
  height: 300px;
}

.multi-select__actions {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
}

.multi-select__list {
  width: 100%;
}
</style>
