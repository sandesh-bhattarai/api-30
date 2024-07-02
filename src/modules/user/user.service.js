require("dotenv").config()
const bcrypt = require('bcryptjs')
const {randomString} = require('../../utilities/helpers')
const mailSvc = require('../../service/mail.service')
const UserModel = require("./user.model")

class UserService{

    transformUserCreate = (req) => {
        const data = req.body;
        if(req.file) {
            data.image = req.file.filename
        }
        data.password = bcrypt.hashSync(data.password, 10)
        data.status = "inactive";
        data.activationToken = randomString(100)
        data.activeFor = new Date(Date.now() + (3*60*60*1000))
        return data;
    }

    sendActivationEmail = async({to, name, token, sub= "Activate your account!"}) => {
        try{
            return await mailSvc.sendEmail({
                to: to,
                subject: sub,
                message: `
                    <p>Dear ${name},</p>
                    <p>Your account has been registered successfully.</p>
                    <p>Please click on the link below or copy paste the url in the browser for further action.</p>
                    <a href="${process.env.FRONTEND_URL}/activate/${token}">
                        ${process.env.FRONTEND_URL}/activate/${token}
                    </a>
                    <p>------------------------------------------------------------------</p>
                    <p>Regards,</p>
                    <p>System Admin</p>
                    <p>${process.env.SMTP_FROM}</p>
                    <p>
                        <small>
                            <em>Please do not reply to this email.</em>
                        </small>
                    </p>
                `
            })
        } catch(exception) {
            throw exception
        }
    }

    storeUser = async(data) => {
        try{
            const user = new UserModel(data);
            return await user.save()       // insert or update
        } catch(exception) {
            // TODO cleanup
            throw exception
        }
    }


    getSingleUserByFilter = async(filter) => {
        try {
            // get a user by filter
            const user = await UserModel.findOne(filter)
            return user;
        } catch(exception) {
            throw exception
        }
    }

}

module.exports = new UserService()