import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({location, ...tableProps}) => {
    
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 64,
            className: styles.avatar,
            render: (text) => <img alt={'avatar'} width={24} src={text} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (text, record) => <Link to = {`user/${record.id}`}> {text} </Link>
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100
        },
        {
            title: 'Gender',
            dataIndex: 'isMale',
            key: 'isMale',
            width: 100,
            render: (text) => <span>
            {text ? 'Male' : 'Female'}
            </span>
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return <span>Good Man </span>
            }
        }
    ]

    return (
        <div>
            <Table
                {...tableProps}
                bordered
                columns ={columns}
                size="middle"
                rowKey={record => record.id}
            />
        </div>
    )
}

List.propTypes = {
    location: PropTypes.object
}

export default List