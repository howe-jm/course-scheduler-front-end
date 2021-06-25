<template>
  <div>
    <h3>Professor Schedule</h3>
    <div class="schedule-component-container">
      <div class="schedule-component-inner-table">
        <div class="course-name">Subject</div>
        <div class="course-days">Days</div>
        <div class="course-times">Hours</div>
        <div class="course-students">Students</div>
      </div>
      <div
        class="schedule-component-outer"
        v-for="scheduleComponent in professor.schedule"
        :key="scheduleComponent.id"
      >
        <SingleProfessorScheduleComponent
          :scheduleComponent="scheduleComponent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProfessorScheduleComponent from "@/components/SingleProfessorSchedule/SingleProfessorScheduleComponent.vue";

export default {
  name: "ProfessorSchedule",
  data() {
    return {
      professor: this.$parent.professor,
    };
  },
  components: {
    SingleProfessorScheduleComponent,
  },
};
</script>

<style scoped>
.schedule-component-container {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: auto;
}
.scheule-component-outer {
  display: flex;
  flex-direction: column;
}

.schedule-component-inner-table {
  display: flex;
  font-weight: bold;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
  width: fit-content;
  margin: auto;
  background-color: lightgrey;
}
.course-name {
  border-right: 1px solid black;
  width: 350px;
}
.course-days {
  width: 200px;
}
.course-times {
  width: 150px;
  border-left: 1px solid black;
}
.course-students {
  width: 70px;
  border-left: 1px solid black;
}
</style>