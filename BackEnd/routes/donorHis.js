const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');
var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
  "accessKeyId": 'AKIATSPZDOCGCYECV3G7',
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
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.use(bodyParser.json());

// 1.1 ********** server test api **************
router.get("/donorRoute", cors(corsOptions), (req, res) => {

  var params = {
    TableName: 'sessionDB'
  };

  docClient.scan(params, function (err, data1) {

    console.log("response from db: ", JSON.stringify(data1))
    if (err) {
      console.log(err);
    }
    else {

      console.log("sucessful data fetch", data1.Items);
      let E = [];
      var i = 0;
      data1.Items.forEach((record) => {
        E[i] = record.email;
        i++;

      })

      let Email = JSON.stringify(E[0])
      // console.log(data1.Items.email[0])
      Email = Email.replace(/^["'](.+(?=["']$))["']$/, '$1');
      var params = {
        TableName: "Donor",
        Key: {
          "email": Email
        }
      }
      docClient.get(params, function (err, data) {
        console.log(data)
        var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success', 'data': data };
        res.json(object);
      })
    }
  });

});

module.exports = router;
