const axios = require('axios').default;

function trabajosConsecutivosRecursivo(categories) {
  console.log("trabajosConsecutivosRecursivos...")
  if (categories.length == 0) {
    return 0
  } else {
    const id = categories[0].id
    axios.get(`api/v0/categories/${id}/jobs?per_page=1&page=1&expand=["company"]`)
      .then((response) => {
        const n_jobs = response.data.data.length
        return n_jobs + trabajosConsecutivosRecursivo(categories.slice(1))
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
      console.log("jobs total: ", trabajosConsecutivosRecursivo(response.data.data))
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
