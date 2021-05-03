const router = require("express").Router();
var cors = require('cors')
const fs = require("fs");
var AWS = require('aws-sdk');
var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
  "accessKeyId": 'AKIATSPZDOCGFXKK7QHM',
  "secretAccessKey": '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'
}

AWS.config.update(awsconfig)
var docClient = new AWS.DynamoDB.DocumentClient();

var corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use(cors(corsOptions))

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { FSx } = require("aws-sdk");
//const { default: feedback } = require("../../ChatBot_FrontEnd-master/src/js/feedback");
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//const { key } = require("../config/key");
//AWS.config.update({key})
router.use(bodyParser.json());

router.get('/donorRoute', cors(corsOptions), (req, res) => {

  var params = {
    TableName: 'sessionDB'
  };

  docClient.scan(params, function (err, data1) {


    console.log("response from db: ", JSON.stringify(data1))
    if (err) {
      console.log(err);
    }
    else {
      let E = [];
      var i = 0;
      //console.log("sucessful data fetch",data.Items); 
      data1.Items.forEach((record) => {
        E[i] = record.email;
        i++;
        console.log(record.email)
      })
      console.log("Email:" + E)

      //console.log(String.valueOf(Email))
      //let e=String.valueOf(Email)
      //console.log("E"+e)
      let Email=JSON.stringify(E[0])
      Email=Email.replace(/^["'](.+(?=["']$))["']$/, '$1');
      //console.log(mail)
      var params = {
        TableName: "Donor",
        Key: {
          "email": Email
        }

      }
      docClient.get(params, function (err, data) {
        console.log("response from db donor ", JSON.stringify(data))
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