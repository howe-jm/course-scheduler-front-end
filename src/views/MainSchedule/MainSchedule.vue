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
          <p class="button-row">Controls</p>
        </div>
        <div
          v-for="course in schedule"
          :key="course.id"
          class="schedule-course"
        >
          <ScheduleComponent
            :course="course"
            @refresh-schedule="refreshSchedule"
          />
        </div>
        <NewScheduleComponent
          :addingItem="addingItem"
          @add-button="handleToggleAdding"
          @submit-schedule-item="refreshSchedule"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

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
    refreshSchedule() {
      this.getSchedule();
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
.button-row {
  width: 81px;
  outline: 1px solid black;
  background: lightgrey;
}
</style>