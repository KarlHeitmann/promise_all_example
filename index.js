/*
Run
$ yarn start
$ NODE_ENV=production yarn start
*/
const axios = require('axios').default;
axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? 'https://www.getonbrd.com' : 'https://sandbox.getonbrd.dev'
console.log(axios.defaults.baseURL)

function trabajosConsecutivos(categories) {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    console.log(category.id)
  }
}

function main() {
  axios.get('api/v0/categories?per_page=10&page=1')
    .then(function ({data}) {
      // handle success
      trabajosConsecutivos(data.data)
      const category_id = 'programming'
      axios.get(`api/v0/categories/${category_id}/jobs?per_page=1&page=1&expand=["company"]`)
        .then(function ({data}) {
        // .then(function (response) {
          console.log(data)
          console.log(process.env.NODE_ENV)
        })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}  


function ejemplo() {
  // A simple promise that resolves after a given time
  const timeOut = (t) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Completed in ${t}`)
      }, t)
    })
  }
  
  // Resolving a normal promise.
  timeOut(1000)
    .then(result => console.log(result)) // Completed in 1000
  
  // Promise.all
  Promise.all([timeOut(1000), timeOut(2000)])
    .then(result => console.log(result)) // ["Completed in 1000", "Completed in 2000"]
}

main()
