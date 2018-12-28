import { BookModel} from '../../models/book.js';
let bookmodel = new BookModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotList = bookmodel.getHotList();
    hotList.then(res=>{
      console.log(res);
    })
    //第一步 创建Promise
    //第二步 异步代码 写在Promise的函数中
    // const promise = new Promise((resolve,reject)=>{
    //   //promise一共有三种状态
    //   //pending fulfilled rejected
    //   //进行中    已成功    已失败
    //   wx.getSystemInfo({
    //     success: res =>{
    //       resolve(res)
    //     },
    //     fail: err =>{
    //       reject(err)
    //     }
    //   })
    // })
    // //第三部 通过then方法获取结果
    // promise.then(res=>{
    //   console.log(res)
    // })
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