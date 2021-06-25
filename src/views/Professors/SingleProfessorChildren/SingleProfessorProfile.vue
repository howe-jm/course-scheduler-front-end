<template>
  <div v-if="this.professor.id" class="profile-container">
    <h3>Student Information</h3>
    <div class="profile-row">
      <span class="profile-left">Status</span
      ><span class="profile-right">{{ professorActivity }}</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Students This Semester</span
      ><span class="profile-right">{{ totalSemesterStudents }}</span>
    </div>
    <div class="profile-row">
      <span class="profile-left">Courses This Semester:</span
      ><span class="profile-right">{{ totalSemesterCourses }}</span>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: "ProfessorProfile",
  data() {
    return {
      professor: this.$parent.professor,
    };
  },
  computed: {
    professorActivity() {
      return this.totalSemesterCourses >= 4 ? "Full Time" : "Part Time";
    },
    totalSemesterStudents() {
      return this.professor.schedule.reduce(
        (acc, item) => item.student_schedule.length + acc,
        0
      );
    },
    totalSemesterCourses() {
      return this.professor.schedule.length;
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
  width: 200px;
}

.profile-right {
  width: 300px;
}
</style>