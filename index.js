import Vue from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VirtualSelector from "./src/VirtualSelector.vue";

Vue.component("RecycleScroller", RecycleScroller);

const plugin = {
  install(Vue) {
    Vue.component("virtual-selector", VirtualSelector);
    Vue.component("VirtualSelector", VirtualSelector);
  },
};

export default plugin;
