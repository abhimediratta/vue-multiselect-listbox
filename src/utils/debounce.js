export default function debounce(callback, timeout = 250) {
  let timer;

  function debounced(...args) {
    const self = this;
    const lastArgs = args;

    clearTimeout(timer);
    timer = null;

    timer = setTimeout(() => {
      timer = null;
      callback.apply(self, lastArgs);
    }, timeout);
  }

  return debounced;
}
