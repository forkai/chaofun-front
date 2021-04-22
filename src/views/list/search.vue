<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="container infinite-list" ref="container" :style="{height: scrollHeight+'px'}">

      <el-row :gutter="20">
        <el-col :span="isPhone?24:doWidth()" :offset="doOffSet()" >
          <div v-if="ISPHONE" class="search_icon">
              <el-input
                class="search_input"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                @change="toSearch(keyword)"
                v-model="keyword">
              </el-input>
            </div>
          <div class="grid-content"  style="overflow:auto; width: 640px; max-width: 100%">
            <ListItem :pagenum="params.pageNum" :isindex="true" :lists="lists"></ListItem>
            <load-text :ifcanget="ifcanget" :loadAll="loadAll"></load-text>
          </div>
        </el-col>
      </el-row>
    </div>
    
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '../../api/api'

import ListItem from '../../components/chaofan/ListItem.vue'
import RightCom from '@/components/chaofan/RightCom'
import loadText from '@/components/chaofan/loadText'


export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      count: 5,
      lists: [],
      forumId: '',
      params:{
        pageNum: 0
      },
      options: [
        {
          label: '最热',
          value: 'hot'
        },
        {
          label: '最新',
          value: 'new'
        },
        {
          label: '热评',
          value: 'comment'
        },
      ],
      isPhone: false,
      forumInfo: null,
      ifcanget: true,
      loadText: false,
      loadAll: false,
      keyword: ''
    }
  },
  components: {
    ListItem,loadText
  },
  watch: {
    '$route.query.q'(v){
        this.lists = [];
        this.keyword = v;
        this.params.keyword = v;
        this.params.pageNum = 1;
        this.getLists()
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'islogin'
    ])
  },
  mounted(){
    if(document.body.clientWidth<700){
      this.isPhone = true
    }
    this.toPosition()
    // api.getMenu({pageNum:1,order:'new'}).then(res=>{
    //   console.log(res)
    // })
    let self = this;
    this.$refs.container.addEventListener("scroll", function() {
        let scrollTop = self.$refs.container.scrollTop;
      let conTop = self.$refs.container.scrollTop
      // 变量windowHeight是可视区的高度
      let conHeight = self.$refs.container.clientHeight;
      // 变量scrollHeight是滚动条的总高度
      let scrollHeight = self.$refs.container.scrollHeight - 4;
      //  console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
      // console.log(conTop,conHeight,scrollHeight)
      if (conTop + conHeight > scrollHeight || conTop + conHeight == scrollHeight) {
        console.log('到底了')
        if(self.ifcanget){
          // self.load()
          self.getLists()
        }
      }
    });
  },
  created() {
    let id = this.$route.path.split('/')[2];
    this.params.keyword = this.$route.query.q
    this.keyword = this.$route.query.q;
    this.load()
  },
  methods:{
    inout(v){
      if(this.$store.state.user.islogin){
        if(v==1){
          // 加入
          api.joinForum({forumId: this.params.forumId}).then(res=>{
            if(res.success){
              this.$message({
                message: '加入成功',
                type: 'success',
                offset: 20
              });
              this.getForumInfo()
            }
          })
        }else if(v==2){
          api.leaveForum({forumId: this.params.forumId}).then(res=>{
            if(res.success){
              this.$message({
                message: '退出成功',
                type: 'success',
                offset: 20
              });
              this.getForumInfo()
            }
          })
        }
      }else{
        this.showLogin('login')
      }
    },
    changes(){
      localStorage.setItem('chao.fun.timeline.order', this.params.order);
      this.params.pageNum = 1;
      this.lists = []
      this.getLists();
    },
    getForumInfo(){
      api.getForumInfo({forumId: this.params.forumId}).then(res=>{
        this.forumInfo = res.data
      })
    },
    getLists(){
      let params = this.params;
      this.ifcanget = false
      api.getSearch(params).then(res=>{
        console.log(res)
        this.ifcanget = true
        this.params.pageNum += 1;
        // if(res.data.marker&&(res.data.posts.length == this.params.pageSize)){
        //   this.ifcanget = true
        // }
        // if(res.data.marker){
        //   params.marker = res.data.marker;
        // }else{
        //   if(res.data.posts.length<this.params.pageSize){
        //     this.loadAll = true
        //   }
        // }
        // if(res.data.posts.length<this.params.pageSize){
        //   this.loadAll = true
        // }
        if(!res.data.length){
          this.loadAll = true
          this.ifcanget = false
        }
        this.lists.push(...res.data)
      })
    },
    load () {
        if(localStorage.getItem('storedata')){
          this.lists = JSON.parse(localStorage.getItem('storedata')).list;
          this.params.pageNum = JSON.parse(localStorage.getItem('storedata')).pagenum;
        }else{
          if(this.ifcanget){
            this.params.pageNum += 1;
            this.getLists()
          }
          
        }
    }
  }
}
</script>
<style lang="scss" scoped>

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    // background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    padding-top: 20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }



  .asa{
    background: #fff;
    margin-bottom: 20px;
    // display: flex;
}
.forum_con{
  padding: 10px;
  background: #fff;
  // margin-left: 10px;
  margin-bottom: 20px;
  width: 270px;
  display: block;
  box-sizing: border-box;
  // min-height: 300px;
  .fir{
    display: flex;
    img{
      width: 50px;
      height: 50px;
      // border-radius: 50%;
    }
    div{
      flex: 1;
      padding-left: 20px;
      line-height: 50px;
    }
  }
  .fensi{
    display: flex;
    line-height: 24px;
    padding: 20px 0;
    div{
      font-size: 14px;
      color: #666;
      flex: 1;
      text-align: center;
      
    }
    div:nth-child(1){
      border-right: 1px solid #ddd;
    }
  }
  .forum_desc{
    color: #666;
    font-size: 14px;
    margin-bottom: 30px;
  }
  .forum_add{
    margin-bottom: 10px;
  }
  .el-button{
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin: 10px 0;
  }
}

/deep/ .el-input--medium .el-input__inner{
  height: auto;
  line-height: normal;
  padding-top: 8px;
  padding-bottom: 8px;
}




</style>
