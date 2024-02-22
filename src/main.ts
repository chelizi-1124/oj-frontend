import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
//权限校验
import "@/access";
import ArcoVue from "@arco-design/web-vue";

import "@arco-design/web-vue/dist/arco.css";

// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

//bytemd样式文件
import "bytemd/dist/index.css";

createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .mount("#app");
