// components/header/header.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "main"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    headerStyle: null,
    slideStatus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOpenSearch(){
      this.triggerEvent("open-search")
    },
    openSlideMenu(){
      this.triggerEvent("change-slide", true);
      this.setData({
        slideStatus: !this.data.slideStatus
      })
    },
    closeSlideMenu(){
      this.triggerEvent("change-slide", false);
      this.setData({
        slideStatus: !this.data.slideStatus
      })
    },
    handleBack(){
      wx.navigateBack({
        delta: -1
      })
    }
  },

  lifetimes: {
    attached: function(){
      const h = app.globalData.headerStyle;
      let style = `
        width:${h.headerWidth}px;
        height:${h.headerHeight}px;
        padding-top:${h.headerPaddingTop}px;`
      this.setData({
        headerStyle: style,
        title: this.properties.title.replace(/\s/g, '')
      })
    }
  }
})
