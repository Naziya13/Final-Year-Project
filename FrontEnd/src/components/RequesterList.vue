<template>
  <div class="vue-tempalte">
    <h3 class="p-3 text-center">List Of Requester's</h3>
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Name</th>
          <th>Mobile No</th>
          <th>Address</th>
          <th>Request</th>
          <th>Date&Time</th>
          <th>Work_Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, id) in rows" v-bind:Key="id">
          <td>{{ id + 1 }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.mobile }}</td>
          <td>{{ row.address }}</td>
          <td>{{ row.RequestProduct }}</td>
          <td>{{row.Date_Time}}</td>
          <td>{{row.Work_Status}}</td>
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
      rows: [["mobile", "name", "address", "email", "RequestProduct","Date_Time","Work_Status"]],
      id: [],
    };
  },
  created() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/requesterslist/adminReq_Route", config)
      .then(function (response) {
        for (var i = 0; i < response.data.data.length; i++) {
          currentObj.rows = response.data.data;
          currentObj.id = +i;
        }

        console.log(response.data.data.length);
        console.log(response.data.data);
        if (response == null || response == "undefined")
          router.push("donorlist");
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
