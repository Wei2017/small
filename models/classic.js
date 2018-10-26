import {HTTP} from '../utils/http.js';
/*Classic extends (继承) HTTP类
  使用HTTP类时 无需再实例化 直接this.方法名即可
*/
class ClassicModel extends HTTP{
  //加载期刊  
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: res => {
        //返回接口数据
        sCallback(res);
        //设置最新一期期刊号 存入缓存
        this._setLatestIndex(res.index)
      }
    })
  };

  // 获取上一期 期刊信息
  getClassic(index,nextOrPrevious,sCallback){
    this.request({
      url:'classic/'+index+'/'+nextOrPrevious,
      success:res=>{
        sCallback(res)
      }
    })
  };


  isFirst(index){
    return index == 1?true:false
  };

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
  }

}

export {ClassicModel}