// components/shopCart/shopCart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    openCart: false,
    cartCount: 0,
    sumNum: 0,
    saleSumNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOpenCart(){
      this.setData({ openCart: true })
    },
    handleCloseCart(e){
      if(e.target.id == "cart-mask")
        this.setData({ openCart: false })
    },
    handleReduceCount(e){
      let el = e.target.dataset.item
      this.triggerEvent("cart", {type: "reduce", data: el})
    },
    handleAddCount(e){
      let el = e.target.dataset.item
      this.triggerEvent("cart", {type: "add", data: el})
    }
  },

  observers: {
    "cartList": function(val){
      let count = val.reduce((prev, item) => prev + item.count, 0)
      let sum = val.reduce((prev, item) => prev + item.sum, 0)
      let oriSum = val.reduce((prev, item) => prev + item.oriSum, 0)
      let saleSum = oriSum - sum
      this.setData({
        cartCount: count,
        sumNum: sum,
        saleSumNum: saleSum
      })
    }
  }
})
