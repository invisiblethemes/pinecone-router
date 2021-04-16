class t{constructor(t,e,r){this.path=t,this.handler=e,this.router=r}setProps(t){this.props=t}handle(){return this.handler(this.props)}}const e={isLocation:!(!window.history.location&&!window.location),validLink(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;if(!t||"A"!==t.nodeName.toUpperCase())return!1;var e="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name;if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return!1;var r=t.getAttribute("href");return!(r&&r.indexOf("mailto:")>-1||(e?t.target.baseVal:t.target)||!e&&!this.sameOrigin(t.href))},match(t,e){let r=[],o=t.path.replace(/([:*])(\w+)/g,(t,e,o)=>(r.push(o),"([^/]+)"))+"(?:/|$)",n={},a=e.match(new RegExp(o));return null!==a&&(n=a.slice(1).reduce((t,e,o)=>(null===t&&(t={}),t[r[o]]=e,t),null)),t.setProps(n),a},toURL(t){if("function"==typeof URL&&this.isLocation)return new URL(t,window.location.toString());var e=window.document.createElement("a");return e.href=t,e},sameOrigin(t){if(!t||!this.isLocation)return!1;var e=this.toURL(t),r=window.location;return r.protocol===e.protocol&&r.hostname===e.hostname&&(r.port===e.port||""===r.port&&(80==e.port||443==e.port))},samePath(t){if(!this.isLocation)return!1;var e=window.location;return t.pathname===e.pathname&&t.search===e.search}},r={routes:[],settings:[],loading:!1,notfound:function(){console.log("Alpine Router: not found")},start(){if(!window.Alpine)throw new Error("Alpine is require for `Alpine Router` to work.");new Event("loadstarted"),new Event("loadended"),new Event("pagechanged");let t=document.querySelectorAll("[x-data][x-router]").length,r=0;Alpine.onComponentInitialized(e=>{if(e.$el.hasAttribute("x-router")){let o=e.$el.getAttribute("x-router");"string"!=typeof o&&(console.warn("Alpine Router: x-router attribute should be a string of the router name or empty for default"),o="default"),""==o&&(o="default"),Array.from(e.$el.children).forEach(t=>{t.hasAttribute("x-route")&&this.processRoute(t,e,o)}),r++,r==t&&(console.log({routerCount:t}),this.navigate(location.pathname+location.hash))}}),document.querySelectorAll("a").forEach(t=>{0!=e.validLink(t)&&t.addEventListener("click",t=>{t.preventDefault(),this.navigate(t.target.getAttribute("href"))},!1)}),window.addEventListener("popstate",t=>this.navigate(t.detail))},processRoute(e,r,o){if("template"!==e.tagName.toLowerCase())throw new Error("Alpine Router: x-route must be used on a template tag.");if(0==e.hasAttribute("x-handler"))throw new Error('Alpine Router: x-route must have a handler (x-handler="handler")');let n=e.getAttribute("x-route"),a=e.getAttribute("x-handler"),i=r.getUnobservedData()[a];if("notfound"==n)this.notfound=i;else{if(this.routes.filter(t=>this.match(t,n)).forEach(t=>{if(t.routerName==o)return!0}))throw new Error("Alpine Router: Route `${path}` is already registered on router `${routerName}`.");this.routes.push(new t(n,i,o))}},navigate(t){const e=this.routes.filter(e=>this.match(e,t));e?(history.pushState({},"",t),e.forEach(t=>t.handle())):this.notfound()}},o=window.deferLoadingAlpine||(t=>t());window.AlpineRouter=r,window.deferLoadingAlpine=function(t){window.AlpineRouter.start(),o(t)};export default r;
//# sourceMappingURL=alpine-router.module.js.map
