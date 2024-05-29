import { createRouter, createWebHistory } from 'vue-router'

import CoachDetails from '../pages/coaches/CoachDetails.vue';
import CoachesList from '../pages/coaches/CoachesList.vue';
import CoachRegistation from '../pages/coaches/CoachRegistation.vue';
import ContactCoach from '../pages/requests/ContactCoach.vue';
import RequestRecevied from '../pages/requests/RequestRecevied.vue';
import NotFound from '../pages/NotFound.vue';
import UserAuth from '../pages/auth/UserAuth.vue';
import store  from '../store/index.js';

 
   

const router = createRouter({
  history: createWebHistory(),//process.env.BASE_URL
  routes :[
    {path: '/' , redirect:'/coaches' },
    {path: '/coaches', component : CoachesList},
    {
        path: '/coaches/:id', 
        component: CoachDetails, 
        props: true,
        children:[
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
    ]},
    {path: '/register', component: CoachRegistation, meta:{requiresAuth : true}},
    {path: '/requests', component: RequestRecevied, meta: {requiresAuth : true}},
    { path: '/auth', component:UserAuth, meta:{requriesUnauth: true}  },
    {path: '/:notFound(.*)', component: NotFound},

  ],
});

router.beforeEach(function(to, _ , next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated ){
      next('/auth');
    }else if(to.meta.requriesUnauth && store.getters.isAuthenticated){
      next('/coaches');
    }else{
      next();
    }
});

export default router;
