import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    //console.log("testAccount", testAccount);

    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log("server is ready to take messages:", success);
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "er6hegdrm3cus7xe@ethereal.email", // sender address
        to: to, // list of receivers
        subject: "Change password", // Subject line
        html,
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
