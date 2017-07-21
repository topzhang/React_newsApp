import React from 'react'
import {Row, Col} from 'antd'

/**
 * 底部组件
 */
export default function NewsFooter () {

  return (
    <footer>
      <Row>
        <Col span={1}></Col>
        <Col span={22} style={{textAlign:'center', padding: '20px'}}>
          2008 ReactNews.
        </Col>
        <Col span={1}></Col>
      </Row>
    </footer>
  )
}