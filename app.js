//app.js
App({
  initFoodList(){
    var __this__ = this;
    wx.request({
      url: "http://localhost:3000/admin/food/list?storeid=10",
      method: "GET",
      success: function(res){
        console.log(res.data);
        __this__.globalData.foodList = res.data.list;
      }
    })
  },
  getSystemInfo(){
    try {
      const res = wx.getSystemInfoSync();
      const menu = wx.getMenuButtonBoundingClientRect();
      this.globalData.systemInfo = {
        statusBarHeight: res.statusBarHeight,
        menuButtonBounding: menu
      }
      console.log(this.globalData.systemInfo);
    } catch (error) {
      console.log(error);
    }
  },
  computedHeaderStyle(){
    // 获取全局的系统信息
    let s = this.globalData.systemInfo.statusBarHeight;
    let m = this.globalData.systemInfo.menuButtonBounding;
    // 计算导航栏的高度
    let height = (m.top - s) * 2 + m.height;
    this.globalData.headerStyle = {
      totalHeight: s + height,
      headerPaddingTop: s,
      headerWidth: m.left,
      headerHeight: height + 2
    }
  },
  onLaunch: function () {
    this.initFoodList();
    this.getSystemInfo();
    this.computedHeaderStyle();
  },
  globalData: {
    foodList: null,
    systemInfo: null,
    headerStyle: null
  }
})