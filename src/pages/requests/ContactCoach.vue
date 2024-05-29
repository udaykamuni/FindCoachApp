 <template>
 <form @submit.prevent="submitForm"> 
          <div>
                <label for="email">E-mail</label>
                <input type="email" id="email" v-model.trim="email">
        </div>
        <div>
                <label for="message">message</label>
                <textarea name="message" id="message" cols="30" rows="10" v-model.trim="message"></textarea>
        </div>
        <div class="actions">
                <base-button>send</base-button>
        </div>
        <p class="errors" v-if="!formIsVaild">check the details you entered</p>
  </form>
</template>



<script>
export default{
        data(){
                return{
                email: '',
                message: '',
                formIsVaild: true
                };
        },
        methods:{
                submitForm(){
                this.formIsVaild  = true;
                if(this.email === ''|| !this.email.includes('@')||this.message === ''){
                        this.formIsVaild = false;
                        return;
                }
                this.$store.dispatch('requests/contactCoach', {
                        email: this.email,
                        message: this.message,
                        coachId:  this.$route.params.id,
                });
                this.$router.replace('/coaches');
                
              
      },

   },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style> 


