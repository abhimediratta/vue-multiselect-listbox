<script setup lang="ts">
import convertArrayToMap, { getValue } from '../utils/convertArrayToMap'
import { computed, Ref } from 'vue'
import isEmptyObject from 'utils/isEmptyObject'
import useDebouncedRef from '@/composables/useDebouncedRef'
import { ListItem, ItemCallback } from './main'

interface Props {
  listItems: Array<ListItem>
  selectedListItems?: Array<ListItem>
  highlightItems: Array<ListItem>
  placeholderText: string
  displayProperty: ItemCallback
  valueProperty: ItemCallback
  noOptionsText: string
  searchInputClass: string
  noItemsFoundText: string
  highlightDiff: boolean
  highlightClass: string
}

const props = withDefaults(defineProps<Props>(), {
  listItems: () => [],
  selectedListItems: () => [],
  highlightItems: () => [],
  displayProperty: (value) => value,
  valueProperty: (value) => value,
  placeholderText: 'Search',
  noOptionsText: 'No options',
  noItemsFoundText: 'No options found',
  searchInputClass: '',
  highlightClass: '',
  highlightDiff: false,
})

const emit = defineEmits<{ (e: 'on-click-option', value: ListItem): void }>()

const getValueFromOption = getValue

const searchText: Ref<string> = useDebouncedRef('', 500)

function getOptionDisplay(option: ListItem) {
  return props.displayProperty(option)
}

const availableItems = computed<Array<ListItem>>(() => {
  const selectedItemsMap = convertArrayToMap(
    props.selectedListItems,
    props.valueProperty
  )

  let finalItems = [...props.listItems]

  if (!isEmptyObject(selectedItemsMap)) {
    finalItems = props.listItems.filter((item) => {
      const value = getValue(item, props.valueProperty)

      const isNotSelected = !selectedItemsMap[value]

      return isNotSelected
    })
  }

  return finalItems.sort((a, b) => {
    const aDisplayName = getOptionDisplay(a)
    const bDisplayName = getOptionDisplay(b)

    return aDisplayName.localeCompare(bDisplayName)
  })
})

const filteredListItems = computed(() => {
  if (searchText.value != null && searchText.value !== '') {
    return availableItems.value.filter(function filterItem(item) {
      const display = getOptionDisplay(item)

      return (
        display &&
        display.toLowerCase().includes(searchText.value.toLowerCase())
      )
    })
  }

  return availableItems.value
})

const noItems = computed(
  () =>
    (props.selectedListItems.length && availableItems.value.length < 1) ||
    !props.listItems ||
    props.listItems.length < 1
)

const noFilteredItems = computed(
  () =>
    availableItems.value &&
    availableItems.value.length > 0 &&
    (!filteredListItems.value || filteredListItems.value.length < 1)
)

const highlightedItemsMap = computed(() =>
  convertArrayToMap(props.highlightItems, props.valueProperty)
)

const clickOption = (option: ListItem) => {
  emit('on-click-option', option)
}
</script>

<template>
  <div class="msl-searchable-list">
    <input
      v-model="searchText"
      class="msl-search-list-input"
      :class="searchInputClass"
      :placeholder="placeholderText"
    />
    <div class="msl-searchable-list__items">
      <div
        v-for="(option, index) in filteredListItems"
        :key="index"
        class="msl-searchable-list__item"
        :class="{
          'msl-searchable-list__item--disabled':
            typeof option === 'object' && option.disabled,
          [highlightClass]:
            highlightDiff &&
            highlightedItemsMap[getValueFromOption(option, valueProperty)],
        }"
        @click="clickOption(option)"
      >
        {{ getOptionDisplay(option) }}
      </div>

      <div v-if="noItems" class="msl-searchable-list__no-item">
        {{ noOptionsText }}
      </div>

      <div v-if="noFilteredItems" class="msl-searchable-list__no-item">
        {{ noItemsFoundText }}
      </div>
    </div>
  </div>
</template>
