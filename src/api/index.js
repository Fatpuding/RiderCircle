import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

//const BASE = 'http://localhost:8080'
const BASE = ''
// ��½
export const reqLogin = (userName, password) => ajax(BASE + '/client/login/commitLogin', { userName, password }, '', {},'POST')

//�����ҵ�ҳ��
export const reqInfo = (token) => ajax(BASE + '/client/myCount/enterMyCount',{}, token,)

// �޸���Ϣ
export const reqUpdateInfo = (userPhoto, userDescription, token) => ajax(BASE + '/client/personalInfo/commitInfo', { userPhoto, userDescription }, token, {},'POST')

//ɾ��ͼƬ
export const reqDeleteImg = (photo, token) => ajax(BASE + '/common/deletePhoto', {}, token, { photo },'DELETE')


//���뷢��ҳ��
export const reqCircles = (token) => ajax(BASE + '/client/issue/enterIssue', { },token)

//����
export const reqIssuePost = (circleName, description, photoArray, choose, token) => ajax(BASE + '/client/issue/commitIssue', { circleName, description, photoArray, choose }, token, {}, 'POST')

//����ݸ�
export const reqSaveDraft = (circleName, description, photoArray, choose, token) => ajax(BASE + '/client/issue/storeDraft', { circleName, description, photoArray, choose }, token, {}, 'POST')

//ɾ���ݸ�
export const reqDeleteDraft = (token) => ajax(BASE + '/client/issue/deleteDraft', {}, token, {}, 'DELETE')

//��ȡ�ݸ�
export const reqDraft = (token) => ajax(BASE + '/client/issue/getDraft', {}, token)

//�����ҵ�����ҳ
export const reqCommentaries = (token) => ajax(BASE + '/client/myCommentary/enterMyCommentary', {},token)

//ɾ���ظ�
export const reqDeleteReply = (replyID, token) => ajax(BASE + '/client/myCommentary/deleteReply', {}, token, { replyID }, 'DELETE')


//�����ҵĶ�̬ҳ
export const reqActivities = (token) => ajax(BASE + '/client/myActivity/enterMyActivity', {}, token)

//ɾ������
export const reqDeletePost = (postID, token) => ajax(BASE + '/client/myActivity/deletePost', {}, token, {postID},'DELETE')

//ɾ���ʴ�
export const reqDeleteQuestion = (questionID, token) => ajax(BASE + '/client/myActivity/deleteQuestion', {}, token, { questionID }, 'DELETE')


//���복Ȧ��ҳ
export const reqAllData = (token) => ajax(BASE + '/client/circleHome/enterCircleHome', {},token)

//������������ҳ
export const reqPostInfo = (postID, token) => ajax(BASE + '/client/post/enterPost', { postID }, token)

//���ӵ���
export const reqPostUp = (postID, token) => ajax(BASE + '/client/post/upPost', {}, token, { postID },'POST')

//��������
export const reqIssueComment = ({ postMasterName, postID, commentaryDescription }, token)=>ajax('/client/post/commitCommentary',{ postMasterName, postID, commentaryDescription }, token, {},'POST')

//�����ۻظ�
export const reqIssueReply = ({ commentaryMasterName, commentaryID, replyDescription }, token) => ajax('/client/post/commitReply', { commentaryMasterName, commentaryID, replyDescription }, token, {}, 'POST')


//�����ʴ�����ҳ
export const reqQuestionInfo = (questionID, token) => ajax(BASE + '/client/question/enterQuestion', { questionID }, token)

export const reqIssueAnswer = ({ questionMasterName, questionID, answerDescription }, token) => ajax('/client/question/commitAnswer', { questionMasterName, questionID, answerDescription }, token, {},'POST')

//���ɴ�
export const reqAdoptAnswer = (questionID, answerID, token) => ajax(BASE + '/client/question/acceptAnswerAsBest', {}, token, { questionID, answerID},'POST')


//��ȡͼƬ
export const reqPhoto = (userPhoto) => ajax(BASE + '/common/getAPhoto', { photo: userPhoto })

//���복Ȧ
export const reqJoinCircle = (circleName, token) => ajax(BASE + '/client/circleHome/joinCircle', {}, token, {circleName},'POST')

//���복Ȧҳ
export const reqCircleData = (circleName, token) => ajax(BASE + '/client/circle/enterCircle', { circleName }, token)

export const reqRecentCircleData = (circleName, token) => ajax(BASE + '/client/circle/getNewContentInCircle', { circleName }, token)


//�����

// ��½
export const reqAdminLogin = (adminName, password) => ajax(BASE + '/admin/adminLogin', {adminName, password  }, '', {},'POST')


//�û�����

//�����û�
export const reqSearchUser = (userName, token) => ajax(BASE + '/admin/userManage/searchUser', { userName }, token)


//ɾ���û�
export const reqDeleteUser = (userName, token) => ajax(BASE + '/admin/userManage/deleteUser', {},token, { userName }, 'DELETE')

//��ȡ�û�
export const reqUsers = (token) => ajax(BASE + '/admin/userManage/getAllUser', {}, token)


//��Ȧ����

//������Ȧ
export const reqSearchCircle = (circleName, token) => ajax(BASE + '/admin/circleManage/searchCircle', { circleName }, token)


//ɾ����Ȧ
export const reqDeleteCircle = (circleName, token) => ajax(BASE + '/admin/circleManage/deleteCircle', {}, token, { circleName }, 'DELETE')

//��ӻ��޸�
export const reqAddOrUpdateCircle = (circleName, circleMasterName, circleDescription, circlePhotoArray,token) => ajax(BASE + '/admin/circleManage/addOrUpdateCircle', { circleName, circleMasterName, circleDescription, circlePhotoArray }, token, {}, 'POST')

//��ȡ��Ȧ
export const reqAdminCircles = (token) => ajax(BASE + '/admin/circleManage/getAllCircle', {}, token)


//���ӹ���

//��������
export const reqSearchPost = (postID, token) => ajax(BASE + '/admin/postManage/searchPost', { postID }, token)

//��ȡ����
export const reqPosts = (token) => ajax(BASE + '/admin/postManage/getAllPost', {}, token)

//ɾ������
export const reqDeleteAdminPost = (postID, token) => ajax(BASE + '/admin/postManage/deletePost', {}, token, {postID}, 'DELETE')

//������������ҳ
export const reqAdminPost = (postID, token) => ajax(BASE + '/admin/postManage/enterPost', { postID }, token)

//���۹���
//ɾ������
export const reqDeleteCommentary = (commentaryID, token) => ajax(BASE + '/admin/postManage/deleteCommentary', {}, token, { commentaryID }, 'DELETE')

//ɾ���ظ�
export const reqDeleteAdminReply = (replyID, token) => ajax(BASE + '/admin/postManage/deleteReply', {}, token, { replyID }, 'DELETE')



// �ʴ����

//�����ʴ�
export const reqSearchQuestion = (questionID, token) => ajax(BASE + '/admin/questionManage/searchQuestion', { questionID }, token)

//ɾ������
export const reqDeleteAdminQuestion = (questionID, token) => ajax(BASE + '/admin/questionManage/deleteQuestion', {}, token, { questionID }, 'DELETE')


//��ȡ�ʴ�
export const reqQuestions = (token) => ajax(BASE + '/admin/questionManage/getAllQuestion', {}, token)

//�����ʴ�����ҳ
export const reqAdminQuestion = (questionID, token) => ajax(BASE + '/admin/questionManage/enterQuestion', { questionID }, token)


//���۹���
//ɾ���ش�
export const reqDeleteAnswer = (answerID, token) => ajax(BASE + '/admin/questionManage/deleteAnswer', {}, token, { answerID }, 'DELETE')
