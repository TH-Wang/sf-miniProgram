// components/search/search.js
const app = getApp()

Component({  
  /**
   * 组件的属性列表
   */
  properties: {
    action: null,
    show: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    headerStyle: null,
    listHeightStyle: "",
    searchList: [],
    actionSend: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose(){
      this.setData({ show: false })
    },
    handleInput(e){
      let val = e.detail.value
      if(val == 0 || val.length == 0 || val == null) {
        this.setData({ searchList: [] })
        return
      }
      this.filterList(val, ["fname", "descs"])
    },
    filterList(val, props){
      this.data.searchList = app.globalData.originList.filter(item => {
        let result = props
          .map(el => item[el])
          .some(str => str.indexOf(val) != -1)
        return result
      })
      this.setData({
        searchList: this.data.searchList
      })
    },
    agentForwardSwitch(e){
      this.triggerEvent("switch", e.detail)
    },
    agentForwardAddcart(e){
      this.triggerEvent("cart", e.detail)
    }
  },

  lifetimes: {
    attached: function(){
      const h = app.globalData.headerStyle;
      let style = `
        width:${h.headerWidth}px;
        height:${h.headerHeight}px;
        padding-top:${h.headerPaddingTop}px;`
      let heightStyle = `height: calc(100% - ${h.headerHeight*2 + 90}rpx)`
      this.setData({
        headerStyle: style,
        listHeightStyle: heightStyle
      })
    }
  },

  observers: {
    "action": function(val){
      var result
      if(val.length == 0) result = []
      else {
        result = val.filter(item => {
          return this.data.searchList.some(el => el.id == item.id)
        })
      }
      this.setData({ actionSend: result })
    }
  }
})
