<template>
  <span v-if="!editing" class="schedule-inner">
    <p class="row">{{ course.course.course_code }}</p>
    <p class="row">{{ course.start_time }}</p>
    <p class="row">{{ course.end_time }}</p>
    <p class="row-days">{{ daysString }}</p>
    <p class="row-professor">{{ "Prof. " + course.professor.last_name }}</p>
    <p class="row">{{ course.year }}</p>
    <p class="row">{{ course.semester ? "Spring" : "Fall" }}</p>
    <p class="button-row"><button @click="handleToggleEditing">Edit</button></p>
    <p class="button-row">
      <button @click="handleDeleteCourse">Delete</button>
    </p>
  </span>
  <span v-else class="schedule-inner-editing">
    <p class="row-course-editing">
      <select
        required
        name="course"
        id="course"
        v-model="editedCourse.course_id"
      >
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.course_code }}
        </option>
      </select>
    </p>
    <p class="row-starttime-editing">
      <input
        required
        type="time"
        v-model="editedCourse.start_time"
        class="edit-time"
      />
    </p>
    <p class="row-endtime-editing">
      <input
        required
        type="time"
        v-model="editedCourse.end_time"
        class="edit-time"
      />
    </p>
    <div class="row-days-editing">
      <div>
        Monday:
        <input type="checkbox" v-model="editedCourse.monday" :value="1" />
      </div>

      <div>
        Tuesday:
        <input type="checkbox" v-model="editedCourse.tuesday" :value="1" />
      </div>

      <div>
        Wednesday:
        <input type="checkbox" v-model="editedCourse.wednesday" :value="1" />
      </div>

      <div>
        Thursday:
        <input type="checkbox" v-model="editedCourse.thursday" :value="1" />
      </div>

      <div>
        Friday:
        <input type="checkbox" v-model="editedCourse.friday" :value="1" />
      </div>
    </div>
    <p class="row-professor">
      <select
        required
        name="professor"
        id="professor"
        v-model="editedCourse.professor_id"
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
    <p class="row">
      <select required v-model="editedCourse.year">
        <option>2021</option>
        <option>2022</option>
        <option>2023</option>
      </select>
    </p>
    <div class="row-semester-editing">
      <input
        required
        type="radio"
        :id="course.id + 'fall'"
        :value="0"
        v-model="editedCourse.semester"
      />
      <label :for="course.id + 'fall'">Fall</label>
      <input
        required
        type="radio"
        :id="course.id + 'spring'"
        :value="1"
        v-model="editedCourse.semester"
      />
      <label :for="course.id + 'spring'">Spring</label>
    </div>
    <p class="button-row">
      <button @click="handleToggleEditing">Cancel</button>
    </p>
    <p class="button-row"><button @click="handleEditCourse">Submit</button></p>
  </span>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "ScheduleComponent",
  data() {
    return {
      editing: false,
      courses: [],
      professors: [],
      editedCourse: {
        course_code: this.course.course_code,
        start_time: this.course.start_time,
        end_time: this.course.end_time,
        monday: this.course.monday,
        tuesday: this.course.tuesday,
        wednesday: this.course.wednesday,
        thursday: this.course.thursday,
        friday: this.course.friday,
        year: this.course.year,
        semester: this.course.semester ? 1 : 0,
        professor_id: this.course.professor_id,
        course_id: this.course.course_id,
      },
      endpoint: "http://192.168.1.29:8765/api/",
      editEndpoint: `http://192.168.1.29:8765/api/schedule/edit/${this.course.id}`,
      deleteEndpoint: `http://192.168.1.29:8765/api/schedule/delete/${this.course.id}`,
    };
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
  methods: {
    handleToggleEditing() {
      this.editing = !this.editing;
    },
    handleEditCourse() {
      var courseData = qs.stringify({
        start_time: this.editedCourse.start_time,
        end_time: this.editedCourse.end_time,
        monday: +this.editedCourse.monday,
        tuesday: +this.editedCourse.tuesday,
        wednesday: +this.editedCourse.wednesday,
        thursday: +this.editedCourse.thursday,
        friday: +this.editedCourse.friday,
        year: this.editedCourse.year,
        semester: this.editedCourse.semester,
        professor_id: this.editedCourse.professor_id,
        course_id: this.editedCourse.course_id,
      });
      var config = {
        method: "put",
        url: this.editEndpoint,
        data: courseData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then(() => {
          this.$emit("refresh-schedule");
          this.handleToggleEditing();
        })
        .catch((error) => console.log(error));
    },
    handleDeleteCourse() {
      axios
        .delete(this.deleteEndpoint)
        .then(() => this.$emit("refresh-schedule"))
        .catch((error) => console.log(error));
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
  mounted() {
    this.getAllCourses();
    this.getAllProfessors();
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

.button-row button {
  border: none;
  font-size: 10px;
  background-color: transparent;
  padding: 0;
}

.button-row {
  width: 40px;
  outline: 1px solid black;
  background: lightgrey;
}

.schedule-inner-editing {
  display: flex;
  flex-flow: row wrap;
  height: 100px;
}

.edit-time {
  width: 71px;
  margin-left: -1px;
}

#course {
  appearance: none;
  width: 100px;
  height: 24px;
}
.row-course-editing {
  width: 75px;
  outline: 1px solid black;
}

.row-starttime-editing {
  width: 75px;
  outline: 1px solid black;
}

.row-endtime-editing {
  width: 75px;
  outline: 1px solid black;
}

.row-days-editing {
  display: flex;
  flex-flow: column wrap;
  width: 220px;
  align-items: flex-end;
  outline: 1px solid black;
  margin-left: 5px;
  margin-right: -4px;
  margin-top: -4px;
  padding-top: 4px;
  height: 95px;
}

.row-days-editing div {
  padding-left: 10px;
  margin: auto;
  margin-top: -6px;
}

.row-semester-editing {
  display: flex;
  flex-direction: column;
  width: 75px;
  outline: 1px solid black;
  margin-left: 5px;
  margin-right: -4px;
  margin-top: -4px;
  padding-top: 4px;
  height: 95px;
}

.row-semester-editing label {
  margin-top: -15px;
  margin-left: 12px;
  font-size: 16px;
}
</style>