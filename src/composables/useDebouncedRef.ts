import debounce from '../utils/debounce';
import { customRef, ref } from 'vue';

const useDebouncedRef = (initialValue: string, delay: number) => {
  const state = ref(initialValue);

  return customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },

    set: debounce((value) => {
      state.value = value;
      trigger();
    }, delay),
  }));
};

export default useDebouncedRef;
