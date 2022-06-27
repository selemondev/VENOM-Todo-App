<script>
import axios from "axios";
import TodoList from "../components/TodoList.vue";
const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;
const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
};
const url = "http://localhost:5000/api/goals/";
export default {
  name: "Dashboard",
  components: {
    TodoList
  },
  data() {
    return {
      goals: [],
      text:'',
      completed: false,
    }
  },
  async created() {
    try {
      const response = await axios.get(url, config);
    this.goals = response.data;
    } catch(err) {
      console.log(err.message)
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(url, {
        text: this.text,
        completed: this.completed
      } , config);
      this.goals.push(response.data);
      this.text = ""
      } catch(err) {
        console.log(err.message)
      }
    },

    async complete(id) {
      await axios.put(url + id, config);
      this.goals.push({
        completed: !this.completed,
      })
    },

    async handleDeleteTodo(id) {
      let index = this.goals.findIndex((item) => item._id === id);
      await axios.delete(url + id, config);
      this.goals.splice(index, 1)
    }
  }
}
</script>
<template>
  <div class='layout'>
      <div class='max-w-md w-72 md:w-80 mt-5 mb-5 border border-gray-200'>
        <form class='px-6 py-4 bg-white w-full rounded-sm' @submit.prevent="handleSubmit">
          <div class='layout'>
            <h3 class='mt-3 mb-5 font-bold text-purple-600'>VENOM CRUD App</h3>
          </div>
          <div class='pb-4 flex justify-center items-center'>
           <div>
           <input type="text" placeholder='Todo' v-model="text" class='input'/>
           </div>
            <button type='submit' class='ml-2 py-2 px-2 w-32 bg-purple-500 hover:bg-purple-600 text-white rounded-md'>Todo</button>
          </div>
        </form>
        </div>
        <div v-for="goal in goals" :key="goal._id">
        <div>
        <div class="flex justify-between items-center w-72 sm:w-80 bg-gray-200 mt-2 px-2 py-2 rounded-md">
           <div class="flex items-center justify-center">
            <h3 class='font-bold'>{{goal.text}}</h3>
          </div>
        <div>
               <router-link :to="{ name: 'todo', params: { id: goal._id}}">
            <span><i class='bx bx-edit-alt text-lg text-green-500 mr-2'></i></span>
            </router-link>
        <span><i class='bx bxs-trash-alt text-lg text-red-500' @click="handleDeleteTodo(goal._id)"></i></span>
        </div>
        </div>
    </div>
        </div>
        </div>
</template>