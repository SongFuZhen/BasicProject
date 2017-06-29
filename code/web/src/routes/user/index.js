import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table } from 'antd'
import { config } from '../../utils'
import styles from './index.less'
import List from './List'

const User = ({ location, dispatch, user, loading }) => {
  const { list, pagination, currentItem } = user
  const { pageSize } = pagination

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
  }
  
  return (
    <div className="content-inner">
      <List {...listProps} />
     </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({user, loading }) => ({ user, loading }))(User)
