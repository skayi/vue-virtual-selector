export function debounce(fn, delay) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
