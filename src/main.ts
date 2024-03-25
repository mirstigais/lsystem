import { createApp } from 'vue';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const store = createPinia();

createApp(App).use(store).mount('#app')
