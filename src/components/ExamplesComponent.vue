<template>
  <div
    class="example-box-wrapper"
    v-for="record in records"
    v-on:click="handleClick(record)"
  >
    <image class="example-image" :src="record.image" />
    <div class="example-name">{{ record.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useFormStore, formInput } from "@stores/form";

const formStore = useFormStore();

interface example {
  name: string;
  image: string;
  data: formInput;
}

const records: example[] = [
  {
    name: "Sierpinski triangle",
    image: "/example-sierpenski-trinagle.png",
    data: {
      iterations: 2,
      angle: 120,
      start: "F-G-G",
      rules: "F=F-G+F+G-F G=GG",
      length: 30,
      drawColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
  },
  {
    name: "Koch curve",
    image: "/example-koch-curve.png",
    data: {
      iterations: 3,
      angle: 90,
      start: "F",
      rules: "F=F+F-F-F+F",
      length: 5,
      drawColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
  },
  {
    name: "Dragon curve",
    image: "/example-dragon-curve.png",
    data: {
      iterations: 10,
      angle: 90,
      start: "F",
      rules: "F=F+G G=F-G",
      length: 5,
      drawColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
  },
  {
    name: "Fractal plant",
    image: "/example-fractal-plant.png",
    data: {
      iterations: 5,
      angle: 25,
      start: "X",
      rules: "X=F+[[X]-X]-F[-FX]+X F=FF",
      length: 2,
      drawColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
  },
];

const handleClick = (record: example) => {
  console.log("clicked on example");
  formStore.setInputData(record.data);
};
</script>
