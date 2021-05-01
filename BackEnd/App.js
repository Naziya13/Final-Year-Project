const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var AWS =require('aws-sdk');
//const mysql = require('mysql2');

const register_NormRoutes = require("./routes/registrationForm");
const Login_NormRoutes=require('./routes/LoginForm');
const Donor_NormRoutes=require('./routes/Donor');
const Request_NormRoutes=require('./routes/Requesters')
const RequestersList=require("./routes/RequestersList");
const DonorsList=require("./routes/DonorsList")
const Feedback_NormRoutes=require('./routes/FeedBack');
const volunteerRegistration=require('./routes/VolunteerRegistration');
const volunteerList=require('./routes/VolunteerList');
const volunteer=require('./routes/volunteer');
const FeedbackList_NormRoutes=require('./routes/feedbcakList');
const forgotPass=require('./routes/forgotPassword')
const Donorpage=require('./routes/Donorpage')
const Requesterpage=require('./routes/Requesterpage')
const Adminpage=require('./routes/Adminpage');
//create multiple apis.. with different file names

// const fs = require('fs');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

app.use("/routes", express.static("routes"));


// create the connection to database



app.use('/Register', register_NormRoutes);
app.use('/Login',Login_NormRoutes);
app.use('/donor',Donor_NormRoutes);
app.use('/requester',Request_NormRoutes);
app.use('/requesterslist',RequestersList);
app.use('/donorlist',DonorsList);
app.use('/feedback',Feedback_NormRoutes);
app.use('/feedbacklist',FeedbackList_NormRoutes)
app.use('/volunteerRegistration',volunteerRegistration);
app.use('/Volunteerlist',volunteerList);
app.use('/Volunteer',volunteer);
app.use('/ForgotPass',forgotPass);
app.use('/DonorPage',Donorpage);
app.use('/Requesterpage',Requesterpage);
app.use('/Adminpage',Adminpage);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


const PORT = process.env.PORT || 8082;
app.listen(PORT, function() {
  console.log("Example app is listening on localhost port 8082...");
});
