<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Requester</h3>

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
            <fieldset class="form-group">
                <legend>Request Product</legend>
               <div>
               <select v-model="selected">
                    <option disabled value="Available">Please Select One</option>
                    <option v-for="items in products" v-bind:key="items">{{items}}</option>
                </select>
               </div>
            </fieldset> 
            <div class="form-group">
                <label>Upload Photo</label>
                <input type="file" id="file" name="file" ref= "file" v-on:change="handelFileUplaod()">
            </div>
           
            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router/index'
    export default {
        data() {
            return {
                  fullName: '',
                  email : '',
                  mob : '',
                  address:'',
                  selected:"",
                  products:[],
                  file:''
            }
        },
         created() {
            console.log('Component mounted.')
          let currentObj=this;
          
        axios.get('http://localhost:8082/requester/RequestDetails')
        .then(function(response){
            console.log((response.data.data).length)
            let items=[]
            for(var i=0;i<(response.data.data).length;i++)
            {   
                
                items=response.data.data
                //console.log(currentObj.products)
            }
           currentObj.products=[...new Set(items)]
           // console.log(response.data.data)
            console.log(currentObj.products)

        })
        .catch(function(error){
            console.log(error)
           // router.push('homepage')
        })
 
        },
        methods: {
             handelFileUplaod(){
                this.file=this.$refs.file.files[0];
                console.log('file data: '+this.file);

            },
           formSubmit(e) {
                e.preventDefault();
                let currentObj = this;

                 let formData=new FormData();
                
                formData.append('fullName',this.fullName);
                formData.append('mob',this.mob);
                formData.append('email',this.email);
                formData.append('address',this.address);
                formData.append('selected',this.selected);
                formData.append('file',this.file);

                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081',
                  'Content-Type': 'multipart/form-data'}
                };
                axios.post('http://localhost:8082/requester/requestRoute', formData,config)
                .then(function (response) {
                    currentObj.output = response.body;
                   // console.log(JSON.stringify(response));
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
  height: 103%;
}
</style>
