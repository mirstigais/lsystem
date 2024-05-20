import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';
import router from './plugins/router';

const store = createPinia();
const app = createApp(App);
app.use(store);

import { i18n } from '@plugins/locale';

app.use(ElementPlus);
app.use(router);
app.use(i18n);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
