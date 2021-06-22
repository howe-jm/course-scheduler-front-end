<template>
  <div class="add-student">
    <div v-if="addingStudent">
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
          <input name="last_name" type="text" v-model="newStudent.last_name" />
        </p>
        <p>
          Major:<input name="major" type="text" v-model="newStudent.major" />
        </p>
        <button type="button" @click="handleAddStudent">Submit</button>
      </form>
    </div>
    <div v-else>
      <button type="button">Add New Student</button>
    </div>
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
    },
  },
};
</script>