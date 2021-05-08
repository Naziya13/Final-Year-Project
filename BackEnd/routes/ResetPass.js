const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');


var awsconfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": '',
    "secretAccessKey": ''
}

AWS.config.update(awsconfig)
var docClient = new AWS.DynamoDB.DocumentClient();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use(cors(corsOptions))

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
router.use(
    bodyParser.urlencoded({
        extended: true
    })
);

router.use(bodyParser.json());

router.post('/ResetPassword', cors(corsOptions), (req, res) => {
    console.log("reqBody:" + JSON.stringify(req.body));

    const { Cpass, email, selected } = req.body;

    if (selected == "Admin") {
        var params = {
            TableName: "Admin",
            Key: {
                "email": email
            },
            UpdateExpression: "set password=:p",
            ExpressionAttributeValues: {
                ":p": Cpass
            }
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                var object = { message: ' Successfull updated', statusCode: '200', statusMessage: 'success' };
                res.json(object);
            }

        })
    }
    else if (selected == "Donor") {
        var params = {
            TableName: "Donor",
            Key: {
                "email": email
            },
            UpdateExpression: "set password=:p",
            ExpressionAttributeValues: {
                ":p": Cpass
            }
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                var object = { message: ' Successfull updated', statusCode: '200', statusMessage: 'success' };
                res.json(object);
            }

        })
    }
    else if (selected == "Requester") {
        var params = {
            TableName: "requester",
            Key: {
                "email": email
            },
            UpdateExpression: "set password=:pass",
            ExpressionAttributeValues: {
                ":pass": Cpass
            }
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                var object = { message: ' Successfull updated', statusCode: '200', statusMessage: 'success' };
                res.json(object);
            }

        })
    }
    else {
        var params = {
            TableName: "Volunteers",
            Key: {
                "email": email
            },
            UpdateExpression: "set password=:p",
            ExpressionAttributeValues: {
                ":p": Cpass
            }
        }
        docClient.update(params, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                var object = { message: ' Successfull updated', statusCode: '200', statusMessage: 'success' };
                res.json(object);
            }

        })
    }
})
module.exports = router;