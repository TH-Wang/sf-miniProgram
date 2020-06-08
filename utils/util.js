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

function handleList(type, list, el){
  let data = deepCopy(list);
  let has = -1;
  data.forEach((item, index) => {
    if(item.name == el.name) has = index
  })
  if(type == "add"){
    if(has != -1){
      data[has]["count"] += 1
      data[has]["sum"] += data[has]["salePrice"]
      data[has]["oriSum"] += data[has]["price"]
    } else data.push(el)
    return data
  } else if(type == "reduce") {
    if(data[has]["count"] > 1){
      data[has]["count"] -= 1
      data[has]["sum"] -= data[has]["salePrice"]
      data[has]["oriSum"] -= data[has]["price"]
    } else delete data[has]
  }
}

function deepCopy(obj){
  let copyObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const el = obj[key]
      copyObj[key] = typeof el == "object" ? deepCopy(el) : el
    }
  }
  return copyObj
}

module.exports = {
  throttle: throttle,
  handleList: handleList
}
