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
      }
    })
  }
}

export {ClassicModel}