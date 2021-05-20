<template>
  <div class="vue-tempalte">
<div class="profile">
          <div class="row">
            <div class="col-md-6 text-right">
                <i class="fa fa-user-circle mb-3"></i>                  
            </div>
            <div class="col-md-6 mt-4">
                  <h4>Name</h4>
                  <h6 class="forgot-password text-left mt-1 mb-3">
                      <router-link to="/profile">View Profile</router-link>
                  </h6>
            </div>
          </div>
    </div>

    <h5 class="text-center mt-3">Work Assigned to me...</h5>
    <div class="row">
      <div class="col-md-6">
        <h4 class="text-center">Donor</h4>
        <table class="table table-striped table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>MobileNo</th>
              <th>Address</th>
              <th>OfferProduct</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, id) in donor" v-bind:Key="id">
              <td>{{ row.name }}</td>
              <td>{{ row.mobile }}</td>
              <td>{{ row.address }}</td>
              <td>{{ row.OfferProduct }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h4 class="text-center">Requester</h4>
        <table class="table table-striped table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>MobileNo</th>
              <th>Address</th>
              <th>RequestProduct</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, id) in requester" v-bind:Key="id">
              <td>{{ row.name }}</td>
              <td>{{ row.mobile }}</td>
              <td>{{ row.address }}</td>
              <td>{{ row.RequestProduct }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center">
      <p>After Completion of Delivery...</p>
      <input
        type="file"
        id="file"
        name="file"
        ref="file"
        v-on:change="handelFileUplaod()"
      />
    </div>
    <div class="text-center mt-3">
      <button
        type="submit"
        class="btn btn-dark btn-lg"
        @click.prevent="formSubmit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";
//import { delete } from 'vue/types/umd'
export default {
  data() {
    return {
      donor: [["mobile", "name", "address", "email", "OfferProduct"]],
      requester: [
        ["mobile", "name", "address", "email", "RequestProduct"],
      ],
      Volunteer: "",
      file: "",
      D_add:'',
      R_add:'',
      email:'',
      D_email:'',
      R_email:'',
      V_id:''
    };
  },
  created() {
    var config = {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8081" },
    };
    let currentObj = this;
    //donor's
    axios
      .get("http://localhost:8081/Volunteer/donorRoute", config)
      .then(function (response) {
        console.log("Donor");
         currentObj.Volunteer = response.data.data.Item.volunteerName;
        currentObj.email=response.data.data.Item.volunteerEmail;
        currentObj.V_id=response.data.data.Item.Volunteer_Id;
       
        delete response.data.data.Item.Volunteer_Id;
        delete response.data.data.Item.volunteerName;
        delete response.data.data.Item.volunteerEmail;
        currentObj.donor = [response.data.data.Item];
        currentObj.D_email=response.data.data.Item.email;
        currentObj.D_add=response.data.data.Item.address;
        // console.log(currentObj.donor)
        //console.log((response.data.data.Item).length)
        console.log(response.data.data.Item.email);
        if (response.statusCode=='200')
          router.push("volunteer");
      })
      .catch(function (error) {
        console.log(error);
        alert("donors address not matched");
        //router.push('homepage')
      });
    axios
      .get("http://localhost:8081/Volunteer/requesterRoute", config)
      .then(function (response) {
        currentObj.Volunteer = response.data.data.Item.volunteerName;
        currentObj.email=response.data.data.Item.volunteerEmail;
        currentObj.V_id=response.data.data.Item.Volunteer_Id

        delete response.data.data.Item.Volunteer_Id;
        delete response.data.data.Item.volunteerName;
        delete response.data.data.Item.volunteerEmail;
        currentObj.requester = [response.data.data.Item];
         currentObj.R_email=response.data.data.Item.email;
         currentObj.R_add=response.data.data.Item.address;
        //console.log(currentObj.requester)
        //console.log((response.data.data.Item).length)
        console.log(response.data.data.Item);
        if (response.statusCode== '201' )
          router.push({ name: "volunteer" });
      })
      .catch(function (error) {
        console.log(error);
        alert("requesters address not matched");
        //router.push('homepage')
      });
  },
  methods: {
    handelFileUplaod() {
      this.file = this.$refs.file.files[0];
      console.log("file data: " + this.file);
    },
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      
      let formData = new FormData();
      formData.append("Volunteer",this.Volunteer);
      formData.append("email",this.email);
      formData.append("V_id",this.V_id);
      formData.append('D_add',this.D_add);
      formData.append("D_mail",this.D_email);
      formData.append("R_email",this.R_email);
      formData.append("R_add",this.R_add);
      formData.append("file", this.file);
      var config = {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8081",
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "http://localhost:8081/Volunteer/FileUploadRoute",
          formData,
          config
        )
        .then(function (response) {
          currentObj.output = response.body;
          // console.log(JSON.stringify(response));
          if (response.statusCode == '200'||response.statusCode=='201');
          router.push({ name: "Thankyou" });
        })
        .catch(function (error) {
          currentObj.output = error;
        });
    },
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
  width: 1010px;
}
</style>