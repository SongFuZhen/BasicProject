import modelExtend from 'dva-model-extend'
import { queryURL } from '../utils'
import { remove } from '../services/user'
import * as usersService from '../services/users'
import { pageModel } from './common'
import { config } from '../utils'
import { notification } from 'antd'

const { query }  = usersService 
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
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
    },
    *'delete' ({ payload }, { call, put, select }){
      const data = yield call(remove, {id: payload })
      if(data.success){
        yield put({ type: 'query' })

        notification['success']({
          message: '删除成功'
        });
      }else{
        throw data
      }
    },
    *update ({ payload }, { call, put, select }){
      const id = yield select(({user}) => user.currentItem.id)
      const newUser = { ...payload, id}
      const data = yield call(update, newUser)
      if(data.success){
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      
        notification['success']({
          message: '编辑成功'
        });
      }else{
        throw data
      }
    }
  },
  reducers: {
    showModal(state, { payload }){
      return { ...state, ...{ payload }, modalVisible: true }
    },
    hideModal(state){
      return { ...state, modalVisible: false }
    }
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
