<template>
  <div id="students">
    <main>
      <h2>Students</h2>
      <div class="student-list">
        <div v-for="student in students" :key="student.id" class="student">
          <Student
            :student="student"
            @delete-student="handleDeleteStudent"
            @edit-student="handleEditStudent"
          />
        </div>
        <div class="student">
          <NewStudent
            :addingStudent="addingStudent"
            @add-student="handleAddStudent"
            @toggle-adding="handleToggleAdding"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import FormData from "form-data";
import qs from "qs";

import Student from "@/components/Students/Student.vue";
import NewStudent from "@/components/Students/NewStudent.vue";

export default {
  name: "Students",
  components: {
    Student,
    NewStudent,
  },

  data() {
    return {
      students: [],
      addingStudent: false,
      endpoint: "http://192.168.1.29:8765/api/students/",
    };
  },

  created() {
    this.getAllStudents();
  },

  methods: {
    handleAddStudent(newStudent) {
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

      axios(config)
        .then(() => this.getAllStudents())
        .catch((error) => console.log(error));
    },
    handleToggleAdding() {
      this.addingStudent = !this.addingStudent;
    },
    handleDeleteStudent(studentId) {
      console.log(studentId);
      axios
        .delete(this.endpoint + `/delete/${studentId}`)
        .then(() => this.getAllStudents())
        .catch((error) => console.log(error));
    },
    handleEditStudent(studentId, editedStudent) {
      console.log("Clicked");
      var studentData = qs.stringify({
        first_name: editedStudent.first_name,
        last_name: editedStudent.last_name,
        major: editedStudent.major,
      });

      var config = {
        method: "put",
        url: `${this.endpoint}/edit/${studentId}`,
        data: studentData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then(() => this.getAllStudents())
        .catch((error) => console.log(error));
    },
    getAllStudents() {
      axios
        .get(this.endpoint)
        .then((response) => (this.students = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
#students {
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  margin-top: 60px;
}

.student-list {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid black;
  margin: auto;
  width: fit-content;
  max-width: 864px;
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

.student-inner {
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

.student,
p {
  margin: 5px;
}

.add-student {
  display: flex;
  flex-flow: column wrap;
}
</style>
