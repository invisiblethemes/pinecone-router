class t{constructor(t,e,r){this.path=t,this.handler=e,this.router=r}setProps(t){this.props=t}handle(){return this.handler({props:this.props,path:this.path})}}class e{constructor(t,e){this.name=t,this.settings=e}}const r={isLocation:!(!window.history.location&&!window.location),validLink(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;if(!t||"A"!==t.nodeName.toUpperCase())return!1;var e="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name;if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return!1;var r=t.getAttribute("href");return!(r&&r.indexOf("mailto:")>-1||(e?t.target.baseVal:t.target)||!e&&!this.sameOrigin(t.href))},match(t,e){let r=[],o=t.path.replace(/([:^#])(\w+)/g,(t,e,o)=>(r.push(o),"([^/]+)"))+"(?:/|$)",n={},a=e.match(new RegExp(o));return null!==a&&(n=a.slice(1).reduce((t,e,o)=>(null===t&&(t={}),t[r[o]]=e,t),null)),t.setProps(n),a},toURL(t){if("function"==typeof URL&&this.isLocation)return new URL(t,window.location.toString());var e=window.document.createElement("a");return e.href=t,e},sameOrigin(t){if(!t||!this.isLocation)return!1;var e=this.toURL(t),r=window.location;return r.protocol===e.protocol&&r.hostname===e.hostname&&(r.port===e.port||""===r.port&&(80==e.port||443==e.port))},samePath(t){if(!this.isLocation)return!1;var e=window.location;return t.pathname===e.pathname&&t.search===e.search},detectRouterSettings(t){let e={};return t.hasAttribute("x-base")&&(e.base=t.getAttribute("x-base")),e.hash=t.hasAttribute("x-hash"),e}},o={routes:[],hashroutes:[],routers:[],settings:{interceptLinks:!0,basepath:"/"},loaded:!1,hasHashRouter:!1,notfound:function(t){console.error(`Alpine Router: requested path ${t} was not found`)},start(){if(!window.Alpine)throw new Error("Alpine is require for `Alpine Router` to work.");this.routerloaded=new Event("routerloaded"),this.loadstart=new Event("loadstart"),this.loadend=new Event("loadend"),this.loadend=new Event("hashchanged");let t=document.querySelectorAll("[x-data][x-router]").length,o=0;Alpine.onComponentInitialized(n=>{if(n.$el.hasAttribute("x-router")){let a=n.$el.getAttribute("x-router");if("string"!=typeof a&&(console.warn("Alpine Router: x-router attribute should be a string of the router name or empty for default"),a="default"),""==a&&(a="default",n.$el.setAttribute("x-router",a)),this.routers.findIndex(t=>t.name==a)>-1)throw new Error(`Alpine Router: A router with the name ${a} already exist. Use a different name by setting the attribute x-router to another value`);"string"!=typeof a&&(console.warn("Alpine Router: x-router attribute should be a string of the router name or empty for default"),a="default");let i=r.detectRouterSettings(n.$el);i.hash&&!this.hasHashRouter&&(this.hasHashRouter=!0,window.onhashchange=t=>{this.navigate(window.location.hash.substring(1),!0)}),Array.from(n.$el.children).forEach(t=>{t.hasAttribute("x-route")&&this.processRoute(t,n,a,i)}),this.routers.push(new e(a,i)),o++,o==t&&(this.navigate(location.pathname),this.hasHashRouter&&window.location.hash.length&&this.navigate(window.location.hash.substring(1),!0),this.loaded=!0,window.dispatchEvent(this.routerloaded))}}),this.settings.interceptLinks?document.querySelectorAll("a").forEach(t=>{0!=r.validLink(t)&&t.addEventListener("click",t=>{t.preventDefault();let e=t.target.getAttribute("href");this.navigate(e,0==e.indexOf("#"))},!1)}):document.querySelectorAll("a[x-link]").forEach(t=>{t.addEventListener("click",t=>{t.preventDefault();let e=t.target.getAttribute("x-link");this.navigate(e,0==e.indexOf("#"))},!1)}),window.addEventListener("popstate",t=>{this.navigate(window.location.hash,!0,!0),this.navigate(window.location.pathname,!1,!0)})},processRoute(e,o,n,a){if("template"!==e.tagName.toLowerCase())throw new Error("Alpine Router: x-route must be used on a template tag.");if(0==e.hasAttribute("x-handler"))throw new Error('Alpine Router: x-route must have a handler (x-handler="handler")');let i=e.getAttribute("x-route");if("string"!=typeof i)throw new Error(`Alpine Router: x-route must be a string, ${typeof i} given.`);if(-1!=i.indexOf("#"))throw new Error("Alpine Router: A route path may not have a hash, setting x-hash on the router is sufficient.");let s,h=e.getAttribute("x-handler");try{s=o.getUnobservedData()[h]}catch(t){throw new Error("Alpine Router: "+t)}if("function"!=typeof s)throw new Error(`Alpine Router: handler must be a callback function, ${typeof s} given.`);if("notfound"==i)this.notfound=s;else if("/"!=this.settings.basepath&&(i=basepath+i),null!=a.base&&(i=a.base+i),a.hash){if(1==this.hashroutes.filter(t=>r.match(t,i)).forEach(t=>{if(t.router==n)return!0}))throw new Error("Alpine Router: HashRoute `${path}` is already registered on router `${routerName}`.");this.hashroutes.push(new t(i,s,n))}else{if(1==this.routes.filter(t=>r.match(t,i)).forEach(t=>{if(t.router==n)return!0}))throw new Error("Alpine Router: Route `${path}` is already registered on router `${routerName}`.");this.routes.push(new t(i,s,n))}},navigate(t,e=!1,o=!1){window.dispatchEvent(this.loadstart);const n=this.routes.filter(o=>e?o.router.settings.hash&&r.match(o,t):r.match(o,t));if(0==n.length&&this.notfound(t),!o){let r;r=e?window.location.pathname+t:t+window.location.hash,history.pushState({path:r},"",r)}n.forEach(t=>{t.handle()}),e&&window.dispatchEvent(this.hashchanged),window.dispatchEvent(this.loadend)}},n=window.deferLoadingAlpine||(t=>t());window.AlpineRouter=o,window.deferLoadingAlpine=function(t){window.AlpineRouter.start(),n(t)},module.exports=o;
//# sourceMappingURL=alpine-router.js.map
