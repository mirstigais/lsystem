import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';

// import 'bootstrap/dist/css/bootstrap.css';

const store = createPinia();
const app = createApp(App);

app.use(store);
app.use(ElementPlus);

app.mount('#app')
