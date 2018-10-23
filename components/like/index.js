// components/like/index.js
Component({
  /**
   * 组件的属性列表
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

    // 封装太内部的数据
    checkSrc:'images/xin.png',
    noCheckSrc:'images/like.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e){
      // 自己实现
      // var that = this;
      // console.log(that.data);
      // if (that.data.like && that.data.count>=0){
      //     that.setData({
      //       count: that.data.count -= 1,
      //       like:false
      //     })
      // }else{
      //   that.setData({
      //     count:that.data.count += 1,
      //     like:true
      //   })
      // }
      // 根据课程思路实现
      let like = this.properties.like;
      let count = this.properties.count;

      //默认值like为false 则count+1 否则count-1
      count = like?count-1:count+1;
      this.setData({
        count:count,
        like:!like
      })
    }
  }
})
