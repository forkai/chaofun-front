<template>
 <div>  
    <div class="item_video">
        <div class="title">
            {{item.title}}
        </div>
        <div class="video">
            <video :class="[isDetail?'video2':'']" webkit-playsinline='true' playsinline='true' autoplay controls loop  :src="imgOrigin+item.imageName" alt=""></video>
        </div>
    </div>
 </div>
</template>

<script>
import * as api from '@/api/api'
 export default {
   name: '',
   data(){
     return {
         
     }
   },
   props: {
       item: {
           type: Object,
           default(){
               return {}
           }
       },
       isDetail: {
         type: Boolean,
         default: false
       },
   },
   components: {

   },
   created() {
   },
   mounted() {
    
   },
   methods: {
    toUrls(item,params){
       this.postBehavior(item.postId,'jump');
       this.toUrl(params)
    },
    doImgStyle(w,h,type){
       if(document.body.clientWidth<700){
         // 适配移动端, 这里后续尽量封装成组件
         const temp = Math.ceil(document.body.clientWidth * 0.85);
         if(type == 'video'){
             if(this.isDetail){
                 return {
                  height: '512px'
                }
             }else{
                 return {
                  height: '235px'
                }
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
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
.item_video{
      .title{
        padding: 0 0 10px 0;
        font-size: 16px;
        font-weight: 600;
      }
      .video{
        text-align: center;
        // width: 640px;
        max-height: 512px;
        overflow-y: hidden;
        video{
          width: 100%;
          height: 300px;
          background: #000;
          margin: 0 auto;
        }
        .video2{
            height: 512px;
        }
      }
    }
</style>
