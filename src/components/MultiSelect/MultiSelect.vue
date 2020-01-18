<template>
  <div class="msl-multi-select">
    <SearchableList
      :list-items="availableOptions"
      :selected-list-items="value"
      :display-property="reduceDisplayProperty"
      :value-property="reduceValueProperty"
      :placeholder="searchOptionsPlaceholder"
      class="msl-multi-select__list"
      @onClickOption="onOptionSelect"
    />

    <div class="msl-multi-select__actions">
      <a
        class="msl-multi-select__action msl-multi-select__action-select-all"
        :class="{'invisible': !showSelectAllButtons}"
        @click="onSelectAllOptions"
      >
        <font-awesome-icon icon="angle-double-right" />
      </a>

      <font-awesome-icon icon="exchange-alt" class="multi-select__action-icon" />

      <a
        class="msl-multi-select__action msl-multi-select__action-unselect-all"
        :class="{'invisible': !showSelectAllButtons}"
        @click="onUnselectAllOptions"
      >
        <font-awesome-icon icon="angle-double-left" />
      </a>
    </div>

    <SearchableList
      :list-items="selectedItems"
      :no-options-text="'Select'"
      :display-property="reduceDisplayProperty"
      :value-property="reduceValueProperty"
      :placeholder="selectedOptionsPlaceholder"
      class="msl-multi-select__selected msl-multi-select__list"
      @onClickOption="onOptionRemove"
    />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExchangeAlt, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import SearchableList from '../SearchableList/SearchableList';

library.add(faExchangeAlt, faAngleDoubleLeft, faAngleDoubleRight);

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
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    searchOptionsPlaceholder: {
      type: String,
      default() {
        return 'Search';
      },
    },
    selectedOptionsPlaceholder: {
      type: String,
      default() {
        return 'Search';
      },
    },
    reduceDisplayProperty: {
      type: Function,
      default: (value) => value,
    },
    reduceValueProperty: {
      type: Function,
      default: (value) => value,
    },
    noOptionsText: {
      type: String,
      default: '',
    },
    showSelectAllButtons: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedItems: getSelectedItemsFromValue(this.value, this.valueProperty, this.options),
    };
  },
  computed: {
    availableOptions() {
      if (!this.value || !this.value.length) {
        return [...this.options];
      }

      return this.options.filter((option) => {
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
      this.selectedItems = [...this.options];

      const selectedValues = getValuesFromOptions(this.valueProperty, this.options);
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

<style lang="scss">
@import '../../scss/vue-multi-select-listbox.scss';
</style>
