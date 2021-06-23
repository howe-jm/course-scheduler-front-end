<template>
  <form v-if="addingProfessor" class="professor-inner">
    <p>
      First Name:
      <input
        name="first_name"
        type="text"
        v-model="newProfessor.first_name"
        @keyup.enter="handleAddProfessor"
      />
    </p>
    <p>
      Last Name:
      <input
        name="last_name"
        type="text"
        v-model="newProfessor.last_name"
        @keyup.enter="handleAddProfessor"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleAddProfessor">Submit</button> |
      <button type="button" @click="handleToggleAdding">Cancel</button>
    </div>
  </form>
  <div v-else class="button-set">
    <button
      type="button"
      class="new-professor-button"
      @click="handleToggleAdding"
    >
      Add New Professor
    </button>
  </div>
</template>

<script>
var axios = require("axios");
var FormData = require("form-data");

export default {
  name: "Professor",
  data() {
    return {
      newProfessor: {
        first_name: "",
        last_name: "",
      },

      endpoint: "http://192.168.1.29:8765/api/professors/add",
    };
  },
  props: {
    addingProfessor: Boolean,
    method: { type: Function },
  },
  methods: {
    handleAddProfessor() {
      var professorData = new FormData();
      professorData.append("first_name", this.newProfessor.first_name);
      professorData.append("last_name", this.newProfessor.last_name);

      var config = {
        method: "post",
        url: this.endpoint,
        data: professorData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      axios(config)
        .then(() => {
          this.$emit("refresh-professors");
          this.handleToggleAdding();
        })
        .catch((error) => console.log(error));
    },
    handleToggleAdding() {
      this.$emit("toggle-adding");
      this.newProfessor = {
        first_name: "",
        last_name: "",
      };
    },
  },
};
</script>

<style>
.new-professor-form {
  display: flex;
  flex-flow: column wrap;
  height: 250px;
}
.new-professor-button {
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
}
</style>