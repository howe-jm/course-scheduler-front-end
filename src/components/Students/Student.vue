<template>
  <span v-if="!editing" class="student-inner">
    <h3>
      <router-link :to="{ path: `/students/${student.id}/profile` }">{{
        student.first_name + " " + student.last_name
      }}</router-link>
    </h3>
    <p>Major: {{ student.major }}</p>
    <p>Enrolled Courses: {{ student.student_schedule.length }}</p>
    <p>
      Semster Credits:
      {{
        student.student_schedule.reduce(
          (acc, item) => acc + item.schedule.course.credit_value,
          0
        )
      }}
    </p>
    <div class="button-set">
      <button type="button" class="delete-button" @click="handleToggleEdit">
        Edit
      </button>
      |
      <button type="button" class="delete-button" @click="handleDeleteStudent">
        Delete
      </button>
    </div>
  </span>
  <form v-else class="student-inner">
    <p>
      First Name:
      <input
        name="first_name"
        type="text"
        v-model="editedStudent.first_name"
        @keyup.enter="handleEditStudent"
      />
    </p>
    <p>
      Last Name:
      <input
        name="last_name"
        type="text"
        v-model="editedStudent.last_name"
        @keyup.enter="handleEditStudent"
      />
    </p>
    <p>
      Major:<input
        name="major"
        type="text"
        v-model="editedStudent.major"
        @keyup.enter="handleEditStudent"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleEditStudent">Submit</button> |
      <button type="button" @click="handleToggleEdit">Cancel</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Student",
  data() {
    return {
      editing: false,
      editedStudent: {
        first_name: this.student.first_name,
        last_name: this.student.last_name,
        major: this.student.major,
      },
      courses: this.student.student_schedule,
      editEndpoint: `http://192.168.1.29:8765/api/students/edit/${this.student.id}`,
      deleteEndpoint: `http://192.168.1.29:8765/api/students/delete/${this.student.id}`,
    };
  },
  props: {
    student: Object,
  },
  methods: {
    handleEditStudent() {
      var studentData = qs.stringify({
        first_name: this.editedStudent.first_name,
        last_name: this.editedStudent.last_name,
        major: this.editedStudent.major,
      });

      var config = {
        method: "put",
        url: this.editEndpoint,
        data: studentData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then(() => {
          this.$emit("refresh-students");
          this.handleToggleEdit();
        })
        .catch((error) => console.log(error));
    },
    handleDeleteStudent() {
      axios
        .delete(this.deleteEndpoint)
        .then(() => this.$emit("refresh-students"))
        .catch((error) => console.log(error));
    },
    handleToggleEdit() {
      this.editingStudent = {
        first_name: this.student.first_name,
        last_name: this.student.last_name,
        major: this.student.major,
      };
      this.editing = !this.editing;
    },
  },
};
</script>

<style>
</style>