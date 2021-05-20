<template>
  <div class="vue-tempalte">
     <form @submit="formSubmit">
      <h3>Login</h3>
      <div class="form-group">
        <label>Username</label>
        <input
          type="email"
          class="form-control form-control-sm"
          v-model="Email"
          required
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-sm"
          v-model="pass"
          required
        />
      </div>

      <label>Login As</label>
      <div class="select mb-4">
      <select v-model="selected" required>
        <option>Admin</option>
        <option>Donor</option>
        <option>Requester</option>
        <option>Volunteer</option>
      </select>
      </div>
      <button
        type="submit"
        class="btn btn-dark btn-lg btn-block"
        onclick="clear()"
      >
        Login
      </button>

      <p class="forgot-password text-right mt-1 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
      
      <div class="social-icons">
        <a href="#" class="fa fa-facebook"></a>
        <a href="#" class="fa fa-google ml-4"></a>
      </div>
     
      <p class="forgot-password text-center mt-2 ">
        Have not account yet ?
        <router-link to="/registration">Register</router-link>
      </p>
     </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";
export default {
  mounted() {
    console.log("Component mounted.");
    document.getElementById("Button").disabled = true;

  },
  data() {
    return {
      loginInfo: {
        Email: "",
        pass: "",
        selected: "",
        submitted: false,
      },
    };
  },

  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      this.submitted = true;
      var config = {
        headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
      };
      axios
        .post(
          "http://localhost:8082/Login/loginRoute",
          {
            Email: this.Email,
            pass: this.pass,
            selected: this.selected,
          },
          config
        )
        .then(function (response) {
          currentObj.output = response.data;
          console.log(response.data);
          console.log(JSON.stringify(response));

          if (
            currentObj.output.statusCode == "200" ||
            currentObj.output.statusMessage == "success User"
          ) {
            console.log("Enter");
            router.push({ name: "Adminpage" });
          } else if (
            currentObj.output.statusCode == "201" ||
            currentObj.output.statusMessage == "success donor"
          ) {
            router.push({ name: "Donorpage" });
          } else if (
            currentObj.output.statusCode == "202" ||
            currentObj.output.statusMessage == "success requester"
          ) {
            router.push({ name: "Requesterpage" });
          } else if (
            currentObj.output.statusCode == "203" ||
            currentObj.output.statusMessage == "success Volunteer"
          ) {
            router.push({ name: "volunteer" });
          } else {
            alert("wrong Email and password");
            this.mounted();

            //alert.reset("wrong Email and Password")
            router.push({ name: "Login" }).mounted();
          }
        })
        .catch(function (error) {
          currentObj.output = error;
        });
    },
  },
};
</script>
<style scoped>

</style>


