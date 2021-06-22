<template>
  <span v-if="!editing" class="student-inner">
    <h3>{{ student.first_name + " " + student.last_name }}</h3>
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
        v-model="editingStudent.first_name"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <p>
      Last Name:
      <input
        name="last_name"
        type="text"
        v-model="editingStudent.last_name"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <p>
      Major:<input
        name="major"
        type="text"
        v-model="editingStudent.major"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleSubmitEdit">Submit</button> |
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
        first_name: this.student.first_name,
        last_name: this.student.last_name,
        major: this.student.major,
      },
      courses: this.student.student_schedule,
    };
  },
  props: {
    student: Object,
  },
  methods: {
    handleDeleteStudent() {
      this.$emit("delete-student", this.student.id);
    },
    handleSubmitEdit() {
      this.$emit("edit-student", this.student.id, this.editingStudent);
      this.handleToggleEdit();
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
  mounted() {
    console.log(this.student);
  },
};
</script>

<style>
</style>