<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isVaild}">
            <label for="firstname">FirstName</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')">
            <p v-if="!firstName.isVaild">Firstname must not be empty</p>

        </div>
        <div class="form-control" :class="{invalid: !lastName.isVaild}">
            <label for="lastname">LastName</label>
            <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidity('lastName')">
            <p v-if="!lastName.isVaild">lastname must not be empty</p>

        </div>
        <div class="form-control" :class="{invalid: !description.isVaild}">
            <label for="description">Description</label>
            <textarea id="description" cols="30" rows="10" v-model.trim="description.val" @blur="clearValidity('description')"></textarea>
            <p v-if="!description.isVaild">description must not be empty</p>

        </div>
        <div class="form-control" :class="{invalid: !rate.isVaild}">
            <label for="rate">Hourly rate</label>
            <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')">
            <p v-if="!rate.isVaild">rate must not be greater than zero</p>

        </div>
        <div class="form-control" :class="{invalid:!areas.isVaild}">
            <h3>Areas of Expertise</h3>
            <div>
           <input type="checkbox" id="forntend" value="frontend" v-model="areas.val" @blur="clearValidity('areas')">
            <label for="forntend">Frontend Development</label>
        </div>
        <div >
            <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearValidity('areas')">
            <label for="backend">Backend Development</label>
        </div>
        <div >
            <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearValidity('areas')">
            <label for="career">Career Advisor</label>
        </div>
        <p v-if="!areas.isVaild">atleast one Expertise select</p>

        </div>
        <p v-if="!formIsVaild">check the information you have submit and try again</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default{
  emits:['save-data'],
    data(){
        return{
            firstName:{
              val:'',
              isVaild: true
            },
            lastName: {
              val:'',
              isVaild: true
            },
          description:{
            val:'',
            isVaild: true
          },
            rate:{
              val:null,
              isVaild: true
            },
            areas:{
              val:[],
              isVaild: true
            },
            formIsVaild: true,
        };
    },
    methods:{
      clearValidity(input){
        this[input].isVaild = true;
      },
      validateForm(){
        this.formIsVaild = true;
        if(this.firstName.val === ''){
          this.firstName.isVaild = false;
          this.formIsVaild = false;
        }
        if(this.lastName.val === ''){
          this.lastName.isVaild = false;
          this.formIsVaild = false;
        }
        if(this.description.val === ''){
          this.description.isVaild = false;
          this.formIsVaild = false;
        }
        if(!this.rate.val || this.rate < 0){
          this.rate.isVaild = false;
          this.formIsVaild = false;
        }
        if(this.areas.val.length === 0){
          this.areas. isVaild = false;
          this.formIsVaild = false;
        }

      },
        submitForm(){
          this.validateForm();
          if(!this.formIsVaild){
            return;
          }
            const formData = {
                first : this.firstName.val,
                last: this.lastName.val,
                desc: this.description.val,
                rate: this.rate.val,
                areas: this.areas.val,
                
            };
          this.$emit('save-data', formData);
        }

    }

}

</script>


<style scoped>
.form-control {
  margin: 0.5rem 0;
  padding: 0rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}</style>