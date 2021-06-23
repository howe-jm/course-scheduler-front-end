<template>
  <div id="courses">
    <main>
      <h2>Courses</h2>
      <div class="course-list">
        <div v-for="course in courses" :key="course.id" class="course">
          <Course :course="course" @refresh-courses="handleRefreshCourses" />
        </div>
        <div class="course">
          <NewCourse
            :addingCourse="addingCourse"
            @refresh-courses="handleRefreshCourses"
            @toggle-adding="handleToggleAdding"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var axios = require("axios");

import Course from "@/components/Courses/Course.vue";
import NewCourse from "@/components/Courses/NewCourse.vue";

export default {
  name: "Courses",
  components: {
    Course,
    NewCourse,
  },

  data() {
    return {
      courses: [],
      addingCourse: false,
      endpoint: "http://192.168.1.29:8765/api/courses/",
    };
  },

  created() {
    this.getAllCourses();
  },

  methods: {
    handleRefreshCourses() {
      this.getAllCourses();
    },
    handleToggleAdding() {
      this.addingCourse = !this.addingCourse;
    },
    getAllCourses() {
      axios
        .get(this.endpoint)
        .then((response) => {
          this.courses = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#courses {
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  margin-top: 60px;
}

.course-list {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid black;
  margin: auto;
  width: fit-content;
  max-width: 864px;
}

.course {
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  margin: 10px;
  padding: 2px;
  width: 200px;
  height: 250px;
}

.course-inner {
  display: flex;
  flex-flow: column wrap;
  height: inherit;
}

.button-set {
  align-self: center;
  justify-self: flex-end;
  margin-top: auto;
  margin-bottom: 10px;
}

.course,
p {
  margin: 5px;
}

.add-course {
  display: flex;
  flex-flow: column wrap;
}
</style>
