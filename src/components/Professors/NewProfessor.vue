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
  <div v-else class="new-professor-form">
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
export default {
  name: "Professor",
  data() {
    return {
      newProfessor: {
        first_name: "",
        last_name: "",
      },
    };
  },
  props: {
    addingProfessor: Boolean,
    method: { type: Function },
  },
  methods: {
    handleAddProfessor() {
      this.$emit("add-professor", this.newProfessor);
      this.handleToggleAdding();
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