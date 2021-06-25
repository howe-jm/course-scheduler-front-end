import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';

// Student views
import Students from '../views/Students/Students.vue';
import SingleStudent from '../views/Students/SingleStudent.vue';
// Student view children
import SingleStudentProfile from '../views/Students/SingleStudentChildren/SingleStudentProfile.vue';
import SingleStudentSchedule from '../views/Students/SingleStudentChildren/SingleStudentSchedule.vue';

// Professor views
import Professors from '../views/Professors/Professors.vue';
import SingleProfessor from '../views/Professors/SingleProfessor.vue';
// Professor view children
import SingleProfessorProfile from '../views/Professors/SingleProfessorChildren/SingleProfessorProfile.vue';
import SingleProfessorSchedule from '../views/Professors/SingleProfessorChildren/SingleProfessorSchedule.vue';

// Courses views
import Courses from '../views/Courses/Courses.vue';
import SingleCourse from '../views/Courses/SingleCourse.vue';

// Main schedule views
import MainSchedule from '../views/MainSchedule/MainSchedule.vue';

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
      { path: '/students/:id/profile', name: 'StudentProfile', component: SingleStudentProfile },
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
    children: [
      { path: '/professors/:id/profile', name: 'ProfessorProfile', component: SingleProfessorProfile },
      { path: '/professors/:id/schedule', name: 'ProfessorSchedule', component: SingleProfessorSchedule },
    ],
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
