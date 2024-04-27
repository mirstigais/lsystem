<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-lsystem"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">{{ $t('menuVisualizer') }}</el-menu-item>
      <el-menu-item index="2">{{ $t('menuAbout') }}</el-menu-item>
      <el-menu-item index="3">{{ $t('menuCredits') }}</el-menu-item>
    </el-menu>
    <div class="lang-wrapper">
      <span class="lang-label">Language:</span>
      <el-select
        v-model="lang"
        placeholder="Lang"
        style="width: 100px"
        @change="handleLanguageChange"
      >
        <el-option
          v-for="item in langList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
  <div class="content-wrapper">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import { useLocaleStore } from '@stores/locale';
import { useI18n } from "vue-i18n";
import { langList } from '@plugins/locale';

const activeIndex = ref('1');
const lang = ref();
const router = useRouter();
const localeStore = useLocaleStore();
const { locale } = useI18n({ useScope: 'global' });

onMounted(() => {
  router.push({path: '/lsystem/visualizer'});
})

const handleLanguageChange = () => {
  console.log(lang.value);
  localeStore.setLocale(lang.value);
  console.log(localeStore.locale);
  // locale.value = localeStore.locale;
}

  watch(() => localeStore.locale, () => {
    console.log('locale changed');
    locale.value = localeStore.locale;
  });

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