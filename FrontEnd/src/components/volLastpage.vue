<template>
 <div class="vue-tempalte">
    <div class="social-icons">
            <i class="fa fa-thumbs-up"></i>
    </div> 

    <p>{{ name }}</p>
    <br />
    <h3>Good Work....Well Done !!!</h3>

    <p class="forgot-password text-center mt-5 mb-3">
      <button type="submit" @click="Logout()" class="btn btn-dark btn-lg btn-block">logout</button>
    </p>
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
      headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    };
    let currentObj = this;

    axios
      .get("http://localhost:8082/volLast/VolRoute", config)
      .then(function (response) {
        currentObj.name = response.data.data.Item.name;
        currentObj.email = response.data.data.Item.email;
        console.log(response.data.data.Item);
        if (response.statusMessage == "success" || response.statusCode == "200")
          router.push("volLastpage");
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
          "http://localhost:8082/volLast/logout",
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
            // console.log("enter");
            router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
