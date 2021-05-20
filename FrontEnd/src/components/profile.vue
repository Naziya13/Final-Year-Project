
<template>
  <div class="vue-tempalte">
    <form >
    <h3>My Profile</h3>
        <div class="social-icons mt-3">
            <i class="fa fa-user-circle"></i>
        </div> 
        <div class="form-group">
        <label>Full Name</label>
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="fullName"
          disabled
        />
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input
          type="email"
          class="form-control form-control-sm"
          v-model="email"
          disabled
        />
      </div>

      <div class="form-group">
        <label>Mobile Number</label>
        <input
          type="email"
          class="form-control form-control-sm"
          v-model="mobile"
          disabled
        />
      </div>

      <div class="form-group">
        <label>Address</label>
        <input
          type="email"
          class="form-control form-control-sm"
          v-model="address"
          disabled
        />
      </div>
      
          
    <!--<button type="submit" class="btn btn-dark btn-lg btn-block">Edit</button>-->
  
    </form>
  </div>
  
</template>

<script>
import axios from "axios";
import router from "../router/index";
export default {
  mounted() {
    console.log("Component mounted.");
  },
  data() {
    return {
      fullName: "",
      email: "",
      mobile: "",
      address: ""

    };
  },
  created() {
    console.log("Component mounted.");
     //var config = {
      //headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    //};
    let currentObj = this;

    axios
      .get("http://localhost:8081/profile/profileRoute")
      .then(function (response) {
        currentObj.fullName = response.data.data.Item.name;
        currentObj.email = response.data.data.Item.email;
        currentObj.mobile = response.data.data.Item.mobile;
        currentObj.address = response.data.data.Item.address;

        console.log(response.data.data.Item);
        if (response.statusCode == "200") router.push("profile");
      })
      .catch(function (error) {
        currentObj.output = error;
      });
  },
}
</script>