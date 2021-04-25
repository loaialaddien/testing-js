// Testing Pure Functions

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)
// test.todo('remove me')

// 🐨 import the function that we're testing
import {isPasswordAllowed} from '../auth';
💰 import {isPasswordAllowed} from '../auth'

// // 🐨 write tests for valid and invalid passwords
// // 💰 here are some you can use:
// //
// // valid:
// // - !aBc123
// //
// // invalid:
// // - a2c! // too short
// // - 123456! // no alphabet characters
// // - ABCdef! // no numbers
// // - abc123! // no uppercase letters
// // - ABC123! // no lowercase letters
// // - ABCdef123 // no non-alphanumeric characters
// const tests = [
//     {
//         input:"!aBc123",
//         description: "valid password",
//         expectedReturn : true
//     },
//     {
//         input:"a2c!",
//         description: "password too short",
//         expectedReturn : false
//     },{
        
//         input:"123456!",
//         description: "having no alphabet characters",
//         expectedReturn : false
//     }
// ]
const getDescription  = ({description,input, expectedReturn})=>`isPasswordAllowed should return ${expectedReturn} when input is ${input} for ${description}`

describe("isPasswordAllowed",()=>{
    // test("should return true for valid password",()=>{
    //     expect(isPasswordAllowed("!aBc123")).toBe(true);
    // });
    // test("should return false for password too short",()=>{
    //     expect(isPasswordAllowed("!aBc1")).toBe(false);
    // });
    // test("should return false for password has no alphabet characters",()=>{
    //     expect(isPasswordAllowed("!12456")).toBe(false);
    // });
    // test("should return false for password has no numbers",()=>{
    //     expect(isPasswordAllowed("ABCdef!")).toBe(false);
    // });    
    // test("should return false for password has no uppercase letters",()=>{
    //     expect(isPasswordAllowed("abc123!")).toBe(false);
    // });
    // test("should return false for password has no lowercase letters",()=>{
    //     expect(isPasswordAllowed("ABC123!")).toBe(false);
    // });
    // test("should return false for password has no non-alphanumeric characters",()=>{
    //     expect(isPasswordAllowed("ABCdef123")).toBe(false);
    // });
    tests.forEach(({description,expectedReturn,input})=>{
        return test(getDescription({description,input,expectedReturn}),()=>{
            expect(isPasswordAllowed(input)).toBe(expectedReturn);
            expect(isPasswordAllowed("adf")).toThrow();
        })
    })
})
