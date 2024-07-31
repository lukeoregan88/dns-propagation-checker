var Je=Object.defineProperty;var We=(e,t,n)=>t in e?Je(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var fe=(e,t,n)=>We(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function U(){}function je(e){return e()}function Ae(){return Object.create(null)}function Z(e){e.forEach(je)}function Be(e){return typeof e=="function"}function Ie(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Ze(e){return Object.keys(e).length===0}function u(e,t){e.appendChild(t)}function N(e,t,n){e.insertBefore(t,n||null)}function S(e){e.parentNode&&e.parentNode.removeChild(e)}function ze(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function p(e){return document.createElement(e)}function w(e){return document.createTextNode(e)}function E(){return w(" ")}function Ke(){return w("")}function Q(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function Qe(e){return function(t){return t.preventDefault(),e.call(this,t)}}function y(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Ye(e){return Array.from(e.childNodes)}function z(e,t){t=""+t,e.data!==t&&(e.data=t)}function I(e,t){e.value=t??""}function W(e,t,n,l){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,"")}function Ce(e,t,n){for(let l=0;l<e.options.length;l+=1){const o=e.options[l];if(o.__value===t){o.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function xe(e){const t=e.querySelector(":checked");return t&&t.__value}let x;function Y(e){x=e}function he(){if(!x)throw new Error("Function called outside component initialization");return x}function et(e){he().$$.on_mount.push(e)}function tt(e){he().$$.after_update.push(e)}function nt(e){he().$$.on_destroy.push(e)}const V=[],pe=[];let J=[];const Se=[],Xe=Promise.resolve();let _e=!1;function Fe(){_e||(_e=!0,Xe.then(He))}function lt(){return Fe(),Xe}function le(e){J.push(e)}const de=new Set;let G=0;function He(){if(G!==0)return;const e=x;do{try{for(;G<V.length;){const t=V[G];G++,Y(t),ot(t.$$)}}catch(t){throw V.length=0,G=0,t}for(Y(null),V.length=0,G=0;pe.length;)pe.pop()();for(let t=0;t<J.length;t+=1){const n=J[t];de.has(n)||(de.add(n),n())}J.length=0}while(V.length);for(;Se.length;)Se.pop()();_e=!1,de.clear(),Y(e)}function ot(e){if(e.fragment!==null){e.update(),Z(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(le)}}function rt(e){const t=[],n=[];J.forEach(l=>e.indexOf(l)===-1?t.push(l):n.push(l)),n.forEach(l=>l()),J=t}const ne=new Set;let H;function it(){H={r:0,c:[],p:H}}function st(){H.r||Z(H.c),H=H.p}function ee(e,t){e&&e.i&&(ne.delete(e),e.i(t))}function oe(e,t,n,l){if(e&&e.o){if(ne.has(e))return;ne.add(e),H.c.push(()=>{ne.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}function re(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Ue(e){e&&e.c()}function me(e,t,n){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),le(()=>{const r=e.$$.on_mount.map(je).filter(Be);e.$$.on_destroy?e.$$.on_destroy.push(...r):Z(r),e.$$.on_mount=[]}),o.forEach(le)}function ge(e,t){const n=e.$$;n.fragment!==null&&(rt(n.after_update),Z(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(e,t){e.$$.dirty[0]===-1&&(V.push(e),Fe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function qe(e,t,n,l,o,r,i=null,c=[-1]){const a=x;Y(e);const s=e.$$={fragment:null,ctx:[],props:r,update:U,not_equal:o,bound:Ae(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:Ae(),dirty:c,skip_bound:!1,root:t.target||a.$$.root};i&&i(s.root);let f=!1;if(s.ctx=n?n(e,t.props||{},(g,_,...m)=>{const A=m.length?m[0]:_;return s.ctx&&o(s.ctx[g],s.ctx[g]=A)&&(!s.skip_bound&&s.bound[g]&&s.bound[g](A),f&&ct(e,g)),_}):[],s.update(),f=!0,Z(s.before_update),s.fragment=l?l(s.ctx):!1,t.target){if(t.hydrate){const g=Ye(t.target);s.fragment&&s.fragment.l(g),g.forEach(S)}else s.fragment&&s.fragment.c();t.intro&&ee(e.$$.fragment),me(e,t.target,t.anchor),He()}Y(a)}class Ge{constructor(){fe(this,"$$");fe(this,"$$set")}$destroy(){ge(this,1),this.$destroy=U}$on(t,n){if(!Be(n))return U;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(t){this.$$set&&!Ze(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const at="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(at);const ut="modulepreload",ft=function(e,t){return new URL(e,t).href},$e={},dt=function(t,n,l){let o=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.all(n.map(a=>{if(a=ft(a,l),a in $e)return;$e[a]=!0;const s=a.endsWith(".css"),f=s?'[rel="stylesheet"]':"";if(!!l)for(let m=r.length-1;m>=0;m--){const A=r[m];if(A.href===a&&(!s||A.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${f}`))return;const _=document.createElement("link");if(_.rel=s?"stylesheet":ut,s||(_.as="script",_.crossOrigin=""),_.href=a,c&&_.setAttribute("nonce",c),document.head.appendChild(_),s)return new Promise((m,A)=>{_.addEventListener("load",m),_.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${a}`)))})}))}return o.then(()=>t()).catch(r=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r})};function pt(e){let t;return{c(){t=p("canvas"),W(t,"width","100%"),W(t,"height","100%"),y(t,"class","svelte-79z9hi")},m(n,l){N(n,t,l),e[2](t)},p:U,i:U,o:U,d(n){n&&S(t),e[2](null)}}}function _t(e,t,n){let{markers:l=[]}=t,o,r;const i=async()=>{const a=(await dt(async()=>{const{default:f}=await import("https://cdn.skypack.dev/cobe");return{default:f}},[],import.meta.url)).default;let s=0;r=a(o,{devicePixelRatio:2,width:400*2,height:400*2,phi:0,theta:0,dark:1,diffuse:2,scale:3,mapSamples:16e3,mapBrightness:3,baseColor:[.9,.9,.9],markerColor:[1,1,0],glowColor:[.1,.1,.1],offset:[0,0],markers:l,onRender:f=>{f.phi=s,s+=.001}})};et(()=>{i()}),tt(async()=>{l.length>0&&(r&&r.destroy(),await lt(),i())}),nt(()=>{r&&r.destroy()});function c(a){pe[a?"unshift":"push"](()=>{o=a,n(0,o)})}return e.$$set=a=>{"markers"in a&&n(1,l=a.markers)},[o,l,c]}class Ve extends Ge{constructor(t){super(),qe(this,t,_t,pt,Ie,{markers:1})}}function Ee(e,t,n){const l=e.slice();return l[19]=t[n],l[21]=n,l}function Ne(e,t,n){const l=e.slice();return l[22]=t[n],l}function ht(e){let t,n;return t=new Ve({}),{c(){Ue(t.$$.fragment)},m(l,o){me(t,l,o),n=!0},p:U,i(l){n||(ee(t.$$.fragment,l),n=!0)},o(l){oe(t.$$.fragment,l),n=!1},d(l){ge(t,l)}}}function mt(e){let t,n;return t=new Ve({props:{markers:e[7]}}),{c(){Ue(t.$$.fragment)},m(l,o){me(t,l,o),n=!0},p(l,o){const r={};o&128&&(r.markers=l[7]),t.$set(r)},i(l){n||(ee(t.$$.fragment,l),n=!0)},o(l){oe(t.$$.fragment,l),n=!1},d(l){ge(t,l)}}}function Le(e){let t,n,l;return{c(){t=p("input"),y(t,"type","text"),y(t,"placeholder","Expected Result (optional)")},m(o,r){N(o,t,r),I(t,e[2]),n||(l=Q(t,"input",e[14]),n=!0)},p(o,r){r&4&&t.value!==o[2]&&I(t,o[2])},d(o){o&&S(t),n=!1,l()}}}function Pe(e){let t;return{c(){t=p("p"),t.textContent="Checking DNS..."},m(n,l){N(n,t,l)},d(n){n&&S(t)}}}function Re(e){let t,n,l;return{c(){t=p("p"),n=w("Error: "),l=w(e[5]),W(t,"color","red")},m(o,r){N(o,t,r),u(t,n),u(t,l)},p(o,r){r&32&&z(l,o[5])},d(o){o&&S(t)}}}function Te(e){let t,n,l,o,r,i=re(e[6]),c=[];for(let a=0;a<i.length;a+=1)c[a]=Oe(Ee(e,i,a));return{c(){t=p("h2"),n=w("Results for "),l=w(e[1]),o=E(),r=p("ul");for(let a=0;a<c.length;a+=1)c[a].c()},m(a,s){N(a,t,s),u(t,n),u(t,l),N(a,o,s),N(a,r,s);for(let f=0;f<c.length;f+=1)c[f]&&c[f].m(r,null)},p(a,s){if(s&2&&z(l,a[1]),s&1089){i=re(a[6]);let f;for(f=0;f<i.length;f+=1){const g=Ee(a,i,f);c[f]?c[f].p(g,s):(c[f]=Oe(g),c[f].c(),c[f].m(r,null))}for(;f<c.length;f+=1)c[f].d(1);c.length=i.length}},d(a){a&&(S(t),S(o),S(r)),ze(c,a)}}}function gt(e){let t,n,l,o=e[19].location.region+"",r,i,c=e[19].location.country+"",a;return{c(){t=p("span"),n=p("small"),l=w("Location: "),r=w(o),i=w(", "),a=w(c),y(t,"class","location")},m(s,f){N(s,t,f),u(t,n),u(n,l),u(n,r),u(n,i),u(n,a)},p(s,f){f&64&&o!==(o=s[19].location.region+"")&&z(r,o),f&64&&c!==(c=s[19].location.country+"")&&z(a,c)},d(s){s&&S(t)}}}function bt(e){let t,n,l=e[19].location.error+"",o;return{c(){t=p("span"),n=p("small"),o=w(l),y(t,"class","location"),W(t,"color","red")},m(r,i){N(r,t,i),u(t,n),u(n,o)},p(r,i){i&64&&l!==(l=r[19].location.error+"")&&z(o,l)},d(r){r&&S(t)}}}function vt(e){let t,n=re(e[19].dnsResult),l=[];for(let o=0;o<n.length;o+=1)l[o]=De(Ne(e,n,o));return{c(){for(let o=0;o<l.length;o+=1)l[o].c();t=Ke()},m(o,r){for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(o,r);N(o,t,r)},p(o,r){if(r&1089){n=re(o[19].dnsResult);let i;for(i=0;i<n.length;i+=1){const c=Ne(o,n,i);l[i]?l[i].p(c,r):(l[i]=De(c),l[i].c(),l[i].m(t.parentNode,t))}for(;i<l.length;i+=1)l[i].d(1);l.length=n.length}},d(o){o&&S(t),ze(l,o)}}}function yt(e){let t,n=e[19].dnsResult.error+"",l;return{c(){t=p("span"),l=w(n),W(t,"color","red")},m(o,r){N(o,t,r),u(t,l)},p(o,r){r&64&&n!==(n=o[19].dnsResult.error+"")&&z(l,n)},d(o){o&&S(t)}}}function De(e){let t,n=Me(e[22],e[0])+"",l,o,r;return{c(){t=p("div"),l=w(n),o=E(),y(t,"class",r=e[10](e[22],e[0]))},m(i,c){N(i,t,c),u(t,l),u(t,o)},p(i,c){c&65&&n!==(n=Me(i[22],i[0])+"")&&z(l,n),c&65&&r!==(r=i[10](i[22],i[0]))&&y(t,"class",r)},d(i){i&&S(t)}}}function Oe(e){let t,n,l,o,r,i=e[19].server+"",c,a,s=e[19].ip+"",f,g,_,m,A,C,T;function j(d,$){return d[19].location.error?bt:gt}let D=j(e),k=D(e);function B(d,$){return d[19].dnsResult.error?yt:vt}let b=B(e),v=b(e);return{c(){t=p("li"),n=p("div"),l=p("div"),o=p("span"),r=p("strong"),c=w(i),a=w(" ("),f=w(s),g=w("):"),_=E(),k.c(),m=E(),A=p("div"),v.c(),C=E(),y(l,"class","dns"),y(n,"class","resultInner"),y(t,"class",T="fade-in "+e[10](e[19].dnsResult[0]||{},e[0])),W(t,"animation-delay",e[21]*.2+"s")},m(d,$){N(d,t,$),u(t,n),u(n,l),u(l,o),u(o,r),u(r,c),u(r,a),u(r,f),u(r,g),u(l,_),k.m(l,null),u(n,m),u(n,A),v.m(A,null),u(t,C)},p(d,$){$&64&&i!==(i=d[19].server+"")&&z(c,i),$&64&&s!==(s=d[19].ip+"")&&z(f,s),D===(D=j(d))&&k?k.p(d,$):(k.d(1),k=D(d),k&&(k.c(),k.m(l,null))),b===(b=B(d))&&v?v.p(d,$):(v.d(1),v=b(d),v&&(v.c(),v.m(A,null))),$&65&&T!==(T="fade-in "+d[10](d[19].dnsResult[0]||{},d[0]))&&y(t,"class",T)},d(d){d&&S(t),k.d(),v.d()}}}function kt(e){let t,n,l,o,r,i,c,a,s,f,g,_,m,A,C,T,j,D,k,B,b,v,d,$,F,q,be,ve,ie,se,ce,te,K,ae,ye;const ke=[mt,ht],X=[];function we(h,M){return h[8]?0:1}i=we(e),c=X[i]=ke[i](e);let L=e[4]&&Le(e),O=e[3]&&Pe(),P=e[5]&&Re(e),R=e[6].length>0&&Te(e);return{c(){t=p("main"),n=p("div"),n.innerHTML='<video class="video" autoplay="" muted="" loop="" playsinline="" src="./121470-724697516_small.mp4"></video>',l=E(),o=p("div"),r=p("div"),c.c(),a=E(),s=p("div"),f=p("h1"),f.textContent="DNS Propagation Checker",g=E(),_=p("form"),m=p("input"),A=E(),C=p("select"),T=p("option"),T.textContent="A",j=p("option"),j.textContent="AAAA",D=p("option"),D.textContent="CNAME",k=p("option"),k.textContent="MX",B=p("option"),B.textContent="NS",b=p("option"),b.textContent="TXT",v=E(),d=p("button"),d.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fa-secondary" opacity=".4" d="M192 256a64 64 0 1 0 128 0 64 64 0 1 0 -128 0z"></path><path class="fa-primary" d="M489.6 191.2c6.9-6.2 9.6-15.9 6.4-24.6c-4.4-11.9-9.7-23.3-15.8-34.3l-4.7-8.1c-6.6-11-14-21.4-22.1-31.2c-5.9-7.2-15.7-9.6-24.5-6.8l-55.7 17.7C359.8 93.6 345 85 329.2 78.4L316.7 21.3c-2-9.1-9-16.3-18.2-17.8C284.7 1.2 270.5 0 256 0s-28.7 1.2-42.5 3.5c-9.2 1.5-16.2 8.7-18.2 17.8L182.8 78.4c-15.8 6.5-30.6 15.1-44 25.4L83.1 86.1c-8.8-2.8-18.6-.3-24.5 6.8c-8.1 9.8-15.5 20.2-22.1 31.2l-4.7 8.1c-6.1 11-11.4 22.4-15.8 34.3c-3.2 8.7-.5 18.4 6.4 24.6l43.3 39.4C64.6 238.9 64 247.4 64 256s.6 17.1 1.7 25.4L22.4 320.8c-6.9 6.2-9.6 15.9-6.4 24.6c4.4 11.9 9.7 23.3 15.8 34.3l4.7 8.1c6.6 11 14 21.4 22.1 31.2c5.9 7.2 15.7 9.6 24.5 6.8l55.7-17.7c13.4 10.3 28.2 18.9 44 25.4l12.5 57.1c2 9.1 9 16.3 18.2 17.8c13.8 2.3 28 3.5 42.5 3.5s28.7-1.2 42.5-3.5c9.2-1.5 16.2-8.7 18.2-17.8l12.5-57.1c15.8-6.5 30.6-15.1 44-25.4l55.7 17.7c8.8 2.8 18.6 .3 24.5-6.8c8.1-9.8 15.5-20.2 22.1-31.2l4.7-8.1c6.1-11 11.4-22.4 15.8-34.3c3.2-8.7 .5-18.4-6.4-24.6l-43.3-39.4c1.1-8.3 1.7-16.8 1.7-25.4s-.6-17.1-1.7-25.4l43.3-39.4zM256 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"></path></svg>',$=E(),L&&L.c(),F=E(),q=p("button"),be=w("Check"),ve=E(),O&&O.c(),ie=E(),P&&P.c(),se=E(),R&&R.c(),ce=E(),te=p("footer"),te.innerHTML=`<p>Made with ❤️ by
    <a href="https://github.com/lukeoregan88" target="_blank">Luke O&#39;Regan</a> <br/> <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="lukeoregan" data-color="#FFDD00" data-emoji="" data-font="Lato" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff"><\/script> <br/></p>`,y(n,"class","background-video"),y(r,"class","div1"),y(m,"type","text"),y(m,"placeholder","Enter domain name"),m.required=!0,T.__value="A",I(T,T.__value),j.__value="AAAA",I(j,j.__value),D.__value="CNAME",I(D,D.__value),k.__value="MX",I(k,k.__value),B.__value="NS",I(B,B.__value),b.__value="TXT",I(b,b.__value),e[0]===void 0&&le(()=>e[12].call(C)),y(d,"class","expectedBtn"),y(d,"type","button"),y(q,"type","submit"),q.disabled=e[3],y(s,"class","div2"),y(o,"class","parent")},m(h,M){N(h,t,M),u(t,n),u(t,l),u(t,o),u(o,r),X[i].m(r,null),u(o,a),u(o,s),u(s,f),u(s,g),u(s,_),u(_,m),I(m,e[1]),u(_,A),u(_,C),u(C,T),u(C,j),u(C,D),u(C,k),u(C,B),u(C,b),Ce(C,e[0],!0),u(_,v),u(_,d),u(_,$),L&&L.m(_,null),u(_,F),u(_,q),u(q,be),u(s,ve),O&&O.m(s,null),u(s,ie),P&&P.m(s,null),u(s,se),R&&R.m(s,null),N(h,ce,M),N(h,te,M),K=!0,ae||(ye=[Q(m,"input",e[11]),Q(C,"change",e[12]),Q(d,"click",e[13]),Q(_,"submit",Qe(e[9]))],ae=!0)},p(h,[M]){let ue=i;i=we(h),i===ue?X[i].p(h,M):(it(),oe(X[ue],1,1,()=>{X[ue]=null}),st(),c=X[i],c?c.p(h,M):(c=X[i]=ke[i](h),c.c()),ee(c,1),c.m(r,null)),M&2&&m.value!==h[1]&&I(m,h[1]),M&1&&Ce(C,h[0]),h[4]?L?L.p(h,M):(L=Le(h),L.c(),L.m(_,F)):L&&(L.d(1),L=null),(!K||M&8)&&(q.disabled=h[3]),h[3]?O||(O=Pe(),O.c(),O.m(s,ie)):O&&(O.d(1),O=null),h[5]?P?P.p(h,M):(P=Re(h),P.c(),P.m(s,se)):P&&(P.d(1),P=null),h[6].length>0?R?R.p(h,M):(R=Te(h),R.c(),R.m(s,null)):R&&(R.d(1),R=null)},i(h){K||(ee(c),K=!0)},o(h){oe(c),K=!1},d(h){h&&(S(t),S(ce),S(te)),X[i].d(),L&&L.d(),O&&O.d(),P&&P.d(),R&&R.d(),ae=!1,Z(ye)}}}async function wt(e){try{const t=await fetch(`https://ipinfo.io/${e}/geo`);if(!t.ok)throw new Error("Failed to fetch server location");const n=await t.json(),[l,o]=n.loc.split(",").map(Number);return{...n,lat:l,lng:o}}catch(t){return{error:t.message}}}function Me(e,t){switch(t){case"A":case"AAAA":case"CNAME":return`${e.address}`;case"MX":return`${e.exchange}`;case"NS":return`${e.nameserver}`;case"TXT":return`${e}`;default:return JSON.stringify(e)}}function At(e,t,n){let l="",o="A",r="",i=!1,c=!1,a="",s=null,f=[],g=[],_=!1;const m=[{ip:"8.8.8.8",name:"Google DNS"},{ip:"1.1.1.1",name:"Cloudflare DNS"},{ip:"194.145.240.6",name:"Fivestar DNS"},{ip:"5.2.75.75",name:"AHA DNS"},{ip:"9.9.9.9",name:"Quad9 DNS"},{ip:"208.67.222.222",name:"OpenDNS"},{ip:"84.200.69.80",name:"DNS.Watch"},{ip:"8.26.56.26",name:"Comodo Secure DNS"},{ip:"195.46.39.39",name:"SafeDNS"}];async function A(){n(3,i=!0),n(5,s=null),n(6,f=[]),n(7,g=[]),n(8,_=!1),grecaptcha.ready(async()=>{a=await grecaptcha.execute("6LfJ1bsZAAAAAFZIfAjw0M8zVRnEopUxG67Bw7Sg",{action:"submit"});const v=await(await fetch("verify-recaptcha.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({token:a})})).json();v.success?await C():(console.error("reCAPTCHA verification failed",v.errors),n(5,s="reCAPTCHA verification failed"),n(3,i=!1))})}async function C(){try{const b=m.map(async v=>{const[d,$]=await Promise.all([fetch(`https://networkcalc.com/api/dns/lookup/${l}`).then(F=>F.json()).catch(F=>({error:F.message})),wt(v.ip)]);return g.push({location:[$.lat,$.lng],size:.03}),{server:v.name,ip:v.ip,dnsResult:d.records[o],location:$}});n(6,f=await Promise.all(b)),n(8,_=!0)}catch(b){n(5,s=b.message)}finally{n(3,i=!1)}}function T(b,v){if(!r)return"";let d;switch(v){case"A":case"AAAA":d=b.address;break;case"CNAME":d=b.address;break;case"MX":d=b.exchange;break;case"NS":d=b.nameserver;break;case"TXT":d=b;break;default:d=""}return d===r?"highlight-green":"highlight-red"}function j(){l=this.value,n(1,l)}function D(){o=xe(this),n(0,o)}const k=()=>n(4,c=!c);function B(){r=this.value,n(2,r)}return e.$$.update=()=>{e.$$.dirty&1&&o&&n(6,f=[])},[o,l,r,i,c,s,f,g,_,A,T,j,D,k,B]}class Ct extends Ge{constructor(t){super(),qe(this,t,At,kt,Ie,{})}}new Ct({target:document.getElementById("app")});
