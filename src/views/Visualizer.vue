<template>
    <h1>L-System visualizer</h1>
    <div id="mainContent">
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
<style scoped>
  #mainContent {
      display: flex;
      width: 100%
  }
</style>