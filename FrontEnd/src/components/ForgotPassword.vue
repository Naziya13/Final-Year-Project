<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Forgot Password</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'

    export default {
        data() {
            return {
                email:''
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
                axios.post('http://localhost:8082/ForgotPass/forgotPassword',{
                    email:this.email
                },config)
                .then(function(response){
                    currentObj.output=response.data;
                    console.log(JSON.stringify(response));
                    if(response.statusMessage == 'success');
                     router.push({ name: "homepage"});                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                
                })
                
             }

        }
    }
</script>