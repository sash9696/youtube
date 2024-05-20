//Promise.any() Polyfill

//observations

//iterable of promises and return a single promise
//returned promise is fullfileed with this first fulfillment value
//t rejects when all of the input's promises reject including an empty array
//containing an array of rejection reason

//Approach
//create a new promise to track the fulfillement/ rejection
//iterate over the array of promises
//resolve the promise as soon as any promise in the array fulfills
//if all promises reject, reject the new promise with the array of rejection reasons

function promiseAny(promises){

    let rejectedCount = 0;
    let reasons = [];
  
    return new Promise((resolve , reject) => {
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(value => resolve(value))
          .catch(reason => {
  
            reasons.push(reason);
            rejectedCount++;
  
            if(rejectedCount === promises.length){
              reject (new Error('All promises were rejected'));
            }
  
          })
      })
  
    });
  };
  
  function testPromiseAny() {
    // Test Case 1: One promise fulfills
    promiseAny([Promise.reject('Error1'), Promise.resolve(2), Promise.reject('Error2')])
        .then(result => {
            console.log('Test Case 1 Passed:', result === 2);
        })
        .catch(() => {
            console.log('Test Case 1 Failed');
        });
  
    // Test Case 2: All promises reject
    promiseAny([Promise.reject('Error1'), Promise.reject('Error2'), Promise.reject('Error3')])
        .then(() => {
            console.log('Test Case 2 Failed');
        })
        .catch(error => {
            console.log('Test Case 2 Passed:', error.message === "All promises were rejected");
        });
  
    // Test Case 3: Handling non-promise values
    promiseAny([1, 2, Promise.resolve(3)])
        .then(result => {
            console.log('Test Case 3 Passed:', result === 1);
        })
        .catch(() => {
            console.log('Test Case 3 Failed');
        });
  
  
  
  }
  
  // Run the tests
  testPromiseAny();
  