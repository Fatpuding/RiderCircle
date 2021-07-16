import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

//const BASE = 'http://localhost:8080'
const BASE = ''
// 登陆
export const reqLogin = (userName, password) => ajax(BASE + '/client/login/commitLogin', { userName, password }, '', {},'POST')

//进入我的页面
export const reqInfo = (token) => ajax(BASE + '/client/myCount/enterMyCount',{}, token,)

// 修改信息
export const reqUpdateInfo = (userPhoto, userDescription, token) => ajax(BASE + '/client/personalInfo/commitInfo', { userPhoto, userDescription }, token, {},'POST')

//删除图片
export const reqDeleteImg = (photo, token) => ajax(BASE + '/common/deletePhoto', {}, token, { photo },'DELETE')


//进入发布页面
export const reqCircles = (token) => ajax(BASE + '/client/issue/enterIssue', { },token)

//发布
export const reqIssuePost = (circleName, description, photoArray, choose, token) => ajax(BASE + '/client/issue/commitIssue', { circleName, description, photoArray, choose }, token, {}, 'POST')

//保存草稿
export const reqSaveDraft = (circleName, description, photoArray, choose, token) => ajax(BASE + '/client/issue/storeDraft', { circleName, description, photoArray, choose }, token, {}, 'POST')

//删除草稿
export const reqDeleteDraft = (token) => ajax(BASE + '/client/issue/deleteDraft', {}, token, {}, 'DELETE')

//获取草稿
export const reqDraft = (token) => ajax(BASE + '/client/issue/getDraft', {}, token)

//进入我的评论页
export const reqCommentaries = (token) => ajax(BASE + '/client/myCommentary/enterMyCommentary', {},token)

//删除回复
export const reqDeleteReply = (replyID, token) => ajax(BASE + '/client/myCommentary/deleteReply', {}, token, { replyID }, 'DELETE')


//进入我的动态页
export const reqActivities = (token) => ajax(BASE + '/client/myActivity/enterMyActivity', {}, token)

//删除帖子
export const reqDeletePost = (postID, token) => ajax(BASE + '/client/myActivity/deletePost', {}, token, {postID},'DELETE')

//删除问答
export const reqDeleteQuestion = (questionID, token) => ajax(BASE + '/client/myActivity/deleteQuestion', {}, token, { questionID }, 'DELETE')


//进入车圈首页
export const reqAllData = (token) => ajax(BASE + '/client/circleHome/enterCircleHome', {},token)

//进入帖子详情页
export const reqPostInfo = (postID, token) => ajax(BASE + '/client/post/enterPost', { postID }, token)

//帖子点赞
export const reqPostUp = (postID, token) => ajax(BASE + '/client/post/upPost', {}, token, { postID },'POST')

//发布评论
export const reqIssueComment = ({ postMasterName, postID, commentaryDescription }, token)=>ajax('/client/post/commitCommentary',{ postMasterName, postID, commentaryDescription }, token, {},'POST')

//给评论回复
export const reqIssueReply = ({ commentaryMasterName, commentaryID, replyDescription }, token) => ajax('/client/post/commitReply', { commentaryMasterName, commentaryID, replyDescription }, token, {}, 'POST')


//进入问答详情页
export const reqQuestionInfo = (questionID, token) => ajax(BASE + '/client/question/enterQuestion', { questionID }, token)

export const reqIssueAnswer = ({ questionMasterName, questionID, answerDescription }, token) => ajax('/client/question/commitAnswer', { questionMasterName, questionID, answerDescription }, token, {},'POST')

//采纳答案
export const reqAdoptAnswer = (questionID, answerID, token) => ajax(BASE + '/client/question/acceptAnswerAsBest', {}, token, { questionID, answerID},'POST')


//获取图片
export const reqPhoto = (userPhoto) => ajax(BASE + '/common/getAPhoto', { photo: userPhoto })

//加入车圈
export const reqJoinCircle = (circleName, token) => ajax(BASE + '/client/circleHome/joinCircle', {}, token, {circleName},'POST')

//进入车圈页
export const reqCircleData = (circleName, token) => ajax(BASE + '/client/circle/enterCircle', { circleName }, token)

export const reqRecentCircleData = (circleName, token) => ajax(BASE + '/client/circle/getNewContentInCircle', { circleName }, token)


//管理端

// 登陆
export const reqAdminLogin = (adminName, password) => ajax(BASE + '/admin/adminLogin', {adminName, password  }, '', {},'POST')


//用户管理

//搜索用户
export const reqSearchUser = (userName, token) => ajax(BASE + '/admin/userManage/searchUser', { userName }, token)


//删除用户
export const reqDeleteUser = (userName, token) => ajax(BASE + '/admin/userManage/deleteUser', {},token, { userName }, 'DELETE')

//获取用户
export const reqUsers = (token) => ajax(BASE + '/admin/userManage/getAllUser', {}, token)


//车圈管理

//搜索车圈
export const reqSearchCircle = (circleName, token) => ajax(BASE + '/admin/circleManage/searchCircle', { circleName }, token)


//删除车圈
export const reqDeleteCircle = (circleName, token) => ajax(BASE + '/admin/circleManage/deleteCircle', {}, token, { circleName }, 'DELETE')

//添加或修改
export const reqAddOrUpdateCircle = (circleName, circleMasterName, circleDescription, circlePhotoArray,token) => ajax(BASE + '/admin/circleManage/addOrUpdateCircle', { circleName, circleMasterName, circleDescription, circlePhotoArray }, token, {}, 'POST')

//获取车圈
export const reqAdminCircles = (token) => ajax(BASE + '/admin/circleManage/getAllCircle', {}, token)


//帖子管理

//搜索帖子
export const reqSearchPost = (postID, token) => ajax(BASE + '/admin/postManage/searchPost', { postID }, token)

//获取帖子
export const reqPosts = (token) => ajax(BASE + '/admin/postManage/getAllPost', {}, token)

//删除帖子
export const reqDeleteAdminPost = (postID, token) => ajax(BASE + '/admin/postManage/deletePost', {}, token, {postID}, 'DELETE')

//进入帖子详情页
export const reqAdminPost = (postID, token) => ajax(BASE + '/admin/postManage/enterPost', { postID }, token)

//评论管理
//删除评论
export const reqDeleteCommentary = (commentaryID, token) => ajax(BASE + '/admin/postManage/deleteCommentary', {}, token, { commentaryID }, 'DELETE')

//删除回复
export const reqDeleteAdminReply = (replyID, token) => ajax(BASE + '/admin/postManage/deleteReply', {}, token, { replyID }, 'DELETE')



// 问答管理

//搜索问答
export const reqSearchQuestion = (questionID, token) => ajax(BASE + '/admin/questionManage/searchQuestion', { questionID }, token)

//删除问题
export const reqDeleteAdminQuestion = (questionID, token) => ajax(BASE + '/admin/questionManage/deleteQuestion', {}, token, { questionID }, 'DELETE')


//获取问答
export const reqQuestions = (token) => ajax(BASE + '/admin/questionManage/getAllQuestion', {}, token)

//进入问答详情页
export const reqAdminQuestion = (questionID, token) => ajax(BASE + '/admin/questionManage/enterQuestion', { questionID }, token)


//评论管理
//删除回答
export const reqDeleteAnswer = (answerID, token) => ajax(BASE + '/admin/questionManage/deleteAnswer', {}, token, { answerID }, 'DELETE')
