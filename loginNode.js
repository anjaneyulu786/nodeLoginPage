var http = require("http");
var fs = require("fs");
var querystring = require("querystring");
var MongoClient = require("mongodb").MongoClient;
// mail module
const nodemailer = require("nodemailer");
// var url = "mongodb://localhost:27017/demo";
http.createServer(function (req, res) {
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.createReadStream("Login.html", "UTF-8").pipe(res);
    }
    if (req.method === "POST") {
        var data = "";
        // data will be stored in the chunk
        req.on("data", function (chunk) {
            data += chunk;
        });
        req.on("end", function (chunk) {
            MongoClient.connect("mongodb://localhost:27017", function (err, client) {
                if (err) throw err;

                var db = client.db('demo');
                var q = querystring.parse(data);
                console.log('q :: ' + JSON.stringify(data, null, 2));
                console.log('q :: ' + JSON.stringify(q, null, 2));
                db.collection('democollection').insertOne(q, function (findErr, result) {
                    if (findErr) throw findErr;
                    console.log(result);
                    client.close();
                    var nodemailer = require('nodemailer');
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'companyhead123@gmail.com',
                            pass: '1629afbiqwop'  
                        }
                    });

                    var mailOptions = {
                        from: 'companyhead123@gmail.com',
                        to: 'companyhead123@gmail.com',
                        subject: 'That was easy! ',
                        text: 'Hai, This is srinivas from agilance'
                    };

                        transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });
            });
        });
    }
}).listen(3002);
console.log("Server started on 3002 port::::::::");


