<script setup lang="ts">
import { ref } from 'vue';
import { ListItem, ItemCallback } from './main';

interface Props {
  listItems: Array<ListItem>;
  selectedListItems: Array<ListItem>;
  highlightItems: Array<ListItem>;
  placeholderText: string;
  displayProperty: ItemCallback;
  valueProperty: ItemCallback;
  noOptionsText: string;
  searchInputClass: string;
  noItemsFoundText: string;
  highlightDiff: boolean;
  highlightClass: string;
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
});

const emit = defineEmits<{(e: 'on-click-option', value: ListItem): void
}>();

const searchText = ref('');
</script>

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
