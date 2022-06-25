import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from "../views/Login.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
})

export default router
