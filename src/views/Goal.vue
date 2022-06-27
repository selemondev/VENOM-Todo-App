<script>
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
const token = user.token;
const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
};
export default {
    name: "Goal",
    data() {
        return {
            updatedGoal: {},
            loading: false,
        }
    },
    async created() {
        const url = `http://localhost:5000/api/goals/${this.$route.params.id}`;
        const response = await axios.get(url, config);
        this.updatedGoal = response.data;
    },

    methods: {
        async handleUpdateTodo () {
            this.loading = true;
            const url = `http://localhost:5000/api/goals/${this.$route.params.id}`;
            const response = await axios.put(url, this.updatedGoal, config);
            this.loading = false;
            this.$router.push("/dashboard")
        }
    }
}
</script>
<template>
  <div class='layout'>
      <div class='max-w-md w-72 md:w-80 mt-5 mb-5 border border-gray-200'>
        <form class='px-6 py-4 bg-white w-full rounded-sm' @submit.prevent="handleUpdateTodo">
          <div class='layout'>
            <h3 class='mt-3 mb-5 font-bold text-purple-600'>Update Todo</h3>
          </div>
          <div class='pb-4 flex justify-center items-center'>
           <div>
           <input type="text" placeholder='Todo' v-model="updatedGoal.text" class='input'/>
           </div>
            <button type='submit' class='ml-2 py-2 px-2 w-32 bg-purple-500 hover:bg-purple-600 text-white rounded-md'>{{ loading ? 'Updating...' : 'Update'}}</button>
          </div>
        </form>
        </div>
    </div>
</template>