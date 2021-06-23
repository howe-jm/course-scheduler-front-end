<template>
  <form v-if="addingStudent" class="student-inner">
    <p>
      First Name:
      <input
        name="first_name"
        type="text"
        v-model="newStudent.first_name"
        @keyup.enter="handleAddStudent"
      />
    </p>
    <p>
      Last Name:
      <input
        name="last_name"
        type="text"
        v-model="newStudent.last_name"
        @keyup.enter="handleAddStudent"
      />
    </p>
    <p>
      Major:<input
        name="major"
        type="text"
        v-model="newStudent.major"
        @keyup.enter="handleAddStudent"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleAddStudent">Submit</button> |
      <button type="button" @click="handleToggleAdding">Cancel</button>
    </div>
  </form>
  <div v-else class="button-set">
    <button
      type="button"
      class="new-student-button"
      @click="handleToggleAdding"
    >
      Add New Student
    </button>
  </div>
</template>

<script>
import axios from "axios";
import FormData from "form-data";

export default {
  name: "Student",
  data() {
    return {
      newStudent: {
        first_name: "",
        last_name: "",
        major: "",
      },
      endpoint: "http://192.168.1.29:8765/api/students/add",
    };
  },
  props: {
    addingStudent: Boolean,
    method: { type: Function },
  },
  methods: {
    handleAddStudent() {
      var studentData = new FormData();
      studentData.append("first_name", this.newStudent.first_name);
      studentData.append("last_name", this.newStudent.last_name);
      studentData.append("major", this.newStudent.major);

      var config = {
        method: "post",
        url: this.endpoint,
        data: studentData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      axios(config)
        .then(() => {
          this.$emit("add-student");
          this.handleToggleAdding();
        })
        .catch((error) => console.log(error));
    },
    handleToggleAdding() {
      this.$emit("toggle-adding");
      this.newStudent = {
        first_name: "",
        last_name: "",
        major: "",
      };
    },
  },
};
</script>

<style>
</style>