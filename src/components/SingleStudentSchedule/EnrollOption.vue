<template>
  <option :value="course.id">
    {{
      course.course.course_code +
      ": " +
      course.course.subject +
      " | " +
      daysString +
      " | " +
      course.start_time +
      " - " +
      course.end_time +
      " | " +
      course.professor.first_name[0] +
      ". " +
      course.professor.last_name
    }}
  </option>
</template>

<script>
export default {
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