export default function debounce(callback, timeout = 250) {
  let timer;

  function debounced(...args) {
    const lastArgs = args;

    clearTimeout(timer);
    timer = null;

    timer = setTimeout(() => {
      timer = null;
      callback.apply(this, lastArgs);
    }, timeout);
  }

  return debounced;
}
