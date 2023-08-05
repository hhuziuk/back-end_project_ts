import nodemailer from 'nodemailer'
import logger from "../utils/logger";
class MailService{
    private transporter: nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Activation message for ' + process.env.API_URL,
            text: '',
            html:
                `<div>
                    <h1>follow the link to activate your account</h1>
                    <a href="${link}">${link}</a>
                    </div>`
        })
    }
}

export default new MailService()


// , (err: Error, info: String) => {
//     logger.error(err);
//     logger.info(info)
// }