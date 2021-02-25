var nodemailer = require('nodemailer');
// email sender function
function token(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
exports.sendEmail = function(req, res){
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yoeldategeek@gmail.com',
            pass: 'Yalimar22..',
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'yoeldategeek@gmail.com',
        to: 'yoeldategeek@gmail.com',
        subject: 'Asunto',
        text: 'Este es tu codigo de confirmación ' + token(999999, 100000),
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};