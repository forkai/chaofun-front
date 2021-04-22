<template>
  <div>
    <div v-for="(item,index) in lists" :key="index"  :class="['item', 'infinite-list-item',{'phone-item': ISPHONE}]">
      <div v-if="!ISPHONE" @click.stop="" class="zan">
        <p :class="[{'up': item.vote!=1&&!ISPHONE}]">
          <img v-if="item.vote!=1" @click.stop="doZan(1,item,index)" src="../../assets/images/icon/up.png" alt="">
          <img v-if="item.vote==1||!ISPHONE" @click.stop="doZan(1,item,index)" src="../../assets/images/icon/up_active.png" alt="">
        </p>
        <p style="padding-left:0px;">{{item.ups-item.downs}}</p>
        <p :class="[{'down': item.vote!=-1&&!ISPHONE}]">
          <img v-if="item.vote!=-1" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down.png" alt="">
          <img v-if="item.vote==-1||!ISPHONE" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down_active.png" alt="">
        </p>
      </div>
      <div class="rights" :style="{'width':ISPHONE?imgMaxWidth+'px':''}">
        <!-- 头部 -->
        <itemTopTitle :item="item" :isindex="true"></itemTopTitle>
        <!-- 链接 -->
        <itemLink v-if="item.type == 'link'|| (ISPHONE&&item.type == 'video'&&item.videoType == 'ifram')&&item.link.includes('www.acfun.cn')" @click.stop="toUrls(item,{url:item.link,routeType: 1})" :item="item"></itemLink>
        <!-- 图片 -->
        <itemImage v-if="item.type == 'image'" :isDetail="true" :item="item"></itemImage>
        <!-- gif视频 -->
        <itemGif v-if="item.type == 'gif'" :isDetail="true" :item="item"></itemGif>

        <!-- iframe视频 -->
        <div v-if="item.type == 'video'&&item.videoType == 'ifram'&&(!ISPHONE||!item.link.includes('www.acfun.cn'))" class="item_video">
          <div class="title">
            {{item.title}}
          </div>
          <div class="video">
            <iframe v-if="!ISPHONE" style="width: 100%; height: 500px"   :src="item.video" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
            <iframe v-if="ISPHONE" style="width: 100%;height: 230px"   :src="item.video" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
          </div>
        </div>

        <!-- 富文本 -->
        <itemArticle v-if="item.type == 'article'" :isDetail="true" :item="item"></itemArticle>

        <!-- 投票 -->
        <itemVote v-if="item.type == 'vote'" :item="item"></itemVote>


        <!-- 转发 -->
        <div v-if="item.type == 'forward'" class="item_forward">
          <div class="title">
            {{item.title}}
          </div>
          <div @click.stop="toDetail(item.sourcePost)" class="forward_border">
            <!-- 链接 -->
            
            <div v-if="item.sourcePost.type == 'link' || (ISPHONE&&item.sourcePost.type == 'video'&&item.sourcePost.videoType == 'ifram'&&item.sourcePost.link.includes('www.acfun.cn'))" @click.stop="toUrl({url:item.sourcePost.link,routeType: 1})">
              
              <div  class="item_link">
                <div :class="['left_img',{'left_img_display': item.sourcePost.cover}]">
                  <i v-if="!item.sourcePost.cover" class="el-icon-link"></i>
                  <img v-if="item.sourcePost.cover" :src="imgOrigin+item.sourcePost.cover+(item.sourcePost.cover.includes('.ico')?'':'?x-oss-process=image/resize,h_100')" alt="">
                </div>
                <div class="right_content">
                  {{item.sourcePost.title}}
                </div>
              </div>
            </div>
            <itemForwardTitle :item="item" ></itemForwardTitle>
            <!-- 图片 -->
            <itemImage v-if="item.sourcePost.type == 'image'" :isDetail="true" :item="item.sourcePost"></itemImage>
            <!-- gif视频 -->
            <itemGif v-if="item.sourcePost.type == 'gif'" :isDetail="true" :item="item.sourcePost"></itemGif>

            <!-- iframe视频 -->
            <div v-if="item.sourcePost.type == 'video'&&item.sourcePost.videoType == 'ifram'&&(!ISPHONE||!item.sourcePost.link.includes('www.acfun.cn'))" class="item_video">
              <div class="title">
                {{item.sourcePost.title}}
              </div>
              <div class="video">
                <iframe v-if="!ISPHONE" style="width: 100%; height: 500px"   :src="item.sourcePost.video" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
                <iframe v-if="ISPHONE" style="width: 100%;height: 230px"   :src="item.sourcePost.video" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
              </div>
            </div>

            <!-- 富文本 -->
            <itemArticle v-if="item.sourcePost.type == 'article'" :isDetail="true" :item="item.sourcePost"></itemArticle>

            <!-- 投票 -->
            <itemVote v-if="item.sourcePost.type == 'vote'" :item="item.sourcePost"></itemVote>

            <div class="tools">
              <div>{{item.sourcePost.ups-item.sourcePost.downs}} 赞 · {{item.sourcePost.comments}} 评论</div>
            </div>

          </div>
        </div>
        

        <div v-if="item.type != 'video'&&item.type != 'link'&&item.type != 'image'&&item.type != 'gif'&&item.type != 'article'&&item.type!='forward'&&item.type!='vote'"  class="item_article">
          <div class="title">
            {{item.title}}
          </div>
        </div>


        <div :class="['tools',{'tools_phone': ISPHONE&&item.type == 'article'}]" :style="{width: ISPHONE&&item.type == 'article'?clientWidth-24+'px':''}">
          <!-- <div><i class="el-icon-star-on"></i> <span>{{item.ups-item.downs}}</span> 点赞</div> -->
          <div v-if="ISPHONE">
            <span v-if="item.vote!=1" @click.stop="doZan(1,item,index)">
              <img style="width:18px;vertical-align:middle;margin-top:-2px;" src="../../assets/images/icon/up.png" alt=""> 
            </span>
            <span v-if="item.vote==1||!ISPHONE" @click.stop="doZan(1,item,index)">
              <img style="width:18px;vertical-align:middle;margin-top:-2px;" src="../../assets/images/icon/up_active.png" alt="">
            </span>
            <span style="padding:0 10px;">{{item.ups-item.downs}}</span>
            <span v-if="item.vote!=-1" @click.stop="doZan(1,item,index)">
              <img style="width:18px;vertical-align:middle;margin-top:-2px;" v-if="item.vote!=-1" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down.png" alt=""> 
              <!-- <span>{{item.downs}}</span> -->
            </span>
            <span v-if="item.vote==-1||!ISPHONE" @click.stop="doZan(1,item,index)">
              <img style="width:18px;vertical-align:middle;margin-top:-2px;" v-if="item.vote==-1||!ISPHONE" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down_active.png" alt=""> 
              <!-- <span>{{item.downs}}</span> -->
            </span>
          </div>
          <div><i class="el-icon-s-comment"></i> <span>{{item.comments}}</span>评论</div>
          <!-- <div class="b_icon" @click.stop="share(item)" v-clipboard:copy="message" v-clipboard:success="onCopy"><i class="el-icon-share"></i> 分享</div> -->
          <el-dropdown @command="handleCommand" trigger="click">
            <span @click.stop="" class="el-dropdown-link">
              <i class="el-icon-share"></i> 分享
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{type:'copy',item: item}"  v-clipboard:copy="message" v-clipboard:success="onCopy" icon="el-icon-document-copy">复制链接</el-dropdown-item>
              <el-dropdown-item :command="{type:'share',item: item}" icon="el-icon-s-promotion">转发到</el-dropdown-item>
              <el-dropdown-item :command="{type:'shareWeibo',item: item}" icon="el-icon-s-promotion">分享到微博</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div :class="['b_icon',{'save_active':item.save}]" @click.stop="savePost(item)"><i class="el-icon-s-help"></i> {{item.save?'已收藏':'收藏'}}</div>
          
        </div>

      </div>
      <forward v-if="!ISPHONE&&dialogs.dialogVisible" :datas='dialogs'></forward>
      <forward-h5 v-if="ISPHONE&&dialogs.dialogVisible" :datas='dialogs' ></forward-h5>
    </div>
    
  </div>
</template>

<script>
  import * as api from '@/api/api'
  import 'moment/locale/zh-cn'
  import moment from 'moment'
  import VueClipboard from 'vue-clipboard2'
  import forward from './Forward'
  import Vue from 'vue'
  Vue.use(VueClipboard)

  import forwardH5 from '../h5/forward';
  import 'vant/lib/image-preview/style';
  import { ImagePreview } from 'vant';
  Vue.use(ImagePreview);
  import {parseTime} from '@/utils'

  import itemTopTitle from './component/itemTopTitle'
  import itemLink from './component/itemLink'
  import itemImage from './component/itemImage'
  import itemGif from './component/itemGif'
  import itemArticle from './component/itemArticle'
  import itemVote from './component/itemVote'
  import itemForwardTitle from './component/itemForwardTitle'

  
  export default {
    name: 'list-item',
    data(){
      return {
        chooseImg: '',
        imgs: ['','',],
        positionX:0,
        positionY:0,
        imgX: '',
        imgY: '',
        size: 90,
        options: {
          steps: 10,

        },
        images: [],
        show: false,
        showPhoneCover: false,
        moment: moment,
        centerDialogVisible: false,
        message: '',
        dialogs: {
         dialogVisible: false,
         data: {}
       },
       previewlist:[]
      }
    },
    props:{
      lists:{
        type: Array,
        default(){
          return []
        }
      },
      isindex: {
        type: Boolean,
        default: false
      }
    },
    components: {
      forward,forwardH5,itemTopTitle,itemLink,itemImage,itemGif,itemArticle,itemVote,itemForwardTitle
    },
    created() {
      
    },
    mounted() {
      
    },
    directives: {

    },
    methods: {
      doBg(it,its){
       var num = it.optionVote;
       var total = 0;
       its.forEach(item=>{
        //  if(item.optionVote){
           total += item.optionVote*1;
        //  }
       })
       return (num*100/total).toFixed(2)+'%';
     },
     checkoutVote(item,list){
       var a = false;
       list.forEach(item=>{
         if(item.optionVote){
           a = true;
         }
       })
       return a;
     },
      parseTime: parseTime,
      onChange(){

      },
      close(){
          if(localStorage.getItem('storedata')){
              var obj = JSON.parse(localStorage.getItem('storedata'));
              let {params,query} = obj.from;
              query.time = new Date().getTime()
              this.$router.replace({path: obj.from.path,params,query})
          }else{
              this.$router.replace({path: `/f/${this.lists[0].id}`})
          }
      },
      deletePost(item,index){
        this.$confirm(`是否确定删除帖子 【${item.title}】？`, "提示", {
          type: "warning",
          position: 'top'
        }).then(() => {
          
          api.deletePost({postId: item.postId}).then(res=>{
            if(res.success){
              this.$message.success("已删除");
              var obj = JSON.parse(localStorage.getItem('storedata'));
              obj.list.forEach((i,ind)=>{
                if(i.postId == item.postId){
                  obj.list.splice(ind,1)
                }
              })
              localStorage.setItem('storedata',JSON.stringify(obj));
              this.close()
            }
          })
        })
       
      },
      handleCommand(data){
       if(data.type == 'copy'){
         this.share(data.item)
       }else if(data.type == 'share'){
         this.doLoginStatus().then(res=>{
          if(res){
            this.dialogs.data = {
              sourcePostId: data.item.sourcePostId || data.item.postId,
              sourceTitle: data.item.sourcePostId? data.item.sourcePost.title: data.item.title
            }
            this.dialogs.dialogVisible = true
          }
        })
         
       }else{
        let picurl = 'https://oss.meibbc.com/gw/img/3380CC9482F74FA89C118FB99F4CE5E7.jpg';
        let url = 'https://chao.fun/p/'+(data.item.sourcePostId || data.item.postId);
        var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + data.item.title+ '&url=' + url+'（分享来自@炒饭社区）'  + '&content=utf-8&sourceUrl=' + url + '&searchPic=true&ralateUid=炒饭社区';
        // window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
        window.open(sharesinastring,"_blank"); 
       }
     },
      savePost(item){
       api.savePost({postId: item.postId}).then(res=>{
         if(res.success){
           if(item.save){
             this.$toast('已取消收藏')
           }else{
             this.$toast('收藏成功')
           }
           item.save = !item.save
         }else if(res.errorCode == 'need_login'){
           this.$store.dispatch('user/SET_logStatus','login')
         }
       })
     },
     onCopy (e) {
      this.$message.success("链接已复制到剪切板！")
    },
     share(item){
      this.message = location.origin+'/p/'+item.postId
     },
      toDetail(item){
        this.$router.push({path: '/p/'+item.postId})
      },
      doZan(v,item,index){
       if(v==1){//赞
          if(item.vote!=1){
            if(item.vote==-1){
              item.ups += 2
            }else{
              item.ups += 1
            }
            item.vote=1;
            
            this.lists.splice(index,1,item)
            api.upvote_post({postId:item.postId}).then(res=>{
              
            })
          }else if(item.vote===1){
            item.vote=0;
            item.ups -= 1
            this.lists.splice(index,1,item)
            api.upvote_post({postId:item.postId}).then(res=>{
              
            })
          }
       }else{//踩
          if(item.vote!=-1){
            if(item.vote==1){
              item.ups -= 2
            }else{
              item.ups -= 1
            }
            item.vote=-1;
            this.lists.splice(index,1,item)
            api.downvote_post({postId:item.postId}).then(res=>{
              
            })
          }else if(item.vote===-1){
            item.vote=0;
            item.ups += 1
            this.lists.splice(index,1,item)
            api.downvote_post({postId:item.postId}).then(res=>{
              
            })
          }
         
       }
     }
    }
  }
</script>

<style type='text/scss' lang='scss' scoped>
  @import './css/list.scss';
  .title{
    padding: 0 0 10px 0;
    font-size: 16px;
    font-weight: 600;
}
  .imgs2{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  .item{
    .rights{
      max-width: none;
      width: 100%;
      padding-right: 50px;
      // padding-right: 250px;
    }
    .b_icon{
      &:hover{
        color: orangered;
        i{
          color: orangered;
        }
      }
    }
    &:hover{
        box-shadow: none;
        border: 1px solid transparent;
    }
    .item_image{
      width: 100%;
      .imgs{
        max-height: 2500px;
        border-radius: 10px;
      }
    }
    
  }
  .phone-item{
    .rights{
      padding-right: 0;
    }
  }
  .imgsBig{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3000;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .el-icon-close{
      font-size: 32px;
      position: absolute;
      color: #fff;
      top: 50px;
      right: 50px;
    }
    img{
      max-width: 100%;
      // max-height: 100%;
      min-width: 30%;
      position: relative;
    }
    .backsImg{
      position: fixed;
      background: rgba(255,255,255,0.5);
      color: #fff;
      padding: 10px 20px;
      border-radius: 20px;
      top: 30px;
      right: 30px;
    }
  }
  .item .item_article{
    max-width: 100%;
  }
  .item .item_article .article{
    padding: 10px 0 20px;
    max-height: none;
  }
  /deep/ .item .item_article .article img{
    // max-width: 100%;
  }
  .item .item_article .article_phone{
    position: relative;
    // left: -50px;
  }
  .item .tools_phone{
    position: relative;
    // left: -50px;
  }
  /deep/ .van-field__control{
    padding: 10px 0;
  }
  /deep/ .bankuai{
   display: flex;
   .label{
     flex: 0 0 78px;
     text-align: left;
     line-height: 40px;
     margin-right: 8px;
   }
 }
 /deep/ .van-field__label{
   line-height: 44px;
 }
 /deep/ .van-image-preview__overlay,.van-overlay{
   background-color: rgba(0,0,0,1);
 }
 .ccc{
   position: fixed;
   z-index: 1000;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: #000;
 }

.asdasdasd{
  position: fixed;
  left: 0;
  top: 0px;
  right: 0;
  bottom: 0px;
  z-index: 10000;
  background: #000;
}
/deep/ .viewer-backdrop{
  background-color: rgba(0, 0, 0, 1)!important;
}
/deep/ .v-modal{
  opacity: 1;
}
</style>
