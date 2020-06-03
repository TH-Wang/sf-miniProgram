function throttle(fn, wait=500){
  let timer = null;
  return function(){
    if(timer) return;
    var args = arguments;
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.call(this, ...args);
    }, wait);
  }
}

module.exports = {
  throttle: throttle
}
