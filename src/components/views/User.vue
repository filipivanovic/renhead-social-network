<template>
  <div v-if="isLoggedIn" class="bg-gray-100">
    <div class="w-full text-white bg-main-color">
      <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-2 lg:px-8">
        <div class="p-2 pl-0 flex flex-row items-center justify-between">
          <p class="text-xl font-bold text-gray-700 rounded-lg">
            <i class="fas fa-user text-2xl mr-4 text-left"></i>
            My Profile
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto pl-3 pr-3 pb-0">
      <div class="md:flex no-wrap md:-mx-2 ">
        <div class="w-full md:w-1/3 md:mx-2">
          <!-- My profile START -->
          <div class="bg-white p-3 border-t-4 border-renhead">
            <div class="image overflow-hidden">
              <img class="h-auto w-full mx-auto" src="@/assets/images/avatar3.png" alt="profile">
            </div>
            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1"> {{ getSpecificUser.fullName }} </h1>
            <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
            <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto">
                  <span class="bg-renhead py-1 px-2 rounded text-white text-sm">Active</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- My profile END -->
        <div class="w-full md:w-9/12 mx-2 h-64">
          <!-- About START -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-renhead">
                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span class="tracking-wide">About</span>
            </div>
            <div class="text-gray-700 text-left">
              <div class="grid md:grid-cols-1 text-sm pl-2">
                <div class="grid grid-cols-2">
                  <div class="p-2 font-semibold">Full Name:</div>
                  <div class="p-2">{{ getSpecificUser.fullName }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="p-2 font-semibold">Email:</div>
                  <div class="p-2">
                    <a class="text-blue-800"> {{ getSpecificUser.email }} </a>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="p-2 font-semibold">username:</div>
                  <div class="p-2"> {{ '@' + getSpecificUser.username }} </div>
                </div>
              </div>
            </div>
          </div>
          <!-- About END -->

          <!-- Recent posts START -->
          <div class="flex items-center mt-3 space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-renhead">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </span>
            <span class="tracking-wide">Recent posts</span>
          </div>
          <div class="flex bg-white mt-3 flex-col-reverse">
            <div v-for="(post, index) in specificPosts" :key="index" class="w-full p-4 border-b hover:bg-lighter flex">
              <div class="flex-none mr-4">
                <img src="@/assets/images/avatar3.png" class="h-12 w-12 rounded-full flex-none"/>
              </div>
              <div class="w-full text-left">
                <div class="flex items-center w-full text-left">
                  <p class="font-semibold"> {{ getSpecificUser.fullName}} </p>
                  <p class="text-sm text-dark ml-2"> {{ '@' + getSpecificUser.username }} </p>
                </div>
                <p class="py-2 text-left">
                  {{ post.content }}
                </p>
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center text-sm text-dark">
                    <i class="far fa-comment mr-3"></i>
                  </div>
                  <div class="flex items-center text-sm text-dark">
                    <i class="fas fa-retweet mr-3"></i>
                  </div>
                  <div class="flex items-center text-sm text-dark">
                    <i class="fas fa-heart mr-3"></i>
                  </div>
                  <div class="flex items-center text-sm text-dark">
                    <i class="fas fa-share-square mr-3"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- Recent posts END -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store/store.js'
    
  export default {
    name: 'user',
    components: {
    },
    data() {
      return {
        specificPosts: []
      }
    },
    computed: {
      userDetails () {
        return store.getters['getUserDetails']
      },
      posts () {
        return store.getters['getPosts']
      },
      isLoggedIn () {
        return store.getters['getIsLoggedIn']
      },
      getSpecificUser () {
        return store.getters['getSpecificUser']
      }
    },
    methods: {
      userSpecificPosts () {
        this.posts.filter(element => {
          if (element.author === this.userDetails.fullName) {
            this.specificPosts.push(element)
          }
        })
        return this.specificPosts
      }
    },
    mounted() {
      if (this.$route.params && this.$route.params.id) {
        let author = this.$route.params.author
        let username = this.$route.params.username
        let id = parseInt(this.$route.params.id);
        store.dispatch('getSpecificUser', id)
      }
      // store.dispatch('displayPosts')
      setTimeout(() => {
        this.userSpecificPosts()
      }, 100);
    }
  }

</script>
