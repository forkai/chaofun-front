<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="container infinite-list" ref="container" :style="{height: scrollHeight+'px'}">
      <el-row :gutter="20">
        <el-col :span="isPhone?24:doWidth()" :offset="doOffSet()" >
          
          <div class="grid-content"  style="overflow:auto; width: 640px; max-width: 100%">
              <div class="mynavs">
                <div @click="checkout('love')" :class="['navItem',{active_nav: whichOne == 'love'}]">点赞</div>
                <div @click="checkout('pub')" :class="['navItem',{active_nav: whichOne == 'pub'}]">发布</div> 
                <div @click="checkout('save')" :class="['navItem',{active_nav: whichOne == 'save'}]">我收藏的</div>
                <div @click="checkout('listFocus')" :class="['navItem',{active_nav: whichOne == 'listFocus'}]">我关注的</div> 
                <div @click="checkout('listFans')" :class="['navItem',{active_nav: whichOne == 'listFans'}]">关注我的</div>
              </div> 
              <ListItem v-if="whichOne=='pub'||whichOne=='love'||whichOne=='save'"  :whichOne="whichOne" :pagenum="params.pageNum" :isMy="true" :datas="{type: whichOne}" :isindex="true" :lists="lists"></ListItem>
              <attentionItem v-else v-for="(item,index) in usersData" :item="item"  :key="index"></attentionItem>
             <load-text :hasContent="(lists.length||usersData.length)?true:false" :ifcanget="ifcanget" :loadAll="loadAll"></load-text>
          </div>
        </el-col>
      </el-row>
    </div>
    
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/api'

import ListItem from '@/components/chaofan/ListItem.vue'
import attentionItem from '@/components/chaofan/attentionItem.vue'
import RightCom from '@/components/chaofan/RightCom'
import loadText from '@/components/chaofan/loadText'

import createLogin from '@/components/chaofan/common/login/login.js'

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
        marker: '',
        pageSize: 40,
        // order: localStorage.getItem('chao.fun.timeline.order') == null ? 'hot': localStorage.getItem('chao.fun.timeline.order')
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
      whichOne: 'love',
      loadAll: false,
      usersData: []
    }
  },
  components: {
    ListItem,loadText,attentionItem
  },
  watch: {
    // 'params.forumId'(v){
    //   this.params.pageNum = 1;
    //   this.lists = []
    // }
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
    this.toPosition();
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
    if(!isNaN(id)){
      this.params.forumId = id
      // this.getLists()
    }
    if(localStorage.getItem('whichOne')){
      this.whichOne = localStorage.getItem('whichOne')
    }
    this.load()
  },
  methods:{
    
    checkout(v){
      this.loadAll = false
      if(this.whichOne!=v){
        localStorage.setItem('whichOne',v)
        this.params.marker = ''
        this.whichOne = v;
        this.lists = []
        this.usersData = []
        this.getLists()
      }
    },
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
    gotologin(){
      this.showLogin('login')
    },
    showLogin(v){
      // this.$store.dispatch('user/SET_logStatus',v)
      this.$login({callBack:()=>{
        this.$store.dispatch('user/getInfo')
      }});
    },
    gotoSubmit(){// 发帖
      if(this.$store.state.user.islogin){

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
      this.ifcanget = false;
      if(this.whichOne == 'love'){
        api.getMyLove(params).then(res=>{
          if(res.data.marker){
            this.params.marker = res.data.marker;
            if(res.data.length<this.params.pageSize){
              this.ifcanget = false
            }else{
              this.ifcanget = true
            }
          }else{
            this.loadAll = true
          }
          this.lists.push(...res.data.posts)
        })
      }else if(this.whichOne == 'pub'){
        api.getListPosts(params).then(res=>{
          
          if(res.data.marker){
            this.params.marker = res.data.marker;
            if(res.data.length<this.params.pageSize){
              this.ifcanget = false
            }else{
              this.ifcanget = true
            }
          }else{
            this.loadAll = true
          }
          this.lists.push(...res.data.posts)
        })
      }else if(this.whichOne == 'save'){
        api.listSaved(params).then(res=>{
          
          if(res.data.marker){
            this.params.marker = res.data.marker;
            if(res.data.length<this.params.pageSize){
              this.ifcanget = false
            }else{
              this.ifcanget = true
            }
          }else{
            this.loadAll = true
          }
          this.lists.push(...res.data.posts)
        })
      }else if(this.whichOne == 'listFans'){
        params = {
          marker: this.params.marker,
          pageSize: this.params.pageSize,
          focusId: this.$store.state.user.userInfo.userId
        }
        api.listFans(params).then(res=>{
          // var res = {"success":true,"data":{"marker":"16","users":[{"userId":2,"userName":"yzc","icon":"f65dbe1941a8c0547dbb52710f61f957.jpg","ups":431,"followers":null,"focused":false,"gmtCreate":null,"gmtModified":null,"desc":"尘世的繁华掩盖不住心里那一抹伤，满目的浮云带不走隐痛的过往"}],"size":1}};
          if(res.data.marker){
            this.params.marker = res.data.marker;
            if(res.data.length<this.params.pageSize){
              this.ifcanget = false
            }else{
              this.ifcanget = true
            }
          }else{
            this.loadAll = true
          }
          this.usersData.push(...res.data.users)
        })
      }else if(this.whichOne == 'listFocus'){
        params = {
          marker: this.params.marker,
          pageSize: this.params.pageSize,
          userId: this.$store.state.user.userInfo.userId
        }
        api.listFocus(params).then(res=>{
          
          if(res.data.marker){
            this.params.marker = res.data.marker;
            if(res.data.length<this.params.pageSize){
              this.ifcanget = false
            }else{
              this.ifcanget = true
            }
          }else{
            this.loadAll = true
          }
          this.usersData.push(...res.data.users)
        })
      }
      
    },
    load () {
        if(localStorage.getItem('storedata')){
          this.lists = JSON.parse(localStorage.getItem('storedata')).list;
          this.params.marker = JSON.parse(localStorage.getItem('storedata')).marker;
          this.params.key = JSON.parse(localStorage.getItem('storedata')).key;
        }else{
          if(this.ifcanget){
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
  margin-left: 10px;
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


.el-col{
  // background: #f7f7f7;
}
.mynavs{
  display: flex;
  width: 100%;
  background:#fff;
  margin-bottom:10px;
}
.navItem{
  padding:10px 8px;
  font-weight:bold;
  font-size:15px;
  cursor: pointer;
}
.active_nav{
  color:#1890ff;
}



</style>
