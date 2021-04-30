const nodemailer = require("nodemailer");
const { host, port, user, pass } = require('../config/mail.json');


const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
});

module.exports = transporter;