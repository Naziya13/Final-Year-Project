const router = require("express").Router();
var cors = require('cors')
const fs = require("fs");
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
const { FSx } = require("aws-sdk");

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//const { key } = require("../config/key");
//AWS.config.update({key})
router.use(bodyParser.json());

router.get('/AdminRoute', cors(corsOptions), (req, res) => {

  var params = {
    TableName: 'sessionDB'

  };

  docClient.scan(params, function (err, data1) {

    console.log("response from db: ", JSON.stringify(data1))
    if (err) {
      console.log(err);
    }
    else {

      var params = {
        TableName: "Admin"
      }
      docClient.scan(params, function (err, data) {
        console.log("response from db admin ", JSON.stringify(data))
        if (err) {
          console.log(err);
        }
        else {

          console.log("sucessful data fetch", data.Item);
          var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success', 'data': data };
          res.json(object);
        }
      })
    }
  });

});

router.post('/logout', cors(corsOptions), (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  var { email } = req.body
  var params = {
    TableName: "sessionDB",
    Key: {
      "email": email
    }

  }
  docClient.delete(params, function (err, data) {

    if (err) {
      console.log(err);
    }
    else {
      console.log("deleted...")
      var object = { message: ' Successfull deleted', statusCode: '200', statusMessage: 'success' };
      res.json(object);
    }
  })

})
module.exports = router;
