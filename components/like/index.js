// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * 方便在使用组件的wxml使用prooerties设置的属性
   */
  properties: {
    like:{
      type:Boolean  //布尔类型的默认值是false 如果为true设置value否则无需设置
    },
    count:{
      type:Number  //Number类型默认值是0 如果为0则无需设置value值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 开放出来的数据 定义为属性 无需在data中设置
    // like:false,
    // count:0,

    // 封装太内部的数据  私有的不能被外部访问到
    checkSrc:'images/xin.png',
    noCheckSrc:'images/like.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(e){
      //获取调用组件的wxml中 传过来的值
      let like = this.properties.like;
      let count = this.properties.count;

      //默认值like为false 则count+1 否则count-1
      count = like?count-1:count+1;
      this.setData({
        count:count,
        like:!like
      })

      //自定义事件
      let behavior = this.properties.like?'like':'cancel';
      // 激活组件  like 自定义事件名称  bindlike="方法名"
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
