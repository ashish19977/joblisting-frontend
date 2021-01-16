
const fetch = require('node-fetch')

const getJobs = async ({ page = 1, pageSize = 24, searchKey = undefined}) => {
  try{
    const baseUrl = process.env.REACT_APP_baseUrl
    const data = await fetch(`${baseUrl}?page=${page-1}&pageSize=${pageSize}&searchKey=${searchKey || ''}`)
    return await data.json()
  }catch(e){
    throw e
  }
}

export default getJobs