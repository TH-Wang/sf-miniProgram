// components/foodItem/foodItem.js
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
    },
    handleAdd(){
      this.setData({
        count: ++this.data.count
      })
    }
  }
})
