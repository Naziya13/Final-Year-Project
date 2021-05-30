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
 "accessKeyId":'',
"secretAccessKey":''
});


//const bucket_name='requesters-bucket';
var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'volunteer-feedback',
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
    projectionExpression: 'address,email,name,mobile,OfferProduct'
  }

  docClient.scan(params, function (err, donors_data) {
    console.log("response from db(Donor): ", JSON.stringify(donors_data))
    if (err) {
      console.log(err);
    }
    else {

      let donor_adress = [];
      let donor_email = [];
      let donor_name = [];
      let donor_mobile = [];
      let donor_product = [];

      var i = 0;
      donors_data.Items.forEach((record) => {
        donor_adress[i] = record.address;
        donor_email[i] = record.email;
        donor_name[i] = record.name;
        donor_mobile[i] = record.mobile;
        donor_product[i] = record.OfferProduct
        i++;
        //console.log("donors address:"+record.Address)
      })

      //sessionDb data

      var params = {
        TableName: "sessionDB"

      }
      docClient.scan(params, function (err, session_data) {
        if (err) {
          console.log(err)
        }
        else {
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


          //volunteer's data
          var params = {
            TableName: 'Volunteers',
            Key: {
              "email": Email
            },
            projectionExpression: "addresss,name,email,Volunteer_Id"

          };
          docClient.get(params, function (err, volunteer_data) {
            console.log("response from db(Volunteer of donor): ", JSON.stringify(volunteer_data))
            if (err) {
              console.log(err);
            }
            else {
              var data;
              for (var j = 0; j < (Object.values(donor_adress)).length; j++) {
                donor_adress[j] = JSON.stringify(donor_adress[j]).replace(/^["'](.+(?=["']$))["']$/, '$1');
                if (volunteer_data.Item.address === (donor_adress[j]) && donor_product[j] != "none") {
                  console.log("Matched...donor")
                  data = {
                    Item: {
                      name: donor_name[j],
                      email: donor_email[j],
                      mobile: donor_mobile[j],
                      address: donor_adress[j],
                      OfferProduct: donor_product[j],
                      volunteerName: volunteer_data.Item.name,
                      volunteerEmail: volunteer_data.Item.email,
                      Volunteer_Id: volunteer_data.Item.Volunteer_Id
                    }
                  }
                }

              }
              var object = { message: ' Successfull ftech donor', statusCode: '200', statusMessage: 'success donor', 'data': data };
              res.json(object);
            }

          })
        }
      })
    }
  })
})

//Requester Router
router.get("/requesterRoute", cors(corsOptions), (req, res, next) => {
  var params = {
    TableName: 'requester',

    projectionExpression: 'address,email,name,mobile,RequestProduct'
  }

  docClient.scan(params, function (err, reqs_data) {
    console.log("response from db(requester): ", JSON.stringify(reqs_data))
    if (err) {
      console.log(err);
    }
    else {

      let req_adress = [];
      let req_email = [];
      let req_name = [];
      let req_mobile = [];
      let req_product = []

      var i = 0;
      reqs_data.Items.forEach((record) => {
        req_adress[i] = record.address;
        req_email[i] = record.email;
        req_name[i] = record.name;
        req_mobile[i] = record.mobile;
        req_product[i] = record.RequestProduct;
        i++;
        console.log("requesters address:" + record.address)
      })

      //sessionDb data

      var params = {
        TableName: "sessionDB"

      }
      docClient.scan(params, function (err, session_data) {
        if (err) {
          console.log(err)
        }
        else {
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

          //volunteer's data
          var params = {
            TableName: 'Volunteers',
            Key: {
              "email": Email
            },
            projectionExpression: "addresss,name,email,Volunteer_Id"

          };
          docClient.get(params, function (err, volunteer_data) {
            console.log("response from db(Volunteer): ", JSON.stringify(volunteer_data))
            if (err) {
              console.log(err);
            }
            else {
              var data;
              for (var j = 0; j < (Object.values(req_adress)).length ; j++) {
                req_adress[j] = JSON.stringify(req_adress[j]).replace(/^["'](.+(?=["']$))["']$/, '$1');
                if (volunteer_data.Item.address === (req_adress[j]) && req_product[j] != "none") {
                  console.log("Matched...requesters")
                  data = {
                    Item: {
                      name: req_name[j],
                      email: req_email[j],
                      mobile: req_mobile[j],
                      address: req_adress[j],
                      RequestProduct: req_product[j],
                      volunteerName: volunteer_data.Item.name,
                      volunteerEmail: volunteer_data.Item.email,
                      Volunteer_Id: volunteer_data.Item.Volunteer_Id
                    }
                  }
                  //break;
                }
                /*
                              
                              else
                              {
                                if(req_product[j+1]!="none"){
                                data = {
                                  Item: {
                                    name: req_name[j+1],
                                    email: req_email[j+1],
                                    mobile: req_mobile[j+1],
                                    address: req_adress[j+1],
                                    RequestProduct: req_product[j+1],
                                    volunteerName: volunteer_data.Item.name,
                                    volunteerEmail: volunteer_data.Item.email,
                                    Volunteer_Id: volunteer_data.Item.Volunteer_Id
                                  }
                                }
                                break;
                              } 
                            else{
                              data = {
                                Item: {
                                  name: "none",
                                  email: "none",
                                  mobile: "none",
                                  address: "none",
                                  RequestProduct: "none",
                                  volunteerName: volunteer_data.Item.name,
                                  volunteerEmail: volunteer_data.Item.email,
                                  Volunteer_Id: volunteer_data.Item.Volunteer_Id
                                }
                              }
                            }
                            break;
                          }*/
              }

              var object = { message: ' Successfull fetch requester', statusCode: '201', statusMessage: 'success requester', 'data': data };
              res.json(object);
            }

          })
        }
      })
    }
  })
})

//File uplaod rout
router.post("/FileUploadRoute", cors(corsOptions), uploads.single('file'), (req, res) => {
  console.log("reqFile:" + JSON.stringify(req.file));
  console.log("reqBody:" + JSON.stringify(req.body));

  var { email, Volunteer, D_mail, R_email, V_id, D_add, R_add } = req.body;

  let date_ob = new Date()

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getUTCFullYear();

  var params = {
    TableName: "Daily_Transaction",
    Item: {
      "email": email,
      "volunteer_Name": Volunteer,
      "volunteer_Id": V_id,
      "source": D_add,
      "Destination": R_add,
      "date": year + "-" + month + "-" + date,
      "Work_Status": "Completed"
    }



  }
  docClient.put(params, function (err, data) {
    if (err)
      console.log(err)
    else {
      var object = { message: ' Successfull store', statusCode: '200', statusMessage: 'success' };
      res.json(object);
    }
  })
  console.log(D_mail)
  //Donor
  var params = {
    TableName: "Donor",
    Key: {
      "email": D_mail
    },
    UpdateExpression: "set Work_status =:sta",
    ExpressionAttributeValues: {
      ":sta": "Completed"


    }
  }
  docClient.update(params, function (err, data1) {
    if (err)
      console.log(err)
    else {
      console.log("sucess donor")

    }
  })
  //Requester
  var params = {
    TableName: "requester",
    Key: {
      "email": R_email
    },
    UpdateExpression: "set Work_Status =:st",
    ExpressionAttributeValues: {
      ":st": "Completed"

    }
  }
  docClient.update(params, function (err, data) {
    if (err)
      console.log(err)
    else {
      console.log("sucess requester")
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
    var object = { message: ' Successfull store', statusCode: '201', statusMessage: 'success' };
    res.json(object);
  }

})

module.exports = router;
