<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Registration</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-sm" v-model="fullName" required/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-sm" v-model="email" required/>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-sm" v-model="pass" required/>
            </div>
            <div class="form-group">
                <label>Mobile Number</label>
                <input type="tel" class="form-control form-control-sm" v-model="mob" required/>
            </div>
             <fieldset class="form-group">
                <legend>Gender</legend>
                <div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="male"> Male
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="female"> Female
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="other"> Other
                    </label>
                </div>
            </fieldset>

            <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" rows="1" id="comment" required></textarea>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Register</button>

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
                  fullName: '',
                  email : '',
                  pass : '',
                  mob : '',
                  male : '',
                  female : '',
                  other : ''
            }
        },
        methods: {
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
                };
                axios.post('http://localhost:8082/Register/registerRoute', {
                    fullName: this.fullName,
                    email : this.email,
                    pass : this.pass,
                    mob : this.mob,
                    male : this.male,
                    female : this.female,
                    other : this.other
                },config)
                .then(function (response) {
                    currentObj.output = response.data;
                    console.log(JSON.stringify(response));
                    if(response.statusMessage == 'success');
                     router.push({ name: "homepage"});                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }
        }
    }
</script>

<style>
   body,
   html,
   .App,
   .vue-tempalte,
  .vertical-center {
  width: 100%;
  height: 104%;
}
</style>
