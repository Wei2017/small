import {config} from '../config.js'

// es6 封装类
class HTTP{
  /*为类添加方法 
  * 方法名(参数){代码}
  * 可以是作为一个函数 在类下面作为一个方法
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
          console.log(res);          
          //请求成功处理代码
        }else{
          //请求失败处理代码
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
}


export {
  HTTP
}