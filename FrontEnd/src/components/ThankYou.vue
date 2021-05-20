<template>
  <div class="vue-tempalte">
    <div class="social-icons mt-3 mb-4">
      <i class="fa fa-check-circle"></i>
    </div>

    <h3 style="padding-bottom: 15px">Thank You {{ name }} !!!</h3>
    <p class="forgot-password text-center" style="padding-bottom: 25px">
      Your submission has been received.
    </p>

    <hr style="background-color: blue" />

    <div class="main">
      <h6>Please Give Us Your Feedback</h6>
      <router-link style="text-decoration: none" to="">
        <button
          type="submit"
          @click.prevent="goto()"
          class="btn btn-dark btn-x mt-2"
        >
          No Thanks
        </button>
      </router-link>

      <router-link
        style="text-decoration: none; padding-left: 70px"
        to="/feedback"
      >
        <button type="submit" class="btn btn-dark btn-x mt-2">Feedback</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  data() {
    return {
      email: "",
      name: "",
    };
  },
  created() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/ThankYou/ThankRoute", config)
      .then(function (response) {
        currentObj.name = response.data.data.Item.name;
        currentObj.email = response.data.data.Item.email;
        console.log(response.data.data.Item);
        if (response.statusMessage == "success" || response.statusCode == "200")
          router.push("Thankyou");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    goto() {
      let currentObj = this;
      var config = {
        headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
      };
      axios
        .post(
          "http://localhost:8082/ThankYou/goto",
          {
            email: this.email,
          },
          config
        )
        .then(function (response) {
          currentObj.output = response.data;
          console.log(JSON.stringify(response));
          if (
            currentObj.output.statusCode == "200" ||
            currentObj.output.statusMessage == "success Donor"
          ) {
            console.log("Enter");
            router.push({ name: "Donorpage" });
          } else if (
            currentObj.output.statusCode == "201" ||
            currentObj.output.statusMessage == "success Requester"
          ) {
            router.push({ name: "Requesterpage" });
          } else if (
            currentObj.output.statusCode == "202" ||
            currentObj.output.statusMessage == "success Volunteer"
          ) {
            router.push({ name: "volLastpage" });
          } else {
            alert("cant fetch");
          }
        })
        .catch(function (error) {
          currentObj.output = error;
        });
    },
  },
};
</script>
