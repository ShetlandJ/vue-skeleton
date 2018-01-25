import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Projects from '@/components/Projects';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
  ],
});
