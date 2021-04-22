<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="container">
        <div class="title">设置板块 ICON</div>
        <div>
            <el-upload
            class="avatar-uploader"
            action="/api/upload_image"
            name="file"
            :data="filedata"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="forumInfo.imageName" :src="imgOrigin + forumInfo.imageName" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
      <div class="title">设置板块描述</div>
      <div style="max-width:600px;margin-top:10px;">
          <el-input type="textarea" @blur="toSign" maxlength="56" v-model="desc" style="resize:none;height:100px !important;overflow:hidden;" placeholder="请设置板块介绍"></el-input>
        </div>
      <div class="title">累计版主激励: {{modInfo.money}} 元 </div>
      <div style="margin-top:0;line-height:24px;margin-bottom: 10px" slot="tip">(按照每日板块活跃度分配，每日3点过5分更新，请加微信: wwwchaofun 提取, 多版主板块请协商提取)</div>
      <div class="title">24小时帖子数: {{modInfo.past24HPosts}} </div>
      <div class="title">24小时帖子获赞数(不包括楼主自己的赞): {{modInfo.past24HVotes}} </div>
      <div class="title">24小时全站板块综合排名: {{modInfo.rank}} </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '../../api/api'

import ListItem from '../../components/chaofan/ListItem.vue'
import RightCom from '@/components/chaofan/RightCom'
import loadText from '@/components/chaofan/loadText'

// 板块设置
export default {
  name: 'user',
  data() {
    return {
      params: {
        forumId: '',
      },
      forumId: '',
      imageUrl: '',
      filedata: {},
      desc: '',
      forumInfo: '',
      modInfo: ''
    }
  },
  components: {
    ListItem,loadText
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      'roles',
      'islogin'
    ])
  },
  mounted(){
    if(document.body.clientWidth<700){
      this.isPhone = true
    }
    this.toPosition()
  },
  created() {


    this.forumId = this.params.forumId;

    if (this.forumId === '' || this.forumId === undefined) {
      this.forumId = this.$route.path.split('/')[2];
    }
    this.getForumInfo();
    // console.log('a',this.$store.state.user.userInfo)
    // this.desc = this.$store.state.user.userInfo.desc;
    // this.imageUrl = this.imgOrigin+this.$store.state.user.userInfo.icon;

    // this.filedata.fileName = this.$store.state.user.userInfo.icon;
    // this.filedata.name = this.$store.state.user.userInfo.icon;
    // this.filedata.url = this.imgOrigin+this.$store.state.user.userInfo.icon;
  },

  methods:{
    getForumInfo() {
      api.getForumInfo({forumId: this.forumId}).then(res => {
        this.forumInfo = res.data;
        this.desc = this.forumInfo.desc;
      })

      api.getModInfo({forumId: this.forumId}).then(res => {
        this.modInfo = res.data;
      })
    },

    toSign(){

      api.setForumDesc({forumId: this.forumId, desc: this.desc}).then(res=>{
        if(res.data){
          this.$toast('设置签名成功');
        } else {
          this.$toast('设置签名失败，您还不是管理员?');
        }
      })
    },
    handleAvatarSuccess(res, file) {
        console.log(this.filedata)
        console.log(res);
        if(res.success){
          this.imageUrl = URL.createObjectURL(file.raw);
          api.setForumIcon({forumId: this.forumId, imageName: res.data}).then(res=>{
            if(res.data){
              this.$toast('设置板块 ICON 成功');
            } else {
              this.$toast('设置板块 ICON 失败，您还不是管理员?');
            }
          })
        }else if(res.errorCode=='invalid_content'){
          // this.imageUrl = ''
          this.$toast(res.errorMessage)
        }
        
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
          return false
        }
        this.filedata.fileName = file.name
        return true
      }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /deep/ .el-upload{
      border: 1px dashed #999;
      border-radius: 10px;
  }
  .container{
      padding: 40px;
      background: #fff;
      .title{
          font-size: 18px;
          margin-bottom: 12px;
      }
  }
</style>
