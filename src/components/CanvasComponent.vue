<script setup>
    import { ref, onMounted } from 'vue';

    defineProps({
        iterations: Number,
        angle: Number,
        constants: String,
        axoim: String,
        length: Number
    })

    // Use onMounted hook instead of mounted
    onMounted(() => {
      var canvas = document.getElementById('canvas');

      if (canvas.getContext) 
        {
            var context = canvas.getContext('2d');
            // Reset the current path
            context.beginPath();
            // Staring point (10,45)
            context.moveTo(10,45);
            // End point (180,47)
            context.lineTo(180,47);
            // Make the line visible
            context.stroke();
        };
      // Always check for properties and methods to ensure your code works across different browsers
    })
</script>

<template>
    <canvas id="canvas" style="border:1px solid #000000;"></canvas>
</template>

<style scoped>
#canvas {
    /* width: 100px;
    height: 100px; */
    border:1px solid #000000;
}
</style>