<template>
  <span v-if="!addingItem">
    <button type="button" class="add-button" @click="handleToggleAdding">
      Add Course
    </button>
  </span>
  <form v-else class="new-schedule-item">
    <p>
      <label for="class">Class:</label>
      <select required name="class" id="class" v-model="scheduleItem.course_id">
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.course_code }}
        </option>
      </select>
    </p>
    <p>
      <label for="professor">Professor:</label>
      <select
        required
        name="professor"
        id="professor"
        v-model="scheduleItem.professor_id"
      >
        <option
          v-for="professor in professors"
          :key="professor.id"
          :value="professor.id"
        >
          {{ professor.last_name + ", " + professor.first_name }}
        </option>
      </select>
    </p>
    <p>Start: <input type="time" v-model="scheduleItem.start_time" /></p>
    <p>End: <input type="time" v-model="scheduleItem.end_time" /></p>
    <p>
      Monday: <input type="checkbox" v-model="scheduleItem.monday" :value="1" />
    </p>
    <p>
      Tuesday:
      <input type="checkbox" v-model="scheduleItem.tuesday" :value="1" />
    </p>
    <p>
      Wednesday:
      <input type="checkbox" v-model="scheduleItem.wednesday" :value="1" />
    </p>
    <p>
      Thursday:
      <input type="checkbox" v-model="scheduleItem.thursday" :value="1" />
    </p>
    <p>
      Friday: <input type="checkbox" v-model="scheduleItem.friday" :value="1" />
    </p>
    <p>
      <input
        type="radio"
        id="fall"
        :value="0"
        v-model="scheduleItem.semester"
      />
      <label for="fall">Fall</label>
      <input
        type="radio"
        id="spring"
        :value="1"
        v-model="scheduleItem.semester"
      />
      <label for="spring">Spring</label>
    </p>
    <p>
      Year:
      <input
        type="number"
        min="2021"
        max="2022"
        step="1"
        v-model="scheduleItem.year"
      />
    </p>
    <div class="button-set">
      <button type="button" @click="handleAddScheduleItem">Submit</button> |
      <button type="button" @click="handleToggleAdding">Cancel</button>
    </div>
  </form>
</template>


<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "NewScheduleComponent",
  data() {
    return {
      stuff: "",
      professors: [],
      courses: [],
      endpoint: "http://192.168.1.29:8765/api/",
      scheduleItem: {
        course_id: 1,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        professor_id: 1,
        year: "2021",
        semester: 0,
        start_time: "09:00:00",
        end_time: "11:00:00",
      },
    };
  },
  props: {
    addingItem: Boolean,
  },
  created() {
    this.getAllCourses();
    this.getAllProfessors();
  },
  methods: {
    handleAddScheduleItem() {
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
      } = this.scheduleItem;
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
        url: `${this.endpoint}schedule/add/`,
        data: itemData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      axios(config)
        .then(() => {
          this.$emit("submit-schedule-item");
          this.handleToggleAdding();
        })
        .catch((error) => console.error(error));
    },
    handleToggleAdding() {
      this.newCourse = {
        course_id: 1,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        professor_id: 1,
        year: "2021",
        semester: 0,
        start_time: "09:00:00",
        end_time: "11:00:00",
      };
      this.$emit("add-button");
    },
    getAllCourses() {
      axios
        .get(this.endpoint + "courses/")
        .then((response) => {
          this.courses = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllProfessors() {
      axios
        .get(this.endpoint + "professors/")
        .then((response) => {
          this.professors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.new-schedule-item {
  display: flex;
  flex-flow: column wrap;
  width: fit-content;
  margin: auto;
}
</style>