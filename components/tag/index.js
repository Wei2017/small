// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  //开启插槽功能 外部传入wxml
  options:{
    multipleSlots:true
  },
  //定义外部样式类Array  外部传入wxss
  externalClasses:['tag-class'],
  //外部传入属性
  properties: {
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
