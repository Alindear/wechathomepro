import Http from "../utils/http"

class Category {
  static async getCategoryList() {
    /**
     * 获取分类列表
     */
    //发起网络请求，获取数据
    return Http.request({
      url: 'v1/category'
    })
  }
  static async getCategoryListWithAll() {
    const getCategoryList = await Category.getCategoryList()
    console.log(getCategoryList)
    getCategoryList.unshift({ id: '0', name: '全部' })
    return getCategoryList
  }

}
export default Category