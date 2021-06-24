<template>
  <span v-if="!editing" class="professor-inner">
    <h3>
      <router-link :to="{ path: `/professors/${professor.id}` }">{{
        professor.first_name + " " + professor.last_name
      }}</router-link>
    </h3>
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
        v-model="editedProfessor.first_name"
        @keyup.enter="handleEditProfessor"
      />
    </p>
    <p>
      Last Name:
      <input
        name="last_name"
        type="text"
        v-model="editedProfessor.last_name"
        @keyup.enter="handleEditProfessor"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleEditProfessor">Submit</button> |
      <button type="button" @click="handleToggleEdit">Cancel</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Professor",
  data() {
    return {
      editing: false,
      editedProfessor: {
        first_name: this.professor.first_name,
        last_name: this.professor.last_name,
      },
      editEndpoint: `http://192.168.1.29:8765/api/professors/edit/${this.professor.id}`,
      deleteEndpoint: `http://192.168.1.29:8765/api/professors/delete/${this.professor.id}`,
    };
  },
  props: {
    professor: Object,
  },
  methods: {
    handleEditProfessor() {
      var professorData = qs.stringify({
        first_name: this.editedProfessor.first_name,
        last_name: this.editedProfessor.last_name,
      });

      var config = {
        method: "put",
        url: this.editEndpoint,
        data: professorData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then(() => {
          this.$emit("refresh-professors");
          this.handleToggleEdit();
        })
        .catch((error) => console.log(error));
    },
    handleDeleteProfessor() {
      axios
        .delete(this.deleteEndpoint)
        .then(() => this.$emit("refresh-professors"))
        .catch((error) => console.log(error));
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