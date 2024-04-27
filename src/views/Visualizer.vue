<template>
    <h1>L-System visualizer</h1>
    <div class="main-content">
        <InputForm />
        <CanvasComponent/>
    </div>
    <br>
    <TableOfCharacters/>
</template>
<script setup lang="ts">
  import TableOfCharacters from '../components/TableOfCharacters.vue'
  import CanvasComponent from '../components/CanvasComponent.vue'
  import InputForm from '../components/InputForm.vue'
</script>