<template>
  <div id="schedule">
    <main>
      <h2>Schedule</h2>
      <div class="schedule-list">
        <div class="schedule-legend">
          <p class="row">Course</p>
          <p class="row">Start</p>
          <p class="row">End</p>
          <p class="row-days">Days</p>
          <p class="row-professor">Professor</p>
          <p class="row">Year</p>
          <p class="row">Semester</p>
        </div>
        <div
          v-for="course in schedule"
          :key="course.id"
          class="schedule-course"
        >
          <ScheduleComponent :course="course" />
        </div>
        <NewScheduleComponent
          :addingItem="addingItem"
          @add-button="handleToggleAdding"
          @submit-schedule-item="handleSubmitScheduleItem"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

import ScheduleComponent from "@/components/ScheduleComponent/ScheduleComponent";
import NewScheduleComponent from "@/components/ScheduleComponent/NewScheduleComponent.vue";

export default {
  name: "Schedule",
  data() {
    return {
      schedule: [],
      endpoint: "http://192.168.1.29:8765/api/schedule/",
      addingItem: false,
    };
  },
  components: {
    ScheduleComponent,
    NewScheduleComponent,
  },
  created() {
    this.getSchedule();
  },
  methods: {
    getSchedule() {
      axios
        .get(this.endpoint)
        .then((response) => (this.schedule = response.data))
        .catch((error) => console.log(error));
    },
    handleToggleAdding() {
      this.addingItem = !this.addingItem;
    },
    handleSubmitScheduleItem(scheduleItem) {
      let {
        course_id,
        professor_id,
        start_time,
        end_time,
        semester,
        year,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
      } = scheduleItem;
      var itemData = qs.stringify({
        course_id,
        professor_id,
        start_time,
        end_time,
        semester,
        year,
        monday: +monday,
        tuesday: +tuesday,
        wednesday: +wednesday,
        thursday: +thursday,
        friday: +friday,
      });
      var config = {
        method: "post",
        url: `${this.endpoint}add/`,
        data: itemData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      axios(config)
        .then(() => this.getSchedule())
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style>
.schedule-list {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: auto;
  justify-content: center;
}

.schedule-legend {
  display: flex;
  flex-flow: row;
  margin: auto;
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
.schedule-legend p {
  margin-top: -4px;
  margin-right: -4px;
  font-weight: bold;
}

.schedule-course {
  display: flex;
  flex-direction: row;
  width: inherit;
  justify-content: center;
}

.add-button {
  align-self: center;
  width: 100px;
}
</style>