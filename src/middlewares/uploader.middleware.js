// @sandesh-bhattarai
const multer = require("multer")
const fs = require("fs");
const { randomString } = require("../utilities/helpers");


const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./public/uploads"+req.uploadPath;
        if(!fs.existsSync(path)) {
            // create the dir
            fs.mkdirSync(path, {recursive: true})
        }

        cb(null, path)
    },
    filename: (req, file, cb) => {
        // filename.ext
        const ext = file.originalname.split(".").pop()
        const random = Math.ceil((Math.random()) * 99999);
        
        // const filename = Date.now()+"-"+random+"."+ext;
        const filename = randomString(35)+"."+ext
        cb(null, filename)
    }
})



const uploader = multer({
    storage: mystorage,
    fileFilter: (req, file, cb) => {
        const ext = file.originalname.split(".").pop()  // JPG.toLowerCase() => jpg
        const allowed = ['jpg','jpeg','png','gif','svg','webp','bmp'];

        if(allowed.includes(ext.toLowerCase())) {
            cb(null, true)
        } else {
            cb({status: 400, message: "File format not supported"}, false)
        }
    },
    limits: {
        fileSize: 3000000
    }
})


const setPath = (path) => {
    return (req, res, next) => {

        req.uploadPath= path;
        next()
    }
}
module.exports = {uploader, setPath}