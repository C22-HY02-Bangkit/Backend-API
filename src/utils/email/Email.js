const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const smtpTransport = require('nodemailer-smtp-transport');
const { generateToken } = require('../tokenManager');

class Email {
    constructor(email, subject, payload, template) {
        this.to = email;
        this.subject = subject;
        this.payload = payload;
        this.template = template;
    }

    transporter() {
        return nodemailer.createTransport(
            smtpTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            })
        );
    }

    async sendEmail() {
        const sourceTemplate = fs.readFileSync(
            path.join(__dirname, `./templates/${this.template}.handlebars`),
            'utf-8'
        );
        const htmlTemplate = handlebars.compile(sourceTemplate);

        const mailOptions = {
            // from: this.from,
            from: process.env.MAIL_SENDER,
            to: this.to,
            subject: this.subject,
            html: htmlTemplate(this.payload),
        };

        await this.transporter().sendMail(mailOptions);
    }
}

module.exports = Email;
