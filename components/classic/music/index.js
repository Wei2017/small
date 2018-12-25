import {classicBeh} from '../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png'
  },
  //在组件实例进入页面节点树时执行 生命周期函数
  attached:function(e){
    this._recoverStatus();
    this._monitorSwitch();
  },
  //组件实例被从页面节点树移除时执行  生命周期函数
  detached:function(e){
    // wx:if执行完整的生命周期  hidden不会，只是单纯的显示隐藏
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(e){
      //如果未播放音乐则 播放
      if(!this.data.playing){
        //播放按钮图片切换
        this.setData({
          playing: true
        })
        mMgr.title = this.data.title;
        mMgr.src = this.data.src;
      }else{ 
        //暂停播放
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    },
    //恢复状态 私有方法
    _recoverStatus:function(){
      //当前背景音乐未暂停状态 显示播放按钮
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      //如果当前正在播放的音乐地址 等于 组件中的src地址 显示暂停按钮 
      if(mMgr.src == this.data.src){
        this.setData({
          playing:true
        })
      }
    },

    //监听微信背景音乐总控开关
    _monitorSwitch:function(){
      mMgr.onPlay(()=>{   //接收一个callback
        this._recoverStatus()
      });
      mMgr.onPause(()=>{
        this._recoverStatus()
      });
      mMgr.onStop(()=>{
        this._recoverStatus()
      });
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
