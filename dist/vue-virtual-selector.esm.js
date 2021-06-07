import Vue from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';

function debounce(fn, delay) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

//

var script = {
  name: "VirtualSelector",
  props: {
    loading: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    list: {
      type: Array,
      required: true,
    },
    /**
     * option: {
     *   itemNameKey: string,
     *   itemValueKey: string,
     *   itemPageSize: number
     *   itemGap: number
     * }
     */
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: new Date().getTime(),
      flist: [],
      selected: {},
      focused: false,
      itemSize: 32 + (this.option && this.option.itemGap) || 0,
    };
  },
  watch: {
    list: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
  methods: {
    init() {
      if (!this.list || this.list.length == 0) return;

      if (
        !this.option ||
        !this.option.itemNameKey ||
        !this.option.itemValueKey
      ) {
        throw new Error(
          'Please specify list option "itemNameKey" or "itemValueKey"'
        );
      }

      this.flist = [...this.list];

      this.$nextTick(() => {
        document
          .getElementById(`virtual-selector-${this.id}`)
          .querySelector(".virtual-selector__scroller").style.maxHeight =
          this.option.itemPageSize * this.itemSize + 4 + "px";
      });
    },
    mount() {
      document.addEventListener("click", this.handleGlobalClick, false);
    },
    unmount() {
      document.removeEventListener("click", this.handleGlobalClick, false);
    },
    handleKeyup: debounce(function () {
      const input = this.selected[this.option.itemNameKey];

      this.selected[this.option.itemValueKey] = "";

      if (!input) {
        this.flist = [...this.list];
      } else {
        this.flist = this.list.filter((item) => {
          if (item[this.option.itemNameKey] === input) {
            this.selected[this.option.itemValueKey] =
              item[this.option.itemValueKey];

            this.$emit("select", this.selected);
          }

          return item[this.option.itemNameKey].toString().includes(input);
        });
      }

      this.$emit("search", input);
    }, 200),
    handleFocus() {
      this.focused = true;
    },
    handleSelect(item) {
      this.selected = { ...item };

      this.$emit("select", this.selected);
    },
    handleGlobalClick(e) {
      if (e.target.className === "virtual-selector__input") {
        this.focused = true;
        return;
      }

      this.focused = false;
    },
  },
  mounted: function () {
    this.mount();
  },
  beforeDestroy: function () {
    this.unmount();
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "virtual-selector",
      attrs: { id: "virtual-selector-" + _vm.id }
    },
    [
      _c(
        "span",
        { staticClass: "virtual-selector__label", class: { none: !_vm.label } },
        [_vm._v(_vm._s(_vm.label))]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "virtual-selector__input-wrapper",
          class: { "virtual-selector__input-wrapper--active": _vm.focused }
        },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.selected[_vm.option.itemNameKey],
                expression: "selected[option.itemNameKey]"
              }
            ],
            staticClass: "virtual-selector__input",
            attrs: { placeholder: _vm.placeholder },
            domProps: { value: _vm.selected[_vm.option.itemNameKey] },
            on: {
              keyup: _vm.handleKeyup,
              focus: _vm.handleFocus,
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(
                  _vm.selected,
                  _vm.option.itemNameKey,
                  $event.target.value
                );
              }
            }
          }),
          _vm._v(" "),
          _c("i", { staticClass: "virtual-selector__arrow" }, [
            _c(
              "svg",
              {
                attrs: {
                  viewBox: "64 64 896 896",
                  "data-icon": "down",
                  width: "1em",
                  height: "1em",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  focusable: "false"
                }
              },
              [
                _c("path", {
                  attrs: {
                    d:
                      "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _vm.loading
            ? _c(
                "div",
                { staticClass: "virtual-selector__loading" },
                [_vm._t("default")],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.flist.length > 0
            ? _c("RecycleScroller", {
                staticClass:
                  "virtual-selector__scroller virtual-selector__dropdown",
                attrs: {
                  items: _vm.flist,
                  "item-size": _vm.itemSize,
                  "key-field": _vm.option.itemNameKey
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function(ref) {
                        var item = ref.item;
                        return [
                          _c(
                            "div",
                            {
                              staticClass: "virtual-selector__dropdown-item",
                              class: {
                                "virtual-selector__dropdown-item--selected":
                                  item[_vm.option.itemValueKey] ==
                                  _vm.selected[_vm.option.itemValueKey]
                              },
                              attrs: { title: item[_vm.option.itemNameKey] },
                              on: {
                                click: function($event) {
                                  return _vm.handleSelect(item)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n        " +
                                  _vm._s(item[_vm.option.itemNameKey]) +
                                  "\n      "
                              )
                            ]
                          )
                        ]
                      }
                    }
                  ],
                  null,
                  false,
                  1503349287
                )
              })
            : _vm._e()
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-ae32678a_0", { source: "\n.virtual-selector[data-v-ae32678a] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  box-sizing: border-box;\n}\n.virtual-selector__label[data-v-ae32678a] {\r\n  line-height: 1.5;\r\n  font-size: 14px;\r\n  white-space: nowrap;\r\n  color: #333;\n}\n.virtual-selector__label[data-v-ae32678a]::after {\r\n  position: relative;\r\n  top: -0.5px;\r\n  content: \":\";\r\n  margin: 0 8px 0 2px;\n}\n.virtual-selector__label.none[data-v-ae32678a]::after {\r\n  display: none;\n}\n.virtual-selector__input-wrapper[data-v-ae32678a] {\r\n  position: relative;\r\n  flex: 1;\n}\n.virtual-selector__input[data-v-ae32678a] {\r\n  display: block;\r\n  height: 32px;\r\n  padding: 0 34px 0 11px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 2px;\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  font-size: 14px;\r\n  box-sizing: border-box;\r\n  outline: none;\r\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\r\n  cursor: text;\n}\n.virtual-selector__input[data-v-ae32678a]::placeholder,\r\n.virtual-selector__input[data-v-ae32678a]::-webkit-input-placeholder {\r\n  color: rgba(0, 0, 0, 0.65);\n}\n.virtual-selector__input[data-v-ae32678a]:hover {\r\n  border-color: #0f48b3;\n}\n.virtual-selector__arrow[data-v-ae32678a] {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 11px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 12px;\r\n  height: 12px;\r\n  transition: transform 0.3s, -webkit-transform 0.3s;\r\n  pointer-events: none;\n}\n.virtual-selector__arrow svg[data-v-ae32678a] {\r\n  color: rgba(0, 0, 0, 0.25);\n}\n.virtual-selector__loading[data-v-ae32678a] {\r\n  position: absolute;\r\n  top: 1px;\r\n  left: 1px;\r\n  width: calc(100% - 2px);\r\n  height: 30px;\r\n  line-height: 30px;\r\n  font-size: 12px;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  background-color: #fff;\n}\n.virtual-selector__input-wrapper--active input[data-v-ae32678a] {\r\n  border-color: #0f48b3;\r\n  box-shadow: 0 0 0 2px rgba(15, 72, 179, 0.2);\n}\n.virtual-selector__input-wrapper--active .virtual-selector__arrow[data-v-ae32678a] {\r\n  transform: rotate(180deg);\n}\n.virtual-selector__input-wrapper--active .virtual-selector__dropdown[data-v-ae32678a] {\r\n  display: block;\n}\n.virtual-selector__dropdown[data-v-ae32678a] {\r\n  display: none;\r\n  position: absolute;\r\n  min-width: 100%;\r\n  padding: 4px 0;\r\n  margin: 5px 0 0;\r\n  border-radius: 2px;\r\n  box-sizing: border-box;\r\n  line-height: 1.5;\r\n  list-style: none;\r\n  font-size: 14px;\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n  outline: none;\r\n  z-index: 1050;\r\n  overflow-y: auto;\r\n  transform: translateZ(0px);\n}\n.virtual-selector__scroller[data-v-ae32678a] {\r\n  max-height: 252px;\n}\n.virtual-selector__dropdown-item[data-v-ae32678a] {\r\n  display: block;\r\n  padding: 5px 12px;\r\n  line-height: 22px;\r\n  font-weight: 400;\r\n  font-size: 14px;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  text-align: left;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  cursor: pointer;\r\n  transition: background 0.3s ease;\n}\n.virtual-selector__dropdown-item[data-v-ae32678a]:hover {\r\n  background-color: #dae7f2;\n}\n.virtual-selector__dropdown-item--selected[data-v-ae32678a] {\r\n  font-weight: 600;\r\n  background-color: #fafafa;\n}\r\n", map: {"version":3,"sources":["E:\\Workspace\\my-npm\\vue-virtual-selector\\src\\VirtualSelector.vue"],"names":[],"mappings":";AA+KA;EACA,oBAAA;EACA,mBAAA;EACA,sBAAA;AACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,mBAAA;EACA,WAAA;AACA;AAEA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,kBAAA;EACA,OAAA;AACA;AAEA;EACA,cAAA;EACA,YAAA;EACA,sBAAA;EACA,yBAAA;EACA,kBAAA;EACA,sBAAA;EACA,0BAAA;EACA,eAAA;EACA,sBAAA;EACA,aAAA;EACA,yDAAA;EACA,YAAA;AACA;AAEA;;EAEA,0BAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;EACA,kDAAA;EACA,oBAAA;AACA;AAEA;EACA,0BAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,0BAAA;EACA,sBAAA;AACA;AAEA;EACA,qBAAA;EACA,4CAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,aAAA;EACA,kBAAA;EACA,eAAA;EACA,cAAA;EACA,eAAA;EACA,kBAAA;EACA,sBAAA;EACA,gBAAA;EACA,gBAAA;EACA,eAAA;EACA,sBAAA;EACA,0BAAA;EACA,yCAAA;EACA,aAAA;EACA,aAAA;EACA,gBAAA;EACA,0BAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,cAAA;EACA,iBAAA;EACA,iBAAA;EACA,gBAAA;EACA,eAAA;EACA,0BAAA;EACA,gBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;EACA,eAAA;EACA,gCAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,yBAAA;AACA","file":"VirtualSelector.vue","sourcesContent":["<template>\r\n  <div class=\"virtual-selector\"\r\n       :id=\"`virtual-selector-${id}`\">\r\n    <span class=\"virtual-selector__label\"\r\n          :class=\"{none: !label}\">{{ label }}</span>\r\n    <div class=\"virtual-selector__input-wrapper\"\r\n         :class=\"{ 'virtual-selector__input-wrapper--active': focused }\">\r\n      <input class=\"virtual-selector__input\"\r\n             :placeholder=\"placeholder\"\r\n             v-model=\"selected[option.itemNameKey]\"\r\n             @keyup=\"handleKeyup\"\r\n             @focus=\"handleFocus\" />\r\n      <i class=\"virtual-selector__arrow\">\r\n        <svg viewBox=\"64 64 896 896\"\r\n             data-icon=\"down\"\r\n             width=\"1em\"\r\n             height=\"1em\"\r\n             fill=\"currentColor\"\r\n             aria-hidden=\"true\"\r\n             focusable=\"false\"\r\n             class=\"\">\r\n          <path d=\"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z\"></path>\r\n        </svg>\r\n      </i>\r\n      <div v-if=\"loading\"\r\n           class=\"virtual-selector__loading\">\r\n        <slot></slot>\r\n      </div>\r\n      <RecycleScroller v-if=\"flist.length > 0\"\r\n                       class=\"virtual-selector__scroller virtual-selector__dropdown\"\r\n                       :items=\"flist\"\r\n                       :item-size=\"itemSize\"\r\n                       :key-field=\"option.itemNameKey\"\r\n                       v-slot=\"{ item }\">\r\n        <div class=\"virtual-selector__dropdown-item\"\r\n             :class=\"{\r\n            'virtual-selector__dropdown-item--selected':\r\n              item[option.itemValueKey] == selected[option.itemValueKey],\r\n          }\"\r\n             :title=\"item[option.itemNameKey]\"\r\n             @click=\"handleSelect(item)\">\r\n          {{ item[option.itemNameKey] }}\r\n        </div>\r\n      </RecycleScroller>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { debounce } from \"./util\";\r\n\r\nexport default {\r\n  name: \"VirtualSelector\",\r\n  props: {\r\n    loading: {\r\n      type: Boolean,\r\n    },\r\n    label: {\r\n      type: String,\r\n    },\r\n    placeholder: {\r\n      type: String,\r\n    },\r\n    list: {\r\n      type: Array,\r\n      required: true,\r\n    },\r\n    /**\r\n     * option: {\r\n     *   itemNameKey: string,\r\n     *   itemValueKey: string,\r\n     *   itemPageSize: number\r\n     *   itemGap: number\r\n     * }\r\n     */\r\n    option: {\r\n      type: Object,\r\n      required: true,\r\n    },\r\n  },\r\n  data() {\r\n    return {\r\n      id: new Date().getTime(),\r\n      flist: [],\r\n      selected: {},\r\n      focused: false,\r\n      itemSize: 32 + (this.option && this.option.itemGap) || 0,\r\n    };\r\n  },\r\n  watch: {\r\n    list: {\r\n      immediate: true,\r\n      handler() {\r\n        this.init();\r\n      },\r\n    },\r\n  },\r\n  methods: {\r\n    init() {\r\n      if (!this.list || this.list.length == 0) return;\r\n\r\n      if (\r\n        !this.option ||\r\n        !this.option.itemNameKey ||\r\n        !this.option.itemValueKey\r\n      ) {\r\n        throw new Error(\r\n          'Please specify list option \"itemNameKey\" or \"itemValueKey\"'\r\n        );\r\n      }\r\n\r\n      this.flist = [...this.list];\r\n\r\n      this.$nextTick(() => {\r\n        document\r\n          .getElementById(`virtual-selector-${this.id}`)\r\n          .querySelector(\".virtual-selector__scroller\").style.maxHeight =\r\n          this.option.itemPageSize * this.itemSize + 4 + \"px\";\r\n      });\r\n    },\r\n    mount() {\r\n      document.addEventListener(\"click\", this.handleGlobalClick, false);\r\n    },\r\n    unmount() {\r\n      document.removeEventListener(\"click\", this.handleGlobalClick, false);\r\n    },\r\n    handleKeyup: debounce(function () {\r\n      const input = this.selected[this.option.itemNameKey];\r\n\r\n      this.selected[this.option.itemValueKey] = \"\";\r\n\r\n      if (!input) {\r\n        this.flist = [...this.list];\r\n      } else {\r\n        this.flist = this.list.filter((item) => {\r\n          if (item[this.option.itemNameKey] === input) {\r\n            this.selected[this.option.itemValueKey] =\r\n              item[this.option.itemValueKey];\r\n\r\n            this.$emit(\"select\", this.selected);\r\n          }\r\n\r\n          return item[this.option.itemNameKey].toString().includes(input);\r\n        });\r\n      }\r\n\r\n      this.$emit(\"search\", input);\r\n    }, 200),\r\n    handleFocus() {\r\n      this.focused = true;\r\n    },\r\n    handleSelect(item) {\r\n      this.selected = { ...item };\r\n\r\n      this.$emit(\"select\", this.selected);\r\n    },\r\n    handleGlobalClick(e) {\r\n      if (e.target.className === \"virtual-selector__input\") {\r\n        this.focused = true;\r\n        return;\r\n      }\r\n\r\n      this.focused = false;\r\n    },\r\n  },\r\n  mounted: function () {\r\n    this.mount();\r\n  },\r\n  beforeDestroy: function () {\r\n    this.unmount();\r\n  },\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.virtual-selector {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.virtual-selector__label {\r\n  line-height: 1.5;\r\n  font-size: 14px;\r\n  white-space: nowrap;\r\n  color: #333;\r\n}\r\n\r\n.virtual-selector__label::after {\r\n  position: relative;\r\n  top: -0.5px;\r\n  content: \":\";\r\n  margin: 0 8px 0 2px;\r\n}\r\n\r\n.virtual-selector__label.none::after {\r\n  display: none;\r\n}\r\n\r\n.virtual-selector__input-wrapper {\r\n  position: relative;\r\n  flex: 1;\r\n}\r\n\r\n.virtual-selector__input {\r\n  display: block;\r\n  height: 32px;\r\n  padding: 0 34px 0 11px;\r\n  border: 1px solid #d9d9d9;\r\n  border-radius: 2px;\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  font-size: 14px;\r\n  box-sizing: border-box;\r\n  outline: none;\r\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\r\n  cursor: text;\r\n}\r\n\r\n.virtual-selector__input::placeholder,\r\n.virtual-selector__input::-webkit-input-placeholder {\r\n  color: rgba(0, 0, 0, 0.65);\r\n}\r\n\r\n.virtual-selector__input:hover {\r\n  border-color: #0f48b3;\r\n}\r\n\r\n.virtual-selector__arrow {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 11px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 12px;\r\n  height: 12px;\r\n  transition: transform 0.3s, -webkit-transform 0.3s;\r\n  pointer-events: none;\r\n}\r\n\r\n.virtual-selector__arrow svg {\r\n  color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.virtual-selector__loading {\r\n  position: absolute;\r\n  top: 1px;\r\n  left: 1px;\r\n  width: calc(100% - 2px);\r\n  height: 30px;\r\n  line-height: 30px;\r\n  font-size: 12px;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  background-color: #fff;\r\n}\r\n\r\n.virtual-selector__input-wrapper--active input {\r\n  border-color: #0f48b3;\r\n  box-shadow: 0 0 0 2px rgba(15, 72, 179, 0.2);\r\n}\r\n\r\n.virtual-selector__input-wrapper--active .virtual-selector__arrow {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n.virtual-selector__input-wrapper--active .virtual-selector__dropdown {\r\n  display: block;\r\n}\r\n\r\n.virtual-selector__dropdown {\r\n  display: none;\r\n  position: absolute;\r\n  min-width: 100%;\r\n  padding: 4px 0;\r\n  margin: 5px 0 0;\r\n  border-radius: 2px;\r\n  box-sizing: border-box;\r\n  line-height: 1.5;\r\n  list-style: none;\r\n  font-size: 14px;\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\r\n  outline: none;\r\n  z-index: 1050;\r\n  overflow-y: auto;\r\n  transform: translateZ(0px);\r\n}\r\n\r\n.virtual-selector__scroller {\r\n  max-height: 252px;\r\n}\r\n\r\n.virtual-selector__dropdown-item {\r\n  display: block;\r\n  padding: 5px 12px;\r\n  line-height: 22px;\r\n  font-weight: 400;\r\n  font-size: 14px;\r\n  color: rgba(0, 0, 0, 0.65);\r\n  text-align: left;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  cursor: pointer;\r\n  transition: background 0.3s ease;\r\n}\r\n\r\n.virtual-selector__dropdown-item:hover {\r\n  background-color: #dae7f2;\r\n}\r\n\r\n.virtual-selector__dropdown-item--selected {\r\n  font-weight: 600;\r\n  background-color: #fafafa;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-ae32678a";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

Vue.component("RecycleScroller", RecycleScroller);

const plugin = {
  install(Vue) {
    Vue.component("virtual-selector", __vue_component__);
    Vue.component("VirtualSelector", __vue_component__);
  },
};

export default plugin;
