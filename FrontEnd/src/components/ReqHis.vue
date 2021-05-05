<template>
  <div class="vue-tempalte">
    <h3 class="p-3 text-center">History</h3>
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Name</th>
          <th>Mobile No</th>
          <th>Address</th>
          <th>Request</th>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";
//import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
      rows: [["mobile", "name", "address", "email", "RequestProduct"]],
      id: [],
    };
  },
  created() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/reqHis/reqRoute", config)
      .then(function (response) {
        delete response.data.data.Item.password;
        delete response.data.data.Item.gender;
        
         console.log((response.data.data.Item).length)
        for (var i = 0; i < response.data.data.Item.length; i++) {
          currentObj.rows = response.data.data.Item;
          currentObj.id = +i;
        }

       
        console.log(response.data.data.Item);
        if (response.statusCode == "200") router.push("donorlist");
      })
      .catch(function (error) {
        console.log(error);
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
  width: 800px;
}
</style>
