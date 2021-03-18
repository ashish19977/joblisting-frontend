const baseUrl = process.env.NODE_ENV ===  "development" ? 'http://localhost:8000/' : 'https://job-listing-app-backend.herokuapp.com'

module.exports = { baseUrl }