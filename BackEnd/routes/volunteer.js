const router = require("express").Router();
var cors = require('cors')
var AWS =require('aws-sdk');
var fs=require('fs');
var multer  = require('multer');
var multerS3 = require('multer-s3');

var awsconfig={"region":"ap-south-1",
"endpoint":"http://dynamodb.ap-south-1.amazonaws.com",
"accessKeyId":'AKIATSPZDOCGFXKK7QHM',
"secretAccessKey":'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'}


AWS.config.update(awsconfig)
var docClient=new AWS.DynamoDB.DocumentClient();

var corsOptions = {
  origin: 'http://localhost:8081',
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



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage },{ dest: 'uploads/' });

const s3=new AWS.S3({"region":"ap-south-1",
"endpoint":"http://s3.ap-south-1.amazonaws.com",
"accessKeyId":'AKIATSPZDOCGFXKK7QHM',
"secretAccessKey":'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'});
  

//const bucket_name='requesters-bucket';
var uploads = multer({
storage: multerS3({
    s3: s3,
    bucket: 'volunteerfeedback',
    key: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname+ '-' + Date.now()); //use Date.now() for unique file keys
    }
})
});

let Don_address=[];
let req_address=[];

// 1.1 ********** server test api **************
router.get("/donorRoute", cors(corsOptions),(req, res) => { 
  
  //Donor Data
  var params={
    TableName:"Donor"
  }
  docClient.scan(params,function(err,Don_data)
  {
    console.log("response from db Donor: ",JSON.stringify(Don_data))
    if(err){
      console.log(err)
    }
    else{
     
      let Don_email=[];
      let i=0;
      Don_data.Items.forEach((record) => {
        Don_address[i]=record.address;
        Don_email[i]=record.email
        i++;
        console.log(record.address)
      })

      console.log(Don_address)

    }
  })
  var params={
    TableName:"sessionDB"

  }
  docClient.scan(params,function(err,data1){

    //console.log("response from db sessionDB: ",JSON.stringify(data1))
    if(err){
      console.log(err);
    }
    else 
    {
      console.log("Items.email"+data1.Items.email)
      console.log("sucessful data fetch",data1.Items);
        var params={
          TableName:"Volunteers",
          Key:{
            "email":data1.Items.email
          },
          KeyConditionExpression:'#email = :Email ',
          ExpressionAttributeNames:{
              "#email" :"email"
          },
  
          ExpressionAttributeValues:{
            ":Email":data1.Items.email
          },
          //"projectionExpression":"email,Address,FullName"

        }
        docClient.query(params,function(err,Vol_data)
        {
          console.log("response from db Volunteer: ",JSON.stringify(Vol_data))
          if(err){
            console.log(err)
          }
          else{

          for(var i=0;i<( Don_address).length;i++)
          {
            if((Vol_data.Items.Address)==(Don_address[i]))
            {
              var params={
                TableName:"Donor",
                Key:{
                  "email":Object.values(Don_email[i])
                }
              }
              docClient.scan(params,function(err,data)
              {
                if(err)
                {
                  console.log(err)
                }
                else{
                  console.log("sucessully fetch data")
                  var object = { message : ' Successfull fetched donor',statusCode : '200' , statusMessage : 'success', 'data' : data};
                  res.json(object);
                }
              })
            }
          }
        }
        })
        
    }
})
})
router.get("/requesterRoute", cors(corsOptions),(req, res) => { 
  
  //requester Data
  var params={
    TableName:"requester"
  }
  docClient.scan(params,function(err,req_data)
  {
    console.log("response from db Donor: ",JSON.stringify(req_data))
    if(err){
      console.log(err)
    }
    else{
     
      let req_email=[];
      let i=0;
      req_data.Items.forEach((record) => {
        req_address[i]=record.address;
        req_email[i]=record.email
        i++;
        console.log(record.address)
      })

      console.log(req_address)

    }
  })
  var params={
    TableName:"sessionDB"

  }
  docClient.scan(params,function(err,data1){

    console.log("response from db sessionDB: ",JSON.stringify(data1))
    if(err){
      console.log(err);
    }
    else 
    {
        var params={
          TableName:"Volunteers",
          Key:{
            "email":data1.Items.email
          },
                 
        KeyConditionExpression:'email = :Email ',
  
        ExpressionAttributeValues:{
          ":Email":data1.Items.email
        },
          "projectionExpression":"email,Address,FullName"

        }
        docClient.query(params,function(err,Vol_data)
        {
          console.log("response from db Volunteer: ",JSON.stringify(Vol_data))
          if(err){
            console.log(err)
          }
          else{
           
          for(var i=0;i<( req_address).length;i++)
          {
            if((Vol_data.Items.Address)==(req_address[i]))
            {
              var params={
                TableName:"requester",
                Key:{
                  "email":Object.values(req_email[i])
                }
              }
              docClient.scan(params,function(err,data)
              {
                if(err)
                {
                  console.log(err)
                }
                else{
                  console.log("sucessully fetch data from requester")
                  data.Items.VolunteerName=object.values(Vol_data.Items.FullName)
                  var object = { message : ' Successfull fetched requester',statusCode : '200' , statusMessage : 'success', 'data' : data};
                  res.json(object);
                }
              })
            }
          
          }
        }
        })
        
    }
})
})
router.post("/FileUploadRoute", cors(corsOptions),uploads.single('file'),(req, res) => {
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