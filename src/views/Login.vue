<script setup>
import { reactive, computed } from "vue";
import {required,email,sameAs,minLength,helpers} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const formData = reactive({
  username: "",
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
  username:{ required: helpers.withMessage('Username is required', required), minLength: minLength(6)},
  email:{ required: helpers.withMessage('Email is required', required), email},
  password:{required: helpers.withMessage('Password is required', required), minLength:minLength(8)},
  }
})

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if(result) {
    alert("Form submitted")
  } else {
    alert("Form not submitted")
  }
}

</script>
<template>
       <div class='grid place-items-center'>
          <div class='max-w-sm sm:w-80 w-72 md:mt-6 mt-4'>
            <form class='bg-white shadow-sm rounded-sm w-full px-6 py-4 border border-gray-200' @submit.prevent="handleSubmit">
              <div class='grid place-items-center'>
                <h2 class="font-bold text-purple-500 text-xl md:text-2xl">VENOM STACK</h2>
              </div>
              <div class='sm:pb-4 pb-3'>
                <label htmlFor="User" class='label'>User</label>
                <input type="text" placeholder='User' id='user' class="input" v-model="formData.username"/>
                <p class='error' v-if="v$.username.$error">{{v$.username.$errors[0].$message}}</p>
              </div>

              <div class='sm:pb-4 pb-3'>
                <label htmlFor="Email" class='label'>Email</label>
                <input type="email" placeholder='Email' id='email' class="input" v-model="formData.email"/>
                 <p class='error'  v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</p>
              </div>

              <div class='sm:pb-4 pb-3'>
                <label htmlFor="Password" class='label'>Password</label>
                <input type="password" placeholder='Password' id="password" class="input" v-model="formData.password"/>
                 <p class='error' v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</p>
              </div>

              <div>
                <button type='submit' class='w-full bg-purple-500 hover:bg-purple-600 py-2 px-2 font-bold rounded-md text-white'>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
</template>