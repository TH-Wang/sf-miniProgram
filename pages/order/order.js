// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList: [],
    payprice: 0,
    total: 0,
    ispack: false,
    notes: ""
  },

  handlePayOrder: async function(){
    await new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.userInfo',
        success () {
          resolve()
        },
        fail: function(err){
          reject(err)
        }
      })
    })
    let username = await new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: function(res){
          resolve(res.userInfo.nickName)
        },
        fail: function(err){
          reject(err)
        }
      })
    })
    let data = Object.assign(this.data, {storeid: 10, username})
    console.log(data)
    wx.request({
      url: `${app.globalData.requestUrl}/client/order`,
      method: 'POST',
      data: data,
      success: function(res){
        console.log(res)
      },
      fail: function(err){
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const __this__ = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on("sendData", function(data){
      __this__.setData({
        payprice: data.orderInfo.sumNum,
        total: data.orderInfo.oriSum,
        foodList: data.cartList,
        headerHeight: app.globalData.headerStyle.totalHeight
      })
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