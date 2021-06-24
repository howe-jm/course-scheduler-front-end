import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Students from '../views/Students.vue';
import Professors from '../views/Professors.vue';
import Courses from '../views/Courses.vue';
import Schedule from '../views/Schedule.vue';

import SingleStudent from '../views/SingleStudent.vue';
import SingleProfessor from '../views/SingleProfessor.vue';
import SingleCourse from '../views/SingleCourse.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
  },
  {
    path: '/students/:id',
    name: 'SingleStudent',
    component: SingleStudent,
  },
  {
    path: '/professors',
    name: 'Professors',
    component: Professors,
  },
  {
    path: '/professors/:id',
    name: 'SingleProfessor',
    component: SingleProfessor,
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
  },
  {
    path: '/courses/:id',
    name: 'SingleCourse',
    component: SingleCourse,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
