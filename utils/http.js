import APIConfig from "../config/api";
import excptionMessage from "../config/excption-message";
import wxToPromise from './wx'

class Http {
  static async request({ url, data, method = 'GET' }) {
    const res = await wxToPromise('request', {
      url: APIConfig.baseUrl + url,
      data,
      method,
    })
    //请求成功
    if (res.statusCode < 400) {
      return res.data.data
    }
    //请求失败
    if (res.statusCode === 401) {
      return
    }
    Http._showError(res.data.error_code, res.data.message)
  }

  static _showError(errorCode, message) {
    console.log(errorCode)
    let title = ''
    const errorMessage = excptionMessage[errorCode];
    console.log(errorMessage)
    title = errorMessage || message || '未知异常'
    title = typeof title === 'object' ?
      Object.values(title).join(';') :
      title
    wx.showToast({
      title,
      icon: 'none',
      duration: 3000,
    })
  }
}
export default Http