
console.log(require.resolve("./utils")); // this returns the absolute path of a module

const jest = {} || require("jest");
const utils = require("./utils");


//jest.fn is a function used for monkey patching 
// its implementation looks something like this 
function fn(impl) { // impl is the passed implementation of the function
    const mockFn = (...args) => {
    mockFn.mock.calls.push(args) 
    return impl(...args)
    }
    mockFn.mock = {calls: []} // keeping track of each call
    return mockFn
}
//----------
jest.spyOn(utils,"functionToBeMocked") /**The .spyOn method will replace the getWinner on utils with an empty mock function. */

utils.functionToBeMocked = jest.fn(function mockingUtilsFunc(){return 0})   // my moc implementation passed to jest.fn
// we can also do this 
utils.functionToBeMocked.mockImplementation(function mockingUtilsFunc(){return 0})

utils.functionToBeMocked.mockRestore();

// there's also, a way to mock an entire module 
// it takes a relative path to the module you're trying to mock
jest.mock("./utils.js",()=>{
    // return the implmentation of the module you want
    return{
        functionToBeMocked : jest.fn(function mockingUtilsFunc(){return 0}),
    };
})


// for cleanup use , when using jest.mock
utils.functionToBeMocked.mockReset();

// the above mock though is local to this file, if you want to do global mock,
// create a directory with the name __mocks__
// each file in there, should mock a module you want to mock
// so to mock utils.js, you'll have to make __mocks__/utils.js
// it'll look something like this 
module.exports = {
    functionToBeMocked : jest.fn(function mockingUtilsFunc(){return 0}),
}



// to use it we will only do this in any module 

jest.mock("./utils.js"); // without passing the second parameter


// jest uses require.cache to be able to swap implementations