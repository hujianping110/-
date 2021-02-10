import { v4 as uuidv4 } from 'uuid'
// uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export function userID() {
  // 先读取你的uuid
  let uesrID = localStorage.getItem('UESR_ID')
  // 判断他有没有这个id 有就直接返回啥也不干
  if (uesrID) return uesrID
  // 没有就创建这个Id
  uesrID = uuidv4(uesrID)
  // 添加到缓存当中
  localStorage.setItem('UESR_ID', uesrID)
  return uesrID
}
// 在缓存中添加token
export function setToken(token) {
  localStorage.setItem('TOKEN_KEY', token)
}
// 获取token
export const getToken = localStorage.getItem('TOKEN_KEY') || ''
// 删除缓存中的token
export const removeToken = () => localStorage.removeItem('TOKEN_KEY')
