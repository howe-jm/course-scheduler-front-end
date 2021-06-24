<template>
  <div>
    <h2>
      {{
        professor.first_name
          ? professor.first_name + " " + professor.last_name
          : "Loading..."
      }}
    </h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleStudent",
  data() {
    return {
      professor: {},
      endpoint: `http://192.168.1.29:8765/api/professors/view/${this.$route.params.id}`,
    };
  },
  mounted() {
    this.getSingleStudent();
  },
  methods: {
    getSingleStudent() {
      axios
        .get(this.endpoint)
        .then((response) => (this.professor = response.data))
        .catch((error) => console.error(error));
    },
  },
};
</script>