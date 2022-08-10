const axios = require('axios').default;

async function trabajosConsecutivos(categories) {
  let total_jobs = 0
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    console.log(category.id)
    const jobs = await axios.get(`api/v0/categories/${category.id}/jobs?per_page=1&page=1&expand=["company"]`)
    total_jobs += jobs.data.data.length
  }
  console.log("::::: total jobs: ", total_jobs)

}

async function getCategories() {
  const {data} = await axios.get('api/v0/categories?per_page=10&page=1')
  await trabajosConsecutivos(data.data)
}

function wrapperTask() {
  getCategories()
}

module.exports = {
  trabajosConsecutivos,
  getCategories, wrapperTask
}