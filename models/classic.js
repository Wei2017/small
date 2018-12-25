import {HTTP} from '../utils/http.js';
/*Classic extends (继承) HTTP类
  使用HTTP类时 无需再实例化 直接this.方法名即可
*/
class ClassicModel extends HTTP{
  //加载最新一期的期刊  
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: res => {
        //返回接口数据
        sCallback(res);
        //设置最新一期期刊号 存入缓存
        this._setLatestIndex(res.index);
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  };

  // 获取上一期 期刊信息
  getClassic(index,nextOrPrevious,sCallback){
    // 获取缓存中数据 如果没有则存否则读取缓存中数据
    // strong的key
    let key = nextOrPrevious =='next'?this._getKey(index+1):this._getKey(index-1);
    
    // 获取存储key的value内容
    let classic = wx.getStorageSync(key);
    // 如果在缓存中没有找到则通过接口加载期刊
    if(!classic){
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: res => {
          sCallback(res);
          wx.setStorageSync(this._getKey(res.index), res)
        }
      })
    }else{
      sCallback(classic);
    }
    
  };

  //是否为第一期的期刊
  isFirst(index){
    return index == 1?true:false
  };

  //是否为最新一期的期刊
  isLatest(index){
    let latestIndex = this._getLatestIndex();
    return latestIndex == index?true:false
  };

  //存储最新一期的期刊 期号
  _setLatestIndex(index){
    //同步存储缓存
    wx.setStorageSync('latest', index)
  };
  //读取缓存
  _getLatestIndex(){
    let index = wx.getStorageSync('latest');
    return index;
  };

  //设置缓存的key 读取使用
  _getKey(index){
    let key = 'classic-'+index;
    return key;
  }

}

export {ClassicModel}