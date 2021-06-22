<template>
  <div class="student">
    <h3>{{ student.first_name + " " + student.last_name }}</h3>
    <p>Major: {{ student.major }}</p>
    <button type="button" class="delete-button">Delete</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  props: {
    student: Object,
  },
};
</script>