const router = require("express").Router();
var cors = require('cors')
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

//const { key } = require("../config/key");
//AWS.config.update({key})
router.use(bodyParser.json());

// 1.1 ********** server test api **************
router.get("/", (req, res) => res.json('welcome'));


//1.2 ************ UI - register api*************
router.post("/registerRoute", cors(corsOptions), (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  const {
    fullName,
    email,
    pass,
    mob,
    male,
    female,
    other,
    address,
    selected
  } = req.body;
  if (male == null) {
    var gender = 'male';
  }
  if (female == null) {
    var gender = 'female';
  }
  if (other == null) {
    var gender = 'other';
  }
  console.log('fullname : ' + JSON.stringify(fullName));
  console.log(typeof (selected))

  let date_ob = new Date()

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getUTCFullYear();
  let hr = date_ob.getHours();
  let min = date_ob.getMinutes();
  let sec = date_ob.getSeconds();


  if (selected == "Donor") {
    /*
        var params = {
          TableName: "Donor"
    
        }
        docClient.scan(params, function (err, data) {
          if (err) {
            console.log(err)
          }
          else {
            console.log("sucessfully fetch donors" + JSON.stringify(data))
            let E = [];
            var i = 0;
            //console.log("sucessful data fetch",data.Items); 
            data.Items.forEach((record) => {
              E[i] = record.email;
              i++;
              console.log(record.email)
            })
            for (var i = 0; i < E.length; i++) {
              if (email == E[i]) {
                console.log("Failed...")
              }
              else {
                //write code for adding new users to database...
              
              }
            }
    
          }
        })*/

    var params = {
      TableName: "Donor",
      Item: {
        "email": email,
        "address": address,
        "gender": gender,
        "name": fullName,
        "mobile": mob,
        "password": pass,
        "Work_status": "Not completed",
        "OfferProduct": "none",
        "Date_Time": year + "-" + month + "-" + date + " " + hr + ":" + min + ":" + sec


      }
    };

    docClient.put(params).promise().then(data =>
      console.log(data.Attributes)).catch(console.error);


    res.json("Successfully INserted to Database..")
  }
  else {
    /*
        var params = {
          TableName: "requester"
    
        }
        docClient.scan(params, function (err, data) {
          if (err) {
            console.log(err)
          }
          else {
            console.log("sucessfully fetch donors" + JSON.stringify(data))
            let E = [];
            var i = 0;
            //console.log("sucessful data fetch",data.Items); 
            data.Items.forEach((record) => {
              E[i] = record.email;
              i++;
              console.log(record.email)
            })
            for (var i = 0; i < E.length; i++) {
              if (email == E[i]) {
                console.log("Failed...")
              }
              else {
               
              }
            }
          }
        })*/
    //write code for adding new users to database...
    var params = {
      TableName: "requester",
      Item: {
        "email": email,
        "address": address,
        "gender": gender,
        "name": fullName,
        "mobile": mob,
        "password": pass,
        "RequestProduct": "none",
        "Work_status": "Not completed",
        "Date_Time": year + "-" + month + "-" + date + " " + hr + ":" + min + ":" + sec

      }
    };

    docClient.put(params).promise().then(data =>
      console.log(data.Attributes)).catch(console.error);


    res.json("Successfully INserted to Database..")

  }

});
module.exports = router;

