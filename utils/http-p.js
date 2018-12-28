import {config} from '../config.js' 

//记录错误码对应的错误提示
const tips = {
  1:'网络链接失败，请稍后重试',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'期刊不存在'
}

//解构  对象解构 数组解构
// es6 封装类
class HTTP{
  request({url,data={},method='GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url, resolve,reject,data,method)
    })
  }
  /*data默认为空对象
  * method 默认GET请求
  */
  _request(url, resolve, reject, data={}, method='GET'){
    wx.request({
      url: config.api_base_url + url,
      method:method,
      data:data,
      header:{
        'Content-type':'application/json',
        appkey:config.appkey
      },
      success:res=>{

        //获取请求接口成功返回状态码
        const code = res.statusCode.toString();
        //如果状态码为 2 开头的则请求成功
        if(code.startsWith('2')){
          //先判断params.success是否为空 如果为空则不走后面代码 不返回res.data
          // params.success && params.success(res.data);
          resolve(res.data)
          //请求成功处理代码
        }else{
          /*请求失败处理代码
            获取错误码
          */
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:err=>{
        reject()
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
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon:'none',
      duration:2000
    })
  }
}


export {
  HTTP
}