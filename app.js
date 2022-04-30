//Async and Callback

// console.log("sending request to server");
// setTimeout(() => {
//   console.log("data returned");
// }, 3000);
// console.log("end of file reached");

//Nested Callback Timeouts
// setTimeout(() => {
//   document.body.style.backgroundColor = "red";
//   setTimeout(() => {
//     document.body.style.backgroundColor = "orange";
//     setTimeout(() => {
//       document.body.style.backgroundColor = "yellow";
//       setTimeout(() => {
//         document.body.style.backgroundColor = "green";
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//do it in a function
const delayColorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    doNext && doNext();
  }, delay);
};

delayColorChange("red", 2000, () => {
  delayColorChange("orange", 2000, () => {
    delayColorChange("yellow", 2000);
  });
});

//EXAMPLE OF NESTING CALLBACKS TO CHECK FOR SUCESS OR FAILURE
// searchMoviesAPI(
//   "amadeus",
//   () => {
//     saveToMyDB(
//       movies,
//       () => {
//         //if it works, run this
//       },
//       () => {
//         //if it doesn't work, run this
//       }
//     );
//   },
//   () => {
//     //if API is down, or request failed
//   }
// );

//Promises

const fakeRequestCallback = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 4500) + 500;
  setTimeout(() => {
    if (delay > 4000) {
      failure("Connection Timeout :(");
    } else {
      success(`Here is your fake data from ${url}`);
    }
  }, delay);
};

const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
        reject("Connection Timeout :(");
      } else {
        resolve(`Here is your Fake date from ${url}`);
      }
    }, delay);
  });
};


fakeRequestCallback(
  "books.com",
  function (response) {
    console.log("it worked");
    console.log(response)
    
    fakeRequestCallback('books.com/page2',
    function(response){
      console.log('it worked again');
      console.log(response);
    },
    function(err){
      console.log('Error again', err);
    }
    )  
  },
  function (err) {
    console.log("Error", err);
  }
);

fakeRequestPromise('yelp.com/api/coffee')
.then(()=>{
  console.log('Promise Resolved');
  console.log('it worked!');
  fakeRequestPromise('yelp.com/api/coffee/page2')
  .then(()=>{
    console.log('Second Promise Resolved');
    console.log('second promise worked too!');
    fakeRequestPromise('yelp.com/api/coffee/page3')
    .then(()=>{
      console.log('third promise worked');
    })
    .catch(()=>{
      console.log('third promise failed')
    })
  })
  .catch(()=>{
    console.log('Second Promis Rejected');
    console.log('second promise failed');
  })
})
.catch(()=>{
  console.log('Promise Rejected');
  console.log('oh no!');
})