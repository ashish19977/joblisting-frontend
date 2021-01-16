
const fetch = require('node-fetch')

const getJobs = async ({ page = 1, pageSize = 24, searchKey = undefined}) => {
  console.log(page, pageSize)
  try{
    const data = await fetch(`http://localhost:8000?page=${page-1}&pageSize=${pageSize}&searchKey=${searchKey || ''}`)
    return await data.json()
  }catch(e){
    throw e
  }
}

export default getJobs