<template>
  <div>
    <h2>
      {{
        student.first_name
          ? student.first_name + " " + student.last_name
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
      student: {},
      endpoint: `http://192.168.1.29:8765/api/students/view/${this.$route.params.id}`,
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
        .catch((error) => console.error(error));
    },
  },
};
</script>