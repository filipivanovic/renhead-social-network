<template>
  <div class="md:block hidden w-2/3 h-full border-l border-grey-50 py-2 px-6 overflow-y-scroll relative">
    <div class="w-full rounded-lg bg-gray-100 my-4">
      <div class=" p-3">
        <p class="text-lg font-bold">Who to Follow</p>
      </div>
      <button v-for="(user, index) in users" :key="index" class="w-full flex hover:bg-lighter p-3 border-t border-lighter">
        <img src="@/assets/images/avatar3.png" class="w-12 h-12 rounded-full border border-lighter" />
        <div class="hidden lg:block ml-4">
          <p class="text-sm font-bold leading-tight"> {{ user.fullName }} </p>
          <p class="text-sm leading-tight"> {{ '@' + user.username }} </p>
        </div>
        <button v-if="!following" @click="follow(user.username, user.id, user.fullName)" class="ml-auto text-sm text-renhead focus:bg-renhead focus:text-white active:bg-renhead active:text-white py-1 px-4 rounded-full border-2 border-renhead">
          Follow
        </button>
        <button v-if="following" @click="unfollow"  class="ml-auto text-sm text-white bg-renhead focus:bg-renhead focus:text-white active:bg-renhead active:text-white py-1 px-4 rounded-full border-2 border-renhead">
          Following
        </button>
      </button>
    </div>
  </div>
</template>

<script>

import store from '@/store/store'
  
  export default {
    name: 'side-bar-right',
    components: {
    },
    data() {
      return {
        following: false,
      }
    },
    computed: {
      users () {
        return store.getters['getUsers']
      },
      friends () {
        return store.getters['getFriends']
      }
    },
    methods: {
      follow (username, id, fullName) {
        store.dispatch('addFriend')
      },
      unfollow () {
        this.following = false
      }
    }
  }
  </script>

<style>

button:focus {
  outline: none !important
}

</style>