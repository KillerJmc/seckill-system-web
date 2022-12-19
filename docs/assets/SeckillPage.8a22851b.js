import{u as O,b as L,a as M,M as S}from"./settings.64aa56c1.js";import{d as A,r as u,q as N,s as b,c as k,t as h,x as D,h as g,o as R,y as x,a as e,i as w,l as P,n as B,z as U,u as V,p as z,j as G,_ as H}from"./index.cc104bdd.js";const K=A({__name:"CountDown",props:{remainTime:{type:Number,default:0}},emits:["count-down-end"],setup(v,{emit:c}){const _=v,s=u(0),a=u(0),t=u(0),r=u(0);N(()=>{if(_.remainTime>0){s.value=Math.floor(_.remainTime/3600),a.value=Math.floor(_.remainTime/60%60),t.value=Math.floor(_.remainTime%60),m();return}c("count-down-end")});const m=()=>{clearInterval(r.value),r.value=setInterval(()=>{s.value===0?a.value!==0&&t.value===0?(t.value=59,a.value-=1):a.value===0&&t.value===0?(t.value=0,c("count-down-end"),clearInterval(r.value)):t.value-=1:a.value!==0&&t.value===0?(t.value=59,a.value-=1):a.value===0&&t.value===0?(s.value-=1,a.value=59,t.value=59):t.value-=1},1e3)},i=p=>p<10?"0"+p:""+p,f=b(()=>i(s.value)),n=b(()=>i(a.value)),y=b(()=>i(t.value));return(p,E)=>(g(),k("span",null,h(D(f)+":"+D(n)+":"+D(y)),1))}}),l=v=>(z("data-v-5fbdd2b5"),v=v(),G(),v),j={class:"header"},q=l(()=>e("div",{class:"left-block"},null,-1)),$=l(()=>e("div",{class:"title"},[e("p",null,"Lingyuangou")],-1)),J=l(()=>e("div",{class:"right-block"},null,-1)),Q={class:"account-bar"},W=l(()=>e("div",{class:"account-info"},null,-1)),X={class:"account-name"},Y={class:"content"},Z={key:0,class:"seckill-form"},ee={class:"information"},te=l(()=>e("br",null,null,-1)),ae=l(()=>e("br",null,null,-1)),se={class:"time"},oe={class:"button-view"},ne={key:1,class:"seckill-success-form"},ue=l(()=>e("div",{class:"order-info-title"},"\u8BA2\u5355\u4FE1\u606F",-1)),le={class:"order-info"},ce=l(()=>e("br",null,null,-1)),re=A({__name:"SeckillPage",setup(v){const c=V(),_=O(),s=L(),a=M();R(async()=>{a.verifyLogin()||(alert(S.NOT_LOGGED_ON),await c.push("/"));let o=await _.getInfo(),d=await s.getCurrent();if((o.code!==200||d.code!==200)&&await c.push("/"),t.value=o.data,r.value=d.data,!t.value.applied){console.warn("\u7528\u6237\u672A\u7533\u8BF7\u6D3B\u52A8\uFF01"),await c.push("/apply");return}n.remainSeconds=(await s.getCountDown()).data,n.display=!0;let F=setInterval(async()=>{if(n.end){let C=await s.getSeckillUrl();C.code===200&&(m.value=C.data,console.log("\u83B7\u53D6\u5230\u79D2\u6740\u94FE\u63A5\uFF1A"+m.value),clearInterval(F))}},1e3)});const t=u({}),r=u({product:{},rule:{}}),m=u(""),i=u(!1),f=u({}),n=x({remainSeconds:0,display:!1,end:!0}),y=b(()=>m.value!==""&&n.end),p=async()=>{if(!y.value){await alert(S.SECKILL_NOT_STARTED);return}let o=await s.seckill(m.value);if(o.code===500&&(alert(o.message),o.message!==S.PURCHASE_REPEAT))return;o.code===200&&await alert(S.SECKILL_SUCCESS);let d=await s.getOrder();if(d.code===500)return;const{putOrderSuccess:F}=d.data;if(!F){await alert(S.PUT_ORDER_FAILED);return}f.value=d.data,i.value=!0},E=async()=>{let o=await s.pay(f.value.orderId);if(o.code===500){await alert(o.message);return}await alert(S.PURCHASE_SUCCESS)},I=()=>{n.end=!0},T=async()=>{await a.logout(),await c.push("/")};return(o,d)=>(g(),k("div",null,[e("div",j,[q,$,J,e("div",Q,[W,e("div",X,h(t.value.name),1),e("div",{class:"log-out",onClick:T},"\u9000\u51FA\u767B\u5F55")])]),e("div",Y,[i.value?B("",!0):(g(),k("div",Z,[e("div",ee,[w(h(r.value.product.name)+" ",1),te,ae,w(" \u5E93\u5B58\u603B\u91CF\uFF1A"+h(r.value.amount)+"\u4EFD ",1)]),e("div",se,[w(" \u6D3B\u52A8\u5012\u8BA1\u65F6: "),n.display?(g(),P(K,{key:0,"remain-time":n.remainSeconds,onCountDownEnd:I},null,8,["remain-time"])):B("",!0)]),e("div",oe,[e("button",{onClick:p,class:U({"enter-button":!0,disabled:!D(y)})},"\u79D2\u6740",2)])])),i.value?(g(),k("div",ne,[ue,e("div",le,[w(" \u8BA2\u5355\u7F16\u53F7\uFF1A"+h(f.value.orderId),1),ce,w(" \u8BA2\u5355\u91D1\u989D\uFF1A"+h(f.value.money)+"\u5143 ",1)]),e("div",{class:"button-view"},[e("button",{onClick:E,class:"enter-button"},"\u4ED8\u6B3E")])])):B("",!0)])]))}});const ve=H(re,[["__scopeId","data-v-5fbdd2b5"]]);export{ve as default};
