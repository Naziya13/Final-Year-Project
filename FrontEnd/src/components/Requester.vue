<template>
  <div class="vue-tempalte">
    <form @submit="formSubmit">
      <h3>Requester</h3>

      <div class="form-group">
        <label>Full Name:</label>
        {{ fullName }}
      </div>

      <div class="form-group">
        <label>Email address:</label>
        {{ email }}
      </div>

      <div class="form-group">
        <label>Mobile Number :</label>
        {{ mobile }}
      </div>
      <div class="form-group">
        <label>Address</label>
        {{ address }}
      </div>
      <fieldset class="form-group">
        <legend>Request Product</legend>
        <div>
          <select v-model="selected">
            <option disabled value="Available">Please Select One</option>
            <option v-for="items in products" v-bind:key="items">
              {{ items }}
            </option>
          </select>
        </div>
      </fieldset>
      <div class="form-group">
        <label>Upload Photo</label>
        <input
          type="file"
          id="file"
          name="file"
          ref="file"
          v-on:change="handelFileUplaod()"
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
//import { delete } from 'vue/types/umd';

export default {
  data() {
    return {
      fullName: "",
      email: "",
      mobile: "",
      address: "",
      selected: "",
      products: [],
      file: "",
    };
  },
  created() {
    console.log("Component mounted.");
    let currentObj = this;

    axios
      .get("http://localhost:8082/requester/RequestDetails")
      .then(function (response) {
        console.log(response.data.data.OfferProduct.length);
        let items = [];
        for (var i = 0; i < response.data.data.OfferProduct.length; i++) {
          items = response.data.data.OfferProduct;
        }
        currentObj.products = [...new Set(items)];
        // console.log(items)
        console.log(typeof response.data.data.OfferProduct[0]);
        console.log(currentObj.products);
        delete response.data.data.Item.RequestProduct;
        currentObj.fullName = response.data.data.Item.name;
        currentObj.email = response.data.data.Item.email;
        currentObj.mobile = response.data.data.Item.mobile;
        currentObj.address = response.data.data.Item.address;
        console.log(response.data.data);
        if (response.statusCode == "200") router.push("Requester");
      })
      .catch(function (error) {
        console.log(error);
        // router.push('homepage')
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
      formData.append("selected", this.selected);
      formData.append("file", this.file);

      formData.append("email", this.email);
      var config = {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8081",
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8082/requester/requestRoute", formData, config)
        .then(function (response) {
          currentObj.output = response.data.selected;

          currentObj.output = response.data.file;
          currentObj.output = response.data.email;
          // console.log(JSON.stringify(response));
          if (response.statusMessage == "success" || response.statusCode=='200');
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
  height: 103%;
}
</style>