import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from "../views/Login.vue";
import Dashboard from '../views/Dashboard.vue';
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
    },
    {
      path:"/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        auth: true
      }
    },
    {
      path:"/goal/:id",
      name: "todo",
      component: () => import ("../views/Goal.vue"),
      meta: {
        auth: true
      }
    }
  ]
});

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem("user"));
    resolve(user);
    reject
  },
  )
}
// const user = JSON.parse(localStorage.getItem("user"));
router.beforeEach( async (to,from,next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next()
    } else {
      next("/login")
    }
  } else {
    next();
  }
})

export default router
