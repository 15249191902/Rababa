import {commonRequest} from '../axios.js'
export const getUserByPage = data => {
  return commonRequest({
    method: 'post',
    url: "/users/getUserByPage",
    data
  })
}
export const deleteUserByIdApi = data => {
  return commonRequest({
    method: 'post',
    url: '/users/deleteUserById',
    data
  })
}
export const getUserData1 = data => {
  return commonRequest({
    method: 'post',
    url: "/users/getUser1",
    data
  })
}
// 新增 歌手
export const addUser = data => {
  return commonRequest({
    method: 'post',
    url: "/singer/add",
    data
  })
}
// 查询 歌手列表
export const getSingerList = data => {
  return commonRequest({
    method: 'post',
    url: '/singer/list',
    data
  })
}
// 删除 歌手
export const deleteSinger = data => {
  return commonRequest({
    method: 'post',
    url: '/singer/deleteById',
    data
  })
}
