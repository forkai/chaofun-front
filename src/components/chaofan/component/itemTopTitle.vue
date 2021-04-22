<template>
 <div>  
     <h1>
        <div>
            <img v-if="isindex" class="icon" :src="imgOrigin+item.forum.imageName+'?x-oss-process=image/resize,h_80'" alt="">
            <span @click.stop="" v-if="isindex" class="module_name">
                <b @click.stop="toUrls(item,{url: '/f/'+item.forumId, routeType:1})"> {{item.forum.name}} </b>
                <div class="hovercon">
                    <div>
                        <img style="" class="imgs" :src="imgOrigin+item.forum.imageName+'?x-oss-process=image/resize,h_80'" alt="">
                        <i style="font-style:normal;font-size:16px;">{{item.forum.name}}</i>
                    </div>
                    <div class="shu">
                        <div style="display:flex;justify-content: space-around;">
                        <div>{{item.forum.followers}}</div>
                        <div>{{item.forum.posts}}</div>
                        </div>
                        <div style="display:flex;justify-content: space-around;">
                        <div>粉丝</div>
                        <div>贴子</div>
                        </div>
                    </div>
                    <div style="text-align:center;">
                        <el-button  @click.stop="toUrls(item,{url: '/f/'+item.forumId, routeType:1})" type="success" size="mini">进入板块</el-button>
                    </div>
                    
                </div>
            </span> 来自 
            <span  class="username username_toHover">
                <b @click.stop="toUser(item.userInfo)">{{item.userInfo?item.userInfo.userName:'测试账号'}}</b>
                <div v-if="item.userInfo" :class="['hovercon',{'hovercon2':!item.userInfo.desc}]">
                <div style="display:flex;">
                    <img @click.stop="toUser(item.userInfo)" style="width:40px;height:40px;" class="imgs" :src="imgOrigin+item.userInfo.icon+'?x-oss-process=image/resize,h_80'" alt="">
                    <div>
                    <i @click.stop="toUser(item.userInfo)" style="font-style:normal;font-size:16px;">{{item.userInfo.userName}}</i>
                    <p style="font-size:12px;color:#999;">获赞：{{item.userInfo.ups}}</p>
                    </div>

                </div>
                <div v-if="item.userInfo.desc" class="shu">
                    <div>{{item.userInfo.desc}}</div>
                </div>
                <div v-if="!item.userInfo.desc" style="height:15px;">

                </div>
                <div style="text-align:center;">
                    <el-button  @click.stop="toAttention(item.userInfo.focused,item.userInfo.userId,item.userInfo)" :type="item.userInfo.focused?'info':'success'" size="mini">
                    {{item.userInfo.focused?'取消关注':'关注'}}
                    </el-button>
                </div>

                </div>
            </span>
            <span>大约 {{moment.duration(moment(item.gmtCreate) - moment()).humanize(true)}}</span>
        
        </div>
        <!-- <div v-if="isMy&&datas.type=='pub'" @click.stop="deletePost(item,index)" class="delete">删除</div> -->
        <div class="delete" v-if="item.canDeleted" @click.stop="deletePost(item,index)"><i class="el-icon-delete"></i> 删除</div>
    </h1>
 </div>
</template>

<script>
import * as api from '@/api/api'
import { Dialog } from 'vant';
import 'vant/lib/dialog/style';
import 'moment/locale/zh-cn'
import moment from 'moment'
 export default {
   name: '',
   data(){
     return {
         moment: moment,
         
     }
   },
   props: {
       item: {
           type: Object,
           default(){
               return {}
           }
       },
       isindex: {
         type: Boolean,
         default: false
       },
       index: {
         type: Number,
         default: 0
       },
   },
   components: {

   },
   created() {
   },
   mounted() {
    
   },
   methods: {
    deletePost(item,index){
       if(this.ISPHONE){
         Dialog.confirm({
            title: '删除确认',
            message: `是否确定删除帖子 【${item.title}】？`,
            messageAlign: 'left'
          }).then(() => {
            api.deletePost({postId: item.postId}).then(res=>{
              if(res.success){
                this.$message.success("已删除");
                // this.lists.splice(index,1)
                this.$emit('deletePost',index)
              }
            })
          }).catch(() => {
            // on cancel
          });
       }else{
         this.$confirm(`是否确定删除帖子 【${item.title}】？`, "提示", {
            type: "warning",
            // center: true,
            position: 'top'
          }).then(() => {
            api.deletePost({postId: item.postId}).then(res=>{
              if(res.success){
                this.$message.success("已删除");
                // this.lists.splice(index,1)
                this.$emit('deletePost',index)
              }
            })
          })
       }
       
       
    },
    toUrls(item,params){
       this.postBehavior(item.postId,'jump');
       this.toUrl(params)
    },
    postBehavior(postId,action){
       api.postBehavior({postId,action}).then(res=>{

       })
    },
    toAttention(bool,id,item){
      if(bool){
        api.toUnfocus({focusId: id}).then(res=>{
          if(res.success){
            // item.focused = !bool;
          }
        })
      }else{
        api.toFocus({focusId: id}).then(res=>{
          if(res.success){
            // item.focused = !bool;
          }
        })
      }
      this.lists.forEach(it=>{
        if(it.userInfo.userId == id){
          console.log()
          if(bool){
            it.userInfo.focused = false;
          }else{
            it.userInfo.focused = true;
          }
          
        }
      })
    },
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
h1{
    font-size: 13px;
    color: #666;
    line-height: 20px;
    // min-height: 50px;
    font-weight: normal;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .delete{
    font-size: 12px;
    color: #999;
        &:hover{
            color: $linkcolor;
        }
    }
    span{
        padding: 0 4px;
    }
    .module_name{
        // color: $linkcolor;
        font-weight: bold;
        cursor: pointer;
        position: relative;
        padding: 6px 0;
        font-size: 13px;
        &:hover .hovercon{
            display: block;
        }
    }
    .username_toHover{
        font-weight: bold;
        cursor: pointer;
        position: relative;
        padding: 6px 0;
        font-size: 13px;
        &:hover .hovercon{
            display: block;
            .shu{
                text-align: left;
                color: #999;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                height: 54px;
                overflow: hidden;
                margin-bottom: 4px;
            }
        }
        .hovercon2{
            height: 110px;
            .shu{
            margin-top: 20px;
            height: 20px;
            }
        }
    }
    .hovercon{
        font-weight: normal;
        position: absolute;
        z-index: 10;
        border: 1px solid #f1f1f1;
        width: 210px;
        height: 150px;
        padding: 12px !important;
        left: 0;
        top: 24px;
        background: #fff;
        display: none;
        box-shadow: 0 0 4px #f1f1f1;
        border-radius: 4px;
        .shu{
            color: #666;
            font-size: 12px;
            text-align: center;
            padding: 10px 0;
            div{
                flex: 1;
            }
        }
        i{
            font-style: normal;
        }
        span{
            color: #666;
        }
        .imgs{
            width: 30px;
            height:30px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .icon{
        width: 20px;
        height: 20px;
        vertical-align: top;
    }
}
</style>
