
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
    this.userAuthorized()
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

  }



})









    // wx.navigateTo({
    //   url:`/pages/classic-detail/index?cid=${cid}
    //     &type=${type}`
    // })