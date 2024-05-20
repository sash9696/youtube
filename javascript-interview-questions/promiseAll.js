
//Promise all polyfill

//observations
//iterable of promises
//returns a single promise
//return promise is fullfilled when all of them fulfilled including empty array
//returns rejected promise with the first rejection reason

//approach
//iterate over the array of promise
//track the resolution status of each promise
//if all the promises resolve, resolve the new promise with an array of resolved values
//if any promise rejects, reject with the first rejection reason


function promiseAll(promises){

    let results = [];
    let completedPromises = 0;
  
    return new Promise ((resolve, reject) => {
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(value => {
  
          results[index] = value;
          completedPromises++;
  
          if(completedPromises === promises.length){
            resolve(results);
          }
  
  
        }).catch(reject);
      })
  
    })
  }
  
  
  function testPromiseAll() {
    // Test Case 1: All promises resolve
    promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
        .then(result => {
            console.log('Test Case 1 Passed:', JSON.stringify(result) === JSON.stringify([1, 2, 3]));
        })
        .catch(() => {
            console.log('Test Case 1 Failed');
        });
  
    // Test Case 2: One promise rejects
    promiseAll([Promise.resolve(1), Promise.reject('Error'), Promise.resolve(3)])
        .then(() => {
            console.log('Test Case 2 Failed');
        })
        .catch(error => {
            console.log('Test Case 2 Passed:', error === 'Error');
        });
  
    // Test Case 3: Handling non-promise values
    promiseAll([1, 2, Promise.resolve(3)])
        .then(result => {
            console.log('Test Case 3 Passed:', JSON.stringify(result) === JSON.stringify([1, 2, 3]));
        })
        .catch(() => {
            console.log('Test Case 3 Failed');
        });
  
    // Test Case 4: Empty array of promises
    promiseAll([])
        .then(result => {
            console.log('Test Case 4 Passed:', JSON.stringify(result) === JSON.stringify([]));
        })
        .catch(() => {
            console.log('Test Case 4 Failed');
        });
  
    // Test Case 5: Mixed resolved and rejected promises
    promiseAll([Promise.resolve(1), Promise.reject('Error1'), Promise.resolve(3), Promise.reject('Error2')])
        .then(() => {
            console.log('Test Case 5 Failed');
        })
        .catch(error => {
            console.log('Test Case 5 Passed:', error === 'Error1');
        });
  }
  
  // Run the tests
  testPromiseAll();
  