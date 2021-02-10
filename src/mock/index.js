// 引入mock
import Mock from 'mockjs'
// 引入今日推荐
import recommends from './recommends.json'
// 引入楼层数据
import foolrs from './floors.json'
// 生成随机数
Mock.mock('/mock/recommends', { code: 200, data: recommends })
Mock.mock('/mock/floors', { code: 200, data: foolrs })