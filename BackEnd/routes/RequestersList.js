const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');
var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
"accessKeyId":'AKIATSPZDOCGFXKK7QHM',
"secretAccessKey":'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'
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

const { key } = require("../config/key");
//AWS.config.update({key})
router.use(bodyParser.json());

router.get("/adminReq_Route", cors(corsOptions), (req, res) => {

  var params = {
    TableName: 'requester'
  };

  docClient.scan(params, function (err, data) {

    console.log("response from db: ", JSON.stringify(data))
    if (err) {
      console.log(err);
    }
    else {

      console.log("sucessful data fetch", data.Item);
      var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success', 'data': data };
      res.json(object);
    }

  });


});


module.exports = router;
