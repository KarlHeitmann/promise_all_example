const axios = require('axios').default;

function getCategories() {
  axios.get('api/v0/categories?per_page=10&page=1')
    .then((response) => {
      console.log(response.data.data)
      for (let i = 0; i < response.data.data.length; i++) {
        const category = response.data.data[i];
        axios.get(`api/v0/categories/${category.id}/jobs?per_page=1&page=1&expand=["company"]`)
          .then(response => {
            console.log(":::::: RESPONSE jobs DATA: ", response.data.data)
          })
      }
    })
}



function wrapperTask() {
  getCategories()
}

module.exports = {
  wrapperTask
}
