import React from 'react'
import '../index.css'
import { Skeleton, Card, Avatar, Button, Tooltip } from 'antd';

const { Meta } = Card

const JobCom = ({ loading = true, job = {} }) => {

  const getJobTitle = title => {
    if(!title || title === ''){
      return ''
    }
    else if(title.length > 50){
      return title.substring(0, 50) + ' ...'
    }
    return title
  }


  const goToCompanySite = site => {
    if(!site)
      return
    else
      window.open(site, '')
  }

  const goToApplyLink = () => {
    if(job.url){
      window.open(job.url, '')
    }
  }


  return(
    <Card
      hoverable
      bordered={false}
      style={{ width: '100%', overflow:'hidden', backgroundColor: loading ? 'black' : '#00ace8' }}
      actions={[
        <Button type="primary" shape="round" onClick={loading  ? ()=>{} :goToApplyLink}>{ loading ? 'Loading ...' : 'Apply' }</Button>,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <Tooltip title={job.company || ''}>
              <Avatar src={job.company_logo || ''} style={{objectFit:'cover'}} onClick={() => goToCompanySite(job.company_url)}/>
            </Tooltip>
          }
          title={<div><p>{getJobTitle(job.title)}</p><p style={{margin:0, fontSize: 'smaller'}}>{getJobTitle(job.company)}</p></div>}
          description={<div><span>{ job.location || '' }</span><span className='badge'>{ job.type || '' }</span></div>}
        />
      </Skeleton>
    </Card>
  )
}

export default JobCom