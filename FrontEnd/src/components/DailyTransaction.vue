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
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8081/dailyTransc/TranscRoute", config)
      .then(function (response) {
        currentObj.id = 1;
        //console.log(typeof(response.data.data.Items))
        for (var i = 0; i < response.data.data.Items.length; i++) {
          currentObj.rows = response.data.data.Items;
          currentObj.id = +i;
        }

        console.log(response.data.data.Items.length);
        console.log(response.data.data.Items);
        if (response.statusCode == "200") router.push("dailytransaction");
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