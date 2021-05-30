const router = require("express").Router();
var cors = require('cors')
const fs = require("fs");
var AWS = require('aws-sdk');
var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
 "accessKeyId":'',
"secretAccessKey":''
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


router.get("/TranscRoute", cors(corsOptions), (req, res) => {

  var params = {
    TableName: 'Daily_Transaction',

  };

  docClient.scan(params, function (err, data) {

    console.log("response from db: ", JSON.stringify(data))
    if (err) {
      console.log(err);
    }
    else {
      let email = [];
      let volunteer_Name = [];
      let volunteer_Id = [];
      let source = [];
      let destination = [];
      let Work_Status = [];
      let date = [];
      let i = 0
      data.Items.forEach(element => {
        email[i] = element.email;
        volunteer_Id[i] = element.volunteer_Id;
        volunteer_Name[i] = element.volunteer_Name;
        source[i] = element.source;
        date[i] = element.date;
        destination[i] = element.Destination;
        Work_Status[i] = element.Work_Status;

        i++;
      });
      console.log("date" + date)
      console.log("sucessful data fetch", data.Items);
      let date_ob = new Date()

      let T_date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getUTCFullYear();
      console.log(data.Items.length)
      for (var j = 0; j < data.Items.length; j++) {
        //console.log("date:"+Object.values(date[j]))
        if (date[j] == (year + "-" + month + "-" + T_date)) {
          console.log("Todays data sended")
          data = {
            Item: {
              volunteer_Name: volunteer_Name[j],
              email: email[j],
              volunteer_Id: volunteer_Id[j],
              source: source[j],
              Destination: destination[j],
              date: date[j],
              Work_Status: Work_Status[j]
            }
          }
          break;
        }
      }
      var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success', 'data': data };
      res.json(object);



    }

  });


});



module.exports = router;
