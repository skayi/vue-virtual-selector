import vue from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import css from "rollup-plugin-css-only";

export default {
  input: "index.js",
  output: [
    {
      file: "dist/vue-virtual-selector.esm.js",
      format: "es",
    },
  ],
  external: ["vue", "vue-virtual-scroller"],
  plugins: [vue(), resolve(), css({ output: "vue-virtual-selector.min.css" })],
};
