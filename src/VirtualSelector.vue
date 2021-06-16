<template>
  <div
    class="virtual-selector"
    :id="vsId"
  >
    <span
      class="virtual-selector__label"
      :class="{none: !label}"
    >{{ label }}</span>
    <div class="virtual-selector__input-wrapper">
      <input
        class="virtual-selector__input"
        :placeholder="placeholder"
        v-model="selected[option.itemNameKey]"
        @keyup="handleKeyup"
        @focus="handleFocus($event)"
      />
      <i class="virtual-selector__arrow">
        <svg
          viewBox="64 64 896 896"
          data-icon="down"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          class=""
        >
          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
        </svg>
      </i>
      <div
        v-if="loading"
        class="virtual-selector__loading"
      >
        <slot name="loading"></slot>
      </div>
      <RecycleScroller
        v-if="flist.length > 0"
        class="virtual-selector__scroller virtual-selector__dropdown"
        :items="flist"
        :item-size="itemSize"
        :key-field="option.itemNameKey"
        v-slot="{ item }"
      >
        <div
          class="virtual-selector__dropdown-item"
          :class="{
            'virtual-selector__dropdown-item--selected':
              item[option.itemValueKey] == selected[option.itemValueKey],
          }"
          @click="handleSelect($event, item)"
        >
          <slot
            v-if="$scopedSlots.item"
            name="item"
            :item="item"
          ></slot>
          <slot v-else>{{ item[option.itemNameKey] }}</slot>
        </div>
      </RecycleScroller>
    </div>
  </div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { debounce } from "./util";

const defaultItemPageSize = 8;
const defaultItemGap = 0;
const dropdownActiveClassName = "virtual-selector__input-wrapper--active";

export default {
  name: "VirtualSelector",
  components: { RecycleScroller },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
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
      default: () => {},
    },
  },
  data() {
    return {
      id: new Date().getTime(),
      flist: [],
      selected: {},
      itemSize: 32 + ((this.option && this.option.itemGap) || defaultItemGap),
    };
  },
  computed: {
    vsId() {
      return `virtual-selector-${this.id}`;
    },
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
          .getElementById(this.vsId)
          .querySelector(".virtual-selector__scroller").style.maxHeight =
          (this.option.itemPageSize || defaultItemPageSize) * this.itemSize +
          4 +
          "px";
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

      this.option.itemNameKey !== this.option.itemValueKey &&
        (this.selected[this.option.itemValueKey] = "");

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

      this.$emit("search", {
        id: this.vsId,
        input,
      });
    }, 300),
    handleFocus(e) {
      e.target.offsetParent.classList.toggle(dropdownActiveClassName);

      this.$emit("focus", {
        id: this.vsId,
        event: e,
      });
    },
    handleSelect(e, item) {
      this.selected = {
        ...item,
        [this.option.itemNameKey]: e.target.closest(
          ".virtual-select__dropdown-item"
        ).innerText,
      };

      this.$emit("select", {
        id: this.vsId,
        select: this.selected,
      });
    },
    handleGlobalClick(e) {
      if (e.target.className === "virtual-selector__input") return;

      Array.from(document.querySelectorAll(".virtual-selector")).forEach(
        (el) => {
          el.querySelector(".virtual-selector__input-wrapper").classList.remove(
            dropdownActiveClassName
          );
        }
      );
    },
  },
  mounted: function () {
    this.mount();
  },
  beforeDestroy: function () {
    this.unmount();
  },
};
</script>

<style scoped>
.virtual-selector {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
}

.virtual-selector__label {
  line-height: 1.5;
  font-size: 14px;
  white-space: nowrap;
  color: #333;
}

.virtual-selector__label::after {
  position: relative;
  top: -0.5px;
  content: ":";
  margin: 0 8px 0 2px;
}

.virtual-selector__label.none::after {
  display: none;
}

.virtual-selector__input-wrapper {
  position: relative;
  flex: 1;
}

.virtual-selector__input {
  display: block;
  width: 100%;
  height: 32px;
  padding: 0 34px 0 11px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: text;
}

.virtual-selector__input::placeholder,
.virtual-selector__input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.65);
}

.virtual-selector__input:hover {
  border-color: #0f48b3;
}

.virtual-selector__arrow {
  position: absolute;
  top: 10px;
  right: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  transition: transform 0.3s, -webkit-transform 0.3s;
  pointer-events: none;
}

.virtual-selector__arrow svg {
  color: rgba(0, 0, 0, 0.25);
}

.virtual-selector__loading {
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
}

.virtual-selector__input-wrapper--active input {
  border-color: #0f48b3;
  box-shadow: 0 0 0 2px rgba(15, 72, 179, 0.2);
}

.virtual-selector__input-wrapper--active .virtual-selector__arrow {
  transform: rotate(180deg);
}

.virtual-selector__input-wrapper--active .virtual-selector__dropdown {
  display: block;
}

.virtual-selector__dropdown {
  display: none;
  position: absolute;
  min-width: 100%;
  padding: 4px 0;
  margin: 5px 0 0;
  border-radius: 2px;
  box-sizing: border-box;
  line-height: 1.5;
  list-style: none;
  font-size: 14px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  outline: none;
  z-index: 1050;
  overflow-y: auto;
  transform: translateZ(0px);
}

.virtual-selector__scroller {
  max-height: 252px;
}

.virtual-selector__dropdown-item {
  display: block;
  padding: 5px 12px;
  line-height: 22px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.3s ease;
}

.virtual-selector__dropdown-item:hover {
  background-color: #dae7f2;
}

.virtual-selector__dropdown-item--selected {
  font-weight: 600;
  background-color: #fafafa;
}
</style>
