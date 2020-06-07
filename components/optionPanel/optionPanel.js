// components/optionPanel/optionPanel.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      defautl: false
    },
    foodData: {
      type: Object,
      defautl: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    addedList: {},
    checkedList: [],
    mainClass: 'out'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose(e){
      if(e.target.id == "mask"){
        this.setData({ mainClass: 'out' })
        setTimeout(() => {
          this.setData({show: false})
        }, 300)
      } else {
        return;
      }
    },
    handleCheck(e){
      let checkedIndex = e.target.dataset.index;
      let has = this.data.checkedList.findIndex(item => {
        return item.split("-")[0] == checkedIndex.split("-")[0]
      });
      if(has != -1){
        this.data.checkedList = this.data.checkedList.map((item, index) => {
          if(index == has) item = checkedIndex
          return item
        })
      } else {
        this.data.checkedList.push(checkedIndex)
      }
      this.setData({
        checkedList: this.data.checkedList
      })
    },
    handleAddFood(str){
      let added = {
        name: `${this.properties.foodData.fname} (${str})`,
        count: 1,
        price: this.properties.foodData.price
      }
      let has = this.data.addedList.findIndex(item => item.name == added.name)
      if(has != -1){
        this.data.addedList[has].count += 1
      } else {
        this.data.addedList.push(added)
      }
      this.setData({
        addedList: this.data.addedList
      })
      this.triggerEvent("addcart", {val: added})
    }
  },

  observers: {
    "show": function(val){
      if(val) this.setData({ mainClass: 'in' })
      else return
    },
    "foodData": function(val){
      if(Object.keys(val).length == 0) return
      this.data.checkedList = []
      this.data.addedList = []
      let options = JSON.parse(val.opts);
      options.forEach((item, index) => {
        this.data.checkedList.push(`${index}-0`)
      })
      this.setData({
        checkedList: this.data.checkedList,
        addedList: this.data.addedList
      })
    }
  }
})
