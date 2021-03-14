<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Login</h3>

            <div class="form-group">
                <label>Username</label>
                <input type="email" class="form-control form-control-lg" v-model="Email" required/>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="pass" required />
            </div>
  

            <button type="submit" class="btn btn-dark btn-lg btn-block" onclick="clear()">Login</button>
            

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

           <div class="social-icons">
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-google"></a>
            </div>

        </form>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'
    export default {
        mounted() {
            console.log('Component mounted.')
 
        },
        data() {
            return {
                loginInfo:{
                  Email : '',
                  pass : '',
                  submitted:false,
                  
                  
                }
            
            }
        },
          methods: {
         formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                this.submitted=true;
                
                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
                };
                axios.post('http://localhost:8082/Login/loginRoute', {
                    
                    Email : this.Email,
                    pass : this.pass,

                },config)
                  .then(function (response) {
                   currentObj.output=response.data;
                    console.log(response.data);
                    console.log(JSON.stringify(response));

                    if(currentObj.output.statusCode == "200")  
                      router.push({ name: "homepage"});
                    else
                    {
                      
                      alert("wrong Email and password")
                      this.mounted()

                      //alert.reset("wrong Email and Password")
                      router.push({ name: "login"}).mounted();
                    
                    }
                                         
                })
                .catch(function (error) {
                    currentObj.output = error;
                    
                });
            }
        }
     
        
    }
</script>


