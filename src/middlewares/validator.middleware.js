const { deleteFile } = require("../utilities/helpers");

const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try{
            const data = req.body;

            if(req.file) {
                // for single upload 
                data[req.file.fieldname] = req.file.filename
            }

            await schema.validateAsync(data, {abortEarly: false});
            // succcess
            next()
        } catch(exception) {
            const detail = {};

            // fail
                // image upload 
            // dleete image 
            if(req.file) {
                deleteFile("./"+req.file.path)
            } else if(req.files) {
                req.files.map((file) => {
                    deleteFile("./"+file.path)
                })
            }
            // console.log(exception)
            // details 
            exception.details && exception.details.map((error) => {
                // console.log(error)
                detail[error.context.label] = error.message
            })
            next({status: 422, message: "Validation Failed", detail: detail})
        }
    }
}



const validateBody = async(schema) => {
    try{
        const data = req.body;

        if(req.file) {
            // for single upload 
            data[req.file.fieldname] = req.file.filename
        }

        const response = await schema.validateAsync(data, {abortEarly: false});
        // succcess
        return response
    } catch(exception) {
        // handling 
        
        //throw exce
    }
}
module.exports = {
    bodyValidator,
    validateBody
}