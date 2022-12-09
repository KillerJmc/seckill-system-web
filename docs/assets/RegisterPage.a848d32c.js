import{defineComponent as E,onBeforeMount as w,ref as i,resolveComponent as g,openBlock as A,createElementBlock as D,createElementVNode as e,withDirectives as p,vModelText as c,withKeys as b,createTextVNode as F,createVNode as h,withCtx as x,pushScopeId as y,popScopeId as M}from"https://esm.sh/vue@^3.2.41";import{u as N,a as S,M as v}from"./settings.f6b738b6.js";import{useRouter as k}from"https://esm.sh/vue-router@^4.1.6";import{_ as I}from"./index.1a792636.js";import"https://esm.sh/pinia@^2.0.23";import"https://esm.sh/js-cookie@^3.0.1";import"https://esm.sh/axios@^1.1.2";import"https://esm.run/js-sha256@^0.9.0";const s=a=>(y("data-v-0dc47b26"),a=a(),M(),a),V={class:"main"},P={class:"register-view"},T=s(()=>e("p",{class:"title"},"\u8D26\u6237\u6CE8\u518C",-1)),U={class:"register-form"},R=s(()=>e("p",{class:"account-text"},"\u7528\u6237\u59D3\u540D",-1)),K=s(()=>e("p",{class:"id-number-text"},"\u8EAB\u4EFD\u8BC1\u53F7\u7801",-1)),L=s(()=>e("p",{class:"password-text"},"\u5BC6\u7801",-1)),W=s(()=>e("p",{class:"password-text2"},"\u786E\u8BA4\u5BC6\u7801",-1)),H=["onKeyup"],O={class:"back-text"},Y=E({__name:"RegisterPage",setup(a){const _=k(),B=N(),C=S();w(async()=>{C.verifyLogin()&&await _.push("/apply")});const r=i(""),l=i(""),o=i(""),n=i(""),m=async()=>{if(!r.value||!l.value||!o.value||!n.value){await alert(v.NAME_ID_NUM_PWD_NULL_OR_EMPTY);return}if(o.value!==n.value){await alert(v.ENTER_TWICE_PWD_MISMATCH);return}let d=await B.register({name:r.value,idNumber:l.value,password:o.value});d.code!==500&&(await alert("\u6CE8\u518C\u6210\u529F\uFF0C\u60A8\u7684\u8D26\u53F7\u4E3A\uFF1A"+d.data.account+"\uFF0C\u6B63\u5728\u4E3A\u60A8\u8DF3\u8F6C\u5230\u767B\u5F55\u754C\u9762..."),await _.push("/"))};return(d,u)=>{const f=g("router-link");return A(),D("div",V,[e("div",P,[T,e("form",U,[R,p(e("input",{"onUpdate:modelValue":u[0]||(u[0]=t=>r.value=t),type:"text",class:"account-bar",placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u771F\u5B9E\u59D3\u540D"},null,512),[[c,r.value]]),K,p(e("input",{"onUpdate:modelValue":u[1]||(u[1]=t=>l.value=t),type:"text",class:"id-number-bar",placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u8EAB\u4EFD\u8BC1\u53F7\u7801"},null,512),[[c,l.value]]),L,p(e("input",{"onUpdate:modelValue":u[2]||(u[2]=t=>o.value=t),type:"password",class:"password-bar",placeholder:"\u8BF7\u8BBE\u7F6E\u60A8\u7684\u5BC6\u7801",autocomplete:"off"},null,512),[[c,o.value]]),W,p(e("input",{"onUpdate:modelValue":u[3]||(u[3]=t=>n.value=t),onKeyup:b(m,["enter"]),type:"password",class:"password-bar2",placeholder:"\u8BF7\u518D\u6B21\u786E\u8BA4\u60A8\u7684\u5BC6\u7801",autocomplete:"off"},null,40,H),[[c,n.value]])]),e("button",{onClick:m,class:"register-button"},"\u6CE8\u518C"),e("p",O,[F(" \u5DF2\u6709\u8D26\u6237\uFF0C"),h(f,{to:"/"},{default:x(()=>[F("\u76F4\u63A5\u767B\u5F55")]),_:1})])])])}}});const $=I(Y,[["__scopeId","data-v-0dc47b26"]]);export{$ as default};
