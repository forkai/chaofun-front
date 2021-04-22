<template>
 <div class="cc">
     
            <div v-for="(item,index) in lists" :key="index" @click.stop="toDetail(item)" :class="['infinite-list-item']">
              <div @click.stop="" class="d_type" style="font-size: 13px; border-bottom: 1px solid">
                  <span @click.stop="toUser(item.focusUser)" class="username" style="font-size: 13px; color: #666">{{item.focusUser?item.focusUser.userName:'测试账号'}}</span>

                  {{moment.duration(moment(item.gmtCreate) - moment()).humanize(true)}} 
                  {{item.type=='post'?'发布了':'点赞了'}}
                  
              </div>
              <div :class="['item',{'phone-item': ISPHONE}]">
                    <div v-if="!ISPHONE" @click.stop="" class="zan">
                        <p :class="[{'up': item.postInfo.vote!=1&&!ISPHONE}]">
                            <img v-if="item.postInfo.vote!=1" @click.stop="doZan(1,item,index)" src="../../assets/images/icon/up.png" alt="">
                            <img v-if="item.postInfo.vote==1||!ISPHONE" @click.stop="doZan(1,item,index)" src="../../assets/images/icon/up_active.png" alt="">
                        </p>
                        <p style="padding-left:0px;">{{item.postInfo.ups-item.postInfo.downs}}</p>
                        <p :class="[{'down': item.postInfo.vote!=-1&&!ISPHONE}]">
                            <img v-if="item.postInfo.vote!=-1" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down.png" alt="">
                            <img v-if="item.postInfo.vote==-1||!ISPHONE" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down_active.png" alt="">
                        </p>
                    </div>
                    <div v-if="ISPHONE" style="width:20px;"></div> 
                <div class="rights" :style="{'width':ISPHONE?imgMaxWidth+'px':''}">
                    <!-- || (ISPHONE&&item.postInfo.type == 'video'&&item.postInfo.videoType == 'ifram')&&item.postInfo.link.includes('www.acfun.cn') -->
                    <itemTopTitle :item="item.postInfo" :isindex="isindex" @deletePost="deletePost" :index="index"></itemTopTitle>
                    <!-- 链接 -->
                    <itemLink :isindex="isindex" v-if="item.postInfo.type == 'link'|| (ISPHONE&&item.postInfo.type == 'video'&&item.postInfo.videoType == 'ifram')&&item.postInfo.link.includes('www.acfun.cn')"  :item="item.postInfo"></itemLink>
                    <!-- 图片 -->
                    <itemImage v-if="item.postInfo.type == 'image'" :item="item.postInfo"></itemImage>
                    <!-- 视频 -->
                    <!-- &&(!ISPHONE||item.postInfo.link.includes('www.acfun.cn')) -->
                    <itemGif v-if="item.postInfo.type == 'gif'" :isDetail="false" :item="item.postInfo"></itemGif>
                    <!-- iframe视频 -->
                    <div v-if="item.postInfo.type == 'video'&&item.postInfo.videoType == 'ifram'&&(!ISPHONE||!item.postInfo.link.includes('www.acfun.cn'))"
                        class="item_video">
                        <div class="title">
                            {{item.postInfo.title}}
                        </div>
                        <div  @click.stop="" class="video">
                            <img v-if="!item.postInfo.play&&item.postInfo.cover" class="coverss" @click="playVideo(index,item.postInfo,0)" :src="imgOrigin+item.postInfo.cover + '?x-oss-process=image/resize,h_256'" alt="">
                            <img v-if="!item.postInfo.play&&!item.postInfo.cover" class="coverss" @click="playVideo(index,item.postInfo,0)" src="../../assets/images/bg/videocover.jpg" alt="">
                            <img v-if="!item.postInfo.play" class="btn_play" @click="playVideo(index,item.postInfo,0)" src="../../assets/images/bg/play.png" alt="">
                            <iframe v-if="!ISPHONE&&item.postInfo.play" style="width: 100%;min-height: 370px"   :src="item.postInfo.video+(item.postInfo.link.includes('www.acfun.cn')?'?':'')+'&autoplay=true'" allow="autoplay" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
                            <iframe v-if="ISPHONE&&item.postInfo.play" style="width: 100%;height: 230px"   :src="item.postInfo.video+(item.postInfo.link.includes('www.acfun.cn')?'?':'')+'&autoplay=true'" allow="autoplay" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
                      
                        </div>
                    </div>

                    <!-- 富文本 -->
                    <itemArticle v-if="item.postInfo.type == 'article'" :item="item.postInfo"></itemArticle>

                    <!-- 转发 -->
                    <div v-if="item.postInfo.type == 'forward'" @click="toDetail(item.postInfo)" class="item_forward">
                      <div class="title">
                        {{item.postInfo.title}}
                      </div>
                      <div @click.stop="toDetail(item.postInfo.sourcePost)" class="forward_border">
                        <!-- 链接 -->
                        <itemForwardTitle :item="item.postInfo" ></itemForwardTitle>
                    <!-- 链接 -->
                        <itemLink :isindex="isindex" v-if="item.postInfo.sourcePost.type == 'link'|| (ISPHONE&&item.postInfo.sourcePost.type == 'video'&&item.postInfo.sourcePost.videoType == 'ifram')&&item.postInfo.sourcePost.link.includes('www.acfun.cn')" :item="item.postInfo.sourcePost"></itemLink>
                        <!-- 图片 -->
                        <itemImage v-if="item.postInfo.sourcePost.type == 'image'" :item="item.postInfo.sourcePost"></itemImage>
                        <!-- 视频 -->
                        <itemGif v-if="item.postInfo.sourcePost.type == 'gif'" :isDetail="false" :item="item.postInfo.sourcePost"></itemGif>
                        <!-- iframe视频 -->
                        <div v-if="item.postInfo.sourcePost.type == 'video'&&item.postInfo.sourcePost.videoType == 'ifram'&&(!ISPHONE||!item.postInfo.sourcePost.link.includes('www.acfun.cn'))"
                          class="item_video">
                            <div class="title">
                                {{item.postInfo.sourcePost.title}}
                            </div>
                            <div  @click.stop="" class="video">
                                <img v-if="!item.postInfo.sourcePost.play&&item.postInfo.sourcePost.cover" class="coverss" @click="playVideo(index,item.postInfo.sourcePost,0)" :src="imgOrigin+item.postInfo.sourcePost.cover + '?x-oss-process=image/resize,h_256'" alt="">
                                <img v-if="!item.postInfo.sourcePost.play&&!item.postInfo.sourcePost.cover" class="coverss" @click="playVideo(index,item.postInfo.sourcePost,0)" src="../../assets/images/bg/videocover.jpg" alt="">
                                <img v-if="!item.postInfo.sourcePost.play" class="btn_play" @click="playVideo(index,item.postInfo.sourcePost,0)" src="../../assets/images/bg/play.png" alt="">
                                <iframe v-if="!ISPHONE&&item.postInfo.sourcePost.play" style="width: 100%;min-height: 370px"   :src="item.postInfo.sourcePost.video+(item.postInfo.sourcePost.link.includes('www.acfun.cn')?'?':'')+'&autoplay=true'" allow="autoplay" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
                                <iframe v-if="ISPHONE&&item.postInfo.sourcePost.play" style="width: 100%;height: 230px"   :src="item.postInfo.sourcePost.video+(item.postInfo.sourcePost.link.includes('www.acfun.cn')?'?':'')+'&autoplay=true'" allow="autoplay" id="ACPlayer-re"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
                          
                            </div>
                        </div>
                        <!-- 富文本 -->
                        <itemArticle v-if="item.postInfo.sourcePost.type == 'article'" :item="item.postInfo.sourcePost"></itemArticle>

                        <!-- 投票 -->
                        <itemVote v-if="item.postInfo.sourcePost.type == 'vote'" @callBack="callBack" :index="index" :item="item.postInfo.sourcePost"></itemVote>
                        <div class="tools">
                          <div>{{item.postInfo.sourcePost.ups-item.postInfo.sourcePost.downs}} 赞 · {{item.postInfo.sourcePost.comments}} 评论</div>
                        </div>

                      </div>
                    </div>

                    <div v-if="item.postInfo.type != 'video'&&item.postInfo.type != 'link'&&item.postInfo.type != 'image'&&item.postInfo.type != 'gif'&&item.postInfo.type != 'article'&&item.postInfo.type!='forward'" @click="toDetail(item)" class="item_article">
                      <div class="title">
                          {{item.postInfo.title}}
                      </div>
                    </div>
                    
                    <div class="tools">
                    <!-- <div><i class="el-icon-star-on"></i> <span>{{item.postInfo.ups-item.postInfo.downs}}</span> 点赞</div> -->
                    <div v-if="ISPHONE">
                        <span v-if="item.postInfo.vote!=1" @click.stop="doZan(1,item,index)">
                        <img style="width:18px;vertical-align:middle;margin-top:-2px;" src="../../assets/images/icon/up.png" alt=""> 
                        </span>
                        <span v-if="item.postInfo.vote==1||!ISPHONE" @click.stop="doZan(1,item,index)">
                        <img style="width:18px;vertical-align:middle;margin-top:-2px;" src="../../assets/images/icon/up_active.png" alt="">
                        </span>
                        <span style="padding:0 10px;">{{item.postInfo.ups-item.postInfo.downs}}</span>
                        <span v-if="item.postInfo.vote!=-1" @click.stop="doZan(1,item,index)">
                        <img style="width:18px;vertical-align:middle;margin-top:-2px;" v-if="item.postInfo.vote!=-1" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down.png" alt=""> 
                        <!-- <span>{{item.postInfo.downs}}</span> -->
                        </span>
                        <span v-if="item.postInfo.vote==-1||!ISPHONE" @click.stop="doZan(1,item,index)">
                        <img style="width:18px;vertical-align:middle;margin-top:-2px;" v-if="item.postInfo.vote==-1||!ISPHONE" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down_active.png" alt=""> 
                        <!-- <span>{{item.postInfo.downs}}</span> -->
                        </span>
                    </div>
                    <!-- <div v-if="ISPHONE">
                        <span v-if="item.postInfo.vote!=-1" @click.stop="doZan(1,item,index)">
                        <img style="width:18px;vertical-align:middle;margin-top:-2px;" v-if="item.postInfo.vote!=-1" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down.png" alt=""> 
                        
                        </span>
                        <span v-if="item.postInfo.vote==-1||!ISPHONE" @click.stop="doZan(1,item,index)">
                        <img style="width:18px;vertical-align:middle;margin-top:-2px;" v-if="item.postInfo.vote==-1||!ISPHONE" @click.stop="doZan(2,item,index)" src="../../assets/images/icon/down_active.png" alt=""> 
                        
                        </span>
                    </div> -->
                    <div><i class="el-icon-s-comment"></i> <span>{{item.postInfo.comments}}</span>评论</div>
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
                    <div :class="['b_icon',{'save_active':item.postInfo.save}]" @click.stop="savePost(item)"><i class="el-icon-s-help"></i> {{item.postInfo.save?'已收藏':'收藏'}}</div>
                    
                    </div>
                </div>
              </div>
            </div>
     <div v-if="ISPHONE"  @click="toTop" class="scroll_to_top_phone">
         <img src="../../assets/images/icon/to_top.png" alt="">
     </div>

     <div v-if="!ISPHONE" @click="toTop" class="scroll_to_top">
         <img src="../../assets/images/icon/to_top.png" alt="">
     </div>
      <forward v-if="!ISPHONE&&dialogs.dialogVisible" :datas='dialogs'></forward>
      <forward-h5 v-if="ISPHONE&&dialogs.dialogVisible" :datas='dialogs' ></forward-h5>
      <videoDialog v-if="shows" :videoData="videoData"></videoDialog>
 </div>
</template>

<script>
import * as api from '../../api/api'
import 'moment/locale/zh-cn'
import moment from 'moment'
import VueClipboard from 'vue-clipboard2'
import forward from './Forward'
import Vue from 'vue'
import { Dialog } from 'vant';
import videoDialog from './videoDialog';
import itemTopTitle from './component/itemTopTitle'
import itemLink from './component/itemLink'
import itemImage from './component/itemImage'
import itemGif from './component/itemGif'
import itemIframeVideo from './component/itemIframeVideo'
import itemArticle from './component/itemArticle'
import itemVote from './component/itemVote'
import itemForwardTitle from './component/itemForwardTitle'
import 'vant/lib/dialog/style';
Vue.use(VueClipboard);

import forwardH5 from '../h5/forward'
 export default {
   name: 'list-item',
   data(){
     return {
       shows: false,
       videoData: '',
       moment: moment,
       top: 0,
       canTo: true,
       message: '',
       dialogs: {
         dialogVisible: false,
         data: {}
       }
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
       },
       pagenum: {
         type: Number,
         default: 1
       },
       marker: {
         type: String,
         default: ''
       },
       keys: {
         type: String,
         default: ''
       },
       isMy: {
         type: Boolean,
         default: false
       },
       whichOne:{
         type: String,
         default: ''
       },
       datas: {
         type: Object,
         default(){
           return {}
         }
       }
   },
   components: {
     forward,forwardH5,videoDialog,itemTopTitle,itemLink,itemImage,itemGif,itemIframeVideo,itemArticle,itemVote,itemForwardTitle
   }, 
   created() {
    this.top = localStorage.getItem('storedata')?JSON.parse(localStorage.getItem('storedata')).top:0;
    this.lists.forEach(item=>{
      if(item.postInfo.type=='video'){
        item.postInfo.play = false
      }
    })
   },
   mounted() {
     if(this.$route.query.time){
       console.log('this.top',this.top)
       this.$('.infinite-list').animate({ scrollTop:  this.top}, 10); 
       setTimeout(()=>{
         localStorage.removeItem('storedata')
       },1000)
     }else{
       localStorage.removeItem('storedata')
     }
   },
   destroyed(){
     
   },
   methods: {
     doPlay(e){
      //  console.log(e)
     },
     playVideo(index,item){
       item.postInfo.play = true
       this.lists.splice(index,1,item)
       if(item.postInfo.type=='video'){

       }
      //  this.shows = true;
      //  this.videoData = this.imgOrigin+item.postInfo.imageName
     },
     handleCommand(data){
       if(data.type == 'copy'){
         this.share(data.item)
       }else if(data.type == 'share'){
         this.doLoginStatus().then(res=>{
          if(res){
            this.dialogs.data = {
              sourcePostId: data.item.postInfo.sourcePostId || data.item.postInfo.postId,
              sourceTitle: data.item.postInfo.sourcePostId? data.item.postInfo.sourcePost.title: data.item.postInfo.title
            }
            // if(this.ISPHONE){
            //   this.$router.push({name: 'h5forward',query:this.dialogs.data})
            // }else{
              this.dialogs.dialogVisible = true
            // }
            
          }
        })
       }else{
        let picurl = 'https://oss.meibbc.com/gw/img/3380CC9482F74FA89C118FB99F4CE5E7.jpg';
        let url = 'https://chao.fun/p/'+(data.item.postInfo.sourcePostId || data.item.postInfo.postId);
        var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + data.item.postInfo.title+ '&url=' + url+'（分享来自@炒饭社区）'  + '&content=utf-8&sourceUrl=' + url + '&ralateUid=炒饭社区';
        // window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
        window.open(sharesinastring,"_blank");  

  //       var _w = 106 , _h = 20;
  // var param = {
  //   url:'http://chao.fun',
  //   type:'6',
  //   count:'', /**是否显示分享数，1显示(可选)*/
  //   // appkey:'4026630105', /**您申请的应用appkey,显示分享来源(可选)*/
  //   title:'资深人士质疑央视专家观点 到底谁是鳕鱼界的“李鬼”',
  //   pic:'http://i.chao.fun/1fea044b7e50c07953ce17d509a9336d.jpg?x-oss-process=image/resize,h_512',
  //   ralateUid:'炒饭社区', /**关联用户的UID，分享微博会@该用户(可选)*/
  //   rnd:new Date().valueOf()
  // }
  // var temp = [];
  // for( var p in param ){
  //   temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
  // }
  // document.write('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>')

       }
     },
     deletePost(item,index){
       if(this.ISPHONE){
         Dialog.confirm({
            title: '删除确认',
            message: `是否确定删除帖子 【${item.postInfo.title}】？`,
            messageAlign: 'left'
          }).then(() => {
            api.deletePost({postId: item.postInfo.postId}).then(res=>{
              if(res.success){
                this.$message.success("已删除");
                this.lists.splice(index,1)
              }
            })
          }).catch(() => {
            // on cancel
          });
       }else{
         this.$confirm(`是否确定删除帖子 【${item.postInfo.title}】？`, "提示", {
            type: "warning",
            // center: true,
            position: 'top'
          }).then(() => {
            api.deletePost({postId: item.postInfo.postId}).then(res=>{
              if(res.success){
                this.$message.success("已删除");
                this.lists.splice(index,1)
              }
            })
          })
       }
       
       
     },
     savePost(item){
       api.savePost({postId: item.postInfo.postId}).then(res=>{
         if(res.success){
           if(item.postInfo.save){
             this.$toast('已取消收藏')
           }else{
             this.$toast('收藏成功')
           }
           item.postInfo.save = !item.postInfo.save
          //  this.$message.success("收藏成功")
         }else if(res.errorCode == 'need_login'){
           this.$store.dispatch('user/SET_logStatus','login')
         }
       })
     },
     onCopy (e) {
      this.$message.success("内容已复制到剪切板！")
    },
     share(item){
      this.message = location.origin+'/p/'+item.postInfo.postId
     },
     toDetail(item){
       if(this.canTo){
         if(this.whichOne){
           localStorage.setItem('whichOne',this.whichOne)
         }
         this.canTo = false
         let obj ={
            list: this.lists
          };
          let top = this.$('.infinite-list').scrollTop();
          console.log('top',top);
          this.$('.infinite-list').animate({ scrollTop: top||"+=0" }, 1000);
          obj.top = top;
          obj.forumId = item.postInfo.forumId;
          obj.from = {
            params: this.$route.params,
            query: this.$route.query,
            path: this.$route.path
          };
          obj.pagenum = this.pagenum;
          obj.marker = this.marker;
          obj.key = this.keys;
          this.postBehavior(item.postInfo.postId,'detail');
          localStorage.setItem('storedata',JSON.stringify(obj))
          this.$router.push({name: 'articleDetail',params:{postId: item.postInfo.postId}})
          setTimeout(()=>{
            this.canTo = true
          },1000)
          
       }
       
      //  console.log(window.document.getElementsByClassName('infinite-list')[0].scrollTop)
     },
     toUrls(item,params){
       this.postBehavior(item.postInfo.postId,'jump');
       this.toUrl(params)
     },
     postBehavior(postId,action){
       api.postBehavior({postId,action}).then(res=>{

       })
     },
     toTop(){
       this.$('.infinite-list').animate({ scrollTop: 0 }, 200);
     },
     doImgStyle(w,h,type){
       if(document.body.clientWidth<700){
         // 适配移动端, 这里后续尽量封装成组件
         const temp = Math.ceil(document.body.clientWidth * 0.85);
         if(type == 'video'){
                return {
                  height: '235px'
                }
          }else{
            if(w<h&&h>temp){
                  return {
                    height: this.imgMaxWidth + 'px'
                  }
            }else{
              return {}
            }
          }
       } else {
         if(w<h&&h>512){
           return {
             height: '512px'
           }
         }else{
           return {}
         }
       }
     },
     getImageHeight(w,h){
       if(w<h&&h>512){
         let num;
         if(this.ISPHONE){
           num = '375'
         }else{
           num = '512'
         }
         return '512'
       }else{
         let num;
         if(this.ISPHONE){
           num = '375'
         }else{
           num = '512'
         }
         return h == null ? num: Math.min(Math.ceil(h),num).toString();
       }
     },
     doZan(v,item,index){
       if(v==1){//赞
          if(item.postInfo.vote!=1){
            if(item.postInfo.vote==-1){
              item.postInfo.ups += 2
            }else{
              item.postInfo.ups += 1
            }
            item.postInfo.vote=1;
            this.lists.splice(index,1,item)
            api.upvote_post({postId:item.postInfo.postId}).then(res=>{
              
            })
          }else if(item.postInfo.vote===1){
            item.postInfo.vote=0;
            item.postInfo.ups -= 1
            this.lists.splice(index,1,item)
            api.upvote_post({postId:item.postInfo.postId}).then(res=>{
              
            })
          }
       }else{//踩
          if(item.postInfo.vote!=-1){
            if(item.postInfo.vote==1){
              item.postInfo.ups -= 2
            }else{
              item.postInfo.ups -= 1
            }
            item.postInfo.vote=-1;
            this.lists.splice(index,1,item)
            api.downvote_post({postId:item.postInfo.postId}).then(res=>{
              
            })
          }else if(item.postInfo.vote===-1){
            item.postInfo.vote=0;
            item.postInfo.ups += 1
            this.lists.splice(index,1,item)
            api.downvote_post({postId:item.postInfo.postId}).then(res=>{
              
            })
          }
         
       }
     }
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
 @import './css/list.scss';
 .scroll_to_top_phone{
   position: fixed;
   width: 40px;
   height: 40px;
   right: 10px;
   bottom: 65px;
   cursor: pointer;
   img{
     width: 100%;
   }
 }

 .scroll_to_top{
     position: fixed;
     width: 40px;
     height: 40px;
     right: 80px;
     bottom: 65px;
     cursor: pointer;
     img{
         width: 100%;
     }
 }
  .module_name b{
    // padding-bottom: 2px;
  }
 .module_name b:hover{
   border-bottom: 1px solid #666;
 }
.coverss{
  width: 100%;
  height: 300px;
  filter: blur(30px);
  // -webkit-filter: blur(30);
}
.video{
  position: relative;
}
.btn_play{
  position: absolute;
  width: 60px;
  height: 60px;
  left: 20px;
  bottom: 20px;
}
.d_type{
    padding: 10px;
    background: #fff;
}
</style>
