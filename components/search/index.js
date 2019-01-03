import {
  KeywordModel
} from '../../models/keyword.js';
import {
  BookModel
} from '../../models/book.js';
import {paginationBev} from '../behaviors/pagination.js';
const keywordModel = new KeywordModel();
const bookmodel = new BookModel;
Component({
  //使用behaviors行为
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    hotWords: Array,
    more: {
      type: 'String',
      observer: 'loadMore' //监听参数改变后触发的方法  滑动底部加载更多 随机数
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter:false
  },
  attached() {
    //从缓存中获取历史搜索
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords //可以简写成 historyWords:keywordModel.getHistory()
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      //如果搜索内容为空 或 正在搜索中
      if (!this.data.q || this.isLocked()) {
        return
      }

      //是否还有更多数据
      if(this.hasMore()){
        //请求中 完成一起请求后方可再次调用  上锁
        this.locked()
        bookmodel.search(this.getCurrentStart(), this.data.q).then(res => {
          //使用behaviors中定义的方法 
          this.setMoreData(res.books);
          //请求成功 解锁
          this.unLocked()
        },()=>{
          //请求失败 解锁 避免死锁
          this.unLocked()
        })
      }
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
      //清空之前搜索显示的内容
      this.initialize()
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.text;
      //显示book组件 和 loading层
      this.setData({
        searching: true,
        loadingCenter:true
      })
      
      //渲染搜索结果
      bookmodel.search(0, q).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total)
        this.setData({
          q: q,
          loadingCenter:false //请求成功隐藏loading层
        })
        keywordModel.addToHistory(q);
      })
    },
    //清空搜索内容显示搜索记录
    onDelete(event) {
      //清空之前搜索显示的内容
      this.initialize()
      //隐藏book组件 显示搜索记录
      this.setData({
        searching: false,
        q: '',
        noneResult:false
      })
    }
  }
})