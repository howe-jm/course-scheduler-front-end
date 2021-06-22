<template>
  <div id="professors">
    <main>
      <h2>Professors</h2>
      <div class="professor-list">
        <div
          v-for="professor in professors"
          class="professor"
          :key="professor.id"
        >
          <h3>{{ professor.first_name + " " + professor.last_name }}</h3>
          <button
            type="button"
            class="delete-button"
            @click="deleteProfessor()"
          >
            Delete
          </button>
        </div>
        <div class="add-professor">
          <form class="add-professor-form">
            <p>
              First Name:
              <input
                name="first_name"
                type="text"
                v-model="newProfessor.first_name"
              />
            </p>
            <p>
              Last Name:
              <input
                name="last_name"
                type="text"
                v-model="newProfessor.last_name"
              />
            </p>
            <button type="button" @click="addNewProfessor">Submit</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var axios = require("axios");
var FormData = require("form-data");

export default {
  name: "Professors",
  data() {
    return {
      professors: [],
      newProfessor: {
        first_name: "",
        last_name: "",
      },
      endpoint: "http://192.168.1.29:8765/api/professors/",
    };
  },

  created() {
    this.getAllProfessors();
  },

  methods: {
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
    addNewProfessor() {
      let { newProfessor } = this;
      var professorData = new FormData();
      professorData.append("first_name", newProfessor.first_name);
      professorData.append("last_name", newProfessor.last_name);

      var config = {
        method: "post",
        url: "http://192.168.1.29:8765/api/professors/add/",
        data: professorData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      console.log(config);

      axios(config)
        .then(() => {
          this.newProfessor = {
            first_name: "",
            last_name: "",
          };
        })
        .then(() => this.getAllProfessors())
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
#app {
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  margin-top: 60px;
}
.professor-list {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid black;
  max-width: 904px;
  margin: auto;
}
.delete-button {
  align-self: center;
  justify-self: flex-end;
  margin-top: auto;
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
.add-professor {
  display: flex;
  flex-flow: column wrap;
  border: 1px solid black;
  margin: 10px;
  padding: 2px;
  width: 200px;
  height: 250px;
}
</style>
