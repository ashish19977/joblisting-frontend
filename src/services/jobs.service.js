
const fetch = require('node-fetch')
const { baseUrl } = require('../Constants')

const getJobs = async ({ page = 1, pageSize = 24, searchKey = undefined}) => {
  try{
    const data = await fetch(`${baseUrl}?page=${page-1}&pageSize=${pageSize}&searchKey=${searchKey || ''}`)
    return await data.json()
  }catch(e){
    throw e
  }
}

export default getJobs