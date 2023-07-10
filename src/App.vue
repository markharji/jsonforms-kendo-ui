<template>
  <div class="card">
    <profile-form />
  </div>
</template>

<script lang="ts">
import ProfileForm from "./components/ProfileForm.vue";
import "@progress/kendo-theme-default/dist/all.css";

export default {
  name: "App",
  components: {
    ProfileForm,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.card {
  padding: 20px 40px 40px 40px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}
</style>
