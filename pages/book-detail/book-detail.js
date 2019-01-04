import {BookModel} from '../../models/book.js';
const bookModel = new BookModel();
import {LikeModel } from '../../models/like.js';
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    let that = this;
    const id = options.id;
    const detail = bookModel.getDetail(id);
    const comments = bookModel.getComments(id);
    const likeStatus = bookModel.getLikeStatus(id);

    //多个promise返回为一个新的promise
    Promise.all([detail,comments,likeStatus]).then(res=>{
      console.log(res);
      that.setData({
        book:res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount:res[2].fav_nums
      })
      wx.hideLoading()
    })

    // detail.then(res=>{
    //   that.setData({
    //     book:res
    //   })
    // })

    // comments.then(res=>{
    //   that.setData({
    //     comments:res.comments
    //   })
    // })

    // likeStatus.then(res=>{
    //   console.log(res);
    //   that.setData({
    //     likeStatus:res.like_status == 1?true:false,
    //     likeCount:res.fav_nums
    //   })
    // })
  },
  //点赞  type 400 为图书
  onLike(event){
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel,this.data.book.id,400)
  },
  //显示短评弹出层
  onFakePost(event){
    this.setData({
      posting:true
    })
  },
  // 取消 隐藏短评弹出层
  onCancel(event){
    this.setData({
      posting: false
    })
  },
  onPost(event){
    //用户点击的text || 用户输入的value
    const comment = event.detail.text || event.detail.value

    //如果用户没有输入内容则直接return
    if(!comment){
      return
    }

    if(comment.length > 12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return;
    }

    bookModel.postComment(this.data.book.id,comment).then(res=>{
      wx.showToast({
        title: '评论成功',
        icon:'none'
      })
      //评论成功后在短评展示区首位展示用户新增加的评论
      this.data.comments.unshift({
        content:comment,
        nums:1
      })

      //更新数据
      this.setData({
        comments:this.data.comments,
        posting:false
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: `${that.data.book.author}:《${that.data.book.title}》`,
      imageUrl: that.data.book.image
    }
  }
})