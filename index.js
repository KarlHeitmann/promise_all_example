/*
Run
$ yarn start
$ NODE_ENV=production yarn start
*/
const axios = require('axios').default;
const { trabajosConsecutivos } = require('./async_await_sol')
axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? 'https://www.getonbrd.com' : 'https://sandbox.getonbrd.dev'
console.log(axios.defaults.baseURL)

function main() {
  axios.get('api/v0/categories?per_page=10&page=1')
    .then(async function ({data}) {
      // handle success
      await trabajosConsecutivos(data.data)
      const category_id = 'programming'
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
