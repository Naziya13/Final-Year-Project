<template>
  <div class="vue-tempalte">
    <form @submit="formSubmit">
      <h3>Reset Password</h3>

      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="email"
        />
      </div>
      you are:
      <select v-model="selected" style="margin-left: 3%" required>
        <option>Admin</option>
        <option>Donor</option>
        <option>Requester</option>
        <option>Volunteer</option>
      </select>
      <br /><br />
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="pass"
          required
        />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="Cpass"
          required
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";
export default {
  data() {
    return {
      pass: "",
      Cpass: "",
      email:'',
      selected:''
    };
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;

      var config = {
        headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
      };
      if (this.pass == this.Cpass) {
        axios
          .post(
            "http://localhost:8082/ResetPass/ResetPassword",
            {
              Cpass: this.Cpass,
              email:this.email,
              selected:this.selected
            },
            config
          )
          .then(function (response) {
            currentObj.output = response.data;
            console.log(JSON.stringify(response));
            if (currentObj.output.statusCode == '200')
            router.push( "/" );
            else{
                   alert("Please Enter correct Email address")
                   
            }
          })
          .catch(function (error) {
            currentObj.output = error;
         
          });
      } else {
        alert("please enter same password");
      }
    },
  },
};
</script>