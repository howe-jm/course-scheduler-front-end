<template>
  <div id="app">
    <header>
      <h1>Scheduling App</h1>
    </header>
    <main>
      <aside class="upper-nav">Nav Stuff</aside>
      <div class="content">Main Content</div>
      <h2>Students</h2>
      <div class="student-list">
        <span v-for="student in students" :key="student.id">
          <Student :student="student" />
        </span>
        <span
          ><NewStudent :addingStudent="true" @add-student="handleAddStudent"
        /></span>
      </div>
    </main>
  </div>
</template>

<script>
var axios = require("axios");
var FormData = require("form-data");

import Student from "@/components/Student.vue";
import NewStudent from "@/components/NewStudent.vue";

export default {
  name: "app",
  components: {
    Student,
    NewStudent,
  },
  data() {
    return {
      students: [],
      endpoint: "http://192.168.1.29:8765/api/students/",
    };
  },

  created() {
    this.getAllStudents();
  },

  methods: {
    handleAddStudent(newStudent) {
      this.addNewStudent(newStudent);
    },
    getAllStudents() {
      axios
        .get(this.endpoint)
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addNewStudent(newStudent) {
      var studentData = new FormData();
      studentData.append("first_name", newStudent.first_name);
      studentData.append("last_name", newStudent.last_name);
      studentData.append("major", newStudent.major);

      var config = {
        method: "post",
        url: `${this.endpoint}add/`,
        data: studentData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      console.log(config);

      axios(config)
        .then(() => {
          this.newStudent = {
            first_name: "",
            last_name: "",
            major: "",
          };
        })
        .then(() => this.getAllStudents())
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
.student-list {
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

.student {
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  margin: 10px;
  padding: 2px;
  width: 200px;
  height: 250px;
}
.add-student {
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  margin: 10px;
  padding: 2px;
  width: 200px;
  height: 250px;
}
</style>
