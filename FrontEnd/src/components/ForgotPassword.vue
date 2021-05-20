<template>
    <div class="vue-tempalte">
        <form >
            <h3>Forgot Password</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
           

            <button  class="btn btn-dark btn-lg btn-block" to="/resetpass">Reset password</button>

        </form>
    </div>
</template>

<script>/*
import axios from 'axios'
import router from '../router/index'

    export default {
        data() {
            return {
                email:'',
                selected:''
            }
        },
        methods:{
             formSubmit(e) {
                e.preventDefault();
                let currentObj = this;

                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'
                    }
                };
                axios.post('http://localhost:8081/ForgotPass/forgotPassword',{
                    email:this.email,
                    selected:this.selected
                },config)
                .then(function(response){
                    currentObj.output=response.data;
                    console.log(JSON.stringify(response));
                    if(response.statusMessage == 'success');
                     router.push({ name: "resetpass"});                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                
                })
                
             }

        }
    }*/
</script>