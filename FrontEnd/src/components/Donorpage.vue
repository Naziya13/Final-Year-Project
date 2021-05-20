<template>
  <div class="vue-tempalte">
    <form>
      <div class="social-icons mt-3 mb-5">
        <i class="fa fa-user-circle mb-3"></i>
        <h4>{{ Name }}</h4>
      </div>
      <p class="forgot-password text-center mb-1">
        <router-link to="/profile">View Profile</router-link>
      </p>
      <hr style="background-color: black" />
      <p class="forgot-password text-center mb-1">
        <router-link to="/DonHis">My History</router-link>
      </p>
      <hr style="background-color: black" />
      <p class="forgot-password text-center mb-1">
        <router-link to="/Donor">Donate Product</router-link>
      </p>
      <hr style="background-color: black" />
      <p class="forgot-password text-center mb-1">
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
     document.getElementById("Button").disabled = true;
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
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