import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Students from '../views/Students/Students.vue';
import Professors from '../views/Professors/Professors.vue';
import Courses from '../views/Courses/Courses.vue';
import MainSchedule from '../views/MainSchedule/MainSchedule.vue';

import SingleStudent from '../views/Students/SingleStudent.vue';
import SingleStudentProfile from '../views/Students/SingleStudent/SingleStudentProfile.vue';
import SingleStudentSchedule from '../views/Students/SingleStudent/SingleStudentSchedule.vue';

import SingleProfessor from '../views/Professors/SingleProfessor.vue';
import SingleCourse from '../views/Courses/SingleCourse.vue';

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
    children: [
      { path: '/students/:id/profile', name: 'Profile', component: SingleStudentProfile },
      { path: '/students/:id/schedule', name: 'StudentSchedule', component: SingleStudentSchedule },
    ],
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
    component: MainSchedule,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
