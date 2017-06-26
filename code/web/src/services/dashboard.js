import { request, config } from '../utils'
const { api } = config
const { dashboard } = api

export async function myCity (params) {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/myCity',
    data: params,
  })
}

//http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url=%27http://www.zuimeitianqi.com/zuimei/myCity?flg%3D0%27&format=json&flg=0
export async function queryWeather (params) {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/queryWeather',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}
