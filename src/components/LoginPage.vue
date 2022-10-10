<template>
  <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="text-white w-full mt-1/12 flex justify-center max-w-full fixed bg-blue-700 z-50 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ease-in-out" type="button" data-modal-toggle="authentication-modal">
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-gray-800 text-white rounded-lg shadow">
        <button @click="closeLoginDialog" type="button" class="absolute top-3 right-2.5 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-white dark:text-white">Log in to our platform</h3>
          <form class="space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300">Your email</label>
              <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300">Your password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-800 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div class="flex justify-between">
              <div class="flex items-start">
                <div class="flex items-center mt-3 h-5">
                  <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-renhead dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-renhead dark:ring-offset-gray-800" required>
                </div>
                <label for="remember" class="ml-2 mt-3 text-sm font-medium text-white dark:text-gray-300">Remember me</label>
              </div>
              <a href="#" class="text-sm mt-3 text-renhead hover:underline dark:text-blue-500">Lost Password?</a>
            </div>
            <button @click=login type="submit" class="inline-flex items-center rounded-md mt-5 bg-renhead px-6 py-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Log In</button>
          </form>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import axios from 'axios'
import store from '@/store/store.js'

export default {
  name: 'login-page',
  components: {
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {},
  methods: {
    closeLoginDialog() {
      store.dispatch('deactivateLoginDialog')
    },
    login() {
      axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        store.commit('setUserDetails', response.data.user)
        store.dispatch('loginUser')
        store.dispatch('deactivateLoginDialog')
        localStorage.jwt = response.data.accessToken
        localStorage.user = JSON.stringify({
          user: response.data.user
        })
      })
    }
  }
}
</script>

<style scoped>

button:focus {
  outline: none
}

</style>