<template>
    <div class="vue-tempalte">
        <h3>Registration</h3>
        <p class="forgot-password text-center mb-5">
            <router-link to="/volunteerRegistration">Volunteer Registration</router-link>
        </p>
        <h3>Records</h3>
        <p class="forgot-password text-center mb-3">
            <router-link to="/donorlist">View Donor List</router-link>
        </p>
        <p class="forgot-password text-center mb-3">
            <router-link to="/requesterlist">View Requester List</router-link>
        </p>
        <p class="forgot-password text-center mb-3">
            <router-link to="/volunteerlist">View Volunteer List</router-link>
        </p>
         <p class="forgot-password text-center mb-3">
            <router-link to="/feedbacklist">View FeedBack List</router-link>
        </p>
        <br>
         <p class="forgot-password text-center mb-3">
            <router-link to="/">Logout</router-link>
        </p>
    </div>
</template>

<script>
    export default{
        data(){
            return{}
        }
    }
</script>