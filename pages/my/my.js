import {BookModel} from '../../models/book.js';
const bookModel = new BookModel();
import {ClassicModel} from '../../models/classic.js';
const classicModel = new ClassicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },
  onLoad(options){
    
  },
  //我喜欢的书的数量
  getMyBookCount(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  //我喜欢的期刊数据
  getMyFavor(){
    classicModel.getMyFavor(res=>{
      this.setData({
        classics: res
      })
    })
  },
  userAuthorized(){
    wx.getSetting({
      success:res=>{
        console.log(res);
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
              this.setData({
                authorized:true,
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo;
    if(userInfo){
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  //跳转关于我们
  onJumpToAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onShow(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  }
})









    // wx.navigateTo({
    //   url:`/pages/classic-detail/index?cid=${cid}
    //     &type=${type}`
    // })