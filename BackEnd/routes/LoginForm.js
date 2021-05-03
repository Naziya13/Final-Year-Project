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

const { key } = require("../config/key");
//AWS.config.update({key})
router.use(bodyParser.json());

// 1.1 ********** server test api **************
router.get("/", (req, res) => res.json('welcome'));


//1.2 ************ UI - login api*************
router.post("/loginRoute", cors(corsOptions), (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  var {
    Email,
    pass,
    selected
  } = req.body;
  console.log("Type of email:" + typeof (Email))
  console.log(Email)
  function SessionDb(email, password, type) {
    console.log("Email:" + email + "Type:" + type);
    var params = {
      TableName: "sessionDB",
      Item: {
        "email": email,
        "password": password,
        "Type": type
      }

    }
    docClient.put(params).promise().then(data =>
      console.log(data.Attributes)).catch(console.error);

  }


  if (selected == "Admin") {
    console.log("selected:" + selected)
    var params = {
      TableName: 'Admin',
      Key: {
        "email": Email
      },

      KeyConditionExpression: 'email = :Email ',

      ExpressionAttributeValues: {
        ":Email": Email
      },

      "projectionExpression": "email,password,FullName"

    };
    docClient.get(params, function (err, User_data) {

      console.log("response from db: ", JSON.stringify(User_data))
      // console.log("User:"+User_data)
      if (err) {
        console.log(err);
      }
      else {
        console.log("data length : " + User_data);
        if (User_data.hasOwnProperty("Item") && User_data.Item.email == Email && User_data.Item.password == pass) {
          SessionDb(Email, pass, selected)

          console.log("sucessful Login", User_data.Item);
          var object = { message: 'login Successfull', statusCode: '200', statusMessage: 'success User', 'data': User_data };
          res.json(object);

        }
        else {
          var object = { message: 'Invalid User', statusCode: '403', statusMessage: 'success' };
          res.json(object)
        }
      }
    })

  }
  else if (selected == "Donor") {
    var params = {
      TableName: 'Donor',
      Key: {
        "email": Email
      },

      KeyConditionExpression: 'email = :Email ',

      ExpressionAttributeValues: {
        ":Email": Email
      },

      "projectionExpression": "email,password,FullName"

    };
    docClient.get(params, function (err, data) {

      console.log("response from db: ", JSON.stringify(data))
      if (err) {
        console.log(err);
      }
      else {
        console.log("data length : " + data);
        if (data.hasOwnProperty("Item") && data.Item.email == Email && data.Item.password == pass) {
          SessionDb(Email, pass, selected)
          console.log("sucessful Login", data.Item);
          var object = { message: 'login Successfull', statusCode: '201', statusMessage: 'success donor', 'data': data };

          res.json(object);
        }
        else {
          var object = { message: 'Invalid User', statusCode: '403', statusMessage: 'success' };
          res.json(object)
        }
      }
    })

  }
  else if (selected == "Requester") {
    var params = {
      TableName: 'requester',
      Key: {
        "email": Email
      },

      KeyConditionExpression: 'email = :Email ',

      ExpressionAttributeValues: {
        ":Email": Email
      },

      "projectionExpression": "email,password,FullName"

    };
    docClient.get(params, function (err, User_data) {

      console.log("response from db: ", JSON.stringify(User_data))
      if (err) {
        console.log(err);
      }
      else {
        console.log("data length : " + User_data);
        if (User_data.hasOwnProperty("Item") && User_data.Item.email == Email && User_data.Item.password == pass) {
          console.log("sucessful Login", User_data.Item);
          var object = { message: 'login Successfull', statusCode: '202', statusMessage: 'success requester', 'data': User_data };
          SessionDb(Email, pass, selected)
          res.json(object);
        }
        else {
          var object = { message: 'Invalid User', statusCode: '403', statusMessage: 'success' };
          res.json(object)
        }
      }
    })

  }
  else if (selected == "Volunteer") {
    var params = {
      TableName: 'Volunteers',
      Key: {
        "email": Email
      },

      KeyConditionExpression: 'email = :Email ',

      ExpressionAttributeValues: {
        ":Email": Email
      },

      "projectionExpression": "email,password,FullName"

    };
    docClient.get(params, function (err, data) {

      console.log("response from db: ", JSON.stringify(data))
      if (err) {
        console.log(err);
      }
      else {
        console.log("data length : " + data);
        if (data.hasOwnProperty("Item") && data.Item.email == Email && data.Item.password == pass) {
          console.log("sucessful Login", data.Item);
          var object = { message: 'login Successfull', statusCode: '203', statusMessage: 'success volunteer' };
          SessionDb(Email, pass, selected)
          res.json(object);
        }
        else {
          var object = { message: 'Invalid User', statusCode: '403', statusMessage: 'success' };
          res.json(object)
        }
      }
    })
  }
  else {
    var object = { message: 'Invalid User', statusCode: '403', statusMessage: 'success' };
    res.json(object)
  }
})
module.exports = router;
