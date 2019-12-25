export default function debounce(callback, timeout = 250) {
  let timer;

  function debounced(...args) {
    if (!timer) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(args);
      }, timeout);
    }
  }

  return debounced;
}
