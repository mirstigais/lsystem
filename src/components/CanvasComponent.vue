<template>
  <div class="grid-container">
    <div ref="canvasContainer" class="canvas" style="border:1px solid #000000;"></div>
    <!-- <div class="canvas-controls">
            <span>Drawing color</span>
            <el-color-picker v-model="drawColor" />
            <span>background color</span>
            <el-color-picker v-model="backgroundColor" />
            <el-button plain>Download</el-button>
        </div> -->
  </div>
</template>

<script setup lang="ts">
import p5 from 'p5';
import { ref, onMounted } from 'vue';
import { useCanvasStore } from '@stores/canvas'
import { storeToRefs } from 'pinia'
import { DrawingService, DrawInput, RulesAssociativeArr } from '@services/DrawingService';

var p5jsCanvas: p5;
var drawService: DrawingService;
const canvasStore = useCanvasStore();
const canvasContainer = ref(null);
const sizeX: number = 400;
const sizeY: number = 400;
const {
  length,
  angle,
  rules,
  start,
  iterations,
  drawColor,
  backgroundColor,
} = storeToRefs(canvasStore);

onMounted(() => {
  // drawColor.value = '#000000';
  // backgroundColor.value = '#5e5d5d';

  // Create p5.js sketch
  p5jsCanvas = new p5((p) => {
    p.setup = () => {
      p.createCanvas(sizeX, sizeY).parent(canvasContainer.value);
    };
  });

  let rulesArr: RulesAssociativeArr = {};
  let inputData = new DrawInput(0, 0, '', rulesArr, 0, backgroundColor.value, drawColor.value);
  drawService = new DrawingService(inputData, p5jsCanvas);
});

canvasStore.$subscribe((mutation, state) => {
  console.log('a change happened');
  console.log(mutation, state);

  let inputData = new DrawInput(
    iterations.value,
    angle.value,
    start.value,
    rules.value,
    length.value,
    drawColor.value,
    backgroundColor.value
  );

  drawService.inputData = inputData;
  drawService.start();
});

canvasStore.$onAction(
  ({ name }) => {
    if (name === 'saveImage') {
      p5jsCanvas.saveCanvas();
    }
  });
</script>

<style scoped>
#canvas {
  /* width: 100px;
    height: 100px; */
  border: 1px solid #000000;
}

.grid-container {
  display: grid;
  grid-template-rows: auto auto;
  /* Two rows with automatic sizing */
  grid-template-columns: 1fr;
  /* One column that takes up the full width */
  gap: 10px;
  /* Gap between grid items */
}

.canvas-controls>* {
  padding-right: 10px;
  padding-left: 10px;
}
</style>