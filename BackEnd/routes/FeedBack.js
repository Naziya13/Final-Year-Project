const router = require("express").Router();
var cors = require('cors')
const fs = require("fs");
var AWS =require('aws-sdk');
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
router.post("/feedbackRoute",cors(corsOptions), async(req, res) => {
    console.log("reqBody:" + JSON.stringify(req.body));
    const {
      fullName,
      email,
      mob,
      suggestions,
      feedback
      
    } = req.body;
    
    console.log('fullname : '+JSON.stringify(fullName));
     //write code for adding new users to database...
     var params = { 
      TableName:"Feedback",
      Item: {  
          "email": email, 
          "FullName": fullName,
          "mobileNo": mob,
          "feedback":feedback,
          "suggestions": suggestions
      }
  };


docClient.put(params).promise().then(data =>
  console.log(data.Attributes)).catch(console.error);

  
    res.json("Successfully Inserted to Database..")
  });
  
  router.get('/donorRoute2',cors(corsOptions),(req,res)=>{

    var params={
      TableName:"sessionDB"
    }
  
    docClient.scan(params,function(err,data1){
  
      console.log("response from db: ",JSON.stringify(data1))
      if(err){
        console.log(err);
      }
      else{
       
          console.log("sucessful data fetch",data1.Item);
          if(data1.Item.Type=="Donor"){
          var params={
            TableName:"Donor",
            Key:{
              "email":data1.Items.email
            }
  
          }
          
            docClient.scan(params,function(err,data){
  
              console.log("response from db: ",JSON.stringify(data))
              if(err){
                console.log(err);
              }
              else{ 
               var object = { message : ' Successfull fetched',statusCode : '200' , statusMessage : 'success', 'data' : data};
                res.json(object)
              }
            })
          }   
          else if(data1.Items.Type=="Requester")
          {
            var params={
              TableName:"requester",
              Key:{
                "email":data1.Items.email
              }
    
            }
            
              docClient.scan(params,function(err,data){
    
                console.log("response from db: ",JSON.stringify(data))
                if(err){
                  console.log(err);
                }
                else{ 
                 var object = { message : ' Successfull fetched',statusCode : '201' , statusMessage : 'success', 'data' : data};
                  res.json(object)
                }
              })
          }      
          else if(data1.Items.Type=="Volunteer")
          {
            var params={
              TableName:"Volunteers",
              Key:{
                "email":data1.Items.email
              }
    
            }
            
              docClient.scan(params,function(err,data){
    
                console.log("response from db: ",JSON.stringify(data))
                if(err){
                  console.log(err);
                }
                else{ 
                 var object = { message : ' Successfull fetched',statusCode : '202' , statusMessage : 'success', 'data' : data};
                  res.json(object)
                }
              })
          } 
          else{
            console.log("not find...")
          }
      }
    })
  })
  module.exports = router
