// pages/home/home.js
import Service from "../../model/service";
import Category from "../../model/category";
import throttle from "../../utils/utils.js"
const service = new Service()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    categoryList: [],
    serviceList:[],
    tabIndex: 0,
    categoryId: 0,
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {

    await this._getServiceList()
    await this._getCategoryList()
    this.setData({
      loading:false
    })
    //执行函数 1
    //执行函数 2
    //。。。。。
  },

  async _getServiceList() {
    //发起网络请求，获取服务列表的数据 
    const serviceList = await service.reset().getServiceList(this.data.categoryId,this.data.tabIndex)
    this.setData({
      serviceList
    })
  },

  async _getCategoryList() {
    if(!service.hasMoreData){
      return
    }
    //发起网络请求，获取分类列表的数据 
    const categoryList = await Category.getCategoryListWithAll(this.data.categoryId,this.data.tabIndex)
    this.setData({
      categoryList
    })
  },

  //点击tab改变
  handleTabClick(event) {
    this.data.tabIndex = event.detail.index
    this._getServiceList()
  },

  //点击Category改变
  
  handleCategoryChange:function(event) {
    //重复点击
    if (this.data.categoryId === event.currentTarget.dataset.id){
      return
    }
    this.data.categoryId = event.currentTarget.dataset.id
    this._getServiceList()
  },

  handleSelectService(event){
    console.log('event',event)
    const service = event.currentTarget.dataset.service
    wx.navigateTo({
      url: '/pages/service-detail/service-detail?service_id=' + service.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    // const serviceList = await service.reset().getServiceList()
    // this.setData({
    //   serviceList
    // })
    this._getServiceList()
    //wx的API 松开后自动缩回去
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    console.log("上拉触底")
    //判断是否有更多分页数据，如果没有直接返回
    if(!service.hasMoreData){
      return
    }
    const serviceList = await service.getServiceList(this.data.categoryId,this.data.tabIndex)
    this.setData({
      serviceList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})