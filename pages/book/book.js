import {
  BookModel
} from '../../models/book.js';
let bookmodel = new BookModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false //控制搜索组件显示隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    /*Promise正确用法*/
    bookmodel.getHotList().then(res => {
      console.log(res);
      that.setData({
        books:res
      })
    })


    /*Promise的错误用法*/
    // const hotList = bookmodel.getHotList();
    // hotList.then(res=>{
    //   console.log(res);
    //   bookmodel.getMyBookCount().then(res=>{
    //     console.log(res);
    //   })
    // })



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
  onSearching(event){
    this.setData({
      searching:true
    })
  },
  onCancel(event){
    this.setData({
      searching: false
    })
  }

})