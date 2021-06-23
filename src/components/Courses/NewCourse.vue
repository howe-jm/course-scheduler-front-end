<template>
  <form v-if="addingCourse" class="course-inner">
    <p>
      Subject:
      <input
        name="subject"
        type="text"
        v-model="newCourse.subject"
        @keyup.enter="handleAddCourse"
      />
    </p>
    <p>
      Course Code:
      <input
        name="course_code"
        type="text"
        v-model="newCourse.course_code"
        @keyup.enter="handleAddCourse"
      />
    </p>
    <p>
      Credit Value:<input
        name="credit_value"
        type="text"
        v-model="newCourse.credit_value"
        @keyup.enter="handleAddCourse"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleAddCourse">Submit</button> |
      <button type="button" @click="handleToggleAdding">Cancel</button>
    </div>
  </form>
  <div v-else class="new-course-form">
    <button type="button" class="new-course-button" @click="handleToggleAdding">
      Add New Course
    </button>
  </div>
</template>

<script>
var axios = require("axios");
var FormData = require("form-data");

export default {
  name: "Course",
  data() {
    return {
      newCourse: {
        subject: "",
        course_code: "",
        credit_value: "3",
      },
      endpoint: "http://192.168.1.29:8765/api/courses/add",
    };
  },
  props: {
    addingCourse: Boolean,
    method: { type: Function },
  },
  methods: {
    handleAddCourse() {
      var courseData = new FormData();
      courseData.append("subject", this.newCourse.subject);
      courseData.append("course_code", this.newCourse.course_code);
      courseData.append("credit_value", this.newCourse.credit_value);

      var config = {
        method: "post",
        url: this.endpoint,
        data: courseData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      axios(config)
        .then(() => {
          this.$emit("add-course");
          this.handleToggleAdding();
        })
        .catch((error) => console.log(error));
    },
    handleToggleAdding() {
      this.$emit("toggle-adding");
      this.newCourse = {
        subject: "",
        course_code: "",
        credit_value: "3",
      };
    },
  },
};
</script>

<style>
</style>