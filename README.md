# vue-virtual-selector

[![npm](https://img.shields.io/npm/v/vue-virtual-selector.svg) ![npm](https://img.shields.io/npm/dm/vue-virtual-selector.svg)](https://www.npmjs.com/package/vue-virtual-selector)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

⚡️ Blazing fast scrolling for any amount of data (based on : [Akryum/vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller))

![normal](https://raw.githubusercontent.com/skayi/vue-virtual-selector/master/img/normal-and-actived.jpg)

Demo : <a href="https://codesandbox.io/s/vue-virtual-selector-60sds" target="_blank">Select PK</a>

# Installation

```
npm install --save vue-virtual-selector
```

## Import

Install the component :

```javascript
import Vue from "vue";
import VueVirtualSelector from "vue-virtual-selector";

Vue.use(VueVirtualSelector);
```

# Usage

Basic usage

```javascript
<VirtualSelector
  :list="list"
  :option="listOption">
</VirtualSelector>
```

or

```javascript
<virtual-selector
  :list="list"
  :option="listOption">
</virtual-selector>
```

using all props, events and slots

```javascript
<virtual-selector
  :loading="loading"
  label="virtual selector"
  placeholder="please select"
  v-model="selected"
  :list="list"
  :option="listOption"
  @focus="handleFocus"
  @search="handleSearch"
  @select="handleSelect">
  <div slot="loading">loading...</div>
  <div slot="item" slot-scope="{ item }">
    {{ item.name }}
  </div>
</virtual-selector>
. . .
<script>
export default {
  data() {
    return {
      loading: false,
	  selected: {},
      list: [],
      listOption: {
        itemNameKey: "name",
        itemValueKey: "value",
        itemPageSize: 8,
        itemGap: 5,
      },
    };
  },
  methods: {
    handleFocus( { id, focus } ) {
      console.log("focus : ", focus);
    },
    handleSearch( { id, search } ) {
      console.log("search : ", search);
    },
    handleSelect( { id, select } ) {
      console.log("select : ", select);
    },
  },
}
</script>
```

"list" data example :

```javascript
[
  {
    name: "aaa",
    value: "1",
  },
  {
    name: "bbb",
    value: "2",
  },
  {
    name: "ccc",
    value: "3",
  },
];
```

In this example, "itemNameKey" of "listOption" is "name", "itemValueKey" of "listOption" is "value", which are specifing dropdown item display and value.

If you want to select a value by default, `selected` data should be assigned like below

```javascript
this.selected = { name: "aaa", value: "1" };
```

## Props

- `v-model (Object)` : vue directive, to create two-way data bindings.
- `list (Array)` : list of items display in the selector dropdown.
- `label (String)` : when you want to show what the selector is, give this option.
- `placeholder (String)` : input element's placeholder.
- `loading (Boolean)` : this option works with slot.
- `option (Object)` : this option use with `list` prop, and contain some properties.
  - `itemNameKey (String)` : specify selector dropdown item display.
  - `itemValueKey (String)` : specify selector dropdown item value.
  - `itemPageSize (Number)` : specify how many items display in the dropdown box (default is 8).
  - `itemGap (Number)` : specify interval between the items (default is 0).

## Events

- `focus` : emitted when the input focused.
- `search` : emitted when the input changed.
- `select` : emitted when the dropdown item is selected.

Every event callback function will get a emitted data, which is object type, contain component id and event data named with event name.

## Slots

You can set `loading` like below

```javascript
<virtual-selector>
  <div slot="loading">loading...</div>
</virtual-selector>
```

The display effect is as follows :

![loading](https://raw.githubusercontent.com/skayi/vue-virtual-selector/master/img/loading.jpg)

Usually, we need to customize the selector dropdown item. for this purpose, there is `item` slot to use.

```javascript
<virtual-selector>
  <div slot="item" slot-scope="{ item }">
    {{ item.name }} ({{ item.value }})
  </div>
</virtual-selector>
```

In this case, if you want to select a value by default, and display with the customize pattern, please complete this job at `selected` name (itemNameKey) property.

For example, customized selector dropdown item like this "aaa (1)", "bbb (2)", "ccc (3)" (under the above list data example). the default setted value display should be like this.

```javascript
this.selected = { name: "aaa (1)", value: "1" };
```
