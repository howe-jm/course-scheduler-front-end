<template>
  <div id="students">
    <main>
      <h2>Students</h2>
      <div class="student-list">
        <div v-for="student in students" :key="student.id" class="student">
          <Student
            :student="student"
            @refresh-students="handleRefreshStudents"
          />
        </div>
        <div class="student">
          <NewStudent
            :addingStudent="addingStudent"
            @refresh-students="handleRefreshStudents"
            @toggle-adding="handleToggleAdding"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

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
    handleRefreshStudents() {
      this.getAllStudents();
    },
    handleToggleAdding() {
      this.addingStudent = !this.addingStudent;
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
