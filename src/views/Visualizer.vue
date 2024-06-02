<template>
  <h1>{{ $t("header.visualizer") }}</h1>
  <div class="main-content">
    <InputForm />
    <CanvasComponent />
    <ExamplesComponent />
  </div>
  <br />
</template>
<script setup lang="ts">
import CanvasComponent from "@components/CanvasComponent.vue";
import InputForm from "@components/InputForm.vue";
import ExamplesComponent from "@components/ExamplesComponent.vue";
</script>
