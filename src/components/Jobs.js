import { Button, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import '../index.css'
import JobCom from './Job'

import getJobs from '../services/jobs.service'

const JobsCom = () => {

  const [state, setState] = useState({ loading: true })
  const [pagination, setPagination] = useState({})

  useEffect(()=> {
    
    const getAllJobs = async () => {
      try{
        setState({...state, loading: true, error: undefined})
        const { jobs, total } = await getJobs(pagination)
        setState({...state, jobs, total, loading: false})
      }catch(e){
        setState({jobs: undefined, loading: false, error: e})
      }
    }

    getAllJobs()
  
  },[pagination])


  const onPaginationChange = (page, pageSize) => {
    setPagination({page: page, pageSize})
  }

  console.log(state)
  return(
    <div>
      <div className='jobs-container'>
        {
          (!state.loading && !state.error) ? state.jobs.map(job => <JobCom loading={state.loading} job={job} key={job.id}/>) :
          [1,2,3,4,5,6,7,8,9].map(ele => <JobCom loading={true} key={ele}/>)
        }
        {
          state.error && !state.loading && <Button type="primary" onClick={setState({...state, loading: true})} danger>Reload</Button>
        }
      </div>

      {
        (!state.error && !state.loading) &&       
        <div className='centered' style={{margin: '1em 0'}}>
          <Pagination
            onChange = {onPaginationChange}
            total={state.total}
            pageSizeOptions = {[12,24,48]}
            showTotal={total => `Total ${total} jobs`}
            current={pagination.page || 1}
            pageSize = {pagination.pageSize || 24}
          />
        </div>
      }

    </div>
  )
}

export default JobsCom