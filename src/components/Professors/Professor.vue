<template>
  <span v-if="!editing" class="professor-inner">
    <h3>{{ professor.first_name + " " + professor.last_name }}</h3>
    <p>Scheduled Courses: {{ professor.schedule.length }}</p>
    <div class="button-set">
      <button type="button" class="delete-button" @click="handleToggleEdit">
        Edit
      </button>
      |
      <button
        type="button"
        class="delete-button"
        @click="handleDeleteProfessor"
      >
        Delete
      </button>
    </div>
  </span>
  <form v-else class="professor-inner">
    <p>
      First Name:
      <input
        name="first_name"
        type="text"
        v-model="editingProfessor.first_name"
        @keyup.enter="handleSubmitEdit"
      />
    </p>
    <p>
      Last Name:
      <input
        name="last_name"
        type="text"
        v-model="editingProfessor.last_name"
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
  name: "Professor",
  data() {
    return {
      editing: false,
      editingProfessor: {
        first_name: this.professor.first_name,
        last_name: this.professor.last_name,
      },
    };
  },
  props: {
    professor: Object,
  },
  methods: {
    handleDeleteProfessor() {
      this.$emit("delete-professor", this.professor.id);
    },
    handleSubmitEdit() {
      this.$emit("edit-professor", this.professor.id, this.editingProfessor);
      this.handleToggleEdit();
    },
    handleToggleEdit() {
      this.editingProfessor = {
        first_name: this.professor.first_name,
        last_name: this.professor.last_name,
      };
      this.editing = !this.editing;
    },
  },
};
</script>