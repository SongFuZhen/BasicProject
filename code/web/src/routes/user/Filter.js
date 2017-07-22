import React from 'react'
import PropTypes from 'prop-types'
import mement from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import city from '../../utils/city'

const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 16,
    }
}

const TwoColProps = {
    ...ColProps,
    xl: 96
}

const Filter = ({
    filter,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue
    }
}) => {
    const handleFields = (fields) => {
        const { createTime }= fields
        if(createTime.length){
            fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
        }
        return fields
    }

    

}