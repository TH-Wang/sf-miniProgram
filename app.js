//app.js
import { handleList } from './utils/util'

App({
  globalData: {
    requestUrl: "http://localhost:3000",
    originList: null,
    _foodList: [],
    _menuList: [],
    systemInfo: null,
    headerStyle: null
  },
  requestList(callback){
    var __this__ = this;
    wx.request({
      url: `${this.globalData.requestUrl}/admin/food/list?storeid=10`,
      method: "GET",
      success: function(res){
        __this__.globalData.originList = res.data.list;
        let data = __this__.packingData(res.data.list);
        callback(data)
      },
      fail: function(err){
        console.log(err)
        wx.request({
          url: 'http://192.168.43.245:3000/admin/food/list?storeid=10',
          method: 'GET',
          success: function(res){
            __this__.globalData.originList = res.data.list;
            let data = __this__.packingData(res.data.list);
            callback(data)
          }
        })
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
    this.globalData.foodList = foodList
    this.globalData.menuList = menuList
    console.log(this.globalData.foodList)
    console.log(this.globalData.menuList)
    return {foodList, menuList}
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
    this.getSystemInfo();
    this.computedHeaderStyle();
  }
})