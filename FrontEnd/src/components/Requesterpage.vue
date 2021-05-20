<template>
  <div class="vue-tempalte">
    <form>
<div class="social-icons mt-3 mb-5">
            <i class="fa fa-user-circle mb-3"></i>
            <h4>{{Name}}</h4>
      </div> 

      <p class="forgot-password text-center mb-1">
        <router-link to="/profile">View Profile</router-link>
      </p>
      <hr style="background-color:black;">
      <p class="forgot-password text-center mb-1">
        <router-link to="/ReqHis">My History</router-link>
      </p>
      <hr style="background-color:black;">
      <p class="forgot-password text-center mb-1">
        <router-link to="/requester">Request Product</router-link>
      </p>
      <hr style="background-color:black;">
      <p class="forgot-password text-center mb-1">
        <a href="#" @click="Logout()">Logout</a>
      </p>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";
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
      headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8081/Requesterpage/RequestRoute", config)
      .then(function (response) {
        console.log(response.data.data.Items);
        currentObj.Name = response.data.data.Item.name;
        currentObj.email = response.data.data.Item.email;
        console.log(response.data.data.Item);
        if (response.statusMessage == "success" || response.statusCode == "200")
          router.push("Requesterpage");
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
          "http://localhost:8081/Requesterpage/logout",

          { email: this.email },
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
            router.push("/");
          }
        });
    },
  },
};
</script>