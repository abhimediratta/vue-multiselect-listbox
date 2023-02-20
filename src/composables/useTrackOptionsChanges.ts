import { ListItem, Options, OptionCallback } from '@/components/main'
import { ref, watchEffect, unref, Ref, WritableComputedRef } from 'vue'

function findIndexInOptions(
  options: Options,
  newOption: ListItem,
  reduceValueProperty: OptionCallback
): number {
  return options.findIndex((option) => {
    return reduceValueProperty(option) === reduceValueProperty(newOption)
  })
}

export function useTrackOptionsChanges(
  originalSelectedOptions: Ref<Options>,
  selectedOptions: WritableComputedRef<Options>,
  reduceValueProperty: OptionCallback,
  emit
): {
  newAddedOptions: Ref<Options>
  newRemovedOptions: Ref<Options>
} {
  const newAddedOptions: Ref<Options> = ref([])
  const newRemovedOptions: Ref<Options> = ref([])

  /**
   * Watch over selected options to update new up
   */
  watchEffect(() => {
    newAddedOptions.value = []
    newRemovedOptions.value = []

    const selectedOptionsValue = selectedOptions.value || []

    originalSelectedOptions.value.forEach((option: ListItem) => {
      const optionIdxInSelectedOptions = findIndexInOptions(
        selectedOptionsValue,
        option,
        reduceValueProperty
      )

      if (optionIdxInSelectedOptions === -1) {
        newRemovedOptions.value.push(option)
      }
    })

    if (selectedOptionsValue.length) {
      selectedOptionsValue.forEach((option: ListItem) => {
        const optionIdx: number = findIndexInOptions(
          unref(originalSelectedOptions),
          option,
          reduceValueProperty
        )

        if (optionIdx === -1) {
          newAddedOptions.value.push(option)
        }
      })
    }

    emit('diff-changed', {
      newSelected: newAddedOptions.value,
      newUnselected: newRemovedOptions.value,
    })
  })

  return {
    newAddedOptions,
    newRemovedOptions,
  }
}
