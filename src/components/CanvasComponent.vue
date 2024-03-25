<template>
    <div ref="canvasContainer" style="border:1px solid #000000;"></div>
</template>

<script setup lang="ts">
    import p5 from 'p5';
    import { ref, onMounted } from 'vue';
    import { useCanvasStore } from '@stores/canvas'
    import { storeToRefs } from 'pinia'
    import { DrawingService, DrawInput, RulesAssociativeArr } from '@services/DrawingService';

    var p5jsCanvas: p5;
    var drawService: DrawingService;
    const canvasStore = useCanvasStore()
    const { 
        length,
        angle,
        rules,
        constants,
        iterations
    } = storeToRefs(canvasStore);

    const canvasContainer = ref(null);
    const sizeX: number = 400;
    const sizeY: number = 400;


    onMounted(() => {
        // Create p5.js sketch
        p5jsCanvas = new p5((p) => {
            p.setup = () => {
                p.createCanvas(sizeX, sizeY).parent(canvasContainer.value);
            };
        });

        let rulesArr : RulesAssociativeArr = {};
        let inputData = new DrawInput(0, 0, [], rulesArr, 0);
        drawService = new DrawingService(inputData, p5jsCanvas);
    });

    canvasStore.$subscribe((mutation, state) => {
        console.log('a change happened');
        console.log(mutation, state);

        let inputData = new DrawInput(
            iterations.value,
            angle.value,
            constants.value,
            rules.value,
            length.value
        );

        drawService.inputData = inputData;
        drawService.start();
    });
</script>

<style scoped>
#canvas {
    /* width: 100px;
    height: 100px; */
    border:1px solid #000000;
}
</style>