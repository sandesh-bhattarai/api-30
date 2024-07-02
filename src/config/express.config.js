const express = require("express");
// load db config
require("./db.config")

// import express from "express"
const router = require("../router/router.config")

const app = express();


// body parsers
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// router mount
app.use(router);


app.use((req, res, next) => {
    // 404
    next({status: 404, message: "Resource not found."})
})
// error handler middleware
// error {status: 401, detail: null, message: "Please login first"}
app.use((error, req, res, next) => {
    
    console.log(error)

    let status = error.status || 500
    let message = error.message || "Server error...."
    let result = error.detail || null;

    // TODO Status
    // if(error instanceof ValidationError){
    //     result = {}
    //     error.details.map((error) => {
    //         // console.log(error)
    //         result[error.context.label] = error.message
    //     })
    //     status =  422
    //     message=  "Validation failed."
    // }
    res.status(status).json({
        result: result,
        meta: null, 
        message: message
    })
});
module.exports = app;
// export default app;