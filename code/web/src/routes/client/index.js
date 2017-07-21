import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table, message } from 'antd'
import { config } from '../../utils'
import styles from './index.less'
import List from './List'
import Modal from './Modal'

const Client = ({ location, dispatch, user, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = user
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? 'Create Client' : 'Update Client'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data){
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal',
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    location,
    onChange (page){
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'user/delete',
        payload: id,
      })
    },
    onEditItem(item){
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  
  return (
    <div className="content-inner">
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Client.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({user, loading }) => ({ user, loading }))(Client)
