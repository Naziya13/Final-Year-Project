const router = require("express").Router();
var cors = require('cors')
const fs = require("fs");
var AWS = require('aws-sdk');
var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
  "accessKeyId":'AKIATSPZDOCGFXKK7QHM',
  "secretAccessKey":'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'}

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
//const { default: feedback } = require("../../ChatBot_FrontEnd-master/src/js/feedback");
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//const { key } = require("../config/key");
//AWS.config.update({key})
router.use(bodyParser.json());

// 1.1 ********** server test api **************
router.get("/", (req, res) => res.json('welcome'));


//1.2 ************ UI - Feedback api*************
router.post("/feedbackRoute", cors(corsOptions), async (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  const {
    fullname,
    email,
    mobile,
    type,
    suggestions,
    feedback

  } = req.body;

  console.log('fullname : ' + JSON.stringify(fullname));
  //write code for adding new users to database...
  var params = {
    TableName: "Feedback",
    Item: {
      "email": email,
      "FullName": fullname,
      "mobileNo": mobile,
      "feedback": feedback,
      "suggestions": suggestions
    }
  };


  docClient.put(params, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      if (type == "Donor") {
        var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success Donor', 'data': data };
        res.json(object)
      }
      else if (type == "Requester") {
        var object = { message: ' Successfull fetched', statusCode: '201', statusMessage: 'success Requester', 'data': data };
        res.json(object)
      }
      else {
        var object = { message: ' Successfull fetched', statusCode: '202', statusMessage: 'success Volunteer', 'data': data };
        res.json(object)
      }
    }
  })
});

router.get('/feebackRoute2', cors(corsOptions), (req, res) => {

  var params = {
    TableName: "sessionDB"
  }

  docClient.scan(params, function (err, data1) {

    console.log("response from db: ", JSON.stringify(data1))
    if (err) {
      console.log(err);
    }
    else {
      let type = [];
      let E = [];
      var i = 0;
      //console.log("sucessful data fetch",data.Items); 
      data1.Items.forEach((record) => {
        type[i] = record.Type;
        E[i] = record.email
        i++;
        //console.log(record.Type)
      })

      console.log(type)

      let Email = JSON.stringify(E[0])
      Email = Email.replace(/^["'](.+(?=["']$))["']$/, '$1');

      console.log("sucessful data fetch", data1.Item);

      if (type[0] == "Donor") {
        console.log("matched..donor")
        var params = {
          TableName: "Donor",
          Key: {
            "email": Email
          }

        }

        docClient.get(params, function (err, data) {

          console.log("response from db donor: ", JSON.stringify(data))
          if (err) {
            console.log(err);
          }
          else {
            data.Item.Type = type[0]
            var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success ', 'data': data };
            res.json(object)
          }
        })
      }
      else if (type[0] === "Requester") {
        var params = {
          TableName: "requester",
          Key: {
            "email": Email
          }

        }

        docClient.get(params, function (err, data) {

          console.log("response from db: ", JSON.stringify(data))
          if (err) {
            console.log(err);
          }
          else {
            data.Item.Type = type[0]
            var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success ', 'data': data };
            res.json(object)
          }
        })
      }
      else if (type[0] == "Volunteer") {
        var params = {
          TableName: "Volunteers",
          Key: {
            "email": Email
          }

        }

        docClient.get(params, function (err, data) {

          console.log("response from db: ", JSON.stringify(data))
          if (err) {
            console.log(err);
          }
          else {
            data.Item.Type = type[0]
            var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success ', 'data': data };
            res.json(object)
          }
        })
      }
      else {
        console.log("not find...")
      }
    }
  })
})
module.exports = router
