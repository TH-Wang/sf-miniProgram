// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideShow: false,
    menuList: [
      {id: 1, text: "热销"},
      {id: 2, text: "新品"},
      {id: 3, text: "面类"},
      {id: 4, text: "套饭"},
      {id: 5, text: "干锅"},
      {id: 6, text: "热销"},
      {id: 7, text: "热销"}
    ],
    foodList: [],
    header: null,
    mainTitle: `新品推荐😍`,
    mainMode: "full"
  },

  handleSlideStatus(){
    let nowSlide = !this.data.slideShow;
    this.setData({
      slideShow: nowSlide,
      mainMode: nowSlide ? "side" : "full"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      header: app.globalData.headerStyle,
      foodList: app.globalData.foodList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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