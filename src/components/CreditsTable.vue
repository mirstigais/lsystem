<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="tool" :label="$t('credits.table.tools')" />
    <el-table-column prop="usage" :label="$t('credits.table.usage')" />
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const viteLabel = computed(() => t('credits.table.usage.vite'));
const vueLabel = computed(() => t('credits.table.usage.vue'));
const typeScriptLabel = computed(() => t('credits.table.usage.ts'));
const elementPlusLabel = computed(() => t('credits.table.usage.element-plus'));
const githubActionsLabel = computed(() => t('credits.table.usage.github-actions'));
const githubPagesLabel = computed(() => t('credits.table.usage.github-pages'));
const githubLabel = computed(() => t('credits.table.usage.github'));
const vueRouterLabel = computed(() => t('credits.table.usage.vue-router'));
const piniaLabel = computed(() => t('credits.table.usage.pinia'));
const instructorLabel = computed(() => t('credits.table.usage.instructorjs'));

const tableData = [
  {
    tool: 'Vite',
    usage: viteLabel,
  },
  {
    tool: 'Vue 3',
    usage: vueLabel,
  },
  {
    tool: 'Typescript',
    usage: typeScriptLabel,
  },
  {
    tool: 'Element Plus',
    usage: elementPlusLabel,
  },
  {
    tool: 'Github actions',
    usage: githubActionsLabel,
  },
  {
    tool: 'Github pages',
    usage: githubPagesLabel,
  },
  {
    tool: 'Github',
    usage: githubLabel,
  },
  {
    tool: 'Vue router',
    usage: vueRouterLabel,
  },
  {
    tool: 'Pinia',
    usage: piniaLabel,
  },
  {
    tool: 'InstructorJS',
    usage: instructorLabel,
  },
]
</script>
