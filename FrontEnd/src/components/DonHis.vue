<template>
  <div class="vue-tempalte">
    <h3 class="p-3 text-center">History Donor</h3>
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Name</th>
          <th>Mobile No.</th>
          <th>Address</th>
          <th>Offer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, id) in rows" v-bind:Key="id">
          <td>{{ id + 1 }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.mobile }}</td>
          <td>{{ row.address }}</td>
          <td>{{ row.OfferProduct }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

import router from "../router/index";

export default {
  // el:"#table",
  data() {
    return {
      rows: [["mobile", "name", "address", "email", "OfferProduct"]],
      id: [],
    };
  },
  created() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/donorHis/donorRoute", config)
      .then(function (response) {
        currentObj.id = 1;
        delete response.data.data.Item.gender;
        delete response.data.data.Item.password;
        console.log((Object.keys(response.data.data)).length)
        var n=(Object.keys(response.data.data)).length
        for (var i = 0; i <n ; i++) {
          currentObj.rows = [response.data.data.Item];

          currentObj.id = +i;
        }

        console.log(response.data.data.Item.email);

        console.log(response.data.data);
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
