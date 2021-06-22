<template>
  <div id="app">
    <header><h1>Class Schedule App - Vue Edition</h1></header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/students">Students</router-link> |
      <router-link to="/professors">Professors</router-link> |
      <router-link to="/courses">Courses</router-link> |
    </div>
    <router-view />
  </div>
</template>

<style>
</style>
