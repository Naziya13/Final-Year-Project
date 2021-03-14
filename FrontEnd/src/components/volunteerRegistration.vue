<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Volunteer Registration</h3>

            <div class="form-group">
                 <label>Full Name</label>
                <input type="text" class="form-control form-control-sm" v-model="fullName" required>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-sm" v-model="email" required>
            </div>

            <div class="form-group">
                <label>Mobile Number</label>
                <input type="tel" class="form-control form-control-sm" v-model="mob" required>
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" rows="1" id="comment" v-model="address" required></textarea>
            </div>
             
            <div class="form-group">
                <label>Upload Photo</label><br>
                upload id proof (Adhaar/Pan card/driving liences)
                <input type="file" id="file" name="file" ref= "file" v-on:change="handelFileUplaod()">
            </div>



            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>

       

        </form>
    </div>
</template>
<script>
import {post} from 'axios'
import router from '../router/index'
    export default {
        mounted() {
            console.log('Component mounted.')
 
        },
        data() {
            return {
                  fullName: '',
                  email : '',
                  mob : '',
                  address:'',
                  file:''
  
            }
        },
        methods: {
            handelFileUplaod(){
                this.file=this.$refs.file.files[0];
                console.log('file data: '+this.file);

            },
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;

                //uplaod file
                let formData=new FormData();
                
                formData.append('fullName',this.fullName);
                formData.append('mob',this.mob);
                formData.append('email',this.email);
                formData.append('address',this.address);
                
                formData.append('file',this.file);

                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081',
                   'Content-Type': 'multipart/form-data' }
                };


                post('http://localhost:8082/volunteerRegistration/volunteerRegistrationRoute', formData,config)
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
