// components/tabs/tabs.js
import throttle from "../../utils/utils.js"
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTabIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击tabs切换
    tabClick: throttle(function (event) {
      const index = event.currentTarget.dataset.index
      if (index === this.data.currentTabIndex) {
        return
      }
      this.setData({
        currentTabIndex: index
      })
      this.triggerEvent('change', { index })
      // this.triggerEvent(name:'change',detail:{index})
    }),
    
    handleTouchMove(event){
      console.log(event)
      const direction = event.direction
      console.log('1111123', direction)
      const currentTabIndex = this.data.currentTabIndex

      const targetTabIndex = currentTabIndex + direction
      const tabs = this.data.tabs
      if (targetTabIndex < 0 || targetTabIndex > tabs.length -1){
        return
      }

      const customEvent = {
        currentTarget:{
          dataset:{
            index: targetTabIndex
          }
        }
      }
      this.tabClick(customEvent)

    }
   
  }
})