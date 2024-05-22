<template>
  <el-popover placement="bottom" :width="400" trigger="click">
    <template #reference>
      <el-button type="info" @click='isShown = !isShown' class="toc-button"> {{ $t('button.toc') }} </el-button>
    </template>
    <div v-show='isShown'>
      <p>{{ $t('popover.toc.desc') }}</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="character" :label="$t('popover.toc.table.col.character')" width="180" />
        <el-table-column prop="description" :label="$t('popover.toc.table.col.description')" width="180" />
      </el-table>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
const isShown = ref(false);

const forward = computed(() => t('popover.toc.table.forward'));
const left = computed(() => t('popover.toc.table.left'));
const right = computed(() => t('popover.toc.table.right'));
const reverse = computed(() => t('popover.toc.table.reverse'));
const push = computed(() => t('popover.toc.table.push'));
const pop = computed(() => t('popover.toc.table.pop'));

defineProps<{
  key?: number
}>();

interface Record {
  character: string
  description: string
}

const tableData: Record[] = [
  {
    character: 'F, G',
    description: forward.value,
  },
  {
    character: '+',
    description: left.value,
  },
  {
    character: '-',
    description: right.value,
  },
  {
    character: '|',
    description: reverse.value,
  },
  {
    character: '[',
    description: push.value,
  },
  {
    character: ']',
    description: pop.value,
  },
]
</script>