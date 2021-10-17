import Rating from "../../model/rating"
import Service from "../../model/service"
import User from "../../model/user"
import serviceType from "../../enum/service-type"

const rating = new Rating()

// pages/service-detail/service-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null,
    serviceId: null,
    isPublisher: false,
    ratingList:[],
    serviceType: serviceType,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取点击服务列表，wx.navigateTo跳转路由传入的值service_id
    console.log('options.service_id-----',options.service_id);
    this.data.serviceId = options.service_id
    //调用方法（通过id获取服务的方法）
    await this._getService()
    await this._getServiceRatingList()

    this._checkRole()
  },
  async _getServiceRatingList(){
   const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
   this.setData({
    ratingList
   })
  },

  //通过serviceId获取服务的方法
  async _getService(){
    const service = await Service.getServiceById(this.data.serviceId)
    this.setData({
      service
    })
  },

  _checkRole(){
    let userInfo = User.getUserInfoByLocal()
    console.log('userInfo-===',userInfo)
    // userInfo = {id : 678}
    console.log('userInfo-===',this.data.service,userInfo.id === this.data.service.publisher.id)
    if(userInfo && userInfo.id == this.data.service.publisher.id){
      this.setData({
        isPublisher: true
      })
    }
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