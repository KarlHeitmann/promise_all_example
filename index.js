const axios = require('axios').default;

axios.get('https://www.getonbrd.com/api/v0/categories?per_page=10&page=1')
  .then(function ({data}) {
    // handle success
    console.log(data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


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