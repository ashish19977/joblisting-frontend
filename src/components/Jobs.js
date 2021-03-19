import { AutoComplete, Button, Input, Pagination, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import '../index.css'
import { SearchOutlined } from '@ant-design/icons'
import JobCom from './Job'

import getJobs from '../services/jobs.service'

const JobsCom = () => {

  const { pagination:paginationFromSess = {}, searchFilters:searchFiltersFromSess = {} } = JSON.parse(sessionStorage.getItem('filters') || '{}')

  const [state, setState] = useState({ loading: true })
  const [locations, setLocations] = useState([])
  const [pagination, setPagination] = useState(paginationFromSess)
  const [searchFilters, setSearchFilters] = useState(searchFiltersFromSess)

  const getAllJobs = async () => {
    try{
      setState({...state, loading: true, error: undefined})
      sessionStorage.setItem('filters', JSON.stringify(searchFilters))
      const { jobs, total, locations: allLocations } = await getJobs(pagination, searchFilters)
      const locations = allLocations.map(location => ({ value: location }))
      setLocations(locations)
      setState({...state, jobs, total, loading: false})
    }catch(e){
      setState({jobs: undefined, loading: false, error: e})
    }
  }

  useEffect(()=> {
    
    getAllJobs()
    
  },[pagination])


  const onPaginationChange = (page, pageSize) => {
    sessionStorage.setItem('pagination', JSON.stringify(pagination))
    setPagination({page: page, pageSize})
  }

  const onAutoComSelect = (value) => {
    setSearchFilters({...searchFilters, jobLocation: value})
  }


  const onSearchChange = (e) => {
    setSearchFilters({...searchFilters, searchKey: e.target.value})
  }


  const onAutoComSearch = (searchValue) => {
    const matched = locations.filter(({value}) => value.toLowerCase().match(searchValue.toLowerCase()))
    const notMached = locations.filter(({value}) => !value.toLowerCase().match(searchValue.toLowerCase()))
    setSearchFilters({...searchFilters, jobLocation: searchValue})
    setLocations([...matched, ...notMached])
  }


  return(
    <div>  
        <div className='centered' style={{margin: '1em 1em', justifyContent: 'space-between', flexDirection: 'column' }}>
          <div className="search">
            <div className='input'>
              <Input placeholder="Search by jobs keyword" onChange={e => onSearchChange(e)} disabled={state.loading}/>
            </div>
            <div className="auto">
              <AutoComplete
                disabled={state.loading}
                options={locations}
                style={{ width: 200 }}
                onSelect={onAutoComSelect}
                onSearch={onAutoComSearch}
                placeholder="Select a location"
              />
            </div>
            <Tooltip title="search">
              <Button type="primary" shape="circle" icon={<SearchOutlined/>} loading={state.loading} onClick={() => getAllJobs()}/>
            </Tooltip>
          </div>
          <Pagination
            disabled={state.loading}
            style={{color: 'gainsboro'}}
            onChange = {onPaginationChange}
            total={state.total}
            pageSizeOptions = {[12,24,48]}
            showTotal={total => `Total ${total}`}
            current={pagination.page || 1}
            pageSize = {pagination.pageSize || 24}
          />

        </div>
    
      <div className='jobs-container'>
        {
          (!state.loading && !state.error) ? state.jobs.map((job, i) => <JobCom loading={state.loading} job={job} key={job.id+i}/>) :
          [1,2,3,4,5,6,7,8,9].map(ele => <JobCom loading={true} key={ele}/>)
        }
        {
          state.error && !state.loading && <Button type="primary" onClick={setState({...state, loading: true})} danger>Reload</Button>
        }
      </div>

      {
        (!state.error && !state.loading) &&       
        <div className='centered' style={{margin: '1em .5em'}}>
          <Pagination
            style={{color: 'gainsboro'}}
            onChange = {onPaginationChange}
            total={state.total}
            pageSizeOptions = {[12,24,48]}
            showTotal={total => `Total ${total}`}
            current={pagination.page || 1}
            pageSize = {pagination.pageSize || 24}
          />
        </div>
      }

    </div>
  )
}

export default JobsCom