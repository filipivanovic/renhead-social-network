import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginDialog: false,
		registerDialog: false,
		isLoggedIn: false,
		users: [],
    userDetails: [],
    posts: [],
		comments: [],
		friends: [],
		specificUser: undefined
	},
	getters: {
		getLoginDialog (state) {
			return state.loginDialog
		},
		getRegisterDialog (state) {
			return state.registerDialog
		},
		getIsLoggedIn (state) {
			return state.isLoggedIn
		},
		getUsers (state) {
			return state.users
		},
    getUserDetails (state) {
      return state.userDetails
    },
    getPosts (state) {
      return state.posts
    },
		getComments (state) {
			return state.comments
		},
		getFriends (state) {
			return state.friends
		},
		getSpecificUser (state) {
			return state.specificUser
		}
	},
	mutations: {
		setLoginDialog(state, value) {
			state.loginDialog = value
		},
		setRegisterDialog(state, value) {
			state.registerDialog = value
		},
		setIsLoggedIn(state, value) {
			state.isLoggedIn = value
    },
    setUsers(state, value) {
      state.users = value
    },
    setUserDetails(state, value) {
      state.userDetails = value
    },
    setPosts(state, value) {
      state.posts = value
    },
		setComments(state, value) {
			state.comments = value
		},
		setFriends(state, value) {
			state.friends = value
		},
		setSpecificUser(state, value) {
			state.specificUser = value
		},
	},
	actions: {
		activateLoginDialog(context) {
			context.commit('setLoginDialog', true)
		},
		deactivateLoginDialog(context) {
			context.commit('setLoginDialog', false)
		},
		activateRegisterDialog(context) {
			context.commit('setRegisterDialog', true)
		},
		deactivateRegisterDialog(context) {
			context.commit('setRegisterDialog', false)
		},
    displayUsers(context) {
			axios
				.get('http://localhost:3000/users')
        .then((response) => (context.commit('setUsers', response.data)
			))
		},
    loginUser(context) {
      context.commit('setIsLoggedIn', true)
    },
    logoutUser(context) {
      context.commit('setIsLoggedIn', false)
			localStorage.removeItem('user')
			localStorage.removeItem('jwt')
    },
    displayPosts(context) {
      axios
        .get('http://localhost:3000/posts')
        .then((response) => (
					context.commit('setPosts', response.data)
			))
    },
		displayComments(context) {
			axios
				.get('http://localhost:3000/comments')
				.then((response) => (context.commit('setComments', response.data)
			))
		},
		addFriend (context) {},
		getSpecificUser (context, data) {
			console.log(data, 'data')
			axios
			.get('http://localhost:3000/users/' + data)
			.then((response) => (context.commit('setSpecificUser', response.data)))
		}
	},
})
