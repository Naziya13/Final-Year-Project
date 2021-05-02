<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Feedback</h3>

            <div class="form-group">
                <label>Full Name</label>
               {{fullname}}
            </div>

            <div class="form-group">
                <label>Email address</label>
                {{email}}
            </div>

            <div class="form-group">
                <label>Mobile Number</label>
              {{mobile}}
            </div>
            <p class="text-center">Tell Us How You R
                eally Feel?</p> 
            
            <div class="row justify-content-center" id="rating-div" >
                <div class="col-4" >
                    <button type="button" @click="rating('great')"> <span class="emoji"> &#128516;</span></button>
                    <p class="text">Great</p>
                </div>
                <div class="col-4">
                    <button type="button" @click="rating('good')"> <span class="emoji"> &#128578;</span></button>
                    <p class="text">Good</p>
                </div>
             </div>
              <div class="row justify-content-center" id="rating-div2">
                <div class="col-4">
                    <button type="button" @click="rating('okay')"> <span class="emoji"> &#128528;</span></button>
                    <p class="text">Okay</p>
                </div>
                <div class="col-4">
                    <button type="button" @click="rating('bad')"> <span class="emoji"> &#128533;</span></button>
                    <p class="text"> Bad</p>
                </div>
             </div>
            <div class="form-group">
                <label>Thanks!! Anything else you'd like to add?</label>
                <textarea class="form-control" rows="1" id="comment" v-model="suggestions" required></textarea>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>

        </form>
    </div>
</template>
<script >
import axios from 'axios'
import router from '../router/index'

export default {
    mounted() {
        console.log('Component mounted.')

    },
    data() {
        return {
              fullname: '',
              email : '',
              mobile : '',
              suggestions:'',
              feedback:''
        }
    },
    created(){
 console.log('Component mounted.')
          let currentObj=this;

           axios.get('http://localhost:8082/feedback/feebackRoute2')
                .then(function(response)
                {
                    currentObj.fullname=response.data.data.Items[0].name;
                    currentObj.email=response.data.data.Items[0].email;
                    currentObj.mobile=response.data.data.Items[0].mobile;
                    
                    

                    console.log(response.data.data.Items)
                    if(response.statusCode=='200')
                        router.push("donor")
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
               
    },
    
    methods: {
        formSubmit(e) {
            e.preventDefault();
            let currentObj = this;
            var config = {
              headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
            };
            axios.post('http://localhost:8082/feedback/feedbackRoute', {
                fullName: this.fullName,
                email : this.email,
                mob : this.mob,
                suggestions:this.suggestions,
                feedback:this.feedback
            },config)
            .then(function (response) {
                currentObj.output = response.data;
                console.log(JSON.stringify(response));
                  if(currentObj.output.statusCode == '200' )  
                      {console.log("Enter")
                      router.push({ name: "Donorpage"});}
                    else if(currentObj.output.statusCode == '201' )
                    {
                        router.push({name:"Requesterpage"})
                    }
                    else if(currentObj.output.statusCode == '202' )
                    {
                        router.push({name:"/"})
                    }
                     
                    else
                    {
                      
                      alert("cant fetch")
                      this.mounted()
                    }
                                        
            })
            .catch(function (error) {
                currentObj.output = error;
            });
        },
        rating(emit){

            // write your logic here for storing rating value (which comes in the emit variable) in the database            
            alert('rating : '+ emit);
            this.feedback=emit;
            console.log('rating : '+JSON.stringify(emit));
            //remove alert and console log statements its only for debugging purpose.
        }
    }
}
 </script>

<style>
   body,
   html,
   .App,
   .vue-tempalte,
  .vertical-center {
  width: 100%;
  height: 107%;
}
#rating-div  > div > button {
    background-color : #ffffff;
    border : none;
} 
#rating-div2 > div > button {
    background-color : #ffffff;
    border : none;
} 
</style>
