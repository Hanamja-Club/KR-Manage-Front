import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router/index.js";
import '@/assets/css/base.css'
import api from "@/plugins/api.js";
import utils from "@/plugins/utils.js";
import ui from "@/plugins/ui.js";
const app = createApp(App)
app.use(router)
app.use(api,{})
app.use(utils,{})
app.use(ui,{})
app.mount('#app')
