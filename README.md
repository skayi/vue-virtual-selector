# vue-virtual-selector

[![npm](https://img.shields.io/npm/v/vue-virtual-selector.svg) ![npm](https://img.shields.io/npm/dm/vue-virtual-selector.svg)](https://www.npmjs.com/package/vue-virtual-selector)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

⚡️ Blazing fast scrolling for any amount of data (based on : [Akryum/vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller))

![normal](https://raw.githubusercontent.com/skayi/vue-virtual-selector/master/img/normal-and-actived.jpg)

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

using all props, events and loading slot

```javascript
<virtual-selector
	:loading="loading"
	label="virtual selector"
	placeholder="please select"
	:list="list"
	:option="listOption"
	@search="handleSearch"
	@select="handleSelect">
	<div>loading...</div>
</virtual-selector>
. . .
<script>
export default {
	data() {
		return {
			loading: false,
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
		handleSearch(query) {
			console.log("search : ", query);
		},
		handleSelect(item) {
			console.log("select : ", item);
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

## Props

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

- `search` : emitted when the input changed.
- `select` : emitted when the dropdown item is selected.

## Slot

You can provide loading between `<virtual-selector></virtual-selector>`, like below

```javascript
<virtual-selector>
  <div>loading...</div>
</virtual-selector>
```

The display effect is as follows :

![loading](https://raw.githubusercontent.com/skayi/vue-virtual-selector/master/img/loading.jpg)
