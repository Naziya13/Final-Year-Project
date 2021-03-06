const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');
var fs = require('fs');
var multer = require('multer');
var multerS3 = require('multer-s3');

var awsconfig = {
  "region": "ap-south-1",
  "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
 "accessKeyId":'',
"secretAccessKey":''
}

AWS.config.update(awsconfig)
var docClient = new AWS.DynamoDB.DocumentClient();

var corsOptions = {
  origin: 'http://localhost:8082',
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
 "accessKeyId":'',
"secretAccessKey":''
});




var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'volunteers-bucket',
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname + '-' + Date.now()); //use Date.now() for unique file keys
    }
  })
});

// 1.1 ********** server test api **************

//1.2 ************ UI - Donor's api*************
router.post("/volunteerRegistrationRoute", cors(corsOptions), uploads.single('file'), (req, res) => {
  console.log("reqFile:" + JSON.stringify(req.file));
  console.log("reqBody:" + JSON.stringify(req.body));


  //write code for adding new users to database...

  const {
    fullName,
    email,
    mob,
    address,
    pass,
    V_id
  } = req.body;

  console.log('fullname : ' + JSON.stringify(fullName));

  //write code for adding new users to database...
  var params = {
    TableName: "Volunteers",
    Item: {
      "email": email,
      "name": fullName,
      "password": pass,
      "mobile": mob,
      "Volunteer_Id": V_id,
      "address": address
      //"Work_Status":"not completed"
      //"Date/Time":Date.now().toString


    }
  };
  docClient.put(params).promise().then(data =>
    console.log(data.Attributes)).catch(console.error);

  // s3 upload

  const file = req.file;
  if (!file) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    console.error(error);
    res.json("file upload failed....")
  }


  res.json("Successfully INserted to Database..")
});

module.exports = router;
