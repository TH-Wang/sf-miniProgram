// pages/index/index.js
import { throttle, handleList } from '../../utils/util'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSearch: false,
    slideShow: false,
    slideIntoIndex: 0,
    menuList: [],
    foodList: [],
    header: null,
    menuIndex: 0,
    menuMode: "isHot",
    mainTitle: null,
    mainMode: "full",
    showOptionPanel: false,
    optionPanelData: {},
    carts: [],
    action: []
  },

  /**
   * 页面的方法
   */
  handleOpenSearchPage(){
    this.setData({ showSearch: true })
  },
  handleSlideStatus(){
    let nowSlide = !this.data.slideShow;
    this.setData({
      slideShow: nowSlide,
      mainMode: nowSlide ? "side" : "full"
    })
  },
  handleSlideChange(e){
    this.setData({ slideIntoIndex: e.detail })
  },
  handleScroll: throttle(async function(e){
    let rectsArr = await this.getBoundingRects();
    // 如果滑到了第一个板块
    if(rectsArr[0].top >= 0){
      this.setData({
        mainTitle: rectsArr[0].typename,
        menuIndex: 0,
        menuMode: "isHot"})
      return
    }
    // 滑到中间板块
    for(var i = 0; i < rectsArr.length-1; i++){
      if(rectsArr[i].top < 0 && rectsArr[i+1].top > 0){
        this.setData({
          mainTitle: rectsArr[i].typename,
          menuIndex: i,
          menuMode: rectsArr[i].mode
        })
        break;
      }
    }
    // 滑动最后一个板块
    if(rectsArr[rectsArr.length-1].top < 0)
      this.setData({
        mainTitle: rectsArr[rectsArr.length-1].typename,
        menuIndex: rectsArr.length-1,
        menuMode: "normal"
      })
  }, 300),
  getBoundingRects(){
    return new Promise((resolve, reject) => {
      let headerHeight = app.globalData.headerStyle.totalHeight;
      this.createSelectorQuery().selectAll('.list-block').boundingClientRect(rects => {
        rects.forEach(item => {
          item.top
        })
      }).exec(res => {
        resolve(res[0].map(item => ({
          typename: item.dataset.typename,
          mode: item.dataset.mode,
          top: item.top - headerHeight
        })))
      })
    })
  },
  handleSwitchOptions(e){
    this.setData({
      showOptionPanel: true,
      optionPanelData: e.detail
    })
  },
  reactiveCart(e){
    let result = handleList(
        e.detail.type,
        this.data.carts,
        e.detail.data
    )
    this.setData({
      carts: result,
      action: result
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var __this__ = this
    app.requestList(function(res){
      __this__.setData({
        foodList: res.foodList,
        menuList: res.menuList,
        mainTitle: res.menuList[0].typename,
        header: app.globalData.headerStyle
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("foodList----------")
    // console.log(app.globalData.foodList)
    // console.log("menuList----------")
    // console.log(app.globalData.menuList)
    // this.setData({
    //   menuList: app.globalData.menuList,
    //   foodList: app.globalData.foodList,
    //   header: app.globalData.headerStyle,
    //   // mainTitle: app.globalData.menuList[0].typename
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})