<template>
  <div v-if="!this.addingCourse">
    <button @click="toggleAddingCourse">Add New Course</button>
  </div>
  <div v-else>
    <div class="button-set">
      <label for="enroll">Enroll:</label>
      <select
        required
        name="enroll"
        id="enroll"
        v-model="selectedCourse"
        size="5"
      >
        <EnrollOption
          v-for="course in availableCourses"
          :key="course.id"
          :course="course"
        />
      </select>
      <button @click="toggleAddingCourse">Cancel</button
      ><button @click="addNewCourse">Submit</button>
    </div>
  </div>
</template>

<script>
import EnrollOption from "./EnrollOption.vue";
import EventBus from "@/bus/bus.js";
import axios from "axios";
import qs from "qs";

export default {
  name: "SingleStudentEnroll",
  components: {
    EnrollOption,
  },
  data() {
    return {
      studentId: this.$parent.student.id,
      currentSchedule: this.$parent.student.student_schedule,
      mainSchedule: [],
      addEndpoint: "http://192.168.1.29:8765/api/studentschedule/add/",
      scheduleEndpoint: "http://192.168.1.29:8765/api/schedule/",
      addingCourse: false,
      selectedCourse: null,
    };
  },
  methods: {
    refreshStudent() {
      EventBus.$emit("refresh-student");
    },
    addNewCourse() {
      let schedule_id = this.selectedCourse;
      let student_id = this.studentId;

      let itemData = qs.stringify({
        schedule_id,
        student_id,
      });

      let config = {
        method: "post",
        url: this.addEndpoint,
        data: itemData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      axios(config).then(() => {
        this.toggleAddingCourse();
        this.refreshStudent();
      });
    },
    toggleAddingCourse() {
      this.addingCourse = !this.addingCourse;
    },
    getMainSchedule() {
      axios
        .get(this.scheduleEndpoint)
        .then((response) => (this.mainSchedule = response.data))
        .catch((error) => console.log(error));
    },
  },
  computed: {
    availableCourses() {
      let availableCourses = this.mainSchedule;
      for (let i = 0; i < this.mainSchedule.length; i++) {
        for (let j = 0; j < this.currentSchedule.length; j++) {
          if (this.mainSchedule[i].id === this.currentSchedule[j].schedule_id) {
            availableCourses.splice(i, 1);
          }
        }
      }
      return availableCourses;
    },
  },
  mounted() {
    this.getMainSchedule();
  },
};
</script>