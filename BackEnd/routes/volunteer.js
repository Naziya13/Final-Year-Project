const router = require("express").Router();
var cors = require('cors')
var AWS = require('aws-sdk');
var fs = require('fs');
var multer = require('multer');
var multerS3 = require('multer-s3');

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
const { exists } = require("fs");
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
router.use(bodyParser.json());
let V_email = []


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
  "accessKeyId": '',
  "secretAccessKey": ''
});


//const bucket_name='requesters-bucket';
var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'volunteerfeedback',
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname + '-' + Date.now()); //use Date.now() for unique file keys
    }
  })
});

// 1.1 ********** server test api **************
router.get("/donorRoute", cors(corsOptions), (req, res) => {
   //Donors Data
   var params = {
    TableName: 'Donor',
    projectionExpression: 'address,email,name,mobile'
   }

   docClient.scan(params, function (err, donors_data) {
    console.log("response from db(Donor): ", JSON.stringify(donors_data))
    if (err) {
      console.log(err);
    }
    else{
      
        let donor_adress = [];
        let donor_email = [];
        let donor_name=[];
        let donor_mobile=[]
        
        var i = 0;
        donors_data.Items.forEach((record) => {
          donor_adress[i] = record.address;
          donor_email[i] = record.email;
          donor_name[i]=record.name;
          donor_mobile[i]=record.mobile;
          i++;
          //console.log("donors address:"+record.Address)
        })

        //sessionDb data

      var params={
        TableName:"sessionDB"
        
      }
      docClient.scan(params,function(err,session_data)
      {
        if(err){
          console.log(err)
        }
        else{
          let E = [];
          var i = 0;
          //console.log("sucessful data fetch",data.Items); 
          session_data.Items.forEach((record) => {
            E[i] = record.email;
            i++;
            //console.log(record.email)
          })
          console.log("Email:" + E)
    
          let Email = JSON.stringify(E[0])
          Email = Email.replace(/^["'](.+(?=["']$))["']$/, '$1');
        }

         //volunteer's data
      var params = {
        TableName: 'Volunteers',
        Key:{
          "email":Email
        },
        projectionExpression: "Addresss,fullName,email"

      };
      docClient.get(params, function (err, volunteer_data) {
        console.log("response from db(Volunteer): ", JSON.stringify(volunteer_data))
        if (err) {
          console.log(err);
        }
        else{
          let volunteer_adress = [];
          let volunteer_name = [];
          let volunteer_email = [];
          var i = 0;
          volunteer_data.Items.forEach((record) => {
            volunteer_adress[i] = record.address;
            volunteer_email[i] = record.email;
            volunteer_name[i] = record.name;
            i++;

          })

          for (var j = 0; j < (Object.values(donor_adress)).length; j++) {
            if (Object.values(volunteer_adress[0]) == (Object.values(donor_adress[j]))) {
              console.log("Matched...donor")
            }
          }
        }
      
      })
        
      })
    }
})
});


//Requester Router
router.get("/requesterRoute", cors(corsOptions), (req, res, next) => {
var params = {
  TableName: 'requester',
  projectionExpression: 'address,email,name,mobile'
 }

 docClient.scan(params, function (err, reqs_data) {
  console.log("response from db(Donor): ", JSON.stringify(reqs_data))
  if (err) {
    console.log(err);
  }
  else{
    
      let req_adress = [];
      let re_email = [];
      let req_name=[];
      let req_mobile=[]
      
      var i = 0;
      reqs_data.Items.forEach((record) => {
        req_adress[i] = record.address;
        req_email[i] = record.email;
        req_name[i]=record.name;
        req_mobile[i]=record.mobile;
        i++;
        //console.log("donors address:"+record.Address)
      })

      //sessionDb data

    var params={
      TableName:"sessionDB"
      
    }
    docClient.scan(params,function(err,session_data)
    {
      if(err){
        console.log(err)
      }
      else{
        let E = [];
        var i = 0;
        //console.log("sucessful data fetch",data.Items); 
        session_data.Items.forEach((record) => {
          E[i] = record.email;
          i++;
          //console.log(record.email)
        })
        console.log("Email:" + E)
  
        let Email = JSON.stringify(E[0])
        Email = Email.replace(/^["'](.+(?=["']$))["']$/, '$1');
      }

       //volunteer's data
    var params = {
      TableName: 'Volunteers',
      Key:{
        "email":Email
      },
      projectionExpression: "Addresss,fullName,email"

    };
    docClient.get(params, function (err, volunteer_data) {
      console.log("response from db(Volunteer): ", JSON.stringify(volunteer_data))
      if (err) {
        console.log(err);
      }
      else{
        let volunteer_adress = [];
        let volunteer_name = [];
        let volunteer_email = [];
        var i = 0;
        volunteer_data.Items.forEach((record) => {
          volunteer_adress[i] = record.address;
          volunteer_email[i] = record.email;
          volunteer_name[i] = record.name;
          i++;

        })

        for (var j = 0; j < (Object.values(req_adress)).length; j++) {
          if (Object.values(volunteer_adress[0]) === (Object.values(req_adress[j]))) {
            console.log("Matched...requesters")
          }
        }
      }
    
    })
      
    })
  }
})
})

//File uplaod rout
router.post("/FileUploadRoute", cors(corsOptions), uploads.single('file'), (req, res) => {
  console.log("reqFile:" + JSON.stringify(req.file));

  // s3 upload

  const file = req.file;
  if (!file) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    console.error(error);
    res.json("file upload failed....")
  }

  res.json("Successfully INserted to S3..")


})


module.exports = router;
