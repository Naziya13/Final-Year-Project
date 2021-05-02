<template>
    <div class="vue-tempalte">
        <form>
           <h5 style="margin-left:30%">{{Name}}</h5>
           <p class="forgot-password text-center mb-5">
            <router-link to="/ReqHis">History</router-link>
        </p>
        <p class="forgot-password text-center mb-5">
            <router-link to="/Requester">Request Product</router-link>
        </p>

        <p class="forgot-password text-center mb-5">
            <a href="#" @click="Logout()">Logout</a>
        </p>

        </form>
    </div>
</template>

<script>

import router from '../router/index'
import axios from 'axios'
export default {
 
   // el:"#table",
    data() {
        return {
            Name:'',
            email:''
        }
    },
    created() {

        var config = {
          headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
          };
          let currentObj=this;
          
        axios.get('http://localhost:8082/Requesterpage/RequestRoute',config)
        .then(function(response){
 console.log(response.data.data.Items)
            currentObj.Name=response.data.data.Items[0].name
            currentObj.email=response.data.data.Items[0].email
            console.log(response.data.data.Items)
            if(response.statusMessage == "success" || response.statusCode == "200")
                router.push('Requesterpage')
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
          
          axios.post('http://localhost:8082/Requesterpage/logout',
          
              {email:this.email}
        ,config)
          .then((response) =>
          {
                console.log("Logout")
              router.push("/")
             if(response.statusCode=='200' || response.statusMessage == 'success'){
                console.log("enter")
                router.push("/")}
          
          })

        }
    }
        
}
</script>