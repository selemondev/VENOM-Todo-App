<script>
export default {
    name: "Navbar",
    data() {
        return {
            token: ""
        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem("user"));
        this.token = user?.token
    },
    methods: {
        handleLogOut() {
            localStorage.removeItem("user");
            this.$router.push("/login");
        }
    }
}
</script>
<template>
<header>
    <nav class="flex justify-between items-center w-full h-10 px-2 bg-[#eee]">
        <div>
            <h2 class="font-bold text-xl md:text-2xl text-purple-500"><router-link to="/login">Venom Stack</router-link></h2>
        </div>

        <div>
            <h3 class="font-bold text-black text-xl hover:text-purple-500 cursor-pointer" v-if="!token"><router-link to="/">Register</router-link></h3>
            <h3 class="font-bold text-black text-xl hover:text-purple-500 cursor-pointer" v-if="token" @click="handleLogOut">LogOut</h3>
        </div>
    </nav>
</header>
</template>