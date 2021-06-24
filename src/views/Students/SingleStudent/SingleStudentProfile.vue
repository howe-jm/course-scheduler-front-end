<template>
  <div v-if="this.$parent.student.id">
    Major: {{ this.$parent.student.major }}
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: "SingleStudentSchedule",
  data() {
    return {
      student: this.$parent.student,
    };
  },
};
</script>