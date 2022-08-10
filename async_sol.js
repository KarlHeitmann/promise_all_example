const axios = require('axios').default;

function trabajosConsecutivosRecursivo(categories) {
  if (categories.length == 0) {
    return new Promise((resolve, reject) => resolve(0))
  } else {
    const id = categories[0].id
    axios.get(`api/v0/categories/${id}/jobs?per_page=1&page=1&expand=["company"]`)
      .then((response) => {
        const n_jobs = response.data.data.length
        return new Promise((resolve, reject) => trabajosConsecutivosRecursivo(categories.slice(1)).then(r => r + n_jobs))
      })
      .catch(e => {
        console.log(e)
      })
  }
}

function trabajosConsecutivos(response) {
  console.log(response.data.data)
  for (let i = 0; i < response.data.data.length; i++) {
    const category = response.data.data[i];
    axios.get(`api/v0/categories/${category.id}/jobs?per_page=1&page=1&expand=["company"]`)
      .then(response => {
        console.log(":::::: RESPONSE jobs DATA: ", response.data.data)
      })
  }
}

function getCategories() {
  axios.get('api/v0/categories?per_page=10&page=1')
    // .then(trabajosConsecutivos)
    // .then(trabajosConsecutivosSolucionado)
    .then((response) => {
      console.log("start")
      // console.log("jobs total: ", trabajosConsecutivosRecursivo(response.data.data))
      trabajosConsecutivosRecursivo(response.data.data).then(r => console.log(r))
    })
}

function trabajosConsecutivosSolucionado(response) {
  const urls = response.data.data.map(data => `api/v0/categories/${data.id}/jobs?per_page=1&page=1&expand=["company"]`)
  Promise.all(urls.map(url => axios.get(url)))
    .then(result => {
      let total_jobs = result.reduce((sum, r)=> sum + r.data.data.length, 0)
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
