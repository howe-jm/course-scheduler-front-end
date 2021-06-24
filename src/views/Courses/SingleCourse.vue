<template>
  <div>
    <h2>
      {{
        course.course_code
          ? course.course_code + " " + course.subject
          : "Loading..."
      }}
    </h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleCourse",
  data() {
    return {
      course: {},
      endpoint: `http://192.168.1.29:8765/api/courses/view/${this.$route.params.id}`,
    };
  },
  mounted() {
    this.getSingleCourse();
  },
  methods: {
    getSingleCourse() {
      axios
        .get(this.endpoint)
        .then((response) => (this.course = response.data))
        .catch((error) => console.error(error));
    },
  },
};
</script>