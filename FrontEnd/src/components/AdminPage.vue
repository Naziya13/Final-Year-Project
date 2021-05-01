<template>
    <div class="vue-tempalte">
        <h5 style="margin-left:30%">{{Name}}</h5>
        <br>
        <h3>Registration</h3>
        <p class="forgot-password text-center mb-5">
            <router-link to="/volunteerRegistration">Volunteer Registration</router-link>
        </p>
        <h3>Records</h3>
        <p class="forgot-password text-center mb-3">
            <router-link to="/donorlist">View Donor List</router-link>
        </p>
        <p class="forgot-password text-center mb-3">
            <router-link to="/requesterlist">View Requester List</router-link>
        </p>
        <p class="forgot-password text-center mb-3">
            <router-link to="/volunteerlist">View Volunteer List</router-link>
        </p>
         <p class="forgot-password text-center mb-3">
            <router-link to="/feedbacklist">View FeedBack List</router-link>
        </p>
        <br>
         <p class="forgot-password text-center mb-3">
            <a href="#" @click="Logout()">Logout</a>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'

    export default{
        data(){
            return{
                Name:'',
                email:''
            }

    },
    
    created() {

        var config = {
          headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
          };
          let currentObj=this;
          
        axios.get('http://localhost:8082/Adminpage/AdminRoute',config)
        .then(function(response){
            console.log("Enter in admin")
            console.log(response.data.data.Items)
            currentObj.Name=response.data.data.Items[0].name;
            console.log(currentObj.Name)
            currentObj.email=response.data.data.Items[0].email;
            
            if(response == null || response == "undefined")
                router.push('Adminpage')
        })
        .catch(function(error){
            console.log(error)
            
        })
 
    },
    methods:{
        Logout(){
              var config = {
          headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
          };
          
          axios.post('http://localhost:8082/Adminpage/logout',{ 
          email : this.email},
          config)
          .then((response) =>
          {
              console.log("Logout")
              router.push("/")
             if(response.statusCode=='200' || response.statusMessage == 'success'){
                console.log("enter")
                router.push("/Login")}
          })
           .catch(function(error){
            console.log(error)
            
        })

        }
    }
    } 
</script>