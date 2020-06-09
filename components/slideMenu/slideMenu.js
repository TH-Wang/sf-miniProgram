// components/slideMenu/slideMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeMenu: {
      type: Number,
      default: 0
    },
    menus: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    },
    backMode: {
      type: String,
      default: 'isHot'
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
    handleMenuChange(e){
      let idx = e.target.dataset.index;
      let mode = e.target.dataset.mode;
      this.setData({
        activeMenu: idx,
        backMode: mode
      })
      this.triggerEvent("change", idx)
    }
  }
})
