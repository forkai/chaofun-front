<template>
 <div style="padding:30px 0;">
     <div v-if="ifcanget&&!hasContent" class="list_empty">列表为空哦，请加入更多板块（首页）或者关注更多的用户（关注）呀~</div>
     <div v-if="!ifcanget" class="loading_text">
         {{loadAll?'没有更多了~':'正在加载......'}}
        <!-- <div v-if="loadAll"></div> -->
    </div>
 </div>
</template>

<script>
 export default {
   name: '',
   data(){
     return {

     }
   },
   props: {
       ifcanget: {
           type: Boolean,
           default: true
       },
       loadAll: {
           type: Boolean,
           default: false
       },
       hasContent: {
           type: Boolean,
           default: false
       }
   },
   components: {

   },
   created() {
   },
   mounted() {
     
   },
   methods: {
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>

 
</style>
