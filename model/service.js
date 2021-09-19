import Http from "../utils/http"
import Base from "./base"

class Service extends Base{
  
  //分页获取服务列表
  async getServiceList(category_id = null, type = null) {
    if (!this.hasMoreData) {
      return this.data
    }
    /**
     * 分页获取服务列表
     */
    //发起网络请求，获取数据
    const serviceList = await Http.request({
      url: 'v1/service/list',
      data: {
        page: this.page,
        count: this.count,
        category_id: category_id || '',
        type: type || ''
      }
    })

    this.data = this.data.concat(serviceList.data)
    this.hasMoreData = !(this.page === serviceList.last_page)
    this.page++
    return this.data

  }

  //静态方法，根据服务id,获取服务详情信息
  static getServiceById(serviceId){
    return Http.request({
      url: `v1/service/${serviceId}`
    })
  }

}
export default Service