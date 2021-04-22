<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="container infinite-list" v-infinite-scroll="load">
      <el-row :gutter="20">
        <el-col :span="isPhone?24:doWidth()" :offset="isPhone?0:5" >
          <el-select v-model="params.order" placeholder="请选择" @change="changes" style="padding: 10px 0;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="grid-content"  style="overflow:auto; width: 640px; max-width: 100%">
            <!-- <ListItem :isindex="false" :lists="lists"></ListItem> -->
          </div>
        </el-col>
      </el-row>
    </div>
    
    <el-dialog
    :visible.sync="centerDialogVisible"
    opacity="1"
    :width="ISPHONE?'100%':'60%'"
    :show-close="false"
    :close-on-press-escape="false"
    :class="[{'pc_dialog':!ISPHONE},{'phone_dialog':ISPHONE}]"
    @close="close"
    center>
        <div v-if="hasData&&pagedata.postId">
          <div class="dialog_top">
              <div class="left">
                  <i @click.stop="doZan(1,pagedata)" class="el-icon-top"></i>
                  <span style="padding: 0 10px;">{{pagedata.ups-pagedata.downs}}</span>
                  <i @click.stop="doZan(2,pagedata)" class="el-icon-bottom"></i>
                  
                  <span class="title">{{pagedata.title}}</span>
              </div>
              <div @click="back" class="right">关闭</div>
          </div>
          <div :class="['dialog_main',{'dialog_main2':!ISPHONE}]">
            <div class="dialog_main_content">
              <el-row :gutter="20">
                  <el-col :span="ISPHONE?24:17" :offset="isPhone?0:0">
                      <div style="height:30px;"></div>
                      <ListItem :isindex="false" :lists="[this.pagedata]"></ListItem>
                      <div :class="['sub_comment', {'sub_comment_phone':ISPHONE}]">
                          <div v-if="replayItem" @click="cancelReplay" style="padding: 6px 0px;cursor:pointer;float:left;">取消回复</div>
                          <el-input type="textarea" @focus="doLogin" class="textarea" :placeholder="replayItem?'我对'+replayItem.userInfo.userName+'说：':'发表你的想法'" :autosize="{ minRows: 2, maxRows: 4}"  v-model="comment"></el-input>
                          <div class="sub_botton">
                            <el-button style="height:36px;" @click="toSub" type="primary">发表</el-button>
                            
                            <div class="icons" style="padding: 4px 20px 0;">
                              <img @click="showIcons" style="width:24px;height:24px;" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=105646479,4120396531&fm=26&gp=0.jpg" alt="">
                              <div  class="emoji">
                                <span v-for="(item,index) in icons" @click="chooseEmoji(item)" :key="index">{{item}}</span>
                              </div>
                            </div>
                          </div>
                      </div>
                      <div class="comment_list">
                          <div class="comment_title"><i style="font-size:24px;vertical-align:middle;" class="el-icon-s-comment"></i> 评论</div> 
                          <commentitem @refreshDelete="refreshDelete" @toReplay2="toReplay2" @refreshComment="refreshComment" :treeData="treeData"></commentitem>
                          <div v-if="!lists.length" class="no_comment">
                              还没有评论，你的机会来了 ~
                          </div> 
                      </div>
                  </el-col>
                  <el-col :span="7" :offset="0">
                      <div v-if="!ISPHONE" class="grid-content bg-purple content-right">
                          <div v-if="forumInfo" class="asa">
                            <div class="forum_con">
                              <div v-if="forumInfo.admin" @click="manage" style="position: absolute; right: 20px; width: 40px; color: blue;">管理</div>
                              <div class="fir">
                              <img :src="imgOrigin+forumInfo.imageName+'?x-oss-process=image/resize,h_80'" />
                              <div>{{forumInfo.name}}</div>
                              </div>
                              <div class="fensi">
                                  <div>粉丝：{{forumInfo.followers}}</div>
                                  <div>帖子：{{forumInfo.posts}}</div>
                              </div> 
                              <div class="forum_desc">{{forumInfo.desc}}</div> 
                              <div class="forum_add">

                                  <el-button @click="inout(1)" v-if="!forumInfo.joined" type="primary" block>
                                  进入板块
                                  </el-button>
                                  <el-button @click="inout(2)" v-else type="danger" onClick={outForum} block>
                                  退出板块
                                  </el-button>
                              
                              </div> 
                              <div class="forum_add">
                              <el-button @click="gotoSubmit" type="primary" block>
                                  发帖
                              </el-button>
                              </div>
                          </div> 
                          </div>
                          <!-- <RightCom :islogin="islogin"></RightCom> -->
                      </div>
                  </el-col>
              </el-row>
            </div> 
              
          </div>  
        </div>
        <div v-if="!hasData" class="is404">
          <div>
            <div class="s404">404</div>
            <p>帖子已被删除或不存在 <span @click="back" class="lookother">看看其他 ></span></p>
          </div>
          
        </div>
        <!-- <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span> -->
    </el-dialog>
    

  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import * as api from "../../api/api";
import ListItem from "../../components/chaofan/ListItemWidth.vue";
import RightCom from "@/components/chaofan/RightCom";
import "moment/locale/zh-cn";
import moment from "moment";
import commentitem from "@/components/chaofan/commentItem";
export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      hasData: true,
      currentRole: 'adminDashboard',
      count: 5,
      lists: [],
      forumId: '',
      params:{
        postId: '',
        pageNum: 0,
        pageSize: 40,
        order: localStorage.getItem('chao.fun.timeline.order') == null ? 'hot': localStorage.getItem('chao.fun.timeline.order')
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
      ],
      isPhone: false,
      forumInfo: null,
      centerDialogVisible: true,
      pagedata: {},
      comment: '',
      moment: moment,
      icons: [
         '😀','😃','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','😍','😘','🤪','😝','👍','🤝','🙏','💪','👏','✍️','💔','👮‍♂️','☠️','👽'
       ],
       showIcon:false,
      replayItem: null,
      treeData: [],
      userinfo: this.$store.state.user.userInfo,
      canSub: true,
    }
  },
  components: {
    ListItem,RightCom,commentitem
  },
  watch: {
  },
  computed: {
    ...mapGetters(["roles", "islogin"]),
    ...mapState(['var'])
  },
  mounted(){
    if(document.body.clientWidth<700){
      this.isPhone = true
    }
    if (window.history && window.history.pushState) {
      console.log(this.var.path404==this.$route.fullPath)
      if(this.var.path404==this.$route.fullPath){
        history.pushState(null, null, '/');
             window.addEventListener("popstate", this.onCloseModal, false);
      }
         }
  },
  created() {
    let params = this.$route.params;
    this.params.postId = params.postId;
    this.getDetail();
    
  },
  methods:{
    refreshDelete(item){
      console.log('item',item);
      let idx=-1;
      item.text = '[已删除]'
      this.lists.forEach((it,index)=>{
        console.log(it);
        console.log(index);
        if(it.id==item.id){
          idx = index;
          this.lists.splice(index,1,item)
        }
      })
      this.treeData = this.transformTree(this.lists);
    },
    refreshComment(obj){
      this.lists.push(obj);
      this.treeData = this.transformTree(this.lists);
    },
    cancelReplay(){
      this.replayItem = null
    },
    toReplay2(item){
      this.replayItem = item;
    },
    doLogin(){

      this.doLoginStatus().then(res=>{
          if(res){
              
          }else{
              console.log('未登录',res)
          }
      })
    },
    showIcons(){
      this.showIcon = true
    },
    chooseEmoji(item){
      this.comment += item;
      this.showIcon = false
    },
    manage() {
      this.$router.push({path:'/f/' + this.forumInfo.id + '/setting'})
    },
    doZan(v,item){
       if(v==1){
         api.upvote_post({postId:item.postId}).then(res=>{
           item.ups += 1
         })
       }else{
         api.downvote_post({postId:item.postId}).then(res=>{
           item.ups -= 1
         })
       }
    },
    inout(v){
        let self = this
        this.$router.replace({path: `/f/${this.forumInfo.id}`})
        // this.doLoginStatus().then(resolve=>{
        //     if(resolve){
        //         if(v==1){
        //             // 加入
        //             api.joinForum({forumId: self.forumInfo.forumId}).then(res=>{
        //                 if(res.success){
        //                 self.$message({
        //                     message: '加入成功',
        //                     type: 'success',
        //                     offset: 20
        //                 });
        //                 self.getForumInfo()
        //                 }
        //             })
        //         }else if(v==2){
        //             api.leaveForum({forumId: self.forumInfo.forumId}).then(res=>{
        //                 if(res.success){
        //                 self.$message({
        //                     message: '退出成功',
        //                     type: 'success',
        //                     offset: 20
        //                 });
        //                 self.getForumInfo()
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    gotologin(){
      this.showLogin('login')
    },
    showLogin(v){
      this.$login({callBack:()=>{
        this.$store.dispatch('user/getInfo')
      }});
    },
    gotoSubmit(){// 发帖
      if(this.$store.state.user.islogin){
        this.$router.push({path: '/submit',query:{id: this.forumInfo.id}})
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
    format(jsonData) {
      var result = [], temp = {}, i = 0, j = 0, len = jsonData.length
      for (var i=0; i < len; i++) {
        console.log(temp);
        temp[jsonData[i]['id']] = jsonData[i].parentId // 以id作为索引存储元素，可以无需遍历直接定位元素
      }
      for (var j=0; j < len; j++) {
        var currentElement = jsonData[j]
        var tempCurrentElementParent = temp[currentElement['parentId']] // 临时变量里面的当前元素的父元素 parentId 父级ID
        if (tempCurrentElementParent) { // 如果存在父元素
          if (!tempCurrentElementParent['children']) { // 如果父元素没有chindren键
            tempCurrentElementParent['children'] = [] // 设上父元素的children键
          }
          tempCurrentElementParent['children'].push(currentElement) // 给父元素加上当前元素作为子元素
        } else { // 不存在父元素，意味着当前元素是一级元素
          result.push(currentElement);
        }
      }
    
      return result;
    },
    transformTree (list) {
      const tree = []
        
      for (let i = 0, len = list.length; i < len; i++) {
        if (!list[i].parentId) {
        const item = this.queryChildren(list[i], list)
          
        tree.push(item)
        }
      }
        
      return tree
    },
 
queryChildren (parent, list) {
 const children = []
  
 for (let i = 0, len = list.length; i < len; i++) {
  if (list[i].parentId === parent.id) {
   const item = this.queryChildren(list[i], list)
 
   children.push(item)
  }
 }
  
 if (children.length) {
  parent.children = children
 }
  
 return parent
},
    getDetail(){
      api.getPostInfo({postId: this.params.postId}).then(res=>{
        if(res.success){
          let data = res.data;
          this.pagedata = data;
          this.forumInfo = res.data.forum;
          console.log(res.data.forum,'res')
          document.title = res.data.title + " - 炒饭";
        } else {
          this.hasData = false;
          this.$store.commit('var/SET_PATH',this.$route.fullPath)
        }
        
      })
    },
    getLists(){
      let params = this.params;
      api.listCommentsV0(params).then(res=>{
        this.lists.push(...res.data);
        let data = this.lists;
        this.treeData = this.transformTree(data);
      })
    },
    load () {
        this.params.pageNum += 1;
        this.getLists()
    },
    back(){
      if(this.forumInfo&&this.forumInfo.id){
        this.centerDialogVisible = false;
      }else{
        location.href = 'https://chao.fun'
      }
        
    },
    close(e){
        if(localStorage.getItem('storedata')){
            var obj = JSON.parse(localStorage.getItem('storedata'));
            let {params,query} = obj.from;
            query.time = new Date().getTime()
            this.$router.replace({path: obj.from.path,params,query})
        }else{
            this.$router.replace({path: `/f/${this.forumInfo.id}`})
        }
        
    },
    doZanComment(v,item){
        if(v==1){
            api.upvoteComment({commentId:item.id}).then(res=>{
                item.ups += 1
            })
        }else{
            api.downvoteComment({commentId:item.id}).then(res=>{
            item.ups -= 1
            })
       }
    },
    toSub(){
        this.doLoginStatus().then(res=>{
            let comment = this.comment;
            if(res){
                if(!this.comment) return;
                let params = {
                  parentId: this.replayItem&&this.replayItem.id?this.replayItem.id:'',
                  postId: this.params.postId,
                  comment: this.comment
                }
                if(this.canSub){
                  this.canSub = false;
                  api.addComments(params).then(res=>{
                      if(res.success){
                          this.$message.success('评论成功')
                          setTimeout(()=>{
                              if(this.replayItem){
                                this.lists.push({
                                  parentId: this.replayItem?this.replayItem.id:0,
                                  text: comment,
                                  type: 'text',
                                  downs: 0,
                                  ups: 0,
                                  userInfo: this.userinfo
                                })
                              }else{
                                this.lists.unshift(res.data)
                              }
                              
                              this.comment = '';
                              this.canSub = true;
                              this.treeData = this.transformTree(this.lists)
                          },1500)
                      }
                  })
                }else{
                  this.$toast('请勿重复提交')
                }
                
            }else{
                console.log('未登录',res)
            }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .asa{
    background: #fff;
    margin-bottom: 20px;
}
/deep/ .el-dialog__wrapper{
  overflow-x: hidden;
}
.asa{
  display: flex;
  flex-direction: row-reverse;
    .forum_con{
        padding: 30px 20px;
        border: 1px solid #ddd;
        width: 100%;
        min-width: 270px;
        max-width: 280px;
        box-sizing: border-box;
    }
}
/deep/ .item .rights{
  padding-right: 0;
}
/deep/ .el-dialog{
    margin-top:0 !important;
    height:100vh;
    overflow-x: hidden;
    div{
        margin: 0;
        padding: 0;
    }
}
/deep/ .pc_dialog{
  height: 100vh;
  overflow-y: hidden;
  .el-dialog{
    min-width: 1150px;
  }
}
.dialog_top{
    position: absolute;
    z-index: 1;
    // width: calc(80% - 20px);
    width: 100%;
    // left: 10%;
    display: flex;
    background: #000;
    div{
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .left{
        flex: 1;
        height: 54px;
         text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
        .title{
            padding-left: 20px;
        }
    }
    .right{
        flex: 0 0 70px;
        cursor: pointer;
        text-align: center;
    }
}
.dialog_main{
    padding: 30px !important;
    height: 100vh;
    overflow-y: scroll;
    background: #fff;
    box-sizing: border-box;
    overflow-x: hidden;
    .dialog_main_content{
      // border: 1px solid #f1f1f1;
    }
}
.dialog_main2{
    // width: 1200px;
    // width: 80%;
    // border: 1px solid #f1f1f1;
    margin: 0 auto !important;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 2px;
      // height: 44px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      padding: 0;
      width: 2px;
      height: 44px;
      // background-color: rgba(0, 0, 0, .2);
      background-color: $linkcolor;
    }
    .asa{
        .forum_con{
            padding: 30px 20px;
            border: 1px solid #ddd;
            width: 100%;
            min-width: 244px;
            box-sizing: border-box;
        }
    }
}
/deep/ .item{
    padding: 20px 0 !important;
}
.content-right{
    position: relative;
}
.sub_comment{
    padding: 10px 0 0 50px !important;
    // position: relative;
    .textarea{
        resize: none;
        font-size: 16px;
    }
    .sub_botton{
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        padding: 20px 20px 0;
    }
}
.sub_comment_phone{
  background: #fff;
  padding-left: 0 !important;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  .sub_botton{
    padding: 0;
  }
  .icons{
    height: auto;
    &:hover .emoji{
      display: block;
      position: absolute;
      top: -200px;
      left: 0;
    }
  }
}

.el-dialog{
    .comment_title{
        margin: 0px 0 10px;
    }
    .no_comment{
        text-align: center;
        padding: 30px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #999;
    }
}
.phone_dialog{
  height: 100vh;
  overflow-y: hidden;
    .dialog_main{
        padding: 10px 10px 180px !important;
    }
    .dialog_top{
        width: 100%;
        left: 0;
        .left,.right{
            padding: 10px 4px;
        }
    }
}
/deep/ .forum_con .fir img{
  margin-right: 20px;
}
.forum_desc,.fensi{
  padding: 20px 0 !important;
}
.forum_desc{
  margin-bottom: 30px;
}
.is404{
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 600px;
  .s404{
    font-size: 128px;
    color: cornflowerblue;
  }
  .lookother{
    padding-left: 10px;
    color: cornflowerblue;
    text-decoration: underline;
    cursor: pointer;
  }
}
.icons{
  text-align: right;
  height: 60px;
  &:hover .emoji{
    display: block;
  }
}
.emoji{
  // position: absolute;
  z-index: 1;
  width: 100%;
  top: 66px;
  left: 0;
  line-height: 34px;
  padding: 10px !important;
  border: 1px solid #d1d1d1;
  background: #fff;
  display: none;
  text-align: left;
  span{
    font-size: 24px;
    padding: 2px;
    cursor: pointer;
  }
}
/deep/ .item .item_image .imgs img{
  height: auto !important;
  // max-height: calc(100vh - 150px);
}
.comment_list{
  padding-bottom: 120px;
}
</style>