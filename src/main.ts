import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';
import router from './plugins/router';

const store = createPinia();
const app = createApp(App);
app.use(store);

import { i18n } from '@plugins/locale';
// import { useLocaleStore } from './stores/locale';
// const localeStore = useLocaleStore();

// localeStore.$subscribe(() => {
//   // i18n.locale = 
// });
app.use(ElementPlus);
app.use(router);
app.use(i18n);

app.mount('#app')
