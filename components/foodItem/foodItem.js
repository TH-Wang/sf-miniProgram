// components/foodItem/foodItem.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      default: {}
    },
    mode: {
      type: String,
      default: "full"
    },
    action: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReduce(){
      if(this.data.count > 0){
        let thisFood = this.properties.list
        if(thisFood.opts == "[]"){
          this.triggerEvent("cart", {
            type: "reduce",
            data: {
              id: thisFood.id,
              name: thisFood.fname
            }
          })
        } else {
          this.triggerEvent("switch", thisFood)
        }
      } else return
    },
    handleAdd(){
      let thisFood = this.properties.list;
      if(thisFood.opts == "[]"){
        let added = {
          id: thisFood.id,
          name: thisFood.fname,
          count: 1,
          isSale: thisFood.isSale,
          salePrice: thisFood.salePrice,
          price: thisFood.price,
          sum: thisFood.salePrice,
          oriSum: thisFood.price
        }
        this.triggerEvent("cart", {type: "add", data: added})
      } else {
        this.triggerEvent("switch", thisFood)
      }
    }
  },

  observers: {
    "action": function(val){
      this.setData({ count: val })
    }
  }
})
