<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div style="font-weight: bold; font-size: 28px">做国内最好的内容社区</div>
    <div style="display: flex">
      <div style="width: 500px">
        <div>设置推送内容</div>
        <div>
          <div>
            <div style="max-width:600px;margin-top:10px;">
              <el-input type="textarea"  maxlength="56" v-model="params.title" style="resize:none;overflow:hidden;" placeholder="请设置推送标题"></el-input>
            </div>
            <div style="max-width:600px;margin-top:10px;">
              <el-input type="textarea"  maxlength="56" v-model="params.body" style="resize:none;overflow:hidden;" placeholder="请设置推送内容"></el-input>
            </div>
            <div style="max-width:600px;margin-top:10px;">
              <el-input type="textarea"  maxlength="56" v-model="params.url" style="resize:none;overflow:hidden;" placeholder="请设置推送链接"></el-input>
            </div>
            <div style="max-width:600px;margin-top:10px;">
              <el-input type="input"  maxlength="56" v-model="params.platform" style="resize:none;overflow:hidden;" placeholder="填写 'ios'、'android'、或 'all' (不用引号)"></el-input>
            </div>
            <el-button @click="push" block>推送消息</el-button>
          </div>
          <div style="margin-top: 20px">
            <div style="font-weight: bold">
              统计信息
            </div>
            <div>秘密花园队列: {{this.websiteInfo.secretDelay}}</div>
            <div>24小时注册用户数: {{this.websiteInfo.past24HRegisters}}</div>
            <div>24小时帖子数: {{this.websiteInfo.past24HPosts}}</div>
            <div>24小时评论数: {{this.websiteInfo.past24HComments}}</div>
            <div>24小时登录点赞数: {{this.websiteInfo.past24HLoginVoteCount}}</div>
            <div>24小时原创帖子数: {{this.websiteInfo.past24HOriginPosts}}</div>
            <div>总注册用户: {{this.websiteInfo.totalRegisters}}</div>
            <div>百度收录数: {{this.websiteInfo.baiduIncluded}}</div>
          </div>

          <div style="margin-top: 20px">
            <div style="font-weight: bold">
              设置活动</div>
            <div >
              <div style="max-width:600px;margin-top:10px;">
                <el-input type="textarea"  maxlength="56" v-model="activity.title" style="resize:none;overflow:hidden;" placeholder="请设置活动标题"></el-input>
              </div>
              <div style="max-width:600px;margin-top:10px;">
                <el-input type="textarea"  maxlength="56" v-model="activity.url" style="resize:none;overflow:hidden;" placeholder="请设置活动链接（必填）"></el-input>
              </div>
              <div style="max-width:600px;margin-top:10px;">
                <el-input type="textarea"  maxlength="56" v-model="activity.imageName" style="resize:none;overflow:hidden;" placeholder="请设置活动图片"></el-input>
              </div>
              <div style="max-width:600px;margin-top:10px;">
                <el-input type="textarea"  maxlength="56" v-model="activity.status" style="resize:none;overflow:hidden;" placeholder="请设置活动状态，如果为文字活动则是 'word', 如果是图片活动则是 'image' "></el-input>
              </div>
              <el-button @click="save_active" block>保存活动</el-button>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-left: 30px">
        <div style="font-size: 20px">评论列表</div>
        <div v-for="item in comments">
          <pre>评论:<a :href="'/p/' + item.postId">{{item.text.replace('\n','')}}</a>     用户: <a :href="'/user/' + item.userInfo.userId">{{item.userInfo.userName}}</a></pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from '../../api/api'
  import { Dialog } from 'vant';

  export default {
    data() {
      return {
        websiteInfo: '1',

        comments: [],
        params: {
          title: '',
          body: '',
          platform: '',
          url: '',
        },
        activity: {
          title: '',
          url: '',
          status: '',
          imageName: '',
        }
      }
    },
    mounted(){
      api.getWebsiteInfo({}).then(res => {
        this.websiteInfo = res.data;
      });

      api.listAllComments({pageSize: 40, pageNum: 1}).then(res => {
        this.comments = res.data;
      });


      api.getActivity({}).then(res => {
        if (res.success && res.data != null) {
          this.activity = res.data;
        }
      });
    },

    methods: {
      push() {
        Dialog.confirm({
          title: '确认推送',
          message: `是否确定推送 \n标题: ${this.params.title}\n内容: ${this.params.body}\n 平台：${this.params.platform} `,
          messageAlign: 'left'
        }).then(() => {
          api.push(this.params).then()(res => {
            if (res.success) {
              location.reload();
            } else {
              this.$toast(res.errorMessage)
            }
          });
        }).catch(() => {
          // on cancel
        });
      },

      save_active() {
        api.save_activity(this.activity).then()(res => {
          if (res.success) {
            location.reload();
          } else {
            this.$toast(res.errorMessage)
          }
        });
      }
    }
  }
</script>