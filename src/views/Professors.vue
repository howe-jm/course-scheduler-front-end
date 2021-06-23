<template>
  <div id="app">
    <main>
      <h2>Professors</h2>
      <div class="professor-list">
        <div
          v-for="professor in professors"
          :key="professor.id"
          class="professor"
        >
          <Professor
            :professor="professor"
            @refresh-professors="handleRefreshProfessors"
          />
        </div>
        <div class="professor">
          <NewProfessor
            :addingProfessor="addingProfessor"
            @refresh-professors="handleRefreshProfessors"
            @toggle-adding="handleToggleAdding"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var axios = require("axios");

import Professor from "@/components/Professors/Professor.vue";
import NewProfessor from "@/components/Professors/NewProfessor.vue";

export default {
  name: "Professors",
  components: {
    Professor,
    NewProfessor,
  },

  data() {
    return {
      professors: [],
      addingProfessor: false,
      endpoint: "http://192.168.1.29:8765/api/professors/",
    };
  },

  created() {
    this.getAllProfessors();
  },

  methods: {
    handleRefreshProfessors() {
      this.getAllProfessors();
    },
    handleToggleAdding() {
      this.addingProfessor = !this.addingProfessor;
    },
    getAllProfessors() {
      axios
        .get(this.endpoint)
        .then((response) => {
          this.professors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
#Professors {
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  margin-top: 60px;
}

.professor-list {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid black;
  margin: auto;
  width: fit-content;
  max-width: 864px;
}

.professor {
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  margin: 10px;
  padding: 2px;
  width: 200px;
  height: 250px;
}

.professor-inner {
  display: flex;
  flex-flow: column wrap;
  height: inherit;
}

.button-set {
  align-self: center;
  justify-self: flex-end;
  margin-top: auto;
  margin-bottom: 10px;
}

.professor,
p {
  margin: 5px;
}

.add-professor {
  display: flex;
  flex-flow: column wrap;
}
</style>
