import request from '@/utils/request'
import qs from 'qs'


export function getHome(params) {
  return request({
    // url: '/api/list_combine',
    url: '/api/v0/list_combine',
    method: 'get',
    params
  })
}

export function getMenu(params) {
  return request({
    url: '/api/get_menu',
    method: 'get',
    params
  })
}

export function toLogin(params) {
  return request({
    url: '/api/login',
    method: 'get',
    params
  })
}

export function toRegister(params) {
  return request({
    url: '/api/register',
    method: 'get',
    params
  })
}


/** 发布文本帖子 */
export function submitArticle(params) {
  return request({
    url: '/api/v0/submit_article',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/** 发布投票帖子 */
export function submitVote(params) {
  return request({
    url: '/api/v0/submit_vote',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 投票
export function toVote(params) {
  return request({
    url: '/api/v0/post/vote',
    method: 'get',
    params
  })
}

// 围观
export function circusee(params) {
  return request({
    url: '/api/v0/post/circusee',
    method: 'get',
    params
  })
}




/** 删除帖子 */
export function deletePost(params) {
  return request({
    url: '/api/delete_post',
    method: 'get',
    params
  })
}

/** 上传图片 */
export function uploadImage(params) {
  return request({
    url: '/api/upload_image',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  })
}

/** 转发帖子 */
export function submitForward(params) {
  return request({
    url: '/api/v0/submit_forward',
    method: 'get',
    params
  })
}


/** 收藏帖子 */
export function savePost(params) {
  return request({
    url: '/api/v0/save_post',
    method: 'get',
    params
  })
}

/** 收藏帖子列表 */
export function listSaved(params) {
  return request({
    url: '/api/v0/me/list_saved',
    method: 'get',
    params
  })
}


/** 获取用户信息 */
export function getUserInfo(params) {
  return request({
    url: '/api/get_profile',
    method: 'get',
    params
  })
}

/** 退出登录 */
export function tologout(params) {
  return request({
    url: '/api/logout',
    method: 'get',
    params
  })
}

/** 获取模块文章列表 */
export function getPosts(params) {
  return request({
    // url: '/api/list',
    url: '/api/v0/list',
    method: 'get',
    params
  })
}

/** 获取模块信息 */
export function getForumInfo(params) {
  return request({
    url: '/api/get_forum_info',
    method: 'get',
    params
  })
}

/** 获取模块信息 */
export function getModInfo(params) {
  return request({
    url: '/api/v0/mod/getInfo',
    method: 'get',
    params
  })
}
/** 加入板块 */
export function joinForum(params) {
  return request({
    url: '/api/join_forum',
    method: 'get',
    params
  })
}

/** 退出板块 */
export function leaveForum(params) {
  return request({
    url: '/api/leave_forum',
    method: 'get',
    params
  })
}

/** 获取我赞过的 */
export function getMyLove(params) {
  return request({
    // url: '/api/list_upvotes',
    url: '/api/v0/me/list_upvotes',
    method: 'get',
    params
  })
}

/** 获取我发布的 */
export function getListPosts(params) {
  return request({
    url: '/api/v0/me/list_posts',
    method: 'get',
    params
  })
}



/** 搜索 */
export function getSearch(params) {
  return request({
    url: '/api/search',
    method: 'get',
    params
  })
}

/** 点赞 */
export function upvote_post(params) {
  return request({
    url: '/api/upvote_post',
    method: 'get',
    params
  })
}

/** 取消点赞 */
export function downvote_post(params) {
  return request({
    url: '/api/downvote_post',
    method: 'get',
    params
  })
}

/** 获取secret 图片 */
export function generate_secret_image(params) {
  return request({
    url: '/api/generate_secret_image',
    method: 'get',
    params
  })
}


/** 删除 secret 图片 */
export function delete_secret_image(params) {
  return request({
    url: '/api/delete_secret_image',
    method: 'get',
    params
  })
}

/** 提交 secret 图片 */
export function submit_secret_image(params) {
  return request({
    url: '/api/submit_secret_image',
    method: 'post',
    data: params
  })
}

/** 获取 Forums 列表 */
export function list_forums(params) {
  return request({
    url: '/api/list_forums',
    method: 'get',
    params
  })
}

/** 获取 帖子详情 */
export function getPostInfo(params) {
  return request({
    url: '/api/get_post_info',
    method: 'get',
    params
  })
}

/** 添加评论 */
export function addComments(params) {
  return request({
    url: '/api/comment',
    method: 'get',
    params
  })
}

/** 评论列表 */
export function listComments(params) {
  return request({
    url: '/api/list_comments',
    method: 'get',
    params
  })
}

/** 多级评论列表 */
export function listCommentsV0(params) {
  return request({
    url: '/api/v0/list_comments',
    method: 'get',
    params
  })
}


/** 评论点赞 */
export function upvoteComment(params) {
  return request({
    url: '/api/upvote_comment',
    method: 'get',
    params
  })
}

/** 评论点赞 */
export function downvoteComment(params) {
  return request({
    url: '/api/downvote_comment',
    method: 'get',
    params
  })
}

/** 板块搜索 */
export function searchForum(params) {
  return request({
    url: '/api/search_forum',
    method: 'get',
    params
  })
}

/** 链接发帖 */
export function submitLink(params) {
  return request({
    url: '/api/submit_link',
    method: 'get',
    params
  })
}

/** 图片发帖 */
export function submitImage(params) {
  return request({
    url: '/api/submit_image',
    method: 'get',
    params
  })
}

/** 用户行为记录 */
export function postBehavior(params) {
  return request({
    url: '/api/v0/ut',
    method: 'get',
    params
  })
}

/** 获取某用户发布的帖子 */
export function getUserPosts(params) {
  return request({
    url: '/api/v0/user/list_posts',
    method: 'get',
    params
  })
}

/** 获取某用户点赞的帖子 */
export function getUserUpvotes(params) {
  return request({
    url: '/api/v0/user/list_upvotes',
    method: 'get',
    params
  })
}

/** 设置头像 */
export function setIcon(params) {
  return request({
    url: '/api/v0/user/set_Icon',
    method: 'get',
    params
  })
}

/** 设置板块 ICON */
export function setForumIcon(params) {
  return request({
    url: '/api/v0/setForumIcon',
    method: 'get',
    params
  })
}

/**  */
export function getWebsiteInfo(params) {
  return request({
    url: '/api/dev/get_website_info',
    method: 'get',
    params
  })
}

/**  */
export function getActivity(params) {
  return request({
    url: '/api/v0/activity',
    method: 'get',
    params
  })
}

/**  */
export function push(params) {
  return request({
    url: '/api/dev/push',
    method: 'get',
    params
  })
}

/**  */
export function save_activity(params) {
  return request({
    url: '/api/dev/setActivity',
    method: 'get',
    params
  })
}

/**  */
export function listAllComments(params) {
  return request({
    url: '/api/dev/listComments',
    method: 'get',
    params
  })
}

/** 游戏分数提交 */
export function submitScore(params) {
  return request({
    url: '/api/v0/april/submit_score',
    method: 'get',
    params
  })
}

/** 游戏排行榜 */
export function getGameTop(params) {
  return request({
    url: '/api/v0/april/get_top',
    method: 'get',
    params
  })
}

/** 检查是否有新消息 */
export function messageCheck(params) {
  return request({
    url: '/api/v0/message/check',
    method: 'get',
    params
  })
}
export function messageList(params) {
  return request({
    url: '/api/v0/message/list',
    method: 'get',
    params
  })
}

export function listTags(params) {
  return request({
    url: '/api/v0/forum_tag/list_tags',
    method: 'get',
    params
  })
}

export function listForumsByTag(params) {
  return request({
    url: '/api/list_forums_by_tag',
    method: 'get',
    params
  })
}

export function setDesc(params) {
  return request({
    url: '/api/v0/user/set_desc',
    method: 'get',
    params
  })
}

/** 设置板块描述 */
export function setForumDesc(params) {
  return request({
    url: '/api/v0/setForumDesc',
    method: 'get',
    params
  })
}

// 关注用户
export function toFocus(params) {
  return request({
    url: '/api/v0/focus/focus',
    method: 'get',
    params
  })
}

// 取消关注用户
export function toUnfocus(params) {
  return request({
    url: '/api/v0/focus/unfocus',
    method: 'get',
    params
  })
}

// 被关注的人
export function listFans(params) {
  return request({
    url: '/api/v0/focus/list_fans',
    method: 'get',
    params
  })
}

// 关注的人
export function listFocus(params) {
  return request({
    url: '/api/v0/focus/list_focus',
    method: 'get',
    params
  })
}

// 获取用户信息
export function userinfo(params) {
  return request({
    url: '/api/v0/user/info',
    method: 'get',
    params
  })
}

// 获取关注消息
export function listTrends(params) {
  return request({
    url: '/api/v0/focus/list_trends',
    method: 'get',
    params
  })
}

// 删除帖子评论
export function deleteComment(params) {
  return request({
    url: '/api/v0/delete_comment',
    method: 'get',
    params
  })
}

/** 获取管理云类表 */
export function modlist(params) {
  return request({
    url: '/api/v0/mod/list',
    method: 'get',
    params
  })
}

/** 获取url */
export function getUrlTitle(params) {
  return request({
    url: '/api/v0/httpurl/title',
    method: 'post',
    data: qs.stringify(params)
  })
}

/** 设置手机号 */
export function setPhone(params) {
  return request({
    url: '/api/v0/user/setPhone',
    method: 'get',
    params
  })
}

/** 发送验证码 */
export function getCode(params) {
  return request({
    url: '/api/v0/phone/getCode',
    method: 'get',
    params
  })
}

/** 发送验证码 */
export function changeUserName(params) {
  return request({
    url: '/api/v0/user/changeUserName',
    method: 'get',
    params
  })
}

/** 获取排行榜 */
export function getButtonRank(params) {
  return request({
    url: '/api/v0/theButton/getRank',
    method: 'get',
    params
  })
}
