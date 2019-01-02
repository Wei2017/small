import {HTTP} from '../utils/http-p.js';

class KeywordModel extends HTTP{
  key = 'q';
  maxLength = 10;
  // 获取历史搜索
  getHistory(){
    const words = wx.getStorageSync(this.key);
    if(!words){ //如果缓存中没有数据则返回个空数组
      return []
    }
    return words
  }

  //获取热门搜索
  getHot(){
    return this.request({
      url:'book/hot_keyword'
    })
  }

  //将用户搜索的内容写入缓存
  addToHistory(keyword){
    //获取缓存中的历史搜索数据 Array
    let words = this.getHistory();
    //如果缓存中不存在当前搜索内容  ES6语法 arr.includes(用户输入内容)
    const has = words.includes(keyword);
    console.log(has)
    if(!has){
      //如果历史搜索超过十条 删除最后一条后
      if(words.length >= this.maxLength){
        words.pop()
      }
      //再向缓存数组中开始位置插入新的搜索内容
      words.unshift(keyword);
      //覆盖新数组
      wx.setStorageSync(this.key, words)
    }
  }
}

export{
  KeywordModel
}