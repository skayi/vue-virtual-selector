(function(e){function a(a){for(var t,o,r=a[0],l=a[1],d=a[2],f=0,j=[];f<r.length;f++)o=r[f],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&j.push(n[o][0]),n[o]=0;for(t in l)Object.prototype.hasOwnProperty.call(l,t)&&(e[t]=l[t]);i&&i(a);while(j.length)j.shift()();return c.push.apply(c,d||[]),s()}function s(){for(var e,a=0;a<c.length;a++){for(var s=c[a],t=!0,r=1;r<s.length;r++){var l=s[r];0!==n[l]&&(t=!1)}t&&(c.splice(a--,1),e=o(o.s=s[0]))}return e}var t={},n={app:0},c=[];function o(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,a,s){o.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:s})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,a){if(1&a&&(e=o(e)),8&a)return e;if(4&a&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var t in e)o.d(s,t,function(a){return e[a]}.bind(null,t));return s},o.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(a,"a",a),a},o.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=a,r=r.slice();for(var d=0;d<r.length;d++)a(r[d]);var i=l;c.push([0,"chunk-vendors"]),s()})({0:function(e,a,s){e.exports=s("56d7")},"034f":function(e,a,s){"use strict";s("85ec")},4678:function(e,a,s){var t={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var a=c(e);return s(a)}function c(e){if(!s.o(t,e)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t[e]}n.keys=function(){return Object.keys(t)},n.resolve=c,e.exports=n,n.id="4678"},"56d7":function(e,a,s){"use strict";s.r(a);s("e260"),s("e6cf"),s("cca6"),s("a79d");var t=s("2b0e"),n=s("fd30"),c=s("f23d"),o=(s("202f"),function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{attrs:{id:"app"}},[s("h2",[e._v('"SELECT" PK')]),s("div",{staticClass:"radio"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.radioVal,expression:"radioVal"}],attrs:{type:"radio",value:"o"},domProps:{checked:e._q(e.radioVal,"o")},on:{change:function(a){e.radioVal="o"}}}),e._v(" Original select ")]),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.radioVal,expression:"radioVal"}],attrs:{type:"radio",value:"a"},domProps:{checked:e._q(e.radioVal,"a")},on:{change:function(a){e.radioVal="a"}}}),e._v(" Antd select ")]),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.radioVal,expression:"radioVal"}],attrs:{type:"radio",value:"v"},domProps:{checked:e._q(e.radioVal,"v")},on:{change:function(a){e.radioVal="v"}}}),e._v(" Virtual select ")])]),s("p",[s("button",{on:{click:e.mock}},[e._v("Mock data")]),s("label",[e._v("Data length: "+e._s(e.mockData.length))])]),"o"==e.radioVal?s("select",{directives:[{name:"model",rawName:"v-model",value:e.oSelectVal,expression:"oSelectVal"}],on:{change:function(a){var s=Array.prototype.filter.call(a.target.options,(function(e){return e.selected})).map((function(e){var a="_value"in e?e._value:e.value;return a}));e.oSelectVal=a.target.multiple?s:s[0]}}},e._l(e.mockData,(function(a,t){return s("option",{key:t,domProps:{value:a.value}},[e._v(" "+e._s(a.name)+" ")])})),0):e._e(),"a"==e.radioVal?s("a-select",{staticStyle:{width:"217px"},attrs:{placeholder:"please select"},model:{value:e.antdSelectVal,callback:function(a){e.antdSelectVal=a},expression:"antdSelectVal"}},e._l(e.mockData,(function(a){return s("a-select-option",{key:a.value},[e._v(" "+e._s(a.name)+" ")])})),1):e._e(),"v"==e.radioVal?s("VirtualSelector",{attrs:{loading:e.loading,placeholder:"please select",list:e.mockData,option:e.listOption},on:{search:e.handleSearch,select:e.handleSelect}},[s("div",[e._v("loading...")])]):e._e()],1)}),r=[],l=s("96eb"),d=s.n(l),i={name:"App",data:function(){return{radioVal:"o",loading:!1,mockData:[],listOption:{itemNameKey:"name",itemValueKey:"value",itemPageSize:8,itemGap:0},oSelectVal:"",antdSelectVal:void 0}},methods:{mock:function(){var e=this;this.loading=!0,setTimeout((function(){e.mockData=d.a.mock({"list|1-20000":[{name:"@name","value|+1":1}]}).list,e.loading=!1}),3e3)},handleSearch:function(e){console.log("search:",e)},handleSelect:function(e){console.log("select:",e)}},created:function(){this.mock()}},f=i,j=(s("034f"),s("2877")),u=Object(j["a"])(f,o,r,!1,null,null,null),b=u.exports;t["a"].config.productionTip=!1,t["a"].use(n["a"]),t["a"].use(c["a"]),new t["a"]({render:function(e){return e(b)}}).$mount("#app")},"85ec":function(e,a,s){}});
//# sourceMappingURL=app.0afa3991.js.map