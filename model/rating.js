import Base from "./base"
import Http from "../utils/http"

class Rating extends Base{
  async getServiceRatingList(serviceId){
    if (!this.hasMoreData) {
      return this.data
    }
    /**
     * 分页获取评价列表
     */
    //发起网络请求，获取数据
    const ratingList = await Http.request({
      url: 'v1/rating/service',
      data: {
        page: this.page,
        count: this.count,
        service_id: serviceId,
      }
    })

    this.data = this.data.concat(ratingList.data)
    this.hasMoreData = !(this.page === ratingList.last_page)
    this.page++
    return this.data
  }

}

export default Rating