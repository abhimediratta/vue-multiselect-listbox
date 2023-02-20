<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faExchangeAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'
import SearchableList from './SearchableList.vue'
import { computed, ref, Ref, watch } from 'vue'
import { ListItem, OptionCallback, Options } from './main'
import { useTrackOptionsChanges } from '@/composables/useTrackOptionsChanges'

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

interface Props {
  modelValue: Array<string>
  options: Array<ListItem>
  reduceDisplayProperty?: OptionCallback
  reduceValueProperty?: OptionCallback
  searchOptionsPlaceholder?: string
  selectedOptionsPlaceholder?: string
  noOptionsText?: string
  selectedNoOptionsText?: string
  noOptionsFoundText?: string
  noSelectedOptionsFoundText?: string
  showSelectAllButtons?: boolean
  highlightDiff?: boolean
  searchInputClass?: string
  highlightRemovedClass?: string
  highlightAddedClass?: string,
  disabled?: boolean,
  readOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  options: () => [],
  reduceDisplayProperty: (value: string) => value,
  reduceValueProperty: (value: string) => value,
  searchOptionsPlaceholder: 'Search',
  selectedOptionsPlaceholder: 'Search',
  noOptionsText: '',
  selectedNoOptionsText: '',
  noOptionsFoundText: 'No options found',
  noSelectedOptionsFoundText: 'No options found',
  showSelectAllButtons: true,
  highlightDiff: false,
  searchInputClass: '',
  highlightRemovedClass: 'msl-searchable-list__item--removed',
  highlightAddedClass: 'msl-searchable-list__item--added',
  disabled: false,
  readOnly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<ListItem>): void
  (e: 'change', value: Array<ListItem>): void
  (
    e: 'diff-changed',
    value: { newSelected: ListItem; newUnselected: ListItem }
  ): void
}>()

/**
 * This is used for highlighting diff from the initial value passed
 */
const originalSelectedOptionsValues: Ref<Array<string>> = ref([])

const originalSelectedOptions = computed<Array<ListItem>>(() => {
  return getSelectedItemsFromValue(
    originalSelectedOptionsValues.value,
    props.reduceValueProperty,
    props.options
  )
})

const selectedOptions = computed<Options>({
  get() {
    return props.modelValue.map((optionValue: string) => {
      return props.options.find(
        (o) => props.reduceValueProperty(o) === optionValue
      )
    })
  },
  set(value) {
    const optionsValues = value.map((o) => props.reduceValueProperty(o))
    emit('update:modelValue', optionsValues)
    emit('change', optionsValues)
  },
})

const { newAddedOptions, newRemovedOptions } = useTrackOptionsChanges(
  originalSelectedOptions,
  selectedOptions,
  props.reduceValueProperty,
  emit
)

const availableOptions = computed<Array<ListItem>>(() => {
  if (!props.modelValue || !props.modelValue.length) {
    return [...props.options]
  }

  return props.options.filter((option) => {
    return props.modelValue.indexOf(props.reduceValueProperty(option)) < 0
  })
})

watch(
  props.modelValue,
  (newValue, oldValue) => {
    if (newValue?.length && !oldValue && props.highlightDiff) {
      originalSelectedOptionsValues.value = [...newValue]
    }

    selectedOptions.value = getSelectedItemsFromValue(
      newValue,
      props.reduceValueProperty,
      props.options
    )
  },
  {
    immediate: true,
  }
)

function onSelectAllOptions(): void {
  if (props.disabled || props.readOnly) {
    return
  }

  selectedOptions.value = props.options.map((option) => option)
}

function onUnselectAllOptions(): void {
  if (this.disabled || this.readOnly) {
    return
  }

  selectedOptions.value = []
}

function onOptionSelect(option: ListItem): void {
  selectedOptions.value = [
    ...selectedOptions.value,
    props.reduceValueProperty(option),
  ]
}

function onOptionRemove(option: ListItem): void {
  const copySelectedOptions = [...selectedOptions.value]
  const optionIdx = copySelectedOptions.findIndex((optionValue: string) => {
    return optionValue === props.reduceValueProperty(option)
  })

  copySelectedOptions.splice(optionIdx, 1)

  selectedOptions.value = copySelectedOptions
}

// eslint-disable-next-line
function resetOriginalCopy(): void {
  setTimeout(() => {
    originalSelectedOptionsValues.value = [...props.modelValue]
    selectedOptions.value = [...originalSelectedOptions.value]
  }, 0)
}

defineExpose({
  resetOriginalCopy,
})
</script>

<template>
  <div class="msl-multi-select">
    <SearchableList 
      v-if="!readOnly" 
      :list-items="availableOptions" 
      :no-options-text="noOptionsText"
      :no-items-found-text="noOptionsFoundText" :selected-list-items="selectedOptions"
      :display-property="reduceDisplayProperty" :value-property="reduceValueProperty"
      :placeholder-text="searchOptionsPlaceholder" :search-input-class="searchInputClass"
      :highlight-class="highlightRemovedClass" :highlight-items="newRemovedOptions" class="msl-multi-select__list"
      :highlight-diff="highlightDiff" @on-click-option="onOptionSelect" />

    <div class="msl-multi-select__actions">
      <a class="msl-multi-select__action msl-multi-select__action-select-all"
        :class="{ invisible: !showSelectAllButtons }" @click="onSelectAllOptions">
        <font-awesome-icon icon="angle-double-right" />
      </a>

      <font-awesome-icon icon="exchange-alt" class="multi-select__action-icon" />

      <a class="msl-multi-select__action msl-multi-select__action-unselect-all"
        :class="{ invisible: !showSelectAllButtons, 'msl-multi-select__action--disabled': disabled }"
        @click="onUnselectAllOptions">
        <font-awesome-icon icon="angle-double-left" />
      </a>
    </div>

    <SearchableList 
      :list-items="selectedOptions" 
      :no-options-text="selectedNoOptionsText"
      :no-items-found-text="noSelectedOptionsFoundText" :display-property="reduceDisplayProperty"
      :value-property="reduceValueProperty" :placeholder-text="selectedOptionsPlaceholder"
      :search-input-class="searchInputClass" :highlight-class="highlightAddedClass" :highlight-items="newAddedOptions"
      :highlight-diff="highlightDiff" :disabled="disabled" :read-only="readOnly"
      class="msl-multi-select__selected msl-multi-select__list" @on-click-option="onOptionRemove" />
  </div>
</template>

<style lang="scss">
@import '../scss/vue-multi-select-listbox.scss';
</style>
