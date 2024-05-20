//Promise.race() polyfill
//observations
//iterable of promises and returns a single promise
//This returned promise settles with the first promise that settles

//Approach

//accepts an iterable liek an array
//iterate through promises
//returned promise will settle(either resolve or reject) as soon as the first promise settles
//if the first promise resolves, the returned promise resolves with the same value
//if the first promise rejects, the returned rejects with the same reason


function promiseRace(promises){

    return new Promise((resolve, reject) => {
  
      promises.forEach((promise) => {
  
        Promise.resolve(promise)
          .then(resolve, reject)
      })
  
    })
  }
  
  // Test Functions
  function testPromiseRace() {
    // Helper function to create a resolved promise after a delay
    function delayResolve(value, delay) {
        return new Promise(resolve => setTimeout(() => resolve(value), delay));
    }
  
    // Helper function to create a rejected promise after a delay
    function delayReject(reason, delay) {
        return new Promise((_, reject) => setTimeout(() => reject(reason), delay));
    }
  
    // Test 1: First promise resolves
    promiseRace([delayResolve(1, 100), delayResolve(2, 200), delayResolve(3, 300)])
        .then(result => {
            console.log('Test 1 Passed:', result === 1);
        })
        .catch(() => {
            console.log('Test 1 Failed');
        });
  
    // Test 2: First promise rejects
    promiseRace([delayReject('Error', 200), delayResolve(2, 300), delayResolve(3, 400)])
        .then(() => {
            console.log('Test 2 Failed');
        })
        .catch(error => {
            console.log('Test 2 Passed:', error === 'Error');
        });
  
    // Test 3: Handling non-promise values
    promiseRace([1, 2, delayResolve(3, 100)])
        .then(result => {
            console.log('Test 3 Passed:', result === 1);
        })
        .catch(() => {
            console.log('Test 3 Failed');
        });
  
  }
  
  // Run the tests
  testPromiseRace();
  