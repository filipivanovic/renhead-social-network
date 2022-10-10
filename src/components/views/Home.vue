<template>
  <div id="wrapp" class="flex container h-screen w-full">
    <div class="w-full h-full overflow-y-scroll">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Posts</h1>
      </div>
      <!-- Write new post START -->
      <div class="px-5 py-3 border-b-8 border-gray-100 flex" v-if="isLoggedIn">
        <div class="flex-none">
          <img src="@/assets/images/avatar3.png" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
        </div>
        <form class="w-full px-4 relative">
          <textarea v-model="post.content" placeholder="What's up?" class="mt-3 pb-3 w-full focus:outline-none"/>
          <div class="flex items-center">
            <i class="text-lg text-renhead mr-4 far fa-image"></i>
            <i class="text-lg text-renhead mr-4 fas fa-film"></i>
            <i class="text-lg text-renhead mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-renhead mr-4 far fa-smile"></i>
          </div>
          <button @click.prevent="addNewPost" type="submit" class="h-10 px-4 text-white font-semibold bg-renhead focus:outline-none rounded-full absolute bottom-0 right-0">
            Post
          </button>
        </form>
      </div>
      <!-- Write new post END -->

      <!-- All posts START -->
      <div class="flex flex-col-reverse">
        <div v-for="(post, index) in posts" :key="index" class="w-full flex-col p-4 border-b flex">
          <div class="flex">
            <router-link to="/user" class="flex-none cursor-pointer mr-4">
              <img src="@/assets/images/avatar3.png" class="h-12 w-12 rounded-full border border-lighter flex-none"/>
            </router-link>
            <div class="w-full text-left">
              <div class="flex items-center w-full text-left">
                <p @click="goToUserPage(post.uid)" class="font-semibold cursor-pointer"> {{ post.author}} </p>
                <p class="text-sm text-dark ml-2"> {{ '@' + post.username }} </p>
                <!-- <p class="text-sm text-dark ml-2"> {{ follow.time }} </p> -->
              </div>
              <p class="py-2 mb-3 text-left">
                {{ post.content }}
              </p>
              <div class="flex items-center mb-3 justify-between w-full">
                <div class="flex items-center text-sm text-dark">
                  <i class="far fa-comment hover:text-renhead cursor-pointer mr-3"></i>
                  <!-- <p > {{ comments.length }} </p> -->
                </div>
                <div class="flex items-center text-sm text-dark">
                  <i class="fas fa-retweet mr-3 hover:text-blue cursor-pointer"></i>
                </div>
                <div class="flex items-center text-sm text-dark">
                  <i class="fas fa-heart hover:text-red-600 cursor-pointer mr-3"></i>
                </div>
                <div class="flex items-center text-sm text-dark">
                  <i class="fas fa-share-square hover:text-green-500 cursor-pointer mr-3"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- Comments START -->
          <div v-if="commentsIds.includes(post.id)" class="w-full flex-col p-4 pb-0 bord border rounded-lg pl-20 bg-gray-50 flex">
            <div v-if="comment.postId === post.id" :id="'edit-button-' + index" class="flex border-b bord last:border-b-0 mb-2" v-for="(comment, index) in comments" :key="index">
              <router-link to="/user" class="flex-none mr-4">
                <img src="@/assets/images/avatar3.png" class="h-8 w-8 rounded-full border border-lighter flex-none"/>
              </router-link>
              <div class="w-full text-left">
                <div class="flex items-center w-full text-left">
                  <p class="font-semibold text-sm"> {{ comment.author}} </p>
                </div>
                <p class="text-sm text-left">
                  {{ comment.content }}
                </p>
                <div v-if="isLoggedIn" class="flex justify-end">
                  <p @click="deleteComment(comment.id)" class="pr-3 hover:underline text-xs cursor-pointer flex justify-end mb-2">Delete</p>
                  <p @click="showEdit(index)" class="hover:underline text-xs flex cursor-pointer justify-end mb-2">Edit</p>
                </div>
                <div :id="'edit-comment-area-' + index" class="hide-edit-area flex pb-3">
                  <textarea :value="comment.content" :id="'edit-id-' + index" rows="1" class="px-0 w-full text-sm text-gray-900 bg-white border-0" placeholder="Write a comment..." required=""></textarea>
                  <div class="flex ml-2">
                    <button @click.prevent="editComment(comment.id, post.id, index)" type="submit" class="relative h-7 px-4 text-white font-semibold bg-renhead focus:outline-none rounded-full bottom-0 right-0">
                      Edit
                    </button>
                    <button @click.prevent="cancelEditComment(index)" type="submit" class="ml-2 relative h-7 px-4 text-white font-semibold bg-renhead focus:outline-none rounded-full bottom-0 right-0">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Comments END -->

          <!-- Write new comment START -->
          <form>
            <div v-if="isLoggedIn" class="mb-4 mt-3 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                <label for="comment" class="sr-only">Your comment</label>
                <textarea :value="comment.content" :id="'comment-id-' + index" rows="1" class="px-0 w-full text-sm text-gray-900 bg-white border-0" placeholder="Write a comment..." required=""></textarea>
              </div>
              <div class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                <button @click.prevent="addNewComment(post.id, index)" type="submit" class=" relative h-10 px-4 text-white font-semibold bg-renhead focus:outline-none rounded-full bottom-0 right-0">
                  Comment
                </button>
                <div class="flex pl-0 space-x-1 sm:pl-2">
                  <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Attach file</span>
                  </button>
                  <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Set location</span>
                  </button>
                  <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Upload image</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <!-- Write new comment END -->
        </div>
      </div>
      <!-- All posts END -->
    </div>
  </div>
</template>

<script>

import store from '@/store/store'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      newPost: [],
      post: {content: ''},
      newComment: [],
      comment: {content: ''},
      commentsIds: []
    }
  },
  methods: {
    addNewPost() {
      let userPost = {
        content: this.post.content
      }
      this.newPost.push(userPost)
      axios.post('http://localhost:3000/posts', {
        author: this.userDetails.fullName,
        uid: this.userDetails.id,
        username: this.userDetails.username,
        content: this.post.content
      })
        .then (() => {
          this.post.content = ''
          store.dispatch('displayPosts')
        })
    },
    addNewComment (postId, id) {
      let message = document.getElementById('comment-id-' + id)
      axios
      .post('http://localhost:3000/comments', {
        author: this.userDetails.fullName,
        uid: this.userDetails.id,
        content: message.value,
        postId: postId
      })
      .then(response => {
        message.value = ''
        this.commentsIds.push(response.data.postId)
        this.comentsId()
        store.dispatch('displayComments')
      })
    },
    goToUserPage (id) {
      this.$router.push({
        name: "user",
        params: { id: id },
      })
    },
    comentsId () {
      this.comments.filter(element => {
        this.commentsIds.push(element.postId)
      })
    },
    deleteComment(id) {
      axios.delete('http://localhost:3000/comments/' + id)
      .then(() => store.dispatch('displayComments'))
    },
    showEdit (id) {
      document.getElementById('edit-comment-area-' + id).classList.remove('hide-edit-area')
    },
    editComment(commentId, postId, id) {
      let message = document.getElementById('edit-id-' + id)
      axios.put('http://localhost:3000/comments/' + commentId, {
        author: this.userDetails.fullName,
        uid: this.userDetails.id,
        content: message.value,
        postId: postId
      })
      .then(() => {
        message.value = ''
        store.dispatch('displayComments')
        document.getElementById('edit-comment-area-' + id).classList.add('hide-edit-area')
      })
    },
    cancelEditComment(id) {
      document.getElementById('edit-comment-area-' + id).classList.add('hide-edit-area')
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
    comments () {
      return store.getters['getComments']
    },
    users () {
      return store.getters['getUsers']
    }
  },
  mounted() {
    store.dispatch('displayUsers')
    store.dispatch('displayPosts')
    store.dispatch('displayComments')
  },
  watch: {
    comments (newVal, oldVal) {
      if (newVal) {
        this.comentsId()
      }
    }
  }
}
</script>

<style>

p {
  text-align: left;
}

:focus-visible {
  outline: 2px solid #f5a61e;
}
.bord:last-child {
  border: none !important
}
.hide-edit-area {
  display: none
}

</style>