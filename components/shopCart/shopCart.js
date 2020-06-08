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
    openCart: false
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
    }
  }
})
