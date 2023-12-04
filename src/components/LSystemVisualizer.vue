<template>
    <h1>L-System visualizer</h1>
    <div id="mainContent">
        <InputForm  @form-submitted="handleFormSubmitted"/>
        <CanvasComponent/>
    </div>
    <br>
    <TableOfCharacters/>
</template>
<script setup lang="ts">
    import TableOfCharacters from '../components/TableOfCharacters.vue'
    import CanvasComponent from '../components/CanvasComponent.vue'
    import InputForm from '../components/InputForm.vue'

    const handleFormSubmitted = (formData: any) => {
        console.log('Form submitted in parent component:', formData);
        // Handle the form data in the parent component
    }
</script>
<style scoped>
    #mainContent {
        display: flex;
        width: 100%
    }
</style>