<template>
  <div>
    <h3>Student Schedule</h3>
    <div
      class="schedule-component"
      v-for="scheduleComponent in student.student_schedule"
      :key="scheduleComponent.id"
    >
      <SingleStudentScheduleComponent :scheduleComponent="scheduleComponent" />
    </div>
  </div>
</template>

<script>
import SingleStudentScheduleComponent from "@/components/SingleStudentSchedule/SingleStudentScheduleComponent.vue";

export default {
  name: "SingleStudentSchedule",
  data() {
    return {
      student: this.$parent.student,
    };
  },
  components: {
    SingleStudentScheduleComponent,
  },
};
</script>