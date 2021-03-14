import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'registration',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../components/Homepage.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/resetpass',
    name: 'resetpass',
    component: () => import('../components/ResetPass.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../components/FeedBack.vue')
  },
  {
    path: '/donorlist',
    name: 'donorlist',
    component: () => import('../components/DonorList.vue')
  },
  {
    path: '/requesterlist',
    name: 'requesterlist',
    component: () => import('../components/RequesterList.vue')
  },
  {
    path: '/dailytransaction',
    name: 'dailytransaction',
    component: () => import('../components/DailyTransaction.vue')
  },
    {
    path: '/donor',
    name: 'donor',
    component: () => import('../components/Donor.vue')
  },
  {
    path: '/requester',
    name: 'requester',
    component: () => import('../components/Requester.vue')
  },
  {
    path: '/volunteer',
    name: 'volunteer',
    component: () => import('../components/Volunteer.vue')
  },
  {
    path: '/volunteerRegistration',
    name: 'volunteerRegistration',
    component: () => import('../components/volunteerRegistration.vue')
  },
  {
    path: '/volunteerList',
    name: 'volunteerList',
    component: () => import('../components/VolunteerList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
