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
  <div v-else class="new-student-form">
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
export default {
  name: "Student",
  data() {
    return {
      newStudent: {
        first_name: "",
        last_name: "",
        major: "",
      },
    };
  },
  props: {
    addingStudent: Boolean,
    method: { type: Function },
  },
  methods: {
    handleAddStudent() {
      this.$emit("add-student", this.newStudent);
      this.handleToggleAdding();
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