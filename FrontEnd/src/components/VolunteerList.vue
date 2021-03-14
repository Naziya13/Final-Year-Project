<template>
    <div class="vue-tempalte" >
        <h3 class="p-3 text-center">List Of Volunteer's</h3>
        <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    
                    <th>Email</th>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,id) in rows"  v-bind:Key="id">
                    <td>{{row.email}}</td>
                    <td>{{row.FullName}}</td>
                    <td>{{row.mobileNo}}</td>
                    <td>{{row.Address}}</td>
                  
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script>
import axios from 'axios'

import router from '../router/index'
export default {
   // el:"#table",
    data() {
        return {
            rows: [['email','FullName','mobileNo','address']],
            
        }
    },
    created() {

        var config = {
          headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
          };
          let currentObj=this;
        axios.get('http://localhost:8082/Volunteerlist/volunteerListRoute',config)
        .then(function(response){
            for(var i=0;i<(response.data.data.Items).length;i++)
            {   
                currentObj.rows=response.data.data.Items;
            }
            console.log((response.data.data.Items).length)
            console.log(currentObj.rows)
            console.log(response.data.data.Items)
            if(response == null || response == "undefined")
                router.push('volunteerList')
        })
        .catch(function(error){
            console.log(error)
            router.push('homepage')
        })
 
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
  width: 900px;
}
</style>
