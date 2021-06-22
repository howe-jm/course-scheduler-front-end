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
      <button type="button" class="delete-button" @click="handleDeleteStudent">
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
        v-model="editingStudent.subject"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <p>
      Course Code:
      <input
        name="course_code"
        type="text"
        v-model="editingStudent.course_code"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <p>
      Credit Value:<input
        name="credit_value"
        type="text"
        v-model="editingStudent.credit_value"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleSubmitEdit">Submit</button>
      <button type="button" @click="handleToggleEdit">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      editing: false,
      editingStudent: {
        subject: this.course.subject,
        course_code: this.course.course_code,
        credit_value: this.course.credit_value,
      },
    };
  },
  props: {
    course: Object,
  },
  methods: {
    handleDeleteStudent() {
      this.$emit("delete-course", this.course.id);
    },
    handleSubmitEdit() {
      this.$emit("edit-course", this.course.id, this.editingStudent);
      this.handleToggleEdit();
    },
    handleToggleEdit() {
      this.editingStudent = {
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