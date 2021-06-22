<template>
  <span v-if="!editing" class="schedule-inner">
    <p class="row">{{ course.course.course_code }}</p>
    <p class="row">{{ course.start_time }}</p>
    <p class="row">{{ course.end_time }}</p>
    <p class="row-days">{{ daysString }}</p>
    <p class="row-professor">{{ "Prof. " + course.professor.last_name }}</p>
    <p class="row">{{ course.year }}</p>
    <p class="row">{{ course.semester ? "Spring" : "Fall" }}</p>
  </span>
</template>

<script>
export default {
  name: "ScheduleComponent",
  data() {
    return { editing: false };
  },
  props: {
    course: Object,
  },
  computed: {
    daysString() {
      let { monday, tuesday, wednesday, thursday, friday } = this.course;
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
.schedule-inner {
  display: flex;
  flex-flow: row wrap;
}
.row {
  width: 75px;
  outline: 1px solid black;
}
.row-days {
  width: 220px;
  outline: 1px solid black;
}
.row-professor {
  width: 180px;
  outline: 1px solid black;
}

p {
  margin-top: -4px;
  margin-right: -4px;
}
</style>