<template>
 <div>
     <div v-if="items.type=='upvote_post'" class="zan">
         <div class="item">
            <span v-if="items.sender" @click.stop="toUser(items.sender)" class="username user_name">【{{items.sender.userName}}】</span>
            <span v-if="!items.sender">未登录访客</span>
            <span>{{moment.duration(moment(items.gmtCreate) - moment()).humanize(true)}}</span>
            <span>点赞了你的</span>
            <span @click="toDetail(items)" class="tiezi_title">【{{items.post.title.length>15?items.post.title.slice(0,15)+'...':items.post.title}}】</span>
        </div>
     </div>
     <div v-if="items.type=='upvote_comment'" class="zan">
         <div class="item">
            <span v-if="items.sender" @click.stop="toUser(items.sender)" class="username user_name">【{{items.sender.userName}}】</span>
            <span v-if="!items.sender">未登录访客</span>
            <span>{{moment.duration(moment(items.gmtCreate) - moment()).humanize(true)}}</span>
            <span>点赞了你在</span>
            <span @click="toDetail(items)" class="tiezi_title">【{{items.post.title.length>15?items.post.title.slice(0,15)+'...':items.post.title}}】</span>
            <span>下的评论</span>
         </div>
     </div>
     <!-- {{items.type}} -->
     <div v-if="items.type=='comment_post'" class="pinlun">
         <div class="item">
            <span v-if="items.sender" @click.stop="toUser(items.sender)" class="username user_name">【{{items.sender.userName}}】</span>
            <span v-if="!items.sender">未登录访客</span>
            <span>{{moment.duration(moment(items.gmtCreate) - moment()).humanize(true)}}</span>
            <span>评论了你的</span>
            <span @click="toDetail(items)" class="tiezi_title">【{{items.post.title.length>15?items.post.title.slice(0,15)+'...':items.post.title}}】</span>
         </div>
         <div class="comment">
             <!-- <img :src="imgOrigin+items.sender.icon+'?x-oss-process=image/resize,h_80'" alt=""> -->
             <span></span>评论说： {{items.comment.text}}<span></span>
         </div>
     </div>
     <div v-if="items.type=='sub_comment'" class="pinlun">
         <div class="item">
            <span v-if="items.sender" @click.stop="toUser(items.sender)" class="username user_name">【{{items.sender.userName}}】</span>
            <span v-if="!items.sender">未登录访客</span>
            <span>{{moment.duration(moment(items.gmtCreate) - moment()).humanize(true)}}</span>
            <span>回复了评论</span>
            <span @click="toDetail(items)" class="tiezi_title">【{{items.post.title.length>15?items.post.title.slice(0,15)+'...':items.post.title}}】</span>
         </div>
         <div class="comment">
             <!-- <span></span>评论说： {{items.comment.text}}<span></span> -->
             <span>
                 {{items.comment.userInfo.userName}} @ {{items.parentComment.userInfo.userName}} ：{{items.comment.text}}
             </span>
             <!-- <div>
                 {{items.parentComment.userInfo.userName}}说：{{items.parentComment.text}}
             </div> -->
         </div>
     </div>
 </div>
</template>

<script>
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
       items: {
           type: Object,
           default(){
               return {}
           }
       }
   },
   components: {

   },
   created() {
   },
   mounted() {
     
   },
   methods: {
       toDetail(item){
            // this.$router.push({name: 'articleDetail',params:{postId: item.post.postId}})
            let routeData = this.$router.resolve({
                name: "articleDetail",
                params: {postId: item.post.postId},
            });
            window.open(routeData.href, '_blank');
        },
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
.item{
    background: #fff;
    
    // border-bottom: 1px solid #f1f1f1;
    width: 100%;

    span{
        padding: 0 2px;
    }
}
.pinlun,.zan{
    padding: 18px 10px;
    background: #fff;
    margin-bottom: 6px;
    border-radius: 4px;
    overflow: hidden;
}
.pinlun{
    // border-bottom: 1px solid #f1f1f1;
    padding-bottom: 10px;
    .item{
        border-bottom: none;
    }
}
.comment{
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 6px;
    border: 1px solid #f1f1f1;
    background: #f1f1f1;
}
 .user_name,.tiezi_title{
     font-weight: normal;
    font-size: 13px;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
        color: #1890ff;
    }
 }
 .tiezi_title{
     color: #000;
    font-weight: 600;
    line-height: 20px;
 }
</style>
