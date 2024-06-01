
//custom promise

//create states pending, fullfilled, rejected

//basic promise structure take a callback with resolve and reject methods

//then will take onSuccess and onError and catch method

//update function asynchronously

//.then also returns a promise 

// onfullfillment array, handlers array to keep a track of .then functions


const states = {
    PENDING:"PENDING",
    FULFILLED:"FULFILLED",
    REJECTED:"REJECTED"
};


class CustomPromise{

    constructor(callback){
        this.state = states.PENDING;
        this.value = undefined;
        this.handlers = [];

        // this._reject.bind(this) only in case of func declarations


    try {

        callback(this._resolve, this._reject)
        
    } catch (error) {
        
    }

    };

    _addHandler = (handler) => {

        this.handlers.push(handler);
        this._executeHandlers();
    }

    _resolve = (value) => {
        // console.log(value)
        this._handleUpdate(states.FULFILLED, value)
    }

    _reject = (value) => {
        // console.log(value)
        this._handleUpdate(states.REJECTED, value)

    }
    _handleUpdate = (state, value) => {
        if(this.state !== states.PENDING){
            return;
        }

        setTimeout(() => {
            if(value instanceof CustomPromise){
                value.then(this._resolve, this._reject)
            }

            this.state = state;
            this.value = value;

            this._executeHandlers();
        }, 0)
    }
    _executeHandlers = () => {

        if(this.state === states.PENDING){
            return;
        }

        this.handlers.forEach((handler) => {
            //fullfilled

            if(this.state == states.FULFILLED){
                return handler.onSuccess(this.value)
            };

            //rejected
            return handler.onFailure(this.value);
        })

    }
    then = (onSuccess, onFailure) => {
        console.log('onSuccess',onSuccess)
        return new CustomPromise((resolve, reject) => {

            this._addHandler({
                onSuccess: (value) => {
                    if(!onSuccess){
                        return resolve(value);
                    }
                    try {
                        return resolve(onSuccess(value))
                    } catch (error) {
                        return reject(error)
                    }
                },
                onFailure: (value) => {
                    if(!onFailure){
                        return reject(value);
                    }
                    try {
                        return reject(onFailure(value))
                    } catch (error) {
                        return reject(error)
                    }
                },
            });

        })


    }

    catch = (onFailure) => {
        return this.then(null, onFailure);
    }

};

const promise1 = new CustomPromise((resolve, reject) => {
    resolve(100);
});

// promise1
//     .then((val) =>  console.log(val))
//     .catch((err) =>console.error(err))

promise1.then(value => console.log(value))

promise1.then(value => console.log(value))