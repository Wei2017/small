import {HTTP} from '../utils/http.js';
// 类名 首字母必须大写
class LikeModel extends HTTP{
    like(behavior,artId,category){
        let url = behavior == 'like'?'like':'like/cancel';
        this.request({
            url:url,
            method:'POST',
            data:{
                art_id:artId,
                type:category
            }
        })
    };

    getClassicLikeState(artId,category,sCallback){
      this.request({
        url:'classic/'+category+'/'+artId+'/favor',
        success:sCallback
      })
    }
}

export {
    LikeModel
}