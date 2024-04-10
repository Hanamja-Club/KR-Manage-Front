import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router/index.js";
import '@/assets/css/base.css'
import api from "@/plugins/api.js";
const app = createApp(App)
app.use(router)
app.use(api,{})
app.mount('#app')
