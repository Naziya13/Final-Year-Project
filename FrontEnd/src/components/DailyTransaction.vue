<template>
  <div class="vue-tempalte">
    <h3 class="p-3 text-center">Daily Transactions</h3>
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Volunteer Name</th>
          <th>Volunteer No.</th>
          <th>Source</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ id+1 }}</td>
          <td>{{ row.volunteer_Name }}</td>
          <td>{{ row.volunteer_Id }}</td>
          <td>{{ row.source }}</td>
          <td>{{ row.Destination }}</td>
          <td>{{ row.Work_Status }}</td>
          <td>{{ row.date }}</td>
        </tr>
      </tbody>
    </table>
   
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";
export default {
  data() {
    return {
      rows: [
        [
          "volunteer_Name",
          "volunteer_Id",
          "source",
          "Destination",
          "Work_Status",
          "date"
        ]
      ],
      id:[],
    }
  },
  created() {
     document.getElementById("Button").disabled = false;
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/dailyTransc/TranscRoute", config)
      .then(function (response) {
        currentObj.id = 1;
        //console.log(typeof(response.data.data.Item.length))
         var n=(Object.keys(response.data.data)).length
         console.log(n)
        for (var i = 0; i < n; i++) {
          currentObj.rows = [response.data.data.Item];
          currentObj.id = +i;
          console.log(i)
        }

       // console.log(response.data.data.Item.length);
        console.log(response.data.data.Item);
        if(response.statusCode == '200 ' || response.statusMessage == 'success') 
        {
          router.push("dailytransaction")
          }
     
          
        
      })
      .catch(function (error) {
        console.log(error);
        //router.push("homepage");
      });
  },
};
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