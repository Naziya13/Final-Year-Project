<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>{{Name}}</h3>
            <p class="forgot-password text-center mt-4 mb-2"> 
                <router-link style="text-decoration: none;" to="/donor"> <button type="submit" class="btn btn-dark btn-lg ">Donate</button></router-link>
            </p>
            <p class="forgot-password text-center mt-5 mb-2"> 
                <router-link style="text-decoration: none;" to="/requester"> <button type="submit" class="btn btn-dark btn-lg ">Request</button></router-link>
            </p>
          <p class="forgot-password text-center mt-5 mb-2"> 
                <router-link style="text-decoration: none;" to="/"> <button type="submit" class="btn btn-dark btn-lg ">Logout</button></router-link>
            </p>

        </form>
    </div>
</template>

<script>
import axios from 'axios'

import router from '../router/index'
    export default{
        data(){
            return{
                Name:'',
 
                
            }
        },
        created(){
              var config = {
          headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
          };
          let currentObj=this;
           let Email=localStorage.getItem("email");
           let pass=localStorage.getItem("pass");
           console.log(Email)
        axios.post('http://localhost:8082/Login/loginRoute',
                   Email,pass,
        config)
        .then(function(response){
            
            currentObj.Name=response.data.data.Item.name;
            //console.log(currentObj.rows)
            console.log("Enter")
            console.log(response.data.Item)
            if(currentObj.output.statusCode== "201")
                router.push('Userpage')
                
            else{
                console.log("Error")
            }
        })
        .catch(function(error){
            console.log(error)
            
        })
 
    
        }

    }
</script>