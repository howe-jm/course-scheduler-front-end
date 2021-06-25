<template>
  <div v-if="this.student.id" class="profile-container">
    <h3>Student Information</h3>
    <div class="profile-row">
      <span class="profile-left">Major</span
      ><span class="profile-right">{{ this.student.major }}</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Status</span
      ><span class="profile-right">{{ studentActivity }}</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Enrolled Courses</span
      ><span class="profile-right">{{ totalSemesterCourses }}</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Semester Credits</span
      ><span class="profile-right">{{ totalSemesterCredits }}</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Total Credits</span
      ><span class="profile-right">Not Yet Implemented</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Credits to Graduate</span
      ><span class="profile-right">{{ this.student.required_credits }}</span>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: "StudentSchedule",
  data() {
    return {
      student: this.$parent.student,
    };
  },
  computed: {
    totalSemesterCourses() {
      return this.student.student_schedule.length;
    },
    totalSemesterCredits() {
      return this.student.student_schedule.reduce(
        (acc, item) => acc + item.schedule.course.credit_value,
        0
      );
    },
    studentActivity() {
      let credits = this.totalSemesterCredits;
      return credits === 0
        ? "Inactive"
        : credits > 0 && credits < 12
        ? "Part-Time"
        : "Full Time";
    },
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  width: 1000px;
  align-items: center;
  margin: auto;
}
.profile-row {
  border: 1px solid black;
  display: flex;
  margin: -0.5px;
  width: 500px;
}

.profile-left {
  background: lightgrey;
  border-right: 1px solid black;
  width: 150px;
}

.profile-right {
  width: 350px;
}
</style>