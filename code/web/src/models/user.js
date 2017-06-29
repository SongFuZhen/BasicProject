import modelExtend from 'dva-model-extend'
import { queryURL } from '../utils'
import * as usersService from '../services/users'
import { pageModel } from './common'
import { config } from '../utils'

const { query }  = usersService 
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
  },
  effects: {
    *query({ payload = {} }, { call, put }){
      const data = yield call(query, payload)
      if(data){
        yield put ({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || config.pageSize,
              total: data.total,
            }
          }
        })
      }
    }
  },
  reducers: {
  },
  subscriptions: {
    setup({dispatch, history }){
      history.listen(location => {
        if(location.pathname === '/user'){
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    },
  },
})
