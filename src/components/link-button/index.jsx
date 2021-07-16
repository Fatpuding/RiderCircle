import React from 'react'
import { Button } from 'antd'
import './index.less'

export default function LinkButton(props) {
    return <Button {...props} type='link' className='link-button'></Button>
}