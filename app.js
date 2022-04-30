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

// const fakeRequestCallback = (url, success, failure) => {
//   const delay = Math.floor(Math.random() * 4500) + 500;
//   setTimeout(() => {
//     if (delay > 4000) {
//       failure("Connection Timeout :(");
//     } else {
//       success(`Here is your fake data from ${url}`);
//     }
//   }, delay);
// };




// fakeRequestCallback(
//   "books.com",
//   function (response) {
//     console.log("it worked");
//     console.log(response)
    
//     fakeRequestCallback('books.com/page2',
//     function(response){
//       console.log('it worked again');
//       console.log(response);
//     },
//     function(err){
//       console.log('Error again', err);
//     }
//     )  
//   },
//   function (err) {
//     console.log("Error", err);
//   }
// );

const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
        reject("Connection Timeout :(");
      } else {
        resolve(`Here is your Fake data from ${url}`);
      }
    }, delay);
  });
};


// fakeRequestPromise('yelp.com/api/coffee')
// .then(()=>{
//   console.log('Promise Resolved');
//   console.log('it worked!');
//   fakeRequestPromise('yelp.com/api/coffee/page2')
//   .then(()=>{
//     console.log('Second Promise Resolved');
//     console.log('second promise worked too!');
//     fakeRequestPromise('yelp.com/api/coffee/page3')
//     .then(()=>{
//       console.log('third promise worked');
//     })
//     .catch(()=>{
//       console.log('third promise failed')
//     })
//   })
//   .catch(()=>{
//     console.log('Second Promis Rejected');
//     console.log('second promise failed');
//   })
// })
// .catch(()=>{
//   console.log('Promise Rejected');
//   console.log('oh no!');
// })


fakeRequestPromise('yelp.com/api/coffee')
.then((data)=>{
  console.log('First Promise Returned')
  console.log(data);
  return fakeRequestPromise('yelp.com/api/coffee/pg2')
})
.then((data)=>{
  console.log('Second Promise Returned')
  console.log(data);
  return fakeRequestPromise('yelp.com/api/coffe/pg3')
})
.then((data)=>{
  console.log('Third Promise Returned')
  console.log(data);
})
.catch((err)=>{
  console.log("Promise failed");
  console.log(err);
})


const fakeRequest = (url) =>{
  return new Promise((resolve, reject)=>{
    const rand = Math.random();
    setTimeout(()=>{
      if(rand < 0.6){
        resolve('Fake Data Here');
      }
      reject('Request Error');
    }, 1000)
  })
}

fakeRequest('/dog/1')
.then((data)=>{
console.log("done with request");
console.log(data);
})
.catch((err)=>{
  console.log('Rejected promise')
  console.log(err)
})

// const delayColorChange = (newColor, delay, doNext) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = newColor;
//     doNext && doNext();
//   }, delay);
// };

// delayColorChange("red", 2000, () => {
//   delayColorChange("orange", 2000, () => {
//     delayColorChange("yellow", 2000);
//   });
// });

const delayColorChange = (newColor, delay)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      document.body.style.backgroundColor = newColor;
      resolve();
    }, delay);
  })
}

delayColorChange('red', 1000)
.then(()=>{
  return delayColorChange('green',1000)
})
.then(()=>{
  return delayColorChange('yellow',1000)
})
.then(()=>{
  delayColorChange('violet',1000)
})



//ASYNC KEYWORD

async function hello(){

}

const sing = async()=>{
  throw "uh oh"
  return 'lalalalal'
}
sing()
.then((data)=>{
console.log("Async Promise resolved with:", data)
})
.catch((err)=>{
  console.log("Async Promise Rejected with:", err)
})


const login = async(username,password)=>{
if(!username || !password){
  throw "missing credentials"
}
if(password === 'corgifeet'){
  return 'Open Sesame'
}
throw('invalid password')
}

login('asdf','corgifeet')
.then((msg)=>{
  console.log('logged in')
  console.log(msg)
})
.catch((err)=>{
  console.log('error')
  console.log(err)
})



async function rainbow(){
  await delayColorChange('red',1000);
  await console.log('back to red');
  await delayColorChange('pink',1000);
  await console.log('now its pink');
  return "finished"
}

async function printRainbow(){
await rainbow();
console.log("end of async rainbow function")
}

async function fakeAwaitRequest(){
  let data1 = await fakeRequest('beta.com');
  console.log(data1);
}