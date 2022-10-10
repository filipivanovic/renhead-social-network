<template>
  <div id="app">
    <Header class=" bg-white sticky top-0 z-50" />
    <LoginPage v-if="activateLoginDialog"/>
    <RegisterPage v-if="activateRegisterDialog" />
    <div class="flex container h-screen w-full" :class="{'dimmed': activateRegisterDialog || activateLoginDialog}">
      <SideBarLeft class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between" />
      <router-view />
      <SideBarRight />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SideBarLeft from '@/components/SideBarLeft.vue'
import SideBarRight from '@/components/SideBarRight.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import store from '@/store/store.js'
import jwt_decode from "jwt-decode"

export default {
  name: 'app',
  components: {
    Header,
    SideBarLeft,
    SideBarRight,
    LoginPage,
    RegisterPage
},
  data() {
    return {}
  },
  computed: {
    activateLoginDialog () {
      return store.getters['getLoginDialog']
    },
    activateRegisterDialog() {
      return store.getters['getRegisterDialog']
    }
  },
  methods: {
    checkSession () {
      let jwtLocalStorage = localStorage.jwt
      let decoded = jwt_decode(jwtLocalStorage)
      if (Date.now() <= decoded.exp * 1000) {
        store.commit('setUserDetails', JSON.parse(localStorage.user).user)
        store.commit('setIsLoggedIn', true)
        console.log(JSON.parse(localStorage.user))
      }
      console.log(decoded)
    }
  },
  mounted() {
    this.checkSession()
  }
}
</script>

<style>

</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
}

#nav {
  padding: 10px;
}
.dimmed {
  opacity: 0.1
}
</style>
