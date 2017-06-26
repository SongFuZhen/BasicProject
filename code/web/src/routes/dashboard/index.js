import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
// import { NumberCard, Quote, Sales, Weather, RecentSales, Comments, Completed, Browser, Cpu, User } from './components'
import styles from './index.less'
import { color } from '../../utils'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard }) {
  return (
    <Row gutter={24}>
      Hello, guy
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
