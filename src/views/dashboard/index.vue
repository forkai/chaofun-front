<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="container infinite-list" ref="container" :style="{height: scrollHeight+'px'}">
      <el-row :gutter="20">
        <el-col :span="ISPHONE?24:doWidth()" :offset="doOffSet()">
          <div class="navs" style="display:flex;justify-content:space-between;">
            <div v-if="!isRecommend && !ISPHONE">
              <el-select v-model="params.order" placeholder="请选择" @change="changes"
                         style="padding: 10px 0;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <el-select v-if="params.order ==='ups'" v-model="params.range" placeholder="请选择"
                         @change="changes" style="padding: 10px 0; ">
                <el-option
                    v-for="item in ranges"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-if="!isRecommend && ISPHONE">
              <div style="position:relative; float: left;">
                <select v-model="params.order"
                        style="-webkit-appearance: none;height:20px;padding:6px 20px;padding-right:30px;box-sizing:content-box;margin:10px 0;border-color:#999;background:#fff;"
                        placeholder="请选择12" @change="changes" name="" id="">
                  <option v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">{{item.label}}
                  </option>
                </select>
                <i class="el-icon-arrow-right" style="position:absolute;right:8px;top:20px;"></i>
              </div>
              <div v-if="params.order ==='ups'" style="position:relative; float: left;">
                <select v-model="params.range"
                        style="-webkit-appearance: none;height:20px;padding:6px 20px;padding-right:30px;box-sizing:content-box;margin-top:10px;border-color:#ccc;background:#fff;"
                        placeholder="请选择" @change="changes" name="" id="">
                  <option v-for="item in ranges"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">{{item.label}}
                  </option>
                </select>
                <i class="el-icon-arrow-right" style="position:absolute;right:8px;top:20px;"></i>
              </div>
            </div>
            <div @click="reFresh" v-if="isRecommend&&ISPHONE" style="font-size:32px;padding: 6px 0px 0 0px;color:#999;">
              <i class="el-icon-refresh"></i>
            </div>
            <div v-if="ISPHONE" class="search_icon">
              <i class="el-icon-search"></i>
              <el-input
                  class="search_input"
                  placeholder="搜索"
                  prefix-icon="el-icon-search"
                  @change="toSearch(keyword)"
                  v-model="keyword">
              </el-input>
            </div>
          </div>

          <!-- <div>123</div>  -->
          <div class="grid-content"
               style="overflow: auto;-webkit-overflow-scrolling: touch; width: 640px; max-width: 100%">
            <ListItem :marker="params.marker" :keys="params.key" :isindex="true" :lists="lists"></ListItem>
            <load-text :ifcanget="ifcanget" :loadAll="loadAll"></load-text>
          </div>
        </el-col>
        <el-col v-if="!ISPHONE&&clientWidth>865" :span="4" :offset="0">
          <div v-if="!ISPHONE" style="min-width:300px;padding-top: 60px;" class="grid-content bg-purple content-right">
            <RightDescribe :forumInfo="forumInfo" @getForumInfo="getForumInfo" :islogin="islogin"></RightDescribe>
          </div>
        </el-col>
      </el-row>
    </div>

    <div @click="reFresh" v-if="isRecommend&&ISPHONE"
         style="position:absolute;right:20px;bottom: 30px;z-index:100;padding:20px;background:#fff;border-radius:40px;font-size:32px;padding: 6px 0px 0 0px;color:#999;">
      <i class="el-icon-refresh"></i>
    </div>
    <fixedBottom></fixedBottom>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import adminDashboard from './admin'
  import editorDashboard from './editor'
  import * as api from '../../api/api'

  import ListItem from '../../components/chaofan/ListItem.vue'
  import RightDescribe from '@/components/chaofan/RightDescribe'
  import loadText from '@/components/chaofan/loadText'
  import VirtualList from 'vue-virtual-listview'
  import fixedBottom from '@/components/chaofan/fixedBottom'

  export default {
    name: 'Dashboard',
    // components: { adminDashboard, editorDashboard },
    data() {
      return {
        currentRole: 'adminDashboard',
        count: 5,
        lists: [],
        params: {
          pageSize: 40,
          marker: '',
          order: localStorage.getItem('chao.fun.timeline.order') == null ? 'hot' : localStorage.getItem('chao.fun.timeline.order'),
          range: localStorage.getItem('chao.fun.timeline.range') == null ? '1hour' : localStorage.getItem('chao.fun.timeline.range')
        },
        options: [
          {
            label: '最新',
            value: 'new'
          },
          {
            label: '最热',
            value: 'hot'
          },
          {
            label: '热评',
            value: 'comment'
          },
          {
            label: '最赞',
            value: 'ups'
          },

        ],
        ranges: [
          {
            label: '现在',
            value: '1hour'
          },
          {
            label: '一天',
            value: '1day'
          },
          {
            label: '一周',
            value: '1week'
          },
          {
            label: '一个月',
            value: '1month'
          },
          {
            label: '一年',
            value: '1year'
          },
          {
            label: '全部',
            value: 'all'
          },
        ],
        isPhone: false,
        ifcanget: true,
        loadAll: false,
        keyword: '',
        isRecommend: false,
        forumInfo: null,
      }
    },
    components: {
      ListItem,
      RightDescribe,
      loadText,
      VirtualList,
      fixedBottom
    },
    computed: {
      ...mapGetters([
        'roles',
        'islogin'
      ])
    },
    mounted() {
      if (document.body.clientWidth < 700) {
        this.isPhone = true
      }
      if (this.$route.path.includes('/all')) {
        this.$store.dispatch('var/SET_formName', '全站')
      } else if (this.$route.path.includes('/recommend')) {
        this.$store.dispatch('var/SET_formName', '推荐')
      } else {
        this.$store.dispatch('var/SET_formName', '首页')
      }
      this.keyword = this.$route.query.q;
      this.toPosition()
      // console.log('scrollHeight',this.scrollHeight)
      let self = this;
      this.$refs.container.addEventListener("scroll", function () {
        let scrollTop = self.$refs.container.scrollTop;
        let conTop = self.$refs.container.scrollTop
        // 变量windowHeight是可视区的高度
        let conHeight = self.$refs.container.clientHeight;
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = self.$refs.container.scrollHeight - 4;
        //  console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
        console.log(conTop, conHeight, scrollHeight)
        if (conTop + conHeight > scrollHeight || conTop + conHeight == scrollHeight) {
          console.log('到底了')
          if (self.ifcanget) {
            // self.load()
            self.getLists()
          }

        }
      });
    },
    created() {
      // 小程序复制链接
      console.log(this.$route.meta);
      if (this.$route.query.type == 1) {
        let url = decodeURI(this.$route.query.url)
        console.log('url', url)
        this.$dialog.confirm({
          title: '',
          message: '是否前往你复制的链接？',
        })
          .then(() => {
            // on confirm

            window.open(url, '_blank');
            history.replaceState({page: 3}, "title 3", '' + this.$route.path);
          })
          .catch(() => {
            // on cancel
          });
      }
      if (this.$route.path.includes('recommend')) {
        this.isRecommend = true;
        delete this.params.order;
      }
      if (!this.roles.includes('admin')) {
        this.currentRole = 'editorDashboard'
      }
      if (this.$route.path == '/all') {
        this.params.forumId = 'all'
        this.forumInfo = {
          imageName: 'c1aaa496ec1ba20373225d232006ffdc.png',
          name: '全站',
          desc: '聚集所有板块的最新，最热的帖子'
        }
      }

      if (this.$route.path == '/recommend') {
        this.params.forumId = 'recommend'
        this.forumInfo = {
          imageName: '9f4736714abf8139e8cf06b2e56b7305.png',
          name: "推荐",
          desc: '炒饭为您个人推荐的优质内容，希望您能喜欢',
        }
      }
      if (this.$route.path == '/' && !this.islogin) {
        this.params.forumId = 'all';
        this.forumInfo = {
          imageName: 'c1aaa496ec1ba20373225d232006ffdc.png',
          name: '全站',
          desc: '聚集所有板块的最新，最热的帖子'
        }
      } else if (this.$route.path == '/' && this.islogin) {
        this.params.forumId = 'home';
        this.forumInfo = {
          imageName: '07453f3b30076cf0e1ab39ff62fcce0f.png',
          name: '首页',
          desc: '您加入板块的内容聚合'
        }
      }
      // if(!localStorage.getItem('storedata')){
      //     this.getLists()
      // }
      this.load()
    },
    methods: {

      getForumInfo() {
        console.log("getForumInfo")
      },
      gotologin() {
        console.log(this.$store.state)
        this.$store.dispatch('user/SET_logStatus', 'login')
      },
      gotoSubmit() {

      },
      changes() {
        localStorage.setItem('chao.fun.timeline.order', this.params.order);
        localStorage.setItem('chao.fun.timeline.range', this.params.range);
        // this.params.pageNum = 1;
        delete this.params.marker;
        delete this.params.key;
        this.lists = []
        this.getLists();
      },
      getLists() {
        let params = this.params;
        this.ifcanget = false;

        api.getHome(params).then(res => {
          console.log(res)
          this.ifcanget = true;

          if (res.data.marker) {
            params.marker = res.data.marker;
          } else {
            this.loadAll = true
          }
          if (res.data.posts.length < this.params.pageSize) {
            this.loadAll = true
          }
          if (params.order == 'hot') {
            params.key = res.data.key
          } else {
            delete params.key
          }
          if (this.$route.path.includes('recommend')) {
            params.key = res.data.key
          }

          // if(this.lists.length>200||this.lists.length==200){
          //   let list = JSON.parse(JSON.stringify(this.lists)).slice(30);
          //   list.push(...res.data.posts)
          //   this.$set(this,'lists',list)
          // }else{
          this.lists.push(...res.data.posts)
          // }

        })
      },
      load() {
        console.log(111);
        if (localStorage.getItem('storedata')) {
          this.lists = JSON.parse(localStorage.getItem('storedata')).list;
          this.params.marker = JSON.parse(localStorage.getItem('storedata')).marker;
          this.params.key = JSON.parse(localStorage.getItem('storedata')).key;
        } else {
          if (this.ifcanget) {
            // this.params.pageNum += 1;
            // this.params.marker = '';
            this.getLists()
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

  .asa {
    background: #fff;

    margin-bottom: 20px;
    // display: flex;
  }

  .forum_con {
    padding: 10px;
    background: #fff;
    margin-left: 10px;
    margin-bottom: 20px;
    width: 270px;
    display: block;
    box-sizing: border-box;
    // min-height: 300px;
    .fir {
      display: flex;

      img {
        width: 50px;
        height: 50px;
        // border-radius: 50%;
      }

      div {
        flex: 1;
        padding-left: 20px;
        line-height: 50px;
      }
    }

    .fensi {
      display: flex;
      line-height: 24px;
      padding: 20px 0;

      div {
        font-size: 14px;
        color: #666;
        flex: 1;
        text-align: center;

      }

      div:nth-child(1) {
        border-right: 1px solid #ddd;
      }
    }

    .forum_desc {
      color: #666;
      font-size: 14px;
      margin-bottom: 30px;
    }

    .forum_add {
      margin-bottom: 10px;
    }

    .el-button {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin: 10px 0;
    }
  }

  .tologin {
    background: #fff;
    border: 1px solid #f1f1f1;

    div {
      padding: 14px;
      border-bottom: 1px solid #f1f1f1;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        color: $linkcolor;
      }
    }
  }

  .search_icon {
    line-height: 56px;
    font-size: 24px;
    margin-right: 10px;
    position: relative;
    z-index: 1;
    width: 100px;
    /*margin-left: 40px;*/

    .search_input {
      position: absolute;
      top: 0;
      width: 100%;
      right: 0;
    }
  }


  /deep/ .el-input--medium .el-input__inner {
    height: auto;
    line-height: normal;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  /deep/ .el-scrollbar {
    > .el-scrollbar__bar {
      opacity: 1 !important;
    }
  }

</style>
