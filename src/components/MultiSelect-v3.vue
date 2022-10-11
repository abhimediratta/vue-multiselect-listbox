<script setup lang="ts">
import { ListItem, ItemCallback } from './main';

interface Props {
  modelValue: Array<ListItem>;
  options: Array<ListItem>;
  reduceDisplayProperty: ItemCallback;
  reduceValueProperty: ItemCallback;
  searchOptionsPlaceholder: string;
  selectedOptionsPlaceholder: string;
  noOptionsText: string;
  selectedNoOptionsText: string;
  noOptionsFoundText: string;
  noSelectedOptionsFoundText: string;
  showSelectAllButtons: boolean;
  highlightDiff: boolean;
  searchInputClass: string;
  highlightRemovedClass: string;
  highlightAddedClass: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  options: () => [],
  reduceDisplayProperty: (value) => value,
  reduceValueProperty: (value) => value,
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
  highlightAddedClass: 'msl-searchable-list__item--added'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<ListItem>): void
  (e: 'change', value: Array<ListItem>): void
  (e: 'diff-changed', value: { newSelected: ListItem, newUnselected: ListItem }): void
}>();
</script>

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
        :class="{'invisible': !showSelectAllButtons}"
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
        :class="{'invisible': !showSelectAllButtons}"
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