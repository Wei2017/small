import {
  BookModel
} from '../../models/book.js';
let bookmodel = new BookModel;
import {KeywordModel } from '../../models/keyword.js';
const keywordModel = new KeywordModel();
import {random} from '../../utils/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false, //控制搜索组件显示隐藏
    hotWords:[],
    more:'' //搜索组件页面触底 组件获取page页面传入的参数
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
    //显示搜索组件
    this.setData({
      searching: true
    })
    //通过接口请求热门搜索内容将热门搜索内容传递给search组件
    keywordModel.getHot().then(res=>{
      this.setData({
        hotWords:res.hot
      })
    })
  },
  onCancel(event){
    this.setData({
      searching: false
    })
  },
  onReachBottom(event){
    this.setData({
      more: random(16)
    })
  }

})