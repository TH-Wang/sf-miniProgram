//app.js
App({
  globalData: {
    foodList: null,
    menuList: null,
    systemInfo: null,
    headerStyle: null,
    cartList: [],
    proxyCartList: null
  },
  requestList(){
    var __this__ = this;
    wx.request({
      url: "http://localhost:3000/admin/food/list?storeid=10",
      method: "GET",
      success: function(res){
        let packData = __this__.packingData(res.data.list)
        __this__.globalData.foodList = packData.foodList;
        __this__.globalData.menuList = packData.menuList;
        console.log(res.data);
        console.log(packData.foodList);
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  packingData(data){
    var foodList = [];
    var menuList = [];
    // 初始化置顶列表
    var topping = [
      {typename: "热销", mode: "isHot"},
      {typename: "新品", mode: "isNew"},
      {typename: "优惠", mode: "isSale"}
    ]
    // 过滤出置顶的菜品列表
    for (const item of topping) {
      foodList.push({
        typename: item.typename,
        mode: item.mode,
        list: data.filter(el => el[item.mode])
      })
    }
    // 数组去重，获取所有类别
    for (const item of data) {
      if(!menuList.some(el => el.typename == item.typename))
        menuList.push({
          typename: item.typename,
          mode: "normal"
        });
    }
    // 过滤各类别的列表
    for (const item of menuList) {
      foodList.push({
        typename: item.typename,
        mode: "normal",
        list: data.filter(el => el.typename == item.typename)
      })
    }
    // 合并类别数组
    menuList = [...topping, ...menuList]
    return { foodList, menuList }
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
    let height = (m.top - s) * 2 + m.height + 2;
    this.globalData.headerStyle = {
      totalHeight: s + height,
      headerPaddingTop: s,
      headerWidth: m.left,
      headerHeight: height
    }
  },
  onLaunch: function () {
    this.requestList();
    this.getSystemInfo();
    this.computedHeaderStyle();
  }
})