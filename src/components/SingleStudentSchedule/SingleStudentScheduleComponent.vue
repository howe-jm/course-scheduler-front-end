<template>
  <div v-if="this.scheduleComponent">
    {{
      scheduleComponent.schedule.course.course_code +
      ": " +
      scheduleComponent.schedule.course.subject
    }}
  </div>
  <div v-else>Schedule is loading...</div>
</template>

<script>
export default {
  props: {
    scheduleComponent: Object,
  },
  mounted() {
    console.log(this.scheduleComponent);
  },
};
</script>