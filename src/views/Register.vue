<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
const url = "http://localhost:5000/api/users/";
const router = useRouter()
const username = $ref("");
const email = $ref("");
const password = $ref("");
const confirmPassword = $ref("");
const loading = $ref(false);
const handleSubmit = async () => {
  loading = true;
try {
    const response = await axios.post(url, {
    username,
    email,
    password
  });
  if(response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  if(token) {
    router.push("/login")
  }
  setTimeout(() => {
    username = ""
    email = "",
    password = ""
  }, 1000);
  loading = false;
} catch(err) {
  console.log(err.message)
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
                <label htmlFor="User" class='label'>Username</label>
                <input type="text" placeholder='User' id='user' class="input" v-model="username"/>
                <!-- <p class='error' v-if="v$.username.$error">{{v$.username.$errors[0].$message}}</p> -->
              </div>

              <div class='sm:pb-4 pb-3'>
                <label htmlFor="Email" class='label'>Email</label>
                <input type="email" placeholder='Email' id='email' class="input" v-model="email"/>
                 <!-- <p class='error'  v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</p> -->
              </div>

              <div class='sm:pb-4 pb-3'>
                <label htmlFor="Password" class='label'>Password</label>
                <input type="password" placeholder='Password' id="password" class="input" v-model="password"/>
                 <!-- <p class='error' v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</p> -->
              </div>

              <div class='sm:pb-4 pb-3'>
                <label htmlFor="confirmPassword" class='label'>ConfirmPassword</label>
                <input type="password" placeholder='ConfirmPassword' id="confirmPassword" class='input' v-model="confirmPassword"/>
               <!-- <p class='error' v-if="v$.confirmPassword.$error">{{v$.confirmPassword.$errors[0].$message}}</p> -->
              </div>

              <div>
                <button type='submit' class='w-full bg-purple-500 hover:bg-purple-600 py-2 px-2 font-bold rounded-md text-white'>
                 {{ loading ? ' Signing Up...' : 'Sign Up'}}
                </button>
              </div>
            </form>
          </div>
        </div>
</template>