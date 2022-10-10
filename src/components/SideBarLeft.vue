<template>
  <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
    <div>
      <div>
        <router-link to='/home'>
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-home text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> Home </p>
          </button>
        </router-link>
        <router-link to='/myprofile' v-if="isLoggedIn">
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-user text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> My Profile </p>
          </button>
        </router-link>
        <router-link to='/notifications' v-if="isLoggedIn">
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-bell text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> Notifications </p>
          </button>
        </router-link>
        <router-link to='/user/:id' v-if="isLoggedIn">
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-users text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> Friends </p>
          </button>
        </router-link>
        <router-link to='/messages' v-if="isLoggedIn">
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-envelope text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> Messages </p>
          </button>
        </router-link>
        <router-link to='/exlpore'>
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-hashtag text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> Explore </p>
          </button>
        </router-link>
        <router-link to='/more'>
          <button class="focus:outline-none focus:text-renhead hover:text-renhead flex items-center py-2 px-4 rounded-full mr-auto mb-3 ">
            <i class="fas fa-ellipsis-h text-2xl mr-4 text-left"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> More </p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import store from '@/store/store.js'
  
  export default {
    name: 'side-bar-left',
    components: {
    },
    data() {
      return {
      }
    },
    computed: {
      isLoggedIn () {
        return store.getters['getIsLoggedIn']
      }
    },
    methods: {
    }
  }
  </script>

<style>

</style>