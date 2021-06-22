<template>
  <div id="app">
    <header>
      <h1>Scheduling App</h1>
    </header>
    <main>
      <aside class="upper-nav">Nav Stuff</aside>
      <div class="content">Main Content</div>
      <h2>Courses</h2>
      <div class="course-list">
        <div v-for="course in courses" class="course" :key="course.id">
          <h3>{{ course.course_code + ": " + course.subject }}</h3>
          <p>Credit Value: {{ course.credit_value }}</p>
          <button type="button" class="delete-button" @click="deleteCourse()">
            Delete
          </button>
        </div>
        <div class="add-course">
          <form class="add-course-form">
            <p>
              Subject:
              <input name="subject" type="text" v-model="newCourse.subject" />
            </p>
            <p>
              Course Code:
              <input
                name="course_code"
                type="text"
                v-model="newCourse.course_code"
              />
            </p>
            <p>
              Credit Value:<input
                name="credit_value"
                type="text"
                v-model="newCourse.credit_value"
              />
            </p>
            <button type="button" @click="addNewCourse">Submit</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var axios = require("axios");
var FormData = require("form-data");

export default {
  name: "app",
  data() {
    return {
      courses: [],
      newCourse: {
        subject: "",
        course_code: "",
        credit_value: "3",
      },
      endpoint: "http://192.168.1.29:8765/api/courses/",
    };
  },

  created() {
    this.getAllCourses();
  },

  methods: {
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
    addNewCourse() {
      let { newCourse } = this;
      var courseData = new FormData();
      courseData.append("subject", newCourse.subject);
      courseData.append("course_code", newCourse.course_code);
      courseData.append("credit_value", newCourse.credit_value);

      var config = {
        method: "post",
        url: "http://192.168.1.29:8765/api/courses/add/",
        data: courseData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      console.log(config);

      axios(config)
        .then(() => {
          this.newCourse = {
            subject: "",
            course_code: "",
            credit_value: "3",
          };
        })
        .then(() => this.getAllCourses())
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
#app {
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  margin-top: 60px;
}
.course-list {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid black;
  max-width: 904px;
  margin: auto;
}
.delete-button {
  align-self: center;
  justify-self: flex-end;
  margin-top: auto;
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
.add-course {
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  margin: 10px;
  padding: 2px;
  width: 200px;
  height: 250px;
}
</style>
