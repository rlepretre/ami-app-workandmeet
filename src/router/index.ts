import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/explore'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    name: "NewBooking",
    path: '/workspace/:id/booking',
    props: true,
    component: () => import('@/views/NewBooking.vue')
  },
  {
    name: "Workspace",
    path: '/workspace/:id',
    props: true,
    component: () => import('@/views/Workspace.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/explore'
      },
      {
        path: 'create-workspace',
        component: () => import('@/views/CreateWorkspace/GeneralInfo.vue')
      },
      {
        path: 'features',
        name: 'Features',
        component: () => import('@/views/CreateWorkspace/Features.vue')
      },
      {
        path: 'add-pictures',
        name: 'AddPictures',
        component: () => import('@/views/CreateWorkspace/AddPictures.vue')
      },
      {
        path: 'add-dispo',
        name: 'AddDispo',
        component: () => import('@/views/CreateWorkspace/AddDisponibilities.vue')
      },
      {
        path: 'explore',
        component: () => import('@/views/Explore.vue')
      },
      {
        path: 'map',
        component: () => import('@/views/Map.vue')
      },
      {
        name : 'MyBookings',
        path: 'mybookings',
        component: () => import('@/views/MyBookings.vue')
      }, {
        path: 'myworkspaces',
        component: () => import('@/views/MyWorkspaces.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      },      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
