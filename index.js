/*
Run
$ yarn start
$ NODE_ENV=production yarn start
*/
const axios = require('axios').default;
const file_to_open = './async_await_sol'
const { wrapperTask } = require(file_to_open)
axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? 'https://www.getonbrd.com' : 'https://sandbox.getonbrd.dev'
console.log(axios.defaults.baseURL)

function main() {
  wrapperTask()
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
