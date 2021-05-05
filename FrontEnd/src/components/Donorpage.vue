<template>
  <div class="vue-tempalte">
    <form>
      <h5 style="margin-left: 30%">{{ Name }}</h5>
      <p class="forgot-password text-center mb-5">
        <router-link to="/DonHis">History</router-link>
      </p>
      <p class="forgot-password text-center mb-5">
        <router-link to="/Donor">Donate Product</router-link>
      </p>
      <p class="forgot-password text-center mb-3">
        <a href="#" @click="Logout()">Logout</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

import router from "../router/index";
export default {
  // el:"#table",
  data() {
    return {
      Name: "",
      email: "",
    };
  },
  
  created() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/Donorpage/donorRoute", config)
      .then(function (response) {
        currentObj.Name = response.data.data.Item.name;
        currentObj.email = response.data.data.Item.email;
        console.log(response.data.data.Items);
        if (response.statusMessage == "success" || response.statusCode == "200")
          router.push("Donorpage");
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {
    Logout() {
      var config = {
        headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
      };

      axios
        .post(
          "http://localhost:8082/Donorpage/logout",
          {
            email: this.email,
          },
          config
        )
        .then((response) => {
          console.log("Logout");
          router.push("/");
          if (
            response.statusCode == "200" ||
            response.statusMessage == "success"
          ) {
            console.log("enter");
            router.push("/Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};

</script>