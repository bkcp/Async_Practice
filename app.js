//Async

console.log("sending request to server");
setTimeout(() => {
  console.log("data returned");
}, 3000);
console.log("end of file reached");

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
searchMoviesAPI(
  "amadeus",
  () => {
    saveToMyDB(
      movies,
      () => {
        //if it works, run this
      },
      () => {
        //if it doesn't work, run this
      }
    );
  },
  () => {
    //if API is down, or request failed
  }
);
