import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const User = ({ user }) => {
 return (
     Hello, Man 
 )
}

User.propTypes = {
  user: PropTypes.object,
}

export default connect(({user}) => ({ user }))(User)
