<template>
  <span v-if="!editing" class="course-inner">
    <h3>{{ course.course_code }}</h3>
    <h4>{{ course.subject }}</h4>
    <p>Credit Value: {{ course.credit_value }}</p>
    <p>Scheduled: {{ course.schedule.length }}</p>
    <div class="button-set">
      <button type="button" class="delete-button" @click="handleToggleEdit">
        Edit
      </button>
      |
      <button type="button" class="delete-button" @click="handleDeleteCourse">
        Delete
      </button>
    </div>
  </span>
  <form v-else class="add-course-form">
    <p>
      Subject:
      <input
        name="subject"
        type="text"
        v-model="editedCourse.subject"
        @keyup.enter="handleEditCourse"
      />
    </p>
    <p>
      Course Code:
      <input
        name="course_code"
        type="text"
        v-model="editedCourse.course_code"
        @keyup.enter="handleEditCourse"
      />
    </p>
    <p>
      Credit Value:<input
        name="credit_value"
        type="text"
        v-model="editedCourse.credit_value"
        @keyup.enter="handleEditCourse"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleEditCourse">Submit</button>
      <button type="button" @click="handleToggleEdit">Cancel</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Course",
  data() {
    return {
      editing: false,
      editedCourse: {
        subject: this.course.subject,
        course_code: this.course.course_code,
        credit_value: this.course.credit_value,
      },
      editEndpoint: `http://192.168.1.29:8765/api/courses/edit/${this.course.id}`,
      deleteEndpoint: `http://192.168.1.29:8765/api/courses/delete/${this.course.id}`,
    };
  },
  props: {
    course: Object,
  },
  methods: {
    handleEditCourse() {
      var courseData = qs.stringify({
        subject: this.editedCourse.subject,
        course_code: this.editedCourse.course_code,
        credit_value: this.editedCourse.credit_value,
      });

      var config = {
        method: "put",
        url: this.editEndpoint,
        data: courseData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then(() => {
          this.$emit("refresh-courses");
          this.handleToggleEdit();
        })
        .catch((error) => console.log(error));
    },

    handleDeleteCourse() {
      axios
        .delete(this.deleteEndpoint)
        .then(() => this.$emit("refresh-courses"))
        .catch((error) => console.log(error));
    },

    handleToggleEdit() {
      this.editedCourse = {
        subject: this.course.subject,
        course_code: this.course.course_code,
        credit_value: this.course.credit_value,
      };
      this.editing = !this.editing;
    },
  },
};
</script>

<style scoped>
h3 {
  text-decoration: underline;
}
h4 {
  margin-top: -16px;
}
</style>