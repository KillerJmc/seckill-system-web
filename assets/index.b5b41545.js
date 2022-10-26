import{resolveComponent as p,openBlock as d,createElementBlock as _,createVNode as h,createApp as y}from"https://esm.sh/vue@^3.2.41";import{createRouter as E,createWebHistory as v}from"https://esm.sh/vue-router@^4.1.6";import{createPinia as g}from"https://esm.sh/pinia@^2.0.23";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const L=(o,n)=>{const r=o.__vccOpts||o;for(const[s,e]of n)r[s]=e;return r},O={},P={id:"app"};function k(o,n){const r=p("router-view");return d(),_("div",P,[h(r)])}const A=L(O,[["render",k]]),R="modulepreload",C=function(o){return"/"+o},l={},u=function(n,r,s){return!r||r.length===0?n():Promise.all(r.map(e=>{if(e=C(e),e in l)return;l[e]=!0;const t=e.endsWith(".css"),c=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${c}`))return;const i=document.createElement("link");if(i.rel=t?"stylesheet":R,t||(i.as="script",i.crossOrigin=""),i.href=e,document.head.appendChild(i),t)return new Promise((m,f)=>{i.addEventListener("load",m),i.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>n())},a=E({history:v(),routes:[{path:"/",redirect:"/index"},{path:"/index",name:"\u4E3B\u9875",component:()=>u(()=>import("./HomePage.1d2825d3.js"),["assets/HomePage.1d2825d3.js","assets/HomePage.201af2b6.css","assets/customer.143a0fc3.js"])},{path:"/register",name:"\u6CE8\u518C",component:()=>u(()=>import("./RegisterPage.44de1e0b.js"),["assets/RegisterPage.44de1e0b.js","assets/RegisterPage.8e27db4f.css","assets/customer.143a0fc3.js"])},{path:"/apply",name:"\u7533\u8BF7",component:()=>u(()=>import("./ApplyPage.5e0c6909.js"),["assets/ApplyPage.5e0c6909.js","assets/ApplyPage.95b8bb58.css","assets/customer.143a0fc3.js","assets/settings.fa8ead99.js"])},{path:"/seckill",name:"\u79D2\u6740",component:()=>u(()=>import("./SeckillPage.4875c48c.js"),["assets/SeckillPage.4875c48c.js","assets/SeckillPage.7946a2c0.css","assets/customer.143a0fc3.js","assets/settings.fa8ead99.js"])}]});a.beforeEach(o=>(document.title=o.name,!0));y(A).use(a).use(g()).mount("#app");export{L as _};
