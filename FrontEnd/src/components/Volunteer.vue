<template>
  <div class="vue-tempalte">
 
  <h3 class="text-left">{{Volunteer}}</h3>
  <p class="text-center">Work Assigned to me...</p>
  <div class="row">
    <div class="col-md-6">
      <h4 class="text-center">Donor</h4>
      <table class="table table-striped table-bordered table-hover">
        <thead class="thead-dark">
            <tr>
                
                <th>Name</th>
                <th>MobileNo</th>
                <th>Address</th>
                <th>OfferProduct</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row,id) in donor" v-bind:Key="id">
              
                <td>{{row.FullName}}</td>
                <td>{{row.mobileNo}}</td>
                <td>{{row.Address}}</td>
                <td>{{row.OfferProduct}}</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-6">
      <h4 class="text-center">Requester</h4>
      <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
            <tr>
                
                <th>Name</th>
                <th>MobileNo</th>
                <th>Address</th>
                <th>RequestProduct</th>
            </tr>
      </thead>
      <tbody>
            <tr v-for="(row,id) in requester" v-bind:Key="id">
                
                <td>{{row.FullName}}</td>
                <td>{{row.mobileNo}}</td>
                <td>{{row.Address}}</td>
                <td>{{row.RequestProduct}}</td>
            </tr>
      </tbody>
      </table>
    </div>
  </div>

  <div class="text-center">
    <p> After Completion of Delivery...</p>
    <input type="file" id="file" name="file" ref= "file" v-on:change="handelFileUplaod()">
  </div>
  <div class="text-center mt-3">
      <button type="submit" class="btn btn-dark btn-lg" @click.prevent="formSubmit">Submit</button>
      
  </div>
  
 </div>
</template>

<script>
import axios from 'axios'

import router from '../router/index'
//import { delete } from 'vue/types/umd'
  export default {
    data() {
      return {
        donor: [
          ['mobileNo','FullName','address','email','OfferProduct']
          ],
        requester: [
        ['mobileNo','FullName','Address','RequestProduct','email']   
        ],
        Volunteer:'',
        file:''
        
      }
    },
      created() {
        var config = {
          headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
          };
          let currentObj=this;
          //donor's

        axios.get('http://localhost:8082/Volunteer/donorRoute',config)
        .then(function(response){
              currentObj.Volunteer=response.data.data.Item.VolunteerName;
            
              delete response.data.data.Item.VolunteerName;
              currentObj.donor=[response.data.data.Item];
            
           // console.log(currentObj.donor)
            //console.log((response.data.data.Item).length)
            console.log(response.data.data.Item)
            if(response == null || response == "undefined")
                router.push('volunteer')
        })
        .catch(function(error){
            console.log(error)
            alert("donors address not matched");
            //router.push('homepage')
        })

        axios.get('http://localhost:8082/Volunteer/requesterRoute',config)
        .then(function(response){ 
          
            currentObj.requester=[response.data.data.Item];
          
            //console.log(currentObj.requester)
           //console.log((response.data.data.Item).length)
            console.log(response.data.data.Item)
            if(response == null || response.statusMessage == "sucess")
                router.push('volunteer')
        })
        .catch(function(error){
            console.log(error)
            alert("requesters address not matched")
            //router.push('homepage')
        })
        
    },
    methods:{
    handelFileUplaod(){
                this.file=this.$refs.file.files[0];
                console.log('file data: '+this.file);

          },
        formSubmit(e) {
                e.preventDefault();
                let currentObj = this;

                 let formData=new FormData();
                
                formData.append('file',this.file);
                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081',
                  'Content-Type': 'multipart/form-data'}
                };
                axios.post('http://localhost:8082/Volunteer/FileUploadRoute', formData,config)
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
  height: 100%;
}
.inner-block {
  width: 1010px;
}
</style>
