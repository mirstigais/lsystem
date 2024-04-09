<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">Visualizer</el-menu-item>
    <el-menu-item index="2">About L-systems</el-menu-item>
    <el-menu-item index="3">Credits</el-menu-item>
  </el-menu>
  <router-view/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, RouterView } from 'vue-router'

const activeIndex = ref('1');
const router = useRouter();

onMounted(() => {
  router.push({path: '/lsystem/visualizer'});
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  switch(key) {
    case '1': {
      router.push({path: '/lsystem/visualizer'});
      break;
    }
    case '2': {
      router.push({path: '/lsystem/about'});
      break;
    } 
    case '3': {
      router.push({path: '/lsystem/credits'});
      break;
    }
  }
}
</script>