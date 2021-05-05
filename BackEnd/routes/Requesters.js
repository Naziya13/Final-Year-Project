const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');


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
const { request } = require("express");

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
  "accessKeyId": 'AKIATSPZDOCGCYECV3G7',
  "secretAccessKey": '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'
});



//const bucket_name='requesters-bucket';
var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'requesters-bucket',
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname + '-' + Date.now()); //use Date.now() for unique file keys
    }
  })
});

// 1.1 ********** Get Offer product api **************
router.get("/RequestDetails", cors(corsOptions), (req, res) => {
  var params = {
    TableName: 'Donor',
    projectionExpression: 'OfferProduct'

  }

  docClient.scan(params, function (err, data) {

    //console.log("response from db: ",JSON.stringify(data.Items))
    if (err) {
      console.log(err);
    }
    else {
      let offer = [];
      var i = 0;
      //console.log("sucessful data fetch",data.Items); 
      data.Items.forEach((record) => {
        offer[i] = record.OfferProduct;
        i++;
        console.log(record.OfferProduct)
      })

      console.log(offer)

      var params = {
        TableName: "sessionDB"
      }

      docClient.scan(params, function (err, data) {

        console.log("response from db: ", JSON.stringify(data))
        if (err) {
          console.log(err);
        }
        else {

          console.log("sucessful data fetch", data.Item);
          var params = {
            TableName: "requester",
            Key: {
              "email": data.Items.email
            },
          }

          docClient.scan(params, function (err, Don_data) {

            console.log("response from db: ", JSON.stringify(Don_data))
            if (err) {
              console.log(err);
            }
            else {
              Don_data.Items.OfferProduct = offer
              var object = { message: ' Successfull fetched', statusCode: '200', statusMessage: 'success', 'data': Don_data };
              res.json(object);
            }
          })
        }
      })

    }
  })
});
router.post("/requestRoute", cors(corsOptions), uploads.single('file'), (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  console.log("reqFile:" + JSON.stringify(req.file));
  const {
    selected,

    email

  } = req.body;


  //write code for adding new users to database...
  var params = {
    TableName: "requester",
    Items: {
      Key: {
        "email": email
      },
      "RequestProduct": selected

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

