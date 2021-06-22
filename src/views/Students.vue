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
        <div v-for="student in students" class="student" :key="student.id">
          <h3>{{ student.first_name + " " + student.last_name }}</h3>
          <p>Major: {{ student.major }}</p>
          <button type="button" class="delete-button" @click="deleteStudent()">
            Delete
          </button>
        </div>
        <div class="add-student">
          <form class="add-student-form">
            <p>
              First Name:
              <input
                name="first_name"
                type="text"
                v-model="newStudent.first_name"
              />
            </p>
            <p>
              Last Name:
              <input
                name="last_name"
                type="text"
                v-model="newStudent.last_name"
              />
            </p>
            <p>
              Major:<input
                name="major"
                type="text"
                v-model="newStudent.major"
              />
            </p>
            <button type="button" @click="addNewStudent">Submit</button>
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
      students: [],
      newStudent: {
        first_name: "",
        last_name: "",
        major: "",
      },
      endpoint: "http://192.168.1.29:8765/api/students/",
    };
  },

  created() {
    this.getAllStudents();
  },

  methods: {
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
    addNewStudent() {
      let { newStudent } = this;
      var studentData = new FormData();
      studentData.append("first_name", newStudent.first_name);
      studentData.append("last_name", newStudent.last_name);
      studentData.append("major", newStudent.major);

      var config = {
        method: "post",
        url: "http://192.168.1.29:8765/api/students/add/",
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
