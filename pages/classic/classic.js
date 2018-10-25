//引入封装的类 {必须是classic.js中定义的类名}   引用路径必须是相对路径
import {ClassicModel} from '../../models/classic.js';
import {LikeModel} from '../../models/like.js';
//HTTP是个类 如果使用HTTP下的实例方法 必须先实例化类
const classicModel = new ClassicModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      console.log(res);
      this.setData({
        classic:res
      })
    })
  },
  // 点赞&取消点赞
  onLike:function(event){
    console.log(event);
    let behavior = event.detail.behavior;
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
  },

  // 切换期刊
  onNext:function(e){
    let index = this.data.classic.index;
    classicModel.getNext(index,res=>{
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  onPrevious:function(e){
    let index = this.data.classic.index;
    classicModel.getPrevious(index,res=>{
      console.log(res);
      this.setData({
        classic:res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
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