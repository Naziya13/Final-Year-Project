const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');
var fs = require('fs');
var multer = require('multer');
var multerS3 = require('multer-s3');

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


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage }, { dest: 'uploads/' });


const s3 = new AWS.S3({
  "region": "ap-south-1",
  "endpoint": "http://s3.ap-south-1.amazonaws.com",
  "accessKeyId": 'AKIATSPZDOCGFXKK7QHM',
  "secretAccessKey": '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'
});



//const bucket_name='requesters-bucket';
var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'donors-bucket',
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname + '-' + Date.now()); //use Date.now() for unique file keys
    }
  })
});

// 1.1 ********** server test api **************
router.get("/", (req, res) => res.json('welcome'));

//1.2 ************ UI - Donor's api*************
router.post("/donorRoute", cors(corsOptions), uploads.single('file'), (req, res) => {
  console.log("reqFile:" + JSON.stringify(req.file));
  console.log("reqBody:" + JSON.stringify(req.body));

  const {
    offer,
    //name,
    //address,
    // pass,
    //gender,
    //mobile,
    email
  } = req.body;



  //write code for adding new users to database...
  var params = {
    TableName: "Donor",
    Key: {
      "email": email

    },
    UpdateExpression: "set OfferProduct=:offer",
    ExpressionAttributeValues: {
      ":offer": offer
    }



  }
  docClient.update(params, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      var object = { message: ' Successfull', statusCode: '200', statusMessage: 'success' };
      res.json(object);
    }
  })

  // s3 upload

  const file = req.file;
  if (!file) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    console.error(error);
    console.log("file upload failed....")
  }
  else {
    res.json("successfuly inserted in database...")
  }

});

router.get('/donorRoute2', cors(corsOptions), (req, res) => {

  var params = {
    TableName: "sessionDB"
  }

  docClient.scan(params, function (err, data1) {

    console.log("response from db: ", JSON.stringify(data1))
    if (err) {
      console.log(err);
    }
    else {

      console.log("sucessful data fetch", data1.Item);
      let E = [];
      var i = 0;
      //console.log("sucessful data fetch",data.Items); 
      data1.Items.forEach((record) => {
        E[i] = record.email;
        i++;
        console.log(record.email)
      })
      console.log("Email:" + E)

      let Email = JSON.stringify(E[0])
      Email = Email.replace(/^["'](.+(?=["']$))["']$/, '$1');
      //console.log(mail)
      var params = {
        TableName: "Donor",
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
          var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success', 'data': data };
          res.json(object)
        }
      })
    }
  })
})
module.exports = router;

