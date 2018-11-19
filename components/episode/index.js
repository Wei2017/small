// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      // 不要在observer中修改自身的属性值，否则会出现无线递归的情况
      observer:function(newVal,oldVal,changedPath){
        let val = newVal <10?"0"+newVal:newVal;
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year:0,
    month:'',
    _index:''//改变后的值
  },

  // 组件生命周期函数 在组件实例进入页面节点树时还行
  attached:function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    this.setData({
      year:year,
      month:this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
