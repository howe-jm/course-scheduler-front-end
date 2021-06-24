<template>
  <div v-if="dataLoaded">
    <h2>
      {{
        student.first_name
          ? student.first_name + " " + student.last_name
          : "Loading..."
      }}
    </h2>
    <div id="student-nav">
      <router-link
        :to="{ path: `/students/${student.id}/profile` }"
        params="{student}"
        >Profile</router-link
      >
      |
      <router-link
        :to="{ path: `/students/${student.id}/schedule` }"
        params="{student}"
        >Schedule</router-link
      >
    </div>
    <router-view></router-view>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleStudent",
  data() {
    return {
      student: {},
      endpoint: `http://192.168.1.29:8765/api/students/view/${this.$route.params.id}`,
      dataLoaded: false,
    };
  },
  mounted() {
    this.getSingleStudent();
  },
  methods: {
    getSingleStudent() {
      axios
        .get(this.endpoint)
        .then((response) => (this.student = response.data))
        .then(() => (this.dataLoaded = true))
        .catch((error) => console.error(error));
    },
  },
};
</script>