/*
1. Callbacks
2. Events
3. Promises
*/

function add(x, y) {

    console.log('[SP] adding ', x, "and ", y);
    var result = x + y;
    console.log('[SP] returing result');
    return result;
}


function addClient() {
    console.log('[SC] calling add');
    var result = add(100, 200);
    confirm.log('returned result ' + result);

}


/* Async using callbacks*/  // drawback is that the caller need to handle the call back
function addAsync(x, y,callback) {

    console.log('[SP] adding ', x, "and ", y);
    setTimeout(function () {
        var result = x + y;
        console.log('[SP] returing result');
        callback(result);
    }, 4000)

}

function addAsyncClient(x, y) {
    console.log('[SC] calling add');
    var result = addAsync(x, y, function (result) {
        console.log('returned result ' + result);

    });

}



/* Asyc using events*/ // drawback is you need to follow the linear approach to add the listeners else listner will not be notified if the function is executed

function getAdder() {
    var callbacks = [];
    function add(x, y) {
        console.log('[SP] adding ', x, "and ", y);
        setTimeout(function () {
            var result = x + y;
            console.log('[SP] returing result');
            callbacks.forEach(function (callBack) {
                callBack(result);
            });
        }, 4000)
    }
    function addListner(func) {
        callbacks.push(func);
    }
    return {
        operate: add,
        addListner: addListner
    }

}

var adder = getAdder();
adder.addListner(function (result) {
    console.log('reviced reslut  ' + result);
});
console.log("SC triggering add")
adder.operate(10, 20);




/*Async using Promises*/

function addAsync(x,y) {

    var promise = new Promise(function (resolve,reject) {
        setTimeout(function () {
            var result = x + y;
            console.log('[SP] returing result');
            resolve(result);
        }, 4000)
    });
    return promise;
}


function addAsync(x,y) {

    var promise = new Promise(function (resolve,reject) {
        setTimeout(function () {
            try{
                var result = x / y;
            }
            catch(ex) {
                reject('divide by zero' + ex);
            }
            console.log('[SP] returing result');
            resolve(result);
        }, 4000)
    });
    return promise;
};