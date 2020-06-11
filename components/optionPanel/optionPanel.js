// components/optionPanel/optionPanel.js
import { handleList } from '../../utils/util'
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
    },
    cartList: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    addedList: [],
    checkedList: [],
    mainClass: 'out'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose(e){
      if(e.target.id == "mask"){
        this.setData({ mainClass: 'out', show: false })
        // setTimeout(() => {
        //   this.setData({show: false})
        // }, 300)
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
      let thisFood = this.properties.foodData
      let added = {
        id: thisFood.id,
        imgurl: thisFood.cover,
        name: `${thisFood.fname} (${str})`,
        count: 1,
        isSale: thisFood.isSale,
        salePrice: thisFood.salePrice,
        price: thisFood.price,
        sum: thisFood.salePrice,
        oriSum: thisFood.price
      }
      this.triggerEvent("cart", {type: "add", data: added})
    },
    handleAddCount(e){
      let el = e.target.dataset.item
      this.triggerEvent("cart", {type: "add", data: el})
    },
    handleReduceCount(e){
      let el = e.target.dataset.item
      this.triggerEvent("cart", {type: "reduce", data: el})
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
      let options = JSON.parse(val.opts);
      options.forEach((item, index) => {
        this.data.checkedList.push(`${index}-0`)
      })
      this.data.addedList = this.properties.cartList.filter(item => {
        return item.id == this.properties.foodData.id
      })
      this.setData({
        checkedList: this.data.checkedList,
        addedList: this.data.addedList
      })
    },
    "cartList": function(val){
      this.data.addedList = this.properties.cartList.filter(item => {
        return item.id == this.properties.foodData.id
      })
      this.setData({
        addedList: this.data.addedList
      })
    }
  }
})
