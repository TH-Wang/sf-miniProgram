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
    },
    action: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    actionSend: []
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
  },

  observers: {
    "action": function(val){
      var result
      if(val.length == 0) result = []
      else {
        let thisFoodList = this.properties.block.list
        result = val.filter(item => {
          return thisFoodList.some(el => el.id == item.id)
        })
      }
      this.setData({ actionSend: result })
    }
  }
})
