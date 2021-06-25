<template>
  <div v-if="dataLoaded">
    <h2>
      {{ professor.first_name + " " + professor.last_name }}
    </h2>
    <div id="professor-nav">
      <router-link :to="{ path: `/professors/${professor.id}/profile` }"
        >Profile</router-link
      >
      |
      <router-link :to="{ path: `/professors/${professor.id}/schedule` }"
        >Schedule</router-link
      >
    </div>
    <router-view />
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleProfessor",
  data() {
    return {
      professor: {},
      endpoint: `http://192.168.1.29:8765/api/professors/view/${this.$route.params.id}`,
      dataLoaded: false,
    };
  },
  mounted() {
    this.getSingleProfessor();
  },
  methods: {
    getSingleProfessor() {
      axios
        .get(this.endpoint)
        .then((response) => (this.professor = response.data))
        .then(() => (this.dataLoaded = true))
        .catch((error) => console.error(error));
    },
  },
};
</script>