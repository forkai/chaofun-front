<template>
 <div>  
    <div v-if="!isDetail" @click="toDetail(item)" class="item_article">
                  <div class="title">
                    {{item.title}}
                  </div>
                  <div :class="['article',{'article_phone': ISPHONE}]">
                    <p  v-for="(_item,ins) in item.article.split('\n')" :key="ins">
                      <span v-html="_item"></span>
                    </p>
                    <div class="show_more">查看全文</div>
                  </div>
                </div>
    
    <div v-if="isDetail" class="item_article">
          <div class="title">
            {{item.title}}
          </div>
          <div @click.stop="" class="detail_line" :style="{width: ISPHONE?clientWidth-24+'px':''}">
            <p  v-for="(_item,ins) in item.article.split('\n')" :key="ins">
              <span v-html="_item"></span>
            </p>
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
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
.item_article{
    padding-bottom: 20px !important;
      .title{
        padding: 0 0 10px 0;
        font-size: 16px;
        font-weight: 600;
      }
      .article{
        padding-bottom: 10px;
        max-height: 265px;
        overflow: hidden;
        position: relative;
        .show_more{
          position: absolute;
          top: 200px;
          left: 0;
          width: 100%;
          text-align: center;
          height: 70px;
          line-height: 90px;
          z-index: 1;
          background: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 50%);
        }
      }
      .article_phone{
        max-height: 160px;
        .show_more{
          top: 110px;
          height: 50px;
          line-height: 60px;
        }
      }
    }
.item .item_article .article_phone{
    position: relative;
    // left: -50px;
  }
  .detail_line{
    line-height: 30px;
  }
</style>
