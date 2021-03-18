
const fetch = require('node-fetch')
const { baseUrl } = require('../Constants')

const getJobs = async ({ page = 1, pageSize = 24}, searchFilters = {}) => {
  try{
    let url = `${baseUrl}?page=${page-1}&pageSize=${pageSize}`
    url += searchFilters.searchKey ? `&searchKey=${searchFilters.searchKey}` : ''
    url += searchFilters.jobLocation ? `&jobLocation=${searchFilters.jobLocation}` : ''
    const data = await fetch(url)
    return await data.json()
  }catch(e){
    throw e
  }
}

export default getJobs