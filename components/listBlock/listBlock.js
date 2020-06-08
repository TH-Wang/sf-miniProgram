// components/listBlock/listBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    block: {
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    agentForwardSwitch(e){
      this.triggerEvent("switch", e.detail)
    },
    agentForwardAddcart(e){
      this.triggerEvent("cart", e.detail)
    }
  }
})
