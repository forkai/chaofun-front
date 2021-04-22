<template>
 <!-- <div :class="['content',{'content2':ISPHONE}]">
   <div class="container infinite-list" v-infinite-scroll="load">
     <noticeItem v-for="(item,index) in message" :key="index" :items="item"></noticeItem>
   </div>
 </div> -->
 <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="container" ref="container" :style="{height: scrollHeight+'px'}">
      <el-row :gutter="20">
        <el-col :span="ISPHONE?24:doWidth()" :offset="doOffSet()" >  
          <div class="grid-content"  style="overflow:auto; width: 640px; max-width: 100%;">
            <div class="title">我的消息</div>
            <div v-if="message.length">
              <noticeItem v-for="(item,index) in message" :key="index" :items="item"></noticeItem>
              <load-text :ifcanget="ifcanget" :loadAll="loadAll" :hasContent="Boolean(message.length)"></load-text>
            </div>
            <div v-else class="nothing">
              <img src="../../assets/images/kk.png" alt="">
              <p>还没有消息哦~</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
 </div>
</template>

<script>
import noticeItem from '@/components/chaofan/noticeItem'
import loadText from '@/components/chaofan/loadText'
import * as api from '../../api/api'
 export default {
   name: '',
   data(){
     return {
         params: {
             pageSize: 20,
            //  marker: ''
         },
         message: [],
         ifcanget: true,
         loadAll: false
     }
   },
   components: {
       noticeItem,loadText
   },
   created() {
       this.load()
   },
   mounted() {
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
            self.messageList()
          }
        }
      });
   },
   methods: {
     load(){
       if(this.ifcanget){
         this.messageList()
       }
       
     },
    messageList(){
      let params = this.params;
      this.ifcanget = false
      api.messageList(params).then(res=>{
        // this.message = res.data.messages;
        if(res.data.marker&&(res.data.size == this.params.pageSize)){
          this.ifcanget = true
        }
        if(res.data.marker){
          params.marker = res.data.marker;
        }else{
          if(res.data.size<this.params.pageSize){
            console.log(res.data.size)
            this.loadAll = true
          }
        }
        if(res.data.size<this.params.pageSize){
          this.loadAll = true
        }
        this.message.push(...res.data.messages)
        
      })
    },
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
.content{
    // width: 640px;
    // margin: 40px auto;
    // margin-left: 100px;
    // background: #fff;
    padding: 30px;
}
 .content2{
   padding:10px
 }
 .title{
   font-size: 16px;
   padding: 10px 0;
 }
 .nothing{
   text-align: center;
   font-size: 14px;
   color: #999;
   img{
     width: 50%;
   }
 }
</style>
