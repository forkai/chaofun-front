<template>
 <div>  
     <div class="covers">
         <video class="videos" autoplay controls :src="videoData"></video>
     </div>
 </div>
</template>

<script>
 export default {
   name: '',
   data(){
     return {
         addForm: {
             targetForumId: ''
         },
         options: [],
         loading: false,
         targetForumId: ''
     }
   },
   props: {
       datas: {
           type: Object,
           default(){
               return {}
           }
       },
       videoData: {
           type: String,
           default: ''
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
.covers{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
    .videos{
        width: 80%;
        height: 50vh;
    }
    .content{
        width: 340px;
        background: #fff;
        height: 380px;
        border-radius: 4px;
        margin-top: 24%;
    }
}
/deep/ .el-form-item{
    margin-bottom: 20px !important;
}
</style>
