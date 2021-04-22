<template>
 <div>  
    <div  v-if="item.type == 'image'" class="item_image">
        <div class="title">
            {{item.title}}
        </div>
        <div @click.stop="" v-if="item.imageNums==1" class="imgs">
            <viewer :images="[imgOrigin+item.imageName]">
                <img :src="imgOrigin+item.imageName" v-if="isDetail" :style="doImgStyle(item.width,item.height)" :alt="item.title" :title="item.title">
                <img :src="imgOrigin+item.imageName+ (item.imageName.includes('.gif')? '': '?x-oss-process=image/resize,h_512')" :data-source="imgOrigin+item.imageName" v-if="!isDetail" :style="doImgStyle(item.width,item.height)" :alt="item.title" :title="item.title">
            </viewer>
        </div>
        <div @click.stop="" v-if="item.imageNums!=1" class="imgLists">
            <viewer :images="item.images">
                <div v-for="(item2,index2) in item.images" :key="index2" :class="doImgClass(item.images)" :style="doMoreImgStyle(item,item2)" :alt="item.title" :title="item.title">
                <img  style="opacity:0;" :data-source="imgOrigin+item2" :src="imgOrigin+item2+ (item2.includes('.gif')? '': ('?x-oss-process=image/resize,h_' + getImageHeight(item.width, item.height)))"  :key="item2" :alt="item.title" :title="item.title">
                </div>
            </viewer>
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
         default: false,
       },
       isindex: {
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
    doImgClass(imgs){
       if(imgs.length==2||imgs.length==4){
         return 'two_img'
       }else{
         return 'three_img'
       }
     },
    doMoreImgStyle(item,item2){
        return {
          // 'width':
          'height':(231*item.height/item.width)+'px',
          'background-image':`url(${this.imgOrigin+item2})`
        }
    },
    getImageHeight(w,h){
        if(this.isDetail){
            if(w<h&&h>512){
                return '512'
            }else{
                return h == null ? '512': Math.min(Math.ceil(h),512).toString();
            }
        }else{
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
        }
        
    },
    doImgStyle(w,h,type){
       if(document.body.clientWidth<700){
         // 适配移动端, 这里后续尽量封装成组件
         const temp = Math.ceil(document.body.clientWidth * 0.85);
            if(w<h&&h>temp){
                    return {
                        height: this.imgMaxWidth + 'px'
                    }
            }else{
                return {}
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
.item_image{
    // padding: 0 10px;
    width: 100%;
    .title{
        padding: 0 0 10px 0;
        font-size: 16px;
        font-weight: 600;
    }
    .imgs{
        text-align: center;
        // width: 640px;
        max-height: 512px;
        overflow-y: hidden;
        img{
            max-width: 100%;
            margin: 0 auto;
            // max-height: 100%;
            border-radius: 4px;
        }
    }
}
.item_image{
    width: 100%;
    .imgs{
        max-height: 2500px;
        border-radius: 10px;
    }
}
.imgLists{
  display: flex;
  flex-flow: wrap;
  img{
    max-width: 100%;
    max-height: 100%;
  }
  .two_img{
    flex: 0 0 48%;
    margin: 1px;
    max-height: 450px;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #f7f7f7;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .three_img{
    flex: 0 0 32.5%;
    margin-top: 2px;
    margin-right: 0.5%;
    max-height: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #f7f7f7;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}

 .imgLists{
  display: flex;
  flex-flow: wrap;
  margin-bottom: 4px;
  img{
    max-width: 100%;
    max-height: 100%;
  }
  .two_img{
    flex: 0 0 48%;
    margin: 1px;
    max-height: 450px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #f7f7f7;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .three_img{
    flex: 0 0 32.5%;
    margin-top: 2px;
    margin-right: 0.5%;
    max-height: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #f7f7f7;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
.imgLists>div{
  width: 100%;
  display: flex;
  flex-flow: wrap;
}
</style>
