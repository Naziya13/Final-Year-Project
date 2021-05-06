<template>
  <div class="vue-tempalte">
    <h3 class="p-3 text-center">List Of Donor's</h3>
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
      .get("http://localhost:8082/donorlist/adminRoute", config)
      .then(function (response) {
        currentObj.id = 1;
        //console.log(typeof(response.data.data.Items))
        for (var i = 0; i < response.data.data.Items.length; i++) {
          currentObj.rows = response.data.data.Items;
          currentObj.id = +i;
        }

        console.log(response.data.data.Items.length);
        console.log(response.data.data.Items);
        if (response == null || response == "undefined")
          router.push("donorlist");
      })
      .catch(function (error) {
        console.log(error);
        router.push("homepage");
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
