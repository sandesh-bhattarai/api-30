require('dotenv').config();
const nodemailer = require("nodemailer")

class MailService{
    
    #transport;

    constructor(){
        try{
            const connectionOpts = {
                host: process.env.SMTP_HOST,        // smtp.sandeshbhattarai.com.np
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                }
            }
            if(process.env.SMTP_PROVIDER === 'gmail') {
                connectionOpts['service'] = 'gmail'
            }

            this.#transport = nodemailer.createTransport(connectionOpts)
        } catch(exception) {
            console.log(exception)
            console.log("Error connecting SMTP Server...")
            // process.exit(1)
            throw {status: 500, message: "Error connecting smtp server", detail: exception}
        }
    }

    sendEmail = async ({to, subject, message, attachements=null}) => {
        try{
            const msgOpts = {
                to: to,
                from: process.env.SMTP_FROM,
                subject: subject, 
                html: message
            };

            if(attachements) {
                // file path absoulte
                msgOpts['attachements'] = attachements
            }

            await this.#transport.sendMail(msgOpts);
            return true
        } catch(exception) {
            console.log("Error sending email")
            console.log(exception)
            throw {status: 500, message: "Error sending email", detail: exception}
        }
    }
}

const mailSvc = new MailService()
module.exports = mailSvc