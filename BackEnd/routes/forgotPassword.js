/*const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');


var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
  "accessKeyId": '',
  "secretAccessKey": ' '
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

router.post('/forgotPassword', cors(corsOptions), (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));

  const user = req.body.email;

  const expirePasswordTokens = async (user) => {
    if (!user) throw new Error("user is required");


  }

})
module.exports = router;*/