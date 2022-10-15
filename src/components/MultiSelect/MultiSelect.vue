<template>
  <div class="msl-multi-select">
    <SearchableList
      :list-items="availableOptions"
      :no-options-text="noOptionsText"
      :no-items-found-text="noOptionsFoundText"
      :selected-list-items="selectedItems"
      :display-property="reduceDisplayProperty"
      :value-property="reduceValueProperty"
      :placeholder-text="searchOptionsPlaceholder"
      :search-input-class="searchInputClass"
      :highlight-class="highlightRemovedClass"
      :highlight-items="newlyRemovedItems"
      class="msl-multi-select__list"
      :highlight-diff="highlightDiff"
      @on-click-option="onOptionSelect"
    />

    <div class="msl-multi-select__actions">
      <a
        class="msl-multi-select__action msl-multi-select__action-select-all"
        :class="{ invisible: !showSelectAllButtons }"
        @click="onSelectAllOptions"
      >
        <font-awesome-icon icon="angle-double-right" />
      </a>

      <font-awesome-icon
        icon="exchange-alt"
        class="multi-select__action-icon"
      />

      <a
        class="msl-multi-select__action msl-multi-select__action-unselect-all"
        :class="{ invisible: !showSelectAllButtons }"
        @click="onUnselectAllOptions"
      >
        <font-awesome-icon icon="angle-double-left" />
      </a>
    </div>

    <SearchableList
      :list-items="selectedItems"
      :no-options-text="selectedNoOptionsText"
      :no-items-found-text="noSelectedOptionsFoundText"
      :display-property="reduceDisplayProperty"
      :value-property="reduceValueProperty"
      :placeholder-text="selectedOptionsPlaceholder"
      :search-input-class="searchInputClass"
      :highlight-class="highlightAddedClass"
      :highlight-items="newlyAddedItems"
      :highlight-diff="highlightDiff"
      class="msl-multi-select__selected msl-multi-select__list"
      @on-click-option="onOptionRemove"
    />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faExchangeAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'

import SearchableList from '../SearchableList.vue'

library.add(faExchangeAlt, faAngleDoubleLeft, faAngleDoubleRight)

function getSelectedItemsFromValue(values, valueProperty, availableOptions) {
  if (valueProperty) {
    const selectedItems = []

    values.forEach((value) => {
      const item = availableOptions.find(function findOptions(option) {
        if (typeof valueProperty === 'string') {
          return option[valueProperty] === value
        } else if (typeof valueProperty === 'function') { // eslint-disable-line
          return valueProperty(option) === value
        }

        return option
      })

      selectedItems.push(item)
    })

    return selectedItems
  }

  return [...values]
}

function getValueFromOption(valueProperty, option) {
  if (typeof valueProperty === 'string') {
    return option[valueProperty]
  } else if (typeof valueProperty === 'function') { // eslint-disable-line
    return valueProperty(option)
  }

  return option
}

function getValuesFromOptions(valueProperty, options) {
  const values = []

  options.forEach((option) => {
    values.push(getValueFromOption(valueProperty, option))
  })

  return values
}

function getIndexFromVModelForOption(items, option, reduceValueProperty) {
  return items.findIndex((item) => {
    if (reduceValueProperty) {
      return (
        item &&
        option &&
        item === getValueFromOption(reduceValueProperty, option)
      )
    }

    return item === option
  })
}

export default {
  name: 'MultiSelect',

  components: {
    SearchableList,
    FontAwesomeIcon,
  },

  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      },
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    searchOptionsPlaceholder: {
      type: String,
      default() {
        return 'Search'
      },
    },
    selectedOptionsPlaceholder: {
      type: String,
      default() {
        return 'Search'
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
    selectedNoOptionsText: {
      type: String,
      default: 'Select',
    },
    noOptionsFoundText: {
      type: String,
      default: 'No options found',
    },
    noSelectedOptionsFoundText: {
      type: String,
      default: 'No options found',
    },
    showSelectAllButtons: {
      type: Boolean,
      default: true,
    },
    searchInputClass: {
      type: String,
      default: '',
    },
    highlightDiff: {
      type: Boolean,
      default: false,
    },
    highlightRemovedClass: {
      type: String,
      default: 'msl-searchable-list__item--removed',
    },
    highlightAddedClass: {
      type: String,
      default: 'msl-searchable-list__item--added',
    },
  },

  emits: ['update:modelValue', 'change', 'diff-changed'],

  data() {
    return {
      selectedItems: getSelectedItemsFromValue(
        this.modelValue,
        this.reduceValueProperty,
        this.options
      ),
      originalValueCopy: [],

      // This is for tracking items which have just been removed
      newlyRemovedItems: [],

      // This is for tracking items which have just been added
      newlyAddedItems: [],
    }
  },

  computed: {
    availableOptions() {
      if (!this.modelValue || !this.modelValue.length) {
        return [...this.options]
      }

      return this.options.filter((option) => {
        if (this.reduceValueProperty) {
          return (
            this.modelValue.indexOf(
              getValueFromOption(this.reduceValueProperty, option)
            ) < 0
          )
        }

        return !this.modelValue.find((value) => value === option)
      })
    },
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue?.length && !oldValue && this.highlightDiff) {
          this.originalValueCopy = [...newValue]
        }

        this.selectedItems = getSelectedItemsFromValue(
          newValue,
          this.reduceValueProperty,
          this.options
        )
      },
    },
  },

  methods: {
    onOptionSelect(option) {
      this.selectedItems.push(option)

      const items = [
        ...this.modelValue,
        getValueFromOption(this.reduceValueProperty, option),
      ]

      // Only if this option is enabled
      this.addToNewlyAddedItems([option])
      this.removeFromNewlyRemovedItems([option])

      this.emitChangedItems()

      this.$emit('update:modelValue', items)
      this.$emit('change', items)
    },

    onOptionRemove(option) {
      const items = [...this.modelValue]
      const { selectedItems } = this

      let valueIndex = getIndexFromVModelForOption(
        items,
        option,
        this.reduceValueProperty
      )

      items.splice(valueIndex, 1)

      valueIndex = selectedItems.findIndex((item) => {
        if (this.reduceValueProperty) {
          return (
            item &&
            option &&
            getValueFromOption(this.reduceValueProperty, item) ===
              getValueFromOption(this.reduceValueProperty, option)
          )
        }

        return item === option
      })

      const removedItems = selectedItems.splice(valueIndex, 1)

      this.addToNewlyRemovedItems(removedItems)
      this.removeFromNewlyAddedItems([option])

      // Copy the array because Vue doesn't react on the array modification by lodash
      // https://vuejs.org/v2/guide/list.html#Array-Change-Detection
      this.selectedItems = [...selectedItems]

      this.emitChangedItems()

      this.$emit('update:modelValue', items)
      this.$emit('change', items)
    },

    onSelectAllOptions() {
      this.selectedItems = [...this.options]

      const selectedValues = getValuesFromOptions(
        this.reduceValueProperty,
        this.options
      )
      this.$emit('update:modelValue', selectedValues)
      this.$emit('change', selectedValues)

      this.addToNewlyAddedItems(this.selectedItems)
      this.addToNewlyRemovedItems([], true)

      this.emitChangedItems()
    },

    onUnselectAllOptions() {
      this.addToNewlyRemovedItems(this.selectedItems)
      this.addToNewlyAddedItems([], true)

      this.selectedItems = []
      this.emitChangedItems()
      this.$emit('update:modelValue', [])
      this.$emit('change', [])
    },

    addToNewlyAddedItems(options, reset = false) {
      if (reset) {
        this.newlyAddedItems = []
      }

      options.forEach((option) => {
        const optionIndex = getIndexFromVModelForOption(
          this.originalValueCopy,
          option,
          this.reduceValueProperty
        )

        if (optionIndex === -1) {
          this.newlyAddedItems.push(option)
        }
      })
    },

    addToNewlyRemovedItems(options, reset = false) {
      if (reset) {
        this.newlyRemovedItems = []
      }

      options.forEach((option) => {
        const optionIndex = getIndexFromVModelForOption(
          this.originalValueCopy,
          option,
          this.reduceValueProperty
        )

        if (optionIndex > -1) {
          this.newlyRemovedItems.push(option)
        }
      })
    },

    removeFromNewlyRemovedItems(options = []) {
      options.forEach((option) => {
        const optionIndex = this.newlyRemovedItems.findIndex(
          (o) => o === option
        )

        if (optionIndex > -1) {
          this.newlyRemovedItems.splice(optionIndex, 1)
        }
      })
    },

    removeFromNewlyAddedItems(options = []) {
      options.forEach((option) => {
        const optionIndex = this.newlyAddedItems.findIndex((o) => o === option)

        if (optionIndex > -1) {
          this.newlyAddedItems.splice(optionIndex, 1)
        }
      })
    },

    emitChangedItems() {
      this.$emit('diff-changed', {
        newSelected: this.newlyAddedItems.map((i) =>
          this.reduceValueProperty(i)
        ),
        newUnselected: this.newlyRemovedItems.map((i) =>
          this.reduceValueProperty(i)
        ),
      })
    },

    resetOriginalCopy() {
      setTimeout(() => {
        this.originalValueCopy = [...this.modelValue]
        this.newlyAddedItems = []
        this.newlyRemovedItems = []
        this.emitChangedItems()
      }, 0)
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/vue-multi-select-listbox.scss';
</style>
