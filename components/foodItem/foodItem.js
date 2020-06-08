// components/foodItem/foodItem.js
const page = getCurrentPages()

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
    }
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
      if(this.data.count > 0)
        this.setData({ count: --this.data.count })
        this.triggerEvent(
          "cart", 
          {type: "reduce", data: {name: this.properties.list.fname}}
        )
    },
    handleAdd(){
      let thisFood = this.properties.list;
      if(thisFood.opts == "[]"){
        this.setData({ count: ++this.data.count })
        let added = {
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
  }
})
