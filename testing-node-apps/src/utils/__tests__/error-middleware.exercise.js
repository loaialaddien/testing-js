// Testing Middleware

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)
// test.todo('remove me')

// 🐨 you'll need both of these:
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
const testFactory = ({err,req,res,next})=>{
    return {
        req :  {
            ...req
        } ,
        nextFn : next || jest.fn(()=>{}),
        res : {json: jest.fn(() => res), status: jest.fn(() => res),...res},
        error:err || new Error("tmp error")
    }
}

 describe('errorMiddleware', () => {
     test('should call next with the error', () => {
        //  const nextFn = jest.fn(()=>{});
        //  const headersError = new Error("headers Error");
        //  const resForHeadersSent = {headersSent:true};
        const testUtils = testFactory({
            res : {
                headersSent:true
            }
        });
         errorMiddleware(testUtils.error,testUtils.req,testUtils.res,testUtils.nextFn);
         expect(testUtils.nextFn).toHaveBeenCalledWith(testUtils.error);
     });
     test('should return 401 if error is instance of unauthorized', () => {
        const error = new UnauthorizedError('some_error_code', {message: 'Some message'})
        // const res = {json: jest.fn(() => res), status: jest.fn(() => res)};
        // const nextFn = jest.fn(()=>{});

        const testUtils = testFactory({
            err : error
        });
        errorMiddleware(testUtils.error,testUtils.req,testUtils.res,testUtils.nextFn);
        expect(testUtils.res.status).toHaveBeenCalledWith(401);
        expect(testUtils.res.status).toHaveBeenCalledTimes(1);
        expect(testUtils.nextFn).toHaveBeenCalledTimes(0);
     })
     test('should return error code, error message if error is instance of unauthorized', () => {
        const error = new UnauthorizedError('some_error_code', {message: 'Some message'})
        const res = {json: jest.fn(() => res), status: jest.fn(() => res)};
        const nextFn = jest.fn(()=>{});

        errorMiddleware(error,{},res,nextFn);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            code:"some_error_code",
            message:"Some message"
        });

     });
     test('should return 500, if error is server error', () => {
        const error = new Error("error should appear");
        const res = {json: jest.fn(() => res), status: jest.fn(() => res)};
        const nextFn = jest.fn(()=>{});

        errorMiddleware(error,{},res,nextFn);
        expect(res.json).toBeCalledTimes(1);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message:"error should appear",
            ...{stack:error.stack}
        });
        
     })

     test('should return 500, with no stack in production', () => {
        const error = new Error("error should appear");
        const res = {json: jest.fn(() => res), status: jest.fn(() => res)};
        const nextFn = jest.fn(()=>{});
        const tmpProcess = process.env.NODE_ENV;
        process.env.NODE_ENV = "production"
        errorMiddleware(error,{},res,nextFn);
        expect(res.json).toHaveBeenCalledWith({
            message:"error should appear",
        });
        process.env.NODE_ENV = tmpProcess;
     })
     
     
 })
 
// 🐨 Write a test for the headersSent case

// 🐨 Write a test for the else case (responds with a 500)
