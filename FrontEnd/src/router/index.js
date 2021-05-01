import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/',
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
  },
  {
    path:'/feedbacklist',
    name:'FeedbackList',
    component:()=>import('../components/feedbackList.vue')
  },
  {
    path:'/Adminpage',
    name:'Adminpage',
    component:()=>import('../components/AdminPage.vue')
  },
  {
    path:'/Donorpage',
    name:'Donorpage',
    component:()=>import('../components/Donorpage.vue')
  },
  {
    path:'/Requesterpage',
    name:'Requesterpage',
    component:()=>import('../components/Requesterpage.vue')
  },
  {
    path:'/Thankyou',
    name:'Thankyou',
    component:()=>import('../components/ThankYou.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
