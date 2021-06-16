import VirtualSelector from "./src/VirtualSelector.vue";

const plugin = {
  install(Vue) {
    Vue.component("virtual-selector", VirtualSelector);
    Vue.component("VirtualSelector", VirtualSelector);
  },
};

export default plugin;
