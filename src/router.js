import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/views/Home.vue'
import PageNotFound from '@/components/views/PageNotFound.vue'
import User from '@/components/views/User.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/home',
		},
		{
			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/404',
			name: 'page-not-found',
			component: PageNotFound
		},
		{
			path: '*',
			redirect: '/404'
		},
		{
			path: '/user/:id',
			name: 'user',
			component: User
		},
		{
			path: '/explore',
			redirect: '/404'
		},
		{
			path: '/notifications',
			redirect: '/404'
		},
		{
			path: '/frineds',
			redirect: '/404'
		},
		{
			path: '/more',
			redirect: '/404'
		},
		{
			path: '/myprofile',
			name: 'my-profile',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ './components/views/MyProfile.vue'),
		},
	],
})
