import {HTTP} from '../utils/http-p.js';

class BookModel extends HTTP {
  getHotList(){
    return this.request({
      url:'book/hot_list'
    })
  }

  getMyBookCount(){
    return this.request({
      url:'book/favor/count'
    })
  }

  //获取图书详情信息
  getDetail(id){
    return this.request({
      url:`book/${id}/detail`
    })
  }

  //获取当前图书点赞状态
  getLikeStatus(id){
    return this.request({
      url:`/book/${id}/favor`
    })
  }

  //获取当前图书的短评内容
  getComments(id){
    return this.request({
      url:`/book/${id}/short_comment`
    })
  }

  //提交短评
  postComment(bid,comment){
    return this.request({
      url:'book/add/short_comment',
      method:'POST',
      data:{
        book_id:bid,
        content:comment
      }
    })
  }
}

export {BookModel}