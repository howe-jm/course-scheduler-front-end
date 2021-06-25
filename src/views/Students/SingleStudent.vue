<template>
  <div v-if="dataLoaded">
    <h2>
      {{ student.first_name + " " + student.last_name }}
    </h2>
    <div id="student-nav">
      <router-link :to="{ path: `/students/${student.id}/profile` }"
        >Profile</router-link
      >
      |
      <router-link
        :to="{ path: `/students/${student.id}/schedule` }"
        @refresh-student="refreshStudent"
        >Schedule</router-link
      >
    </div>
    <router-view />
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
import axios from "axios";
import EventBus from "@/bus/bus.js";

export default {
  name: "SingleStudent",
  components: {},
  data() {
    return {
      student: {},
      endpoint: `http://192.168.1.29:8765/api/students/view/${this.$route.params.id}`,
      dataLoaded: false,
    };
  },
  created() {
    EventBus.$on("refresh-student", this.refreshStudent);
  },
  mounted() {
    this.getSingleStudent();
  },
  methods: {
    refreshStudent() {
      this.dataLoaded = false;
      this.getSingleStudent();
    },
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