import nodeMailer from "nodemailer"
import config from "./config"

const transporter = nodeMailer.createTransport({
    host: config.stmpServerConfig.host,
    port: parseInt(config.stmpServerConfig.port!),
    auth: {
        user: config.stmpServerConfig.user,
        pass: config.stmpServerConfig.password
    }
})

export default function sendEmail(to: string, subject: string, content: string) {
    transporter.sendMail({
        from: config.stmpServerConfig.user,
        to,
        subject,
        text: content,
    }, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log("message send: " + info.response)
    })
}