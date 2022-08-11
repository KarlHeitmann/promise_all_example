const axios = require('axios').default;

function trabajosConsecutivos(response) {
  console.log(response.data.data)
  for (let i = 0; i < response.data.data.length; i++) {
    const category = response.data.data[i];
    axios.get(`api/v0/categories/${category.id}/jobs?per_page=1&page=1&expand=["company"]`)
      .then(response => {
        console.log(`:::::: RESPONSE de ${category.id}: jobs DATA length: `, response.data.data.length)
      })
  }
}

function getCategories() {
  axios.get('api/v0/categories?per_page=100&page=1')
    .then(trabajosConsecutivosSolucionado)  
}
/*
  ARREGLOS:
  - .map
  - .reduce
  - .filter
*/
function trabajosConsecutivosSolucionado(response) {
  const urls = response.data.data.map(data => `api/v0/categories/${data.id}/jobs?per_page=1&page=1&expand=["company"]`)
  Promise.all(urls.map(url => axios.get(url)))
    .then(result => {
      let total_jobs = result.reduce((sum, jobs)=> sum + jobs.data.data.length, 0)
      // console.log("::::", result, "======")
      console.log("total jobs: ", total_jobs)
    })

}

function wrapperTask() {
  getCategories()
}

module.exports = {
  wrapperTask
}
