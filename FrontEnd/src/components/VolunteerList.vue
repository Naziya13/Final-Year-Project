<template>
    <div class="vue-tempalte" >
        <h3 class="p-3 text-center">List Of Volunteer's</h3>
        <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Volunteer's Id</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,id) in rows"  v-bind:Key="id">
                    <td>{{id+1}}</td>
                    <td>{{row.Volunteer_Id}}</td>
                    <td>{{row.email}}</td>
                    <td>{{row.name}}</td>
                    <td>{{row.mobile}}</td>
                    <td>{{row.address}}</td>
                  
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
            rows: [['email','name','mobile','address','Volunteer_Id']],
            id:[]
            
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
                currentObj.id=+i;
            }
            console.log((response.data.data.Items).length)
            console.log(currentObj.rows)
            console.log(response.data.data.Items)
            if(response == null || response == "undefined")
                router.push('volunteerList')
        })
        .catch(function(error){
            console.log(error)
            
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
