// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sysHeight:0,
    popup:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    this.setData({
      sysHeight: sysInfo.windowHeight+'px'
    })
  },
  showMask(){
    this.setData({
      popup:true
    })
  },
  close(){
    this.setData({
      popup: false
    })
  },
  //长按识别二维码
  previewImage(e){
    var current = 'http://img1.ph.126.net/m_Lg3gIwWnLWt9oJnnW5hQ==/6632675251700919028.jpg';
    wx.previewImage({
      current: current,
      urls: [current]
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