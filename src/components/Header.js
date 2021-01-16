import React from 'react'
import '../index.css'
import { Layout } from 'antd';

const { Header } = Layout

const HeaderCom = ({ title = 'Header' }) => {
  return(
    <Layout>
      <Header className='centered' style={{color: 'gray', fontSize: '2em', height:'10%'}}>{title}</Header>
    </Layout>
  )
}

export default HeaderCom