<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Donor</h3>

            <div class="form-group">
                 <label>Full Name :</label>
               {{fullName}}
            </div>

            <div class="form-group">
                <label>Email address :</label>
                {{email}}
            </div>

            <div class="form-group">
                <label>Mobile Number :</label>
               {{mobile}}
            </div>
             <div class="form-group">
                <label>Address</label>
                {{address}}
            </div>
             <div class="form-group">
                 <label>Offer</label>
                <input type="text" class="form-control form-control-sm" v-model="offer" required>
            </div>
            <div class="form-group">
                <label>Upload Photo</label>
                <input type="file" id="file" name="file" ref= "file" v-on:change="handelFileUplaod()">
            </div>


            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>

       

        </form>
    </div>
</template>
<script>
import {post} from 'axios'
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
                  mobile : '',
                  address:'',
                  offer:'',
                  file:''
  
            }
        },
        created()
        {
            console.log('Component mounted.')
          let currentObj=this;

           axios.get('http://localhost:8082/donor/donorRoute2')
                .then(function(response)
                {
                    currentObj.fullName=response.data.data.Item.name;
                    currentObj.email=response.data.data.Item.email;
                    currentObj.mobile=response.data.data.Item.mobile;
                    currentObj.address=response.data.data.Item.address;
                    

                    console.log(response.data.data.Items)
                    if(response.statusCode=='200')
                        router.push("donor")
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
               
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
                formData.append('offer',this.offer);
                //formData.append('fullName',this.fullName);
                //formData.append('mobile',this.mobile);
                //formData.append('address',this.address);
                //formData.append('pass',this.pass);
                //formData.append('gender',this.gender);
                formData.append('file',this.file);
                formData.append('email',this.email)
                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081',
                   'Content-Type': 'multipart/form-data' }
                };
                post('http://localhost:8082/donor/donorRoute', formData,config)
                .then(function (response) {
                    
                    currentObj.output=response.data.offer;
                    currentObj.output=response.data.file;
                    currentObj.output=response.data.email
                    console.log(JSON.stringify(response));
                    if(response.statusMessage == 'success');
                     router.push({ name: "Thankyou"});                    
                })

               
               
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