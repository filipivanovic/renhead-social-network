<template>
  <div class="lg:flex lg:items-center lg:justify-around border-b pb-2">
    <div class="min-w-0 flex">
      <router-link to="/">
        <img class="h-12 w-full" src="@/assets/images/renhead-logo.png" alt="renhead">
      </router-link>
    </div>
    <!-- Search START -->
    <div class="mt-5 p-1 flex lg:mt-0 lg:ml-4">
      <form>   
        <div class="relative w-100">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="default-search" class="block p-4 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-renhead" placeholder="Search for users..." required="">
        </div>
      </form>
    </div>
    <!-- Search END -->

    <!-- Sign in/out section START -->
    <div v-if="!isLoggedIn" class="mt-5 flex lg:mt-0 lg:ml-4">
      <span class="hidden sm:block">
        <button @click="openLoginDialog" type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <!-- Heroicon name: mini/pencil -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Log In
        </button>
      </span>
      <span class="sm:ml-3">
        <button @click="openRegisterDialog" type="button" class="inline-flex items-center rounded-md border border-transparent bg-renhead px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <!-- Heroicon name: mini/check -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Sign Up
        </button>
      </span>
    </div>
    <!-- Sign in/out section END -->

    <!-- Logout START -->
    <div v-if="isLoggedIn" class="mt-5 flex lg:mt-0 lg:ml-4">
      <router-link class="flex items-center" to="/myprofile">
        <span class="flex items-center mr-5 font-bold">
          <i class="fas fa-user text-2xl mr-4 text-left"></i>
          <p> {{ userDetails.fullName }} </p>
        </span>
      </router-link>
      <span class="sm:ml-3">
        <button @click="logout" type="button" class="inline-flex items-center rounded-md border border-transparent bg-renhead px-4 py-3 text-sm font-medium text-white shadow-sm hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <!-- Heroicon name: mini/check -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Log Out
        </button>
      </span>
    </div>
    <!-- Logout END -->
  </div>
</template>

<script>
import store from '@/store/store.js'
  
export default {
  components: {
  },
  data() {
    return {}
  },
  computed: {
    isLoggedIn () {
      return store.getters['getIsLoggedIn']
    },
    userDetails () {
      return store.getters['getUserDetails']
    }
  },
  methods: {
    openLoginDialog() {
      store.dispatch('activateLoginDialog')
    },
    closeLoginDialog() {
      store.dispatch('deactivateLoginDialog')
    },
    openRegisterDialog() {
      store.dispatch('activateRegisterDialog')
    },
    closeRegisterDialog() {
      store.dispatch('deactivateRegisterDialog')
    },
    login () {
      store.dispatch('loginUser')
    },
    logout () {
      store.dispatch('logoutUser')
    }
  }
}
</script>
