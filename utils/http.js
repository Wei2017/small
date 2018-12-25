import {config} from '../config.js'

//记录错误码对应的错误提示
const tips = {
  1:'网络链接失败，请稍后重试',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'期刊不存在'
}

// es6 封装类
class HTTP{
  /*为类添加方法 
  * 方法名(参数){代码块}
  * 可以试作为一个函数 在类下面作为一个方法
  */
  request(params){
    //如果没有传请求的方法 则默认为GET
    if(!params.method){
      params.method = "GET"
    };
    wx.request({
      url: config.api_base_url + params.url,
      method:params.method,
      data:params.data,
      header:{
        'Content-type':'application/json',
        appkey:config.appkey
      },
      success:res=>{
        /*
          es6方法
          startsWith():
            方法确定字符串是否以指定字符串的字符开头，返回true或false视情况而定。
          endsWith()
            endsWith()方法和startsWith()方法的语法都是一样的，不过endsWith()方法是从字符串的末尾开始查找
        */
        //获取请求接口成功返回状态码
        let code = res.statusCode.toString();
        //如果状态码为 2 开头的则请求成功
        if(code.startsWith('2')){
          //先判断params.success是否为空 如果为空则不走后面代码 不返回res.data
          params.success && params.success(res.data);
          //请求成功处理代码
        }else{
          /*请求失败处理代码
            获取错误码
          */
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:err=>{
        this._show_error(1);
      }
    })
  }

  _show_error(error_code){
    console.log(error_code,tips);
    //
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}


export {
  HTTP
}