<template>
  <div class="vue-tempalte">   
    <div class="profile">
      <div class="row">
        <div class="col-md-6 text-right">
          <i class="fa fa-user-circle mb-3"></i>
        </div>
        <div class="col-md-6 mt-4">
          <h4>{{Name}}</h4>
          <h6 class="forgot-password text-left mt-1 mb-3">
            <router-link to="/profile">View Profile</router-link>
          </h6>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <h3 style="margin-top: 40px">Volunteer</h3>
        <p class="forgot-password text-center mt-4">
          <router-link to="/volunteerRegistration">
            New Registration
          </router-link>
        </p>
        <hr style="background-color: black" />
        <p class="forgot-password text-center mb-3">
          <router-link to="/volunteerlist"> View Volunteer List </router-link>
        </p>
      </div>

      <div class="col-md-6">
        <h3>Records</h3>
        <p class="forgot-password text-center mt-2 mb-3">
          <router-link to="/donorlist">View Donor List</router-link>
        </p>
        <hr style="background-color: black" />
        <p class="forgot-password text-center mb-3">
          <router-link to="/requesterlist">View Requester List</router-link>
        </p>
        <hr style="background-color: black" />
        <p class="forgot-password text-center mb-3">
          <router-link to="/dailytransaction">Daily Transactions</router-link>
        </p>
        <hr style="background-color: black" />
        <p class="forgot-password text-center mb-3">
          <router-link to="/feedbacklist">View FeedBack List</router-link>
        </p>
      </div>
    </div>

    <p class="forgot-password text-center">
      <button @click="Logout" class="btn btn-dark btn-lg">logout</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
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
      .get("http://localhost:8081/Adminpage/AdminRoute", config)
      .then(function (response) {
        console.log("Enter in admin");
        console.log(response.data.data.Item);
        currentObj.Name = response.data.data.Item.name;
        console.log(currentObj.Name);
        currentObj.email = response.data.data.Item.email;

        if (response == null || response == "undefined")
          router.push("Adminpage");
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
          "http://localhost:8081/Adminpage/logout",
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



