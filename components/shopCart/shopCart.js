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
    oriSum: 0,
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
    },
    handlePlaceOrder(){
      var cartList = this.properties.cartList
      if(cartList.length == 0){
        wx.showModal({
          showCancel: false,
          title: "未选择菜品",
          content: "请先把菜品加入到购物车，然后才能下单哦~",
        })
      } else {
        let orderInfo = {
          sumNum: this.data.sumNum,
          oriSum: this.data.oriSum
        }
        wx.navigateTo({
          url: '/pages/order/order',
          success: function(res) {
            res.eventChannel.emit("sendData", {
              orderInfo: orderInfo,
              cartList: cartList
            })
          },
          fail: function(err){
            console.log(err)
          }
        })
      }
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
        oriSum: oriSum,
        saleSumNum: saleSum
      })
    }
  }
})
