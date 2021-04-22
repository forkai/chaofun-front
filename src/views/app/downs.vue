<template>
 <div class="container">
     <div :style="{height:ISPHONE?'400px;':''}">
         <div class="topImg">
            <img src="../../assets/images/top_bg_mobile.png" alt="">
        </div>
        <div class="logo_con">
            <div style="height: 140px;">
                <img src="https://i.chao.fun/biz/9563cdd828d2b674c424b79761ccb4c0.png?x-oss-process=image/resize,h_80" alt="">
            </div>
            
            <div class="app_name">
                <img class="plat_icon" src="../../assets/images/icon/android.png" alt="">
                <img class="plat_icon" src="../../assets/images/icon/ios.png" alt="">
                <span>炒饭超Fun</span>
            </div>
            <div class="build_info">
                <div class="info_item"> iOS: 2.17.3| Android: 2.17.3 </div>
                <div class="info_item"> 更新时间 2021.03.29 </div>
            </div>
        </div>
        <div v-if="ISPHONE" class="down_btn">
            <div @click="sure" class="btn_green">安装</div>
        </div>
        <div v-else class="down_btn" style="text-align:center;">
            <img style="height:100%;height:210px;" src="../../assets/images/app.png" alt="">
            <p style="margin:10px 0;">扫一扫下载app</p>
        </div>
       <div class="home_btn">
         <div @click="back" class="btn_green">访问炒饭</div>
       </div>
     </div>
     
    <div class="detail">
        <div class="nav">
            <div class="nav_item">
                详情介绍
            </div>
            <!-- <div class="nav_item">
                版本介绍
            </div> -->
        </div>
        <div class="intos">
            <div class="detail_into">
                <div class="img_item">
                    <img src="../../assets/images/app/1.png" alt="">
                </div>
                <div class="img_item">
                    <img src="../../assets/images/app/2.jpg" alt="">
                </div>
                <div class="img_item">
                    <img src="../../assets/images/app/3.jpg" alt="">
                </div>
                <div class="img_item">
                    <img src="../../assets/images/app/4.jpg" alt="">
                </div>
            </div>
            <div class="desc">
                炒饭超Fun App是一款兴趣聚合的优质内容社区，聚合全网热门资讯、热门话题、优质好图等多个板块，在这里，你可以分享你喜欢的内容，分享奇趣、发现世界！
            </div>
        </div>
    </div>
    <div class="a">
        <!-- <input v-model="value" maxlength="6" placeholder="请输入下载口令" type="text"> -->
        
        <!-- <div @click="sure" class="btn">下载</div> -->
    </div>
    <div v-if="showCover" class="covers" @click="showCover=false">
         <img src="../../assets/images/icon/arrow.png" class="covers_img" alt="">
         <div class="cover_con">
             <div>
                 <img src="../../assets/images/icon/1.png" alt="">
                 点击右上角更多按键
             </div>
             <div>
                 <img src="../../assets/images/icon/2.png" alt="">
                 选择本地浏览器打开
             </div>
         </div>
     </div>
 </div>
</template>

<script>
import Vue from 'vue';
// import
 export default {
   name: '',
   data(){
     return {
         show: false,
         value: '',
         showCover: false
     }
   },
   components: {

   },
   created() {
   },
   mounted() {
        // var u = navigator.userAgent, app = navigator.appVersion;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // console.log(u);
        // console.log(this.ISPHONE,isAndroid,this.$route.query.from=='h5',!this.isWeiXin());
        // if(this.ISPHONE&&!isiOS&&this.$route.query.from=='h5'&&!this.isWeiXin()){
        //     // location.href = `opentest://host`;
        // }
     
   },
   methods: {
       back(){
           this.$router.push({path: '/'})
       },
    isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    },
    sure(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(!this.isWeiXin()){
            // if(this.value=='666666'){
            //     location.href = 'https://chao.fun/chaofan_test.apk'
            // }else{
            //     this.$toast('口令错误');
            // }
            
            if(isAndroid){
                location.href = 'https://chao.fun/chaofan.apk'
                // location.href = `opentest://host`;
            }else{
                location.href = 'https://apps.apple.com/cn/app/%E7%82%92%E9%A5%AD%E8%B6%85fun/id1526950194'
            }
        }else{
            if(isiOS){
                location.href = 'https://apps.apple.com/cn/app/%E7%82%92%E9%A5%AD%E8%B6%85fun/id1526950194'
            }else{
                this.showCover = true;
            }
            
        }
        
    },
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast('删除');
    },
   }
 }
</script>

<style type='text/scss' lang='scss' scoped>
.content {
  padding: 16px 16px 160px;
}
.topImg{
    height: 70px;

    img{
        width: 100%;
    }
}
.container{
    background: #f4f4f4;
    height: 100%;
    &::-webkit-scrollbar{
        display:none;
    }
    // background: url('https://i.chao.fun/biz/94aaa9cd9cdd920c969dd073ebb41869.jpg');
    
    // height: 100vh;
}
 .logo_con{
     padding: 0px 0 0px;
     text-align: center;
     
     img{
         width: 150px;
        border-radius: 8px;
     }
 }
 .app_name{
     color: #0A0D26;
     font-size: 14px;
     padding: 20px 0 10px;
     font-size: 18px;
     line-height: 40px;
     height: 80px;
     .plat_icon{
         width: 20px;
         vertical-align: middle;
         margin-top: -4px;
         margin-left: 8px;
     }
     span{
         padding-left: 10px;
     }
 }
 .build_info{
     display: flex;
     padding: 0 10px;
     .info_item{
         flex: 1;
         font-size: 14px;
         color: #788090;
         &:nth-child(1){
             border-right: 1px solid #DEE2EC;
         }
     }
 }
 .home_btn{
   padding: 0px 40px;
   .btn_green{
     background: #eed180;
     color: #fff;
     font-weight: 500;
     line-height: 44px;
     border-radius: 30px;
     text-align: center;
     font-size: 18px;
     cursor: pointer;
   }
 }
.down_btn{
  padding: 20px 40px;
  .btn_green{
    background: #28caad;
    color: #fff;
    font-weight: 500;
    line-height: 44px;
    border-radius: 30px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
  }
}
 .detail{
     background: #fff;
     .nav{
         display: flex;
         padding: 0 50px;
         margin-bottom: 20px;
         margin-top: 20px;
         border-bottom: 1px solid #eee;
         justify-content: space-between;
         .nav_item{
            //  flex: 1;
             line-height: 55px;
             text-align: center;
         }
     }
     .detail_into{
        //  width: 100%;
         overflow-x: scroll;
         display: flex;
         padding: 0 5px;
         padding-bottom: 20px;
         justify-content: space-between;
         &::-webkit-scrollbar{
            display:none;
        }
         .img_item{
             margin: 0 5px;
             border: 1px solid #eee;
             border-radius: 4px;
             img{
                width: 170px;
                
            }
         }
         
     }
     .desc{
         padding: 0 15px 30px;

     }
 }
 .a{
     width: 120px;
     margin: 0 auto;
     text-align: center;
     input{
         text-align: center;
         width: 120px;
     }
 }
 .btn{
     width: 120px;
     height: 40px;
     text-align: center;
     line-height: 40px;
     background: orangered;
     margin-top: 20px;
     color: #fff;
     border-radius: 4px;
 }
 .covers{
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 100;
     background: rgba(0,0,0,0.5);
     display: flex;
    //  align-items: center;
     justify-content: space-around;
     .cover_con{
         background: #fff;
        //  padding: 60px;
         border-radius: 10px;
         font-size: 18px;
         margin-top: 180px;
         height: 140px;
         text-align: center;
         padding: 30px 60px;
         line-height: 36px;
         img{
             width: 20px;
             height: 20px;
             vertical-align: middle;
         }
     }
     .covers_img{
         position: absolute;
         top: 30px;
         right: 40px;
         width: 100px;
     }  
 }
 .backto{
     text-align: center;
     color: #999;
     text-align: center;
     padding: 10px 0;
     width: 120px;
     margin: 0 auto;
     &:hover{
         text-decoration: underline;
         cursor: pointer;
         color: #28caad;
     }
 }
</style>
