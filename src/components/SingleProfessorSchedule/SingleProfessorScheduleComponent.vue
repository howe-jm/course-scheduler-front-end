<template>
  <div v-if="this.scheduleComponent !== []" class="schedule-component-inner">
    <div class="course-name">
      {{
        scheduleComponent.course.course_code +
        ": " +
        scheduleComponent.course.subject
      }}
    </div>
    <div class="course-days">{{ daysString }}</div>
    <div class="course-times">
      {{ scheduleComponent.start_time + " - " + scheduleComponent.end_time }}
    </div>
    <div class="course-students">
      {{ totalStudents }}
    </div>
  </div>
  <div v-else>Schedule is loading...</div>
</template>

<script>
export default {
  name: "SingleProfessorScheduleComponent",
  props: {
    scheduleComponent: Object,
  },
  computed: {
    daysString() {
      let { monday, tuesday, wednesday, thursday, friday } =
        this.scheduleComponent;
      let daysArray = [];
      if (monday) {
        daysArray.push("Monday");
      }
      if (tuesday) {
        daysArray.push("Tuesday");
      }
      if (wednesday) {
        daysArray.push("Wednesday");
      }
      if (thursday) {
        daysArray.push("Thursday");
      }
      if (friday) {
        daysArray.push("Friday");
      }

      return daysArray.join(", ");
    },
    totalStudents() {
      return this.scheduleComponent.student_schedule.length;
    },
  },
};
</script>

<style scoped>
.schedule-component-inner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: fit-content;
  margin: auto;
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