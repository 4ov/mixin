!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("zod"),require("cross-fetch")):"function"==typeof define&&define.amd?define(["zod","cross-fetch"],e):(t||self).microz=e(t.zod,t.crossFetch)}(this,function(t,e){function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=/*#__PURE__*/r(e),o=t.z.object({name:t.z.string(),args:t.z.any().array()}),i=o.extend({type:t.z.literal("single")}),u=t.z.object({type:t.z.literal("group"),content:o.array()}),c=t.z.object({status:t.z.literal("fulfilled"),value:t.z.any()}),a=t.z.object({status:t.z.literal("rejected"),reason:t.z.any()}),s=c.or(a),f=s,l=s.array();f.or(l),i.or(u);var p=t.z.object({name:t.z.string(),message:t.z.string(),cause:t.z.any().optional(),stack:t.z.string().optional()});function y(t){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},y(t)}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function h(t,e,r){return h=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct.bind():function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&d(o,r.prototype),o},h.apply(null,arguments)}function g(t){var e="function"==typeof Map?new Map:void 0;return g=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return h(t,arguments,y(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),d(r,t)},g(t)}var b=/*#__PURE__*/function(){function t(t,e,r){this.url=void 0,this.fnName=void 0,this.fnArgs=void 0,this.url=t,this.fnName=e,this.fnArgs=r}var e=t.prototype;return e.single=function(){try{var t=this;try{return Promise.resolve(n.default(t.url,{method:"POST",body:JSON.stringify({type:"single",name:t.fnName,args:t.fnArgs}),headers:{"Content-Type":"application/json"}}).then(function(t){return t.json()}).then(function(t){return f.safeParse(t)}).then(function(t){if(t.success)return t.data;throw new Error("bad Response")}).then(function(t){if("fulfilled"===t.status)return t.value;throw function(t){var e=p.safeParse(t);if(e.success){var r=e.data;return new(/*#__PURE__*/function(t){var e,n;function o(){for(var e,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))||this).name=r.name,e.message=r.message,e.cause=r.cause,e.stack=r.stack,e}return n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,d(e,n),o}(/*#__PURE__*/g(Error)))}return new Error(t)}(t.reason)}))}catch(t){throw new Error("bad Response")}}catch(t){return Promise.reject(t)}},e.then=function(t,e){return this.single().then(t,e)},t}();return function(t,e){var r=new Proxy({},{get:function(t,r,n){if("$"===r)throw new Error("not implemented");return function(){try{var t=arguments;return Promise.resolve(new b(e,r.toString(),[].slice.call(t)))}catch(t){return Promise.reject(t)}}}});return r}});
//# sourceMappingURL=client.umd.js.map