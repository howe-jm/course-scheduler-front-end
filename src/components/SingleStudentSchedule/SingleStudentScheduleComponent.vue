<template>
  <div v-if="this.scheduleComponent" class="schedule-component-inner">
    <div class="course-name">
      {{
        scheduleComponent.schedule.course.course_code +
        ": " +
        scheduleComponent.schedule.course.subject
      }}
    </div>
    <div class="course-days">{{ daysString }}</div>
    <div class="course-times">
      {{
        scheduleComponent.schedule.start_time +
        " - " +
        scheduleComponent.schedule.end_time
      }}
    </div>
    <div class="course-professor">
      {{ "Prof. " + scheduleComponent.schedule.professor.last_name }}
    </div>
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
  computed: {
    daysString() {
      let { monday, tuesday, wednesday, thursday, friday } =
        this.scheduleComponent.schedule;
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
.course-professor {
  width: 150px;
  border-left: 1px solid black;
}
</style>