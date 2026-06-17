!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).basicLightbox=e()}}((function(){return function e(n,t,o){function r(c,u){if(!t[c]){if(!n[c]){var s="function"==typeof require&&require;if(!u&&s)return s(c,!0);if(i)return i(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[c]={exports:{}};n[c][0].call(l.exports,(function(e){return r(n[c][1][e]||e)}),l,l.exports,e,n,t,o)}return t[c].exports}for(var i="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.visible=void 0;var o=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},r=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.visible=i;t.create=function(e,n){var t=function(e,n){var t=o('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=t.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var c=r(i,"IMG"),u=r(i,"VIDEO"),s=r(i,"IFRAME");return!0===c&&t.classList.add("basicLightbox--img"),!0===u&&t.classList.add("basicLightbox--video"),!0===s&&t.classList.add("basicLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==1;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),c=function(e){return!1!==n.onClose(u)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),n()}),410),!0}(t,(function(){if("function"==typeof e)return e(u)}))};!0===n.closable&&t.addEventListener("click",(function(e){e.target===t&&c()}));var u={element:function(){return t},visible:function(){return i(t)},show:function(e){return!1!==n.onShow(u)&&function(e,n){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),n()}))}),10),!0}(t,(function(){if("function"==typeof e)return e(u)}))},close:c};return u}},{}]},{},[1])(1)}));
/* MIT https://github.com/fabiospampinato/cash */
(function(){
'use strict';var e={"class":"className",contenteditable:"contentEditable","for":"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};function aa(a,b){try{return a(b)}catch(c){return b}}
var k=document,m=window,ba=k.documentElement,n=k.createElement.bind(k),ca=n("div"),p=n("table"),da=n("tbody"),ea=n("tr"),q=Array.isArray,r=Array.prototype,fa=r.concat,t=r.filter,ha=r.indexOf,ia=r.map,ja=r.push,ka=r.slice,u=r.some,la=r.splice,ma=/^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,na=/^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,oa=/<.+>/,pa=/^\w+$/;function v(a,b){return a&&(w(b)||x(b))?na.test(a)?b.getElementsByClassName(a.slice(1)):pa.test(a)?b.getElementsByTagName(a):b.querySelectorAll(a):[]}
var B=function(){function a(a,c){if(a){if(a instanceof B)return a;var b=a;if(C(a)){if(b=(c instanceof B?c[0]:c)||k,b=ma.test(a)?b.getElementById(a.slice(1)):oa.test(a)?qa(a):v(a,b),!b)return}else if(D(a))return this.ready(a);if(b.nodeType||b===m)b=[b];this.length=b.length;a=0;for(c=this.length;a<c;a++)this[a]=b[a]}}a.prototype.init=function(b,c){return new a(b,c)};return a}(),E=B.prototype,F=E.init;F.fn=F.prototype=E;E.length=0;E.splice=la;"function"===typeof Symbol&&(E[Symbol.iterator]=r[Symbol.iterator]);
E.map=function(a){return F(fa.apply([],ia.call(this,function(b,c){return a.call(b,c,b)})))};E.slice=function(a,b){return F(ka.call(this,a,b))};var ra=/-([a-z])/g;function G(a){return a.replace(ra,function(a,c){return c.toUpperCase()})}F.guid=1;function sa(a,b){var c=a&&(a.matches||a.webkitMatchesSelector||a.msMatchesSelector);return!!c&&!!b&&c.call(a,b)}function H(a){return!!a&&a===a.window}function w(a){return!!a&&9===a.nodeType}function x(a){return!!a&&1===a.nodeType}
function D(a){return"function"===typeof a}function C(a){return"string"===typeof a}function ta(a){return!isNaN(parseFloat(a))&&isFinite(a)}function I(a){if("object"!==typeof a||null===a)return!1;a=Object.getPrototypeOf(a);return null===a||a===Object.prototype}F.isWindow=H;F.isFunction=D;F.isArray=q;F.isNumeric=ta;F.isPlainObject=I;E.get=function(a){if(void 0===a)return ka.call(this);a=Number(a);return this[0>a?a+this.length:a]};E.eq=function(a){return F(this.get(a))};E.first=function(){return this.eq(0)};
E.last=function(){return this.eq(-1)};function J(a,b,c){if(c)for(c=a.length;c--&&!1!==b.call(a[c],c,a[c]););else if(I(a)){var d=Object.keys(a);c=0;for(var h=d.length;c<h;c++){var f=d[c];if(!1===b.call(a[f],f,a[f]))break}}else for(c=0,h=a.length;c<h&&!1!==b.call(a[c],c,a[c]);c++);return a}F.each=J;E.each=function(a){return J(this,a)};E.prop=function(a,b){if(a){if(C(a))return a=e[a]||a,2>arguments.length?this[0]&&this[0][a]:this.each(function(c,h){h[a]=b});for(var c in a)this.prop(c,a[c]);return this}};
E.removeProp=function(a){return this.each(function(b,c){delete c[e[a]||a]})};function K(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];b="boolean"===typeof a[0]?a.shift():!1;var c=a.shift(),d=a.length;if(!c)return{};if(!d)return K(b,F,c);for(var h=0;h<d;h++){var f=a[h],g;for(g in f)b&&(q(f[g])||I(f[g]))?(c[g]&&c[g].constructor===f[g].constructor||(c[g]=new f[g].constructor),K(b,c[g],f[g])):c[g]=f[g]}return c}F.extend=K;E.extend=function(a){return K(E,a)};
function L(a){return C(a)?function(b,c){return sa(c,a)}:D(a)?a:a instanceof B?function(b,c){return a.is(c)}:a?function(b,c){return c===a}:function(){return!1}}E.filter=function(a){var b=L(a);return F(t.call(this,function(a,d){return b.call(a,d,a)}))};function M(a,b){return b?a.filter(b):a}var ua=/\S+/g;function N(a){return C(a)?a.match(ua)||[]:[]}E.hasClass=function(a){return!!a&&u.call(this,function(b){return x(b)&&b.classList.contains(a)})};
E.removeAttr=function(a){var b=N(a);return this.each(function(a,d){x(d)&&J(b,function(a,b){d.removeAttribute(b)})})};E.attr=function(a,b){if(a){if(C(a)){if(2>arguments.length){if(!this[0]||!x(this[0]))return;var c=this[0].getAttribute(a);return null===c?void 0:c}return void 0===b?this:null===b?this.removeAttr(a):this.each(function(c,h){x(h)&&h.setAttribute(a,b)})}for(c in a)this.attr(c,a[c]);return this}};
E.toggleClass=function(a,b){var c=N(a),d=void 0!==b;return this.each(function(a,f){x(f)&&J(c,function(a,c){d?b?f.classList.add(c):f.classList.remove(c):f.classList.toggle(c)})})};E.addClass=function(a){return this.toggleClass(a,!0)};E.removeClass=function(a){return arguments.length?this.toggleClass(a,!1):this.attr("class","")};
function O(a,b,c,d){for(var h=[],f=D(b),g=d&&L(d),y=0,z=a.length;y<z;y++)if(f){var l=b(a[y]);l.length&&ja.apply(h,l)}else for(l=a[y][b];!(null==l||d&&g(-1,l));)h.push(l),l=c?l[b]:null;return h}function P(a){return 1<a.length?t.call(a,function(a,c,d){return ha.call(d,a)===c}):a}F.unique=P;E.add=function(a,b){return F(P(this.get().concat(F(a,b).get())))};function Q(a,b,c){if(x(a)){var d=m.getComputedStyle(a,null);return c?d.getPropertyValue(b)||void 0:d[b]||a.style[b]}}
function R(a,b){return parseInt(Q(a,b),10)||0}var S=/^--/,T={},va=ca.style,wa=["webkit","moz","ms"];function xa(a,b){void 0===b&&(b=S.test(a));if(b)return a;if(!T[a]){b=G(a);var c=""+b[0].toUpperCase()+b.slice(1);b=(b+" "+wa.join(c+" ")+c).split(" ");J(b,function(b,c){if(c in va)return T[a]=c,!1})}return T[a]}
var ya={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function za(a,b,c){void 0===c&&(c=S.test(a));return c||ya[a]||!ta(b)?b:b+"px"}
E.css=function(a,b){if(C(a)){var c=S.test(a);a=xa(a,c);if(2>arguments.length)return this[0]&&Q(this[0],a,c);if(!a)return this;b=za(a,b,c);return this.each(function(d,f){x(f)&&(c?f.style.setProperty(a,b):f.style[a]=b)})}for(var d in a)this.css(d,a[d]);return this};var Aa=/^\s+|\s+$/;function Ba(a,b){a=a.dataset[b]||a.dataset[G(b)];return Aa.test(a)?a:aa(JSON.parse,a)}
E.data=function(a,b){if(!a){if(!this[0])return;var c={},d;for(d in this[0].dataset)c[d]=Ba(this[0],d);return c}if(C(a))return 2>arguments.length?this[0]&&Ba(this[0],a):void 0===b?this:this.each(function(c,d){c=b;c=aa(JSON.stringify,c);d.dataset[G(a)]=c});for(d in a)this.data(d,a[d]);return this};function Ca(a,b){var c=a.documentElement;return Math.max(a.body["scroll"+b],c["scroll"+b],a.body["offset"+b],c["offset"+b],c["client"+b])}
function Da(a,b){return R(a,"border"+(b?"Left":"Top")+"Width")+R(a,"padding"+(b?"Left":"Top"))+R(a,"padding"+(b?"Right":"Bottom"))+R(a,"border"+(b?"Right":"Bottom")+"Width")}
J([!0,!1],function(a,b){J(["Width","Height"],function(a,d){E[(b?"outer":"inner")+d]=function(c){if(this[0])return H(this[0])?b?this[0]["inner"+d]:this[0].document.documentElement["client"+d]:w(this[0])?Ca(this[0],d):this[0][(b?"offset":"client")+d]+(c&&b?R(this[0],"margin"+(a?"Top":"Left"))+R(this[0],"margin"+(a?"Bottom":"Right")):0)}})});
J(["Width","Height"],function(a,b){var c=b.toLowerCase();E[c]=function(d){if(!this[0])return void 0===d?void 0:this;if(!arguments.length)return H(this[0])?this[0].document.documentElement["client"+b]:w(this[0])?Ca(this[0],b):this[0].getBoundingClientRect()[c]-Da(this[0],!a);var h=parseInt(d,10);return this.each(function(b,d){x(d)&&(b=Q(d,"boxSizing"),d.style[c]=za(c,h+("border-box"===b?Da(d,!a):0)))})}});var U={};
E.toggle=function(a){return this.each(function(b,c){if(x(c))if(void 0===a?"none"===Q(c,"display"):a){if(c.style.display=c.___cd||"","none"===Q(c,"display")){b=c.style;c=c.tagName;if(U[c])c=U[c];else{var d=n(c);k.body.insertBefore(d,null);var h=Q(d,"display");k.body.removeChild(d);c=U[c]="none"!==h?h:"block"}b.display=c}}else c.___cd=Q(c,"display"),c.style.display="none"})};E.hide=function(){return this.toggle(!1)};E.show=function(){return this.toggle(!0)};
function Ea(a,b){return!b||!u.call(b,function(b){return 0>a.indexOf(b)})}var V={focus:"focusin",blur:"focusout"},W={mouseenter:"mouseover",mouseleave:"mouseout"},Fa=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function Ga(a,b,c,d,h){var f=a.___ce=a.___ce||{};f[b]=f[b]||[];f[b].push([c,d,h]);a.addEventListener(b,h)}function X(a){a=a.split(".");return[a[0],a.slice(1).sort()]}
function Y(a,b,c,d,h){var f=a.___ce=a.___ce||{};if(b)f[b]&&(f[b]=f[b].filter(function(f){var g=f[0],z=f[1];f=f[2];if(h&&f.guid!==h.guid||!Ea(g,c)||d&&d!==z)return!0;a.removeEventListener(b,f)}));else for(b in f)Y(a,b,c,d,h)}
E.off=function(a,b,c){var d=this;if(void 0===a)this.each(function(a,b){(x(b)||w(b)||H(b))&&Y(b)});else if(C(a))D(b)&&(c=b,b=""),J(N(a),function(a,h){a=X(h);h=a[0];var f=a[1],g=W[h]||V[h]||h;d.each(function(a,d){(x(d)||w(d)||H(d))&&Y(d,g,f,b,c)})});else for(var h in a)this.off(h,a[h]);return this};
E.on=function(a,b,c,d,h){var f=this;if(!C(a)){for(var g in a)this.on(g,b,c,a[g],h);return this}C(b)||(void 0!==b&&null!==b&&(void 0!==c&&(d=c),c=b),b="");D(d)||(d=c,c=void 0);if(!d)return this;J(N(a),function(a,g){a=X(g);g=a[0];var l=a[1],z=W[g]||V[g]||g,y=g in W,Ka=g in V;z&&f.each(function(a,f){if(x(f)||w(f)||H(f))a=function La(a){if(a.target["___i"+a.type])return a.stopImmediatePropagation();if(!a.namespace||Ea(l,a.namespace.split(".")))if(b||!(Ka&&(a.target!==f||a.___ot===z)||y&&a.relatedTarget&&
f.contains(a.relatedTarget))){var g=f;if(b){for(var A=a.target;!sa(A,b);){if(A===f)return;A=A.parentNode;if(!A)return}g=A;a.___cd=!0}a.___cd&&Object.defineProperty(a,"currentTarget",{configurable:!0,get:function(){return g}});Object.defineProperty(a,"data",{configurable:!0,get:function(){return c}});A=d.call(g,a,a.___td);h&&Y(f,z,l,b,La);!1===A&&(a.preventDefault(),a.stopPropagation())}},a.guid=d.guid=d.guid||F.guid++,Ga(f,z,l,b,a)})});return this};E.one=function(a,b,c,d){return this.on(a,b,c,d,!0)};
E.ready=function(a){function b(){return setTimeout(a,0,F)}"loading"!==k.readyState?b():k.addEventListener("DOMContentLoaded",b);return this};E.trigger=function(a,b){if(C(a)){var c=X(a),d=c[0];c=c[1];var h=W[d]||V[d]||d;if(!h)return this;var f=Fa.test(h)?"MouseEvents":"HTMLEvents";a=k.createEvent(f);a.initEvent(h,!0,!0);a.namespace=c.join(".");a.___ot=d}a.___td=b;var g=a.___ot in V;return this.each(function(b,c){g&&D(c[a.___ot])&&(c["___i"+a.type]=!0,c[a.___ot](),c["___i"+a.type]=!1);c.dispatchEvent(a)})};
function Ha(a){return a.multiple&&a.options?O(t.call(a.options,function(a){return a.selected&&!a.disabled&&!a.parentNode.disabled}),"value"):a.value||""}var Ia=/%20/g,Ja=/\r?\n/g,Ma=/file|reset|submit|button|image/i,Na=/radio|checkbox/i;
E.serialize=function(){var a="";this.each(function(b,c){J(c.elements||[c],function(b,c){c.disabled||!c.name||"FIELDSET"===c.tagName||Ma.test(c.type)||Na.test(c.type)&&!c.checked||(b=Ha(c),void 0!==b&&(b=q(b)?b:[b],J(b,function(b,d){b=a;d="&"+encodeURIComponent(c.name)+"="+encodeURIComponent(d.replace(Ja,"\r\n")).replace(Ia,"+");a=b+d})))})});return a.slice(1)};
E.val=function(a){return arguments.length?this.each(function(b,c){if((b=c.multiple&&c.options)||Na.test(c.type)){var d=q(a)?ia.call(a,String):null===a?[]:[String(a)];b?J(c.options,function(a,b){b.selected=0<=d.indexOf(b.value)},!0):c.checked=0<=d.indexOf(c.value)}else c.value=void 0===a||null===a?"":a}):this[0]&&Ha(this[0])};E.clone=function(){return this.map(function(a,b){return b.cloneNode(!0)})};E.detach=function(a){M(this,a).each(function(a,c){c.parentNode&&c.parentNode.removeChild(c)});return this};
var Oa=/^\s*<(\w+)[^>]*>/,Pa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,Qa={"*":ca,tr:da,td:ea,th:ea,thead:p,tbody:p,tfoot:p};function qa(a){if(!C(a))return[];if(Pa.test(a))return[n(RegExp.$1)];var b=Oa.test(a)&&RegExp.$1;b=Qa[b]||Qa["*"];b.innerHTML=a;return F(b.childNodes).detach().get()}F.parseHTML=qa;E.empty=function(){return this.each(function(a,b){for(;b.firstChild;)b.removeChild(b.firstChild)})};
E.html=function(a){return arguments.length?void 0===a?this:this.each(function(b,c){x(c)&&(c.innerHTML=a)}):this[0]&&this[0].innerHTML};E.remove=function(a){M(this,a).detach().off();return this};E.text=function(a){return void 0===a?this[0]?this[0].textContent:"":this.each(function(b,c){x(c)&&(c.textContent=a)})};E.unwrap=function(){this.parent().each(function(a,b){"BODY"!==b.tagName&&(a=F(b),a.replaceWith(a.children()))});return this};
E.offset=function(){var a=this[0];if(a)return a=a.getBoundingClientRect(),{top:a.top+m.pageYOffset,left:a.left+m.pageXOffset}};E.offsetParent=function(){return this.map(function(a,b){for(a=b.offsetParent;a&&"static"===Q(a,"position");)a=a.offsetParent;return a||ba})};
E.position=function(){var a=this[0];if(a){var b="fixed"===Q(a,"position"),c=b?a.getBoundingClientRect():this.offset();if(!b){var d=a.ownerDocument;for(b=a.offsetParent||d.documentElement;(b===d.body||b===d.documentElement)&&"static"===Q(b,"position");)b=b.parentNode;b!==a&&x(b)&&(d=F(b).offset(),c.top-=d.top+R(b,"borderTopWidth"),c.left-=d.left+R(b,"borderLeftWidth"))}return{top:c.top-R(a,"marginTop"),left:c.left-R(a,"marginLeft")}}};
E.children=function(a){return M(F(P(O(this,function(a){return a.children}))),a)};E.contents=function(){return F(P(O(this,function(a){return"IFRAME"===a.tagName?[a.contentDocument]:"TEMPLATE"===a.tagName?a.content.childNodes:a.childNodes})))};E.find=function(a){return F(P(O(this,function(b){return v(a,b)})))};var Ra=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Sa=/^$|^module$|\/(java|ecma)script/i,Ta=["type","src","nonce","noModule"];
function Ua(a,b){a=F(a);a.filter("script").add(a.find("script")).each(function(a,d){if(Sa.test(d.type)&&ba.contains(d)){var c=n("script");c.text=d.textContent.replace(Ra,"");J(Ta,function(a,b){d[b]&&(c[b]=d[b])});b.head.insertBefore(c,null);b.head.removeChild(c)}})}
function Z(a,b,c,d,h,f,g,y){J(a,function(a,f){J(F(f),function(a,f){J(F(b),function(b,g){var l=c?g:f;b=c?a:b;g=c?f:g;l=b?l.cloneNode(!0):l;b=!b;h?g.insertBefore(l,d?g.firstChild:null):g.parentNode.insertBefore(l,d?g:g.nextSibling);b&&Ua(l,g.ownerDocument)},y)},g)},f);return b}E.after=function(){return Z(arguments,this,!1,!1,!1,!0,!0)};E.append=function(){return Z(arguments,this,!1,!1,!0)};E.appendTo=function(a){return Z(arguments,this,!0,!1,!0)};E.before=function(){return Z(arguments,this,!1,!0)};
E.insertAfter=function(a){return Z(arguments,this,!0,!1,!1,!1,!1,!0)};E.insertBefore=function(a){return Z(arguments,this,!0,!0)};E.prepend=function(){return Z(arguments,this,!1,!0,!0,!0,!0)};E.prependTo=function(a){return Z(arguments,this,!0,!0,!0,!1,!1,!0)};E.replaceWith=function(a){return this.before(a).remove()};E.replaceAll=function(a){F(a).replaceWith(this);return this};E.wrapAll=function(a){a=F(a);for(var b=a[0];b.children.length;)b=b.firstElementChild;this.first().before(a);return this.appendTo(b)};
E.wrap=function(a){return this.each(function(b,c){var d=F(a)[0];F(c).wrapAll(b?d.cloneNode(!0):d)})};E.wrapInner=function(a){return this.each(function(b,c){b=F(c);c=b.contents();c.length?c.wrapAll(a):b.append(a)})};E.has=function(a){var b=C(a)?function(b,d){return v(a,d).length}:function(b,d){return d.contains(a)};return this.filter(b)};E.is=function(a){var b=L(a);return u.call(this,function(a,d){return b.call(a,d,a)})};E.next=function(a,b,c){return M(F(P(O(this,"nextElementSibling",b,c))),a)};
E.nextAll=function(a){return this.next(a,!0)};E.nextUntil=function(a,b){return this.next(b,!0,a)};E.not=function(a){var b=L(a);return this.filter(function(c,d){return(!C(a)||x(d))&&!b.call(d,c,d)})};E.parent=function(a){return M(F(P(O(this,"parentNode"))),a)};E.index=function(a){var b=a?F(a)[0]:this[0];a=a?this:F(b).parent().children();return ha.call(a,b)};E.closest=function(a){var b=this.filter(a);if(b.length)return b;var c=this.parent();return c.length?c.closest(a):b};
E.parents=function(a,b){return M(F(P(O(this,"parentElement",!0,b))),a)};E.parentsUntil=function(a,b){return this.parents(b,a)};E.prev=function(a,b,c){return M(F(P(O(this,"previousElementSibling",b,c))),a)};E.prevAll=function(a){return this.prev(a,!0)};E.prevUntil=function(a,b){return this.prev(b,!0,a)};E.siblings=function(a){return M(F(P(O(this,function(a){return F(a).parent().children().not(a)}))),a)};"undefined"!==typeof exports?module.exports=F:m.cash=m.$=F;
})();
/*!
 * Flickity PACKAGED v2.2.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/cell',[
      'get-size/get-size',
    ], function( getSize ) {
      return factory( window, getSize );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
        window,
        window.getSize
    );
  }

}( window, function factory( window, getSize ) {



function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-hidden', 'true' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
  this.element.removeAttribute('aria-hidden');
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

/**
 * @param {Integer} shift - 0, 1, or -1
 */
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

} ) );

// slide
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/slide',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( function( cell ) {
    cell.select();
  } );
};

proto.unselect = function() {
  this.cells.forEach( function( cell ) {
    cell.unselect();
  } );
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  } );
};

return Slide;

} ) );

// animate
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/animate',[
      'fizzy-ui-utils/utils',
    ], function( utils ) {
      return factory( window, utils );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
        window,
        window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {



// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    } );
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x -= this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var translateX = this.getPositionValue( x );
  // use 3D transforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
};

proto.dispatchScrollEvent = function() {
  var firstSlide = this.slides[0];
  if ( !firstSlide ) {
    return;
  }
  var positionX = -this.x - firstSlide.target;
  var progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 ) + '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  var isResting = !this.isPointerDown &&
      Math.round( this.x * 100 ) == Math.round( previousX * 100 );
  if ( isResting ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i = 0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i = 0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

} ) );

// Flickity main
/* eslint-disable max-params */
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/flickity',[
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate',
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('ev-emitter'),
        require('get-size'),
        require('fizzy-ui-utils'),
        require('./cell'),
        require('./slide'),
        require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
        window,
        window.EvEmitter,
        window.getSize,
        window.fizzyUIUtils,
        _Flickity.Cell,
        _Flickity.Slide,
        _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
    utils, Cell, Slide, animatePrototype ) {

/* eslint-enable max-params */


// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    if ( instance ) instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true,
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts - options to extend
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {[Array, NodeList, HTMLElement]} elems - elements to make into cells
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i = index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells - cells to size
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  } );
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match( /^(\d+)%$/ );
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    /* eslint-disable-next-line no-invalid-this */
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5,
  },
  left: {
    left: 0,
    right: 1,
  },
  right: {
    right: 0,
    left: 1,
  },
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = new jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

proto.selectInitialIndex = function() {
  var initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) {
    this.select( this.selectedIndex, false, true );
    return;
  }
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) {
    var cell = this.queryCell( initialIndex );
    if ( cell ) {
      this.selectCell( initialIndex, false, true );
      return;
    }
  }

  var index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) {
    index = initialIndex;
  }
  // select instantly
  this.select( index, false, true );
};

/**
 * select slide from number or cell element
 * @param {[Element, Number]} value - zero-based index or element to select
 * @param {Boolean} isWrap - enables wrapping around for extra index
 * @param {Boolean} isInstant - disables slide animation
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i = 0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem - matching cell element
 * @returns {Flickity.Cell} cell - matching cell
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i = 0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {[Element, Array, NodeList]} elems - multiple elements
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  } );
};

/**
 * get parent cell from an element
 * @param {Element} elem - child element
 * @returns {Flickit.Cell} cell - parent cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {[Element, String, Number]} selector - element, selector string, or index
 * @returns {Flickity.Cell} - matching cell
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // do not select invalid selectors from hash: #123, #/. #791
    if ( selector.match( /^[#.]?[\d/]/ ) ) {
      return;
    }
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// keep focus on element when child UI elements are clicked
proto.childUIPointerDown = function( event ) {
  // HACK iOS does not allow touch events to bubble up?!
  if ( event.type != 'touchstart' ) {
    event.preventDefault();
  }
  this.focus();
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility || isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus ...
  //    #Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  } );
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {[Element, String]} elem - element or selector string
 * @returns {Flickity} - Flickity instance
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

} ) );

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unipointer/unipointer',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {



function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

/*!
 * Unidragger v2.3.1
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unidragger/unidragger',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

// drag
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/drag',[
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils',
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./flickity'),
        require('unidragger'),
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
        window,
        window.Flickity,
        window.Unidragger,
        window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {



// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
} );

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {} );
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x %= this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( dist, minDist ) {
      return dist <= minDist;
    } : function( dist, minDist ) {
      return dist < minDist;
    };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment,
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x - horizontal position
 * @param {Integer} index - slide index
 * @returns {Number} - slide distance
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index/len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };
}

// -----  ----- //

return Flickity;

} ) );

// prev/next buttons
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/prev-next-button',[
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils',
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./flickity'),
        require('unipointer'),
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
        window,
        window.Flickity,
        window.Unipointer,
        window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( Unipointer.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindStartEvent( this.element );
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // click events
  this.unbindStartEvent( this.element );
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg' );
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path' );
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30,
  },
} );

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

} ) );

// page dots
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/page-dots',[
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils',
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./flickity'),
        require('unipointer'),
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
        window,
        window.Flickity,
        window.Unipointer,
        window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {

// -------------------------- PageDots -------------------------- //



function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = Object.create( Unipointer.prototype );

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.handleClick = this.onClick.bind( this );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.holder.addEventListener( 'click', this.handleClick );
  this.bindStartEvent( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  this.holder.removeEventListener( 'click', this.handleClick );
  this.unbindStartEvent( this.holder );
  // remove from DOM
  this.parent.element.removeChild( this.holder );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = // old method name, backwards-compatible
PageDots.prototype.onClick = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true,
} );

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

} ) );

// player & autoPlay
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/player',[
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity',
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('ev-emitter'),
        require('fizzy-ui-utils'),
        require('./flickity')
    );
  } else {
    // browser global
    factory(
        window.EvEmitter,
        window.fizzyUIUtils,
        window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {



// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true,
} );

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

} ) );

// add, remove cell
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/add-remove-cell',[
      './flickity',
      'fizzy-ui-utils/utils',
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./flickity'),
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
        window,
        window.Flickity,
        window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {



// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  } );
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {[Element, Array, NodeList]} elems - Elements to insert
 * @param {Integer} index - Zero-based number to insert
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {[Element, Array, NodeList]} elems - ELements to remove
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 * @param {Boolean} isPositioningSlider - Positions slider after selection
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

} ) );

// lazyload
( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/lazyload',[
      './flickity',
      'fizzy-ui-utils/utils',
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    } );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./flickity'),
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
        window,
        window.Flickity,
        window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  } );
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 * @param {Image} img - Image element
 * @param {Flickity} flickity - Flickity instance
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

} ) );

/*!
 * Flickity v2.2.2
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/index',[
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload',
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./flickity'),
        require('./drag'),
        require('./prev-next-button'),
        require('./page-dots'),
        require('./player'),
        require('./add-remove-cell'),
        require('./lazyload')
    );
  }

} )( window, function factory( Flickity ) {
  return Flickity;
} );

/*!
 * Flickity asNavFor v2.0.2
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity-as-nav-for/as-nav-for',[
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {



// -------------------------- asNavFor prototype -------------------------- //

// Flickity.defaults.asNavFor = null;

Flickity.createMethods.push('_createAsNavFor');

var proto = Flickity.prototype;

proto._createAsNavFor = function() {
  this.on( 'activate', this.activateAsNavFor );
  this.on( 'deactivate', this.deactivateAsNavFor );
  this.on( 'destroy', this.destroyAsNavFor );

  var asNavForOption = this.options.asNavFor;
  if ( !asNavForOption ) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() {
    _this.setNavCompanion( asNavForOption );
  });
};

proto.setNavCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );
  // stop if no companion or companion is self
  if ( !companion || companion == this ) {
    return;
  }

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() {
    _this.navCompanionSelect();
  };
  companion.on( 'select', this.onNavCompanionSelect );
  // click
  this.on( 'staticClick', this.onNavStaticClick );

  this.navCompanionSelect( true );
};

proto.navCompanionSelect = function( isInstant ) {
  // wait for companion & selectedCells first. #8
  var companionCells = this.navCompanion && this.navCompanion.selectedCells;
  if ( !companionCells ) {
    return;
  }
  // select slide that matches first cell of slide
  var selectedCell = companionCells[0];
  var firstIndex = this.navCompanion.cells.indexOf( selectedCell );
  var lastIndex = firstIndex + companionCells.length - 1;
  var selectIndex = Math.floor( lerp( firstIndex, lastIndex,
    this.navCompanion.cellAlign ) );
  this.selectCell( selectIndex, false, isInstant );
  // set nav selected class
  this.removeNavSelectedElements();
  // stop if companion has more cells than this one
  if ( selectIndex >= this.cells.length ) {
    return;
  }

  var selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
  this.navSelectedElements = selectedCells.map( function( cell ) {
    return cell.element;
  });
  this.changeNavSelectedClass('add');
};

function lerp( a, b, t ) {
  return ( b - a ) * t + a;
}

proto.changeNavSelectedClass = function( method ) {
  this.navSelectedElements.forEach( function( navElem ) {
    navElem.classList[ method ]('is-nav-selected');
  });
};

proto.activateAsNavFor = function() {
  this.navCompanionSelect( true );
};

proto.removeNavSelectedElements = function() {
  if ( !this.navSelectedElements ) {
    return;
  }
  this.changeNavSelectedClass('remove');
  delete this.navSelectedElements;
};

proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
  if ( typeof cellIndex == 'number' ) {
    this.navCompanion.selectCell( cellIndex );
  }
};

proto.deactivateAsNavFor = function() {
  this.removeNavSelectedElements();
};

proto.destroyAsNavFor = function() {
  if ( !this.navCompanion ) {
    return;
  }
  this.navCompanion.off( 'select', this.onNavCompanionSelect );
  this.off( 'staticClick', this.onNavStaticClick );
  delete this.navCompanion;
};

// -----  ----- //

return Flickity;

}));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'imagesloaded/imagesloaded',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));


// ios13 fix 

(function() {
  let touchingCarousel = false,
    touchStartCoords;

  document.body.addEventListener('touchstart', function(e) {
    if (e.target.closest('.flickity-slider')) {
      touchingCarousel = true;
    } else {
      touchingCarousel = false;
      return;
    }

    touchStartCoords = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }
  });

  document.body.addEventListener('touchmove', function(e) {
    if (!(touchingCarousel && e.cancelable)) {
      return;
    }

    let moveVector = {
      x: e.touches[0].pageX - touchStartCoords.x,
      y: e.touches[0].pageY - touchStartCoords.y
    };

    if (Math.abs(moveVector.x) > Flickity.defaults.dragThreshold)
      e.preventDefault()

  }, {passive: false});
})();
(function() {
  var JSONP, computedUrl, createElement, encode, noop, objectToURI, random, randomString;

  createElement = function(tag) {
    return window.document.createElement(tag);
  };

  encode = window.encodeURIComponent;

  random = Math.random;

  JSONP = function(options) {
    var callback, callbackFunc, callbackName, done, head, params, script;
    if (options == null) {
      options = {};
    }
    params = {
      data: options.data || {},
      error: options.error || noop,
      success: options.success || noop,
      beforeSend: options.beforeSend || noop,
      complete: options.complete || noop,
      url: options.url || ''
    };
    params.computedUrl = computedUrl(params);
    if (params.url.length === 0) {
      throw new Error('MissingUrl');
    }
    done = false;
    if (params.beforeSend({}, params) !== false) {
      callbackName = options.callbackName || 'callback';
      callbackFunc = options.callbackFunc || 'jsonp_' + randomString(15);
      callback = params.data[callbackName] = callbackFunc;
      window[callback] = function(data) {
        window[callback] = null;
        params.success(data, params);
        return params.complete(data, params);
      };
      script = createElement('script');
      script.src = computedUrl(params);
      script.async = true;
      script.onerror = function(evt) {
        params.error({
          url: script.src,
          event: evt
        });
        return params.complete({
          url: script.src,
          event: evt
        }, params);
      };
      script.onload = script.onreadystatechange = function() {
        var ref, ref1;
        if (done || ((ref = this.readyState) !== 'loaded' && ref !== 'complete')) {
          return;
        }
        done = true;
        if (script) {
          script.onload = script.onreadystatechange = null;
          if ((ref1 = script.parentNode) != null) {
            ref1.removeChild(script);
          }
          return script = null;
        }
      };
      head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
      head.insertBefore(script, head.firstChild);
    }
    return {
      abort: function() {
        window[callback] = function() {
          return window[callback] = null;
        };
        done = true;
        if (script != null ? script.parentNode : void 0) {
          script.onload = script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          return script = null;
        }
      }
    };
  };

  noop = function() {
    return void 0;
  };

  computedUrl = function(params) {
    var url;
    url = params.url;
    url += params.url.indexOf('?') < 0 ? '?' : '&';
    url += objectToURI(params.data);
    return url;
  };

  randomString = function(length) {
    var str;
    str = '';
    while (str.length < length) {
      str += random().toString(36).slice(2, 3);
    }
    return str;
  };

  objectToURI = function(obj) {
    var data, key, value;
    data = (function() {
      var results;
      results = [];
      for (key in obj) {
        value = obj[key];
        results.push(encode(key) + '=' + encode(value));
      }
      return results;
    })();
    return data.join('&');
  };

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define(function() {
      return JSONP;
    });
  } else if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = JSONP;
  } else {
    this.JSONP = JSONP;
  }

}).call(this);
/*! https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/plugins/respimg/ls.respimg.min.js */
/*! lazysizes - v5.3.0 */
!function(e,t){var r;e&&(r=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",r,!0)},t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0))}("undefined"!=typeof window?window:0,function(d,n,p){"use strict";var i,a,s,l,t,r,f,o,c,m,u,y=p.cfg,e=n.createElement("img"),g="sizes"in e&&"srcset"in e,h=/\s+\d+h/g,z=(a=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,s=Array.prototype.forEach,function(){function r(e){var t,r,i=e.getAttribute(y.srcsetAttr);i&&(r=i.match(a))&&((t="w"==r[2]?r[1]/r[3]:r[3]/r[1])&&e.setAttribute("data-aspectratio",t),e.setAttribute(y.srcsetAttr,i.replace(h,"")))}function e(e){var t;e.detail.instance==p&&((t=e.target.parentNode)&&"PICTURE"==t.nodeName&&s.call(t.getElementsByTagName("source"),r),r(e.target))}function t(){i.currentSrc&&n.removeEventListener("lazybeforeunveil",e)}var i=n.createElement("img");n.addEventListener("lazybeforeunveil",e),i.onload=t,i.onerror=t,i.srcset="data:,a 1w 1h",i.complete&&t()});function v(e,t){return e.w-t.w}function w(e,t,r,i){l.push({c:t,u:r,w:+i})}function b(e,t){var r,i=e.getAttribute("srcset")||e.getAttribute(y.srcsetAttr);!i&&t&&(i=e._lazypolyfill?e._lazypolyfill._set:e.getAttribute(y.srcAttr)||e.getAttribute("src")),e._lazypolyfill&&e._lazypolyfill._set==i||(r=o(i||""),t&&e.parentNode&&(r.isPicture="PICTURE"==e.parentNode.nodeName.toUpperCase(),r.isPicture&&d.matchMedia&&(p.aC(e,"lazymatchmedia"),c())),r._set=i,Object.defineProperty(e,"_lazypolyfill",{value:r,writable:!0}))}function A(e){var t,r,i,n,a,s,l,o,c,u=e;if(b(u,!0),(n=u._lazypolyfill).isPicture)for(r=0,i=(t=e.parentNode.getElementsByTagName("source")).length;r<i;r++)if(y.supportsType(t[r].getAttribute("type"),e)&&m(t[r].getAttribute("media"))){u=t[r],b(u),n=u._lazypolyfill;break}return 1<n.length?(s=u.getAttribute("sizes")||"",s=f.test(s)&&parseInt(s,10)||p.gW(e,e.parentNode),n.d=(l=e,o=d.devicePixelRatio||1,c=p.getX&&p.getX(l),Math.min(c||o,2.5,o)),!n.src||!n.w||n.w<s?(n.w=s,a=function(e){for(var t,r,i=e.length,n=e[i-1],a=0;a<i;a++)if((n=e[a]).d=n.w/e.w,n.d>=e.d){!n.cached&&(t=e[a-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(r=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*r),t.d+(n.d-e.d)*r>e.d&&(n=t));break}return n}(n.sort(v)),n.src=a):a=n.src):a=n[0],a}function E(e){var t;g&&e.parentNode&&"PICTURE"!=e.parentNode.nodeName.toUpperCase()||(t=A(e))&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(y.srcAttr,t.u),e.setAttribute("src",t.u))}y.supportsType||(y.supportsType=function(e){return!e}),d.HTMLPictureElement&&g?!p.hasHDescriptorFix&&n.msElementsFromPoint&&(p.hasHDescriptorFix=!0,z()):d.picturefill||y.pf||(y.pf=function(e){var t,r;if(!d.picturefill)for(t=0,r=e.elements.length;t<r;t++)i(e.elements[t])},f=/^\s*\d+\.*\d*px\s*$/,t=/(([^,\s].[^\s]+)\s+(\d+)w)/g,r=/\s/,c=function(){var e,r;function t(){for(var e=0,t=r.length;e<t;e++)i(r[e])}c.init||(c.init=!0,addEventListener("resize",(r=n.getElementsByClassName("lazymatchmedia"),function(){clearTimeout(e),e=setTimeout(t,66)})))},m=function(e){return d.matchMedia?(m=function(e){return!e||(matchMedia(e)||{}).matches})(e):!e},E.parse=o=function(e){return l=[],(e=e.trim()).replace(h,"").replace(t,w),l.length||!e||r.test(e)||l.push({c:e,u:e,w:99}),l},i=E,y.loadedClass&&y.loadingClass&&(u=[],['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(e){u.push(e+y.loadedClass),u.push(e+y.loadingClass)}),y.pf({elements:n.querySelectorAll(u.join(", "))})))});

/* https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/plugins/parent-fit/ls.parent-fit.min.js */
/*! lazysizes - v5.3.0 */
!function(t,e){var i;t&&(i=function(){e(t.lazySizes),t.removeEventListener("lazyunveilread",i,!0)},e=e.bind(null,t,t.document),"object"==typeof module&&module.exports?e(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],e):t.lazySizes?i():t.addEventListener("lazyunveilread",i,!0))}("undefined"!=typeof window?window:0,function(u,t,i){"use strict";var l,s,d,f,g,o;u.addEventListener&&(l=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,s=/parent-fit["']*\s*:\s*["']*(contain|cover|width)/,d=/parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,f=/^picture$/i,g=i.cfg,o={getParent:function(t,e){var i=t,a=t.parentNode;return e&&"prev"!=e||!a||!f.test(a.nodeName||"")||(a=a.parentNode),"self"!=e&&(i="prev"==e?t.previousElementSibling:e&&(a.closest||u.jQuery)&&(a.closest?a.closest(e):jQuery(a).closest(e)[0])||a),i},getFit:function(t){var e,i,a=getComputedStyle(t,null)||{},n=a.content||a.fontFamily,r={fit:t._lazysizesParentFit||t.getAttribute("data-parent-fit")};return!r.fit&&n&&(e=n.match(s))&&(r.fit=e[1]),r.fit?(!(i=t._lazysizesParentContainer||t.getAttribute("data-parent-container"))&&n&&(e=n.match(d))&&(i=e[1]),r.parent=o.getParent(t,i)):r.fit=a.objectFit,r},getImageRatio:function(t){for(var e,i,a,n,r,s,d=t.parentNode,o=d&&f.test(d.nodeName||"")?d.querySelectorAll("source, img"):[t],c=0;c<o.length;c++)if(e=(t=o[c]).getAttribute(g.srcsetAttr)||t.getAttribute("srcset")||t.getAttribute("data-pfsrcset")||t.getAttribute("data-risrcset")||"",i=t._lsMedia||t.getAttribute("media"),i=g.customMedia[t.getAttribute("data-media")||i]||i,e&&(!i||(u.matchMedia&&matchMedia(i)||{}).matches)){(a=parseFloat(t.getAttribute("data-aspectratio")))||(s=(n=e.match(l))?"w"==n[2]?(r=n[1],n[3]):(r=n[3],n[1]):(r=t.getAttribute("width"),t.getAttribute("height")),a=r/s);break}return a},calculateSize:function(t,e){var i,a,n,r=this.getFit(t),s=r.fit,d=r.parent;return"width"==s||("contain"==s||"cover"==s)&&(a=this.getImageRatio(t))?(d?e=d.clientWidth:d=t,n=e,"width"==s?n=e:(i=e/d.clientHeight)&&("cover"==s&&i<a||"contain"==s&&a<i)&&(n=e*(a/i)),n):e}},i.parentFit=o,t.addEventListener("lazybeforesizes",function(t){var e;t.defaultPrevented||t.detail.instance!=i||(e=t.target,t.detail.width=o.calculateSize(e,t.detail.width))}))});

/*! https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js */
/*! lazysizes - v5.3.0 */
!function(e){var t=function(u,D,f){"use strict";var k,H;if(function(){var e;var t={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:true,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:true,ricTimeout:0,throttleDelay:125};H=u.lazySizesConfig||u.lazysizesConfig||{};for(e in t){if(!(e in H)){H[e]=t[e]}}}(),!D||!D.getElementsByClassName){return{init:function(){},cfg:H,noSupport:true}}var O=D.documentElement,i=u.HTMLPictureElement,P="addEventListener",$="getAttribute",q=u[P].bind(u),I=u.setTimeout,U=u.requestAnimationFrame||I,o=u.requestIdleCallback,j=/^picture$/i,r=["load","error","lazyincluded","_lazyloaded"],a={},G=Array.prototype.forEach,J=function(e,t){if(!a[t]){a[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")}return a[t].test(e[$]("class")||"")&&a[t]},K=function(e,t){if(!J(e,t)){e.setAttribute("class",(e[$]("class")||"").trim()+" "+t)}},Q=function(e,t){var a;if(a=J(e,t)){e.setAttribute("class",(e[$]("class")||"").replace(a," "))}},V=function(t,a,e){var i=e?P:"removeEventListener";if(e){V(t,a)}r.forEach(function(e){t[i](e,a)})},X=function(e,t,a,i,r){var n=D.createEvent("Event");if(!a){a={}}a.instance=k;n.initEvent(t,!i,!r);n.detail=a;e.dispatchEvent(n);return n},Y=function(e,t){var a;if(!i&&(a=u.picturefill||H.pf)){if(t&&t.src&&!e[$]("srcset")){e.setAttribute("srcset",t.src)}a({reevaluate:true,elements:[e]})}else if(t&&t.src){e.src=t.src}},Z=function(e,t){return(getComputedStyle(e,null)||{})[t]},s=function(e,t,a){a=a||e.offsetWidth;while(a<H.minSize&&t&&!e._lazysizesWidth){a=t.offsetWidth;t=t.parentNode}return a},ee=function(){var a,i;var t=[];var r=[];var n=t;var s=function(){var e=n;n=t.length?r:t;a=true;i=false;while(e.length){e.shift()()}a=false};var e=function(e,t){if(a&&!t){e.apply(this,arguments)}else{n.push(e);if(!i){i=true;(D.hidden?I:U)(s)}}};e._lsFlush=s;return e}(),te=function(a,e){return e?function(){ee(a)}:function(){var e=this;var t=arguments;ee(function(){a.apply(e,t)})}},ae=function(e){var a;var i=0;var r=H.throttleDelay;var n=H.ricTimeout;var t=function(){a=false;i=f.now();e()};var s=o&&n>49?function(){o(t,{timeout:n});if(n!==H.ricTimeout){n=H.ricTimeout}}:te(function(){I(t)},true);return function(e){var t;if(e=e===true){n=33}if(a){return}a=true;t=r-(f.now()-i);if(t<0){t=0}if(e||t<9){s()}else{I(s,t)}}},ie=function(e){var t,a;var i=99;var r=function(){t=null;e()};var n=function(){var e=f.now()-a;if(e<i){I(n,i-e)}else{(o||r)(r)}};return function(){a=f.now();if(!t){t=I(n,i)}}},e=function(){var v,m,c,h,e;var y,z,g,p,C,b,A;var n=/^img$/i;var d=/^iframe$/i;var E="onscroll"in u&&!/(gle|ing)bot/.test(navigator.userAgent);var _=0;var w=0;var M=0;var N=-1;var L=function(e){M--;if(!e||M<0||!e.target){M=0}};var x=function(e){if(A==null){A=Z(D.body,"visibility")=="hidden"}return A||!(Z(e.parentNode,"visibility")=="hidden"&&Z(e,"visibility")=="hidden")};var W=function(e,t){var a;var i=e;var r=x(e);g-=t;b+=t;p-=t;C+=t;while(r&&(i=i.offsetParent)&&i!=D.body&&i!=O){r=(Z(i,"opacity")||1)>0;if(r&&Z(i,"overflow")!="visible"){a=i.getBoundingClientRect();r=C>a.left&&p<a.right&&b>a.top-1&&g<a.bottom+1}}return r};var t=function(){var e,t,a,i,r,n,s,o,l,u,f,c;var d=k.elements;if((h=H.loadMode)&&M<8&&(e=d.length)){t=0;N++;for(;t<e;t++){if(!d[t]||d[t]._lazyRace){continue}if(!E||k.prematureUnveil&&k.prematureUnveil(d[t])){R(d[t]);continue}if(!(o=d[t][$]("data-expand"))||!(n=o*1)){n=w}if(!u){u=!H.expand||H.expand<1?O.clientHeight>500&&O.clientWidth>500?500:370:H.expand;k._defEx=u;f=u*H.expFactor;c=H.hFac;A=null;if(w<f&&M<1&&N>2&&h>2&&!D.hidden){w=f;N=0}else if(h>1&&N>1&&M<6){w=u}else{w=_}}if(l!==n){y=innerWidth+n*c;z=innerHeight+n;s=n*-1;l=n}a=d[t].getBoundingClientRect();if((b=a.bottom)>=s&&(g=a.top)<=z&&(C=a.right)>=s*c&&(p=a.left)<=y&&(b||C||p||g)&&(H.loadHidden||x(d[t]))&&(m&&M<3&&!o&&(h<3||N<4)||W(d[t],n))){R(d[t]);r=true;if(M>9){break}}else if(!r&&m&&!i&&M<4&&N<4&&h>2&&(v[0]||H.preloadAfterLoad)&&(v[0]||!o&&(b||C||p||g||d[t][$](H.sizesAttr)!="auto"))){i=v[0]||d[t]}}if(i&&!r){R(i)}}};var a=ae(t);var S=function(e){var t=e.target;if(t._lazyCache){delete t._lazyCache;return}L(e);K(t,H.loadedClass);Q(t,H.loadingClass);V(t,B);X(t,"lazyloaded")};var i=te(S);var B=function(e){i({target:e.target})};var T=function(e,t){var a=e.getAttribute("data-load-mode")||H.iframeLoadMode;if(a==0){e.contentWindow.location.replace(t)}else if(a==1){e.src=t}};var F=function(e){var t;var a=e[$](H.srcsetAttr);if(t=H.customMedia[e[$]("data-media")||e[$]("media")]){e.setAttribute("media",t)}if(a){e.setAttribute("srcset",a)}};var s=te(function(t,e,a,i,r){var n,s,o,l,u,f;if(!(u=X(t,"lazybeforeunveil",e)).defaultPrevented){if(i){if(a){K(t,H.autosizesClass)}else{t.setAttribute("sizes",i)}}s=t[$](H.srcsetAttr);n=t[$](H.srcAttr);if(r){o=t.parentNode;l=o&&j.test(o.nodeName||"")}f=e.firesLoad||"src"in t&&(s||n||l);u={target:t};K(t,H.loadingClass);if(f){clearTimeout(c);c=I(L,2500);V(t,B,true)}if(l){G.call(o.getElementsByTagName("source"),F)}if(s){t.setAttribute("srcset",s)}else if(n&&!l){if(d.test(t.nodeName)){T(t,n)}else{t.src=n}}if(r&&(s||l)){Y(t,{src:n})}}if(t._lazyRace){delete t._lazyRace}Q(t,H.lazyClass);ee(function(){var e=t.complete&&t.naturalWidth>1;if(!f||e){if(e){K(t,H.fastLoadedClass)}S(u);t._lazyCache=true;I(function(){if("_lazyCache"in t){delete t._lazyCache}},9)}if(t.loading=="lazy"){M--}},true)});var R=function(e){if(e._lazyRace){return}var t;var a=n.test(e.nodeName);var i=a&&(e[$](H.sizesAttr)||e[$]("sizes"));var r=i=="auto";if((r||!m)&&a&&(e[$]("src")||e.srcset)&&!e.complete&&!J(e,H.errorClass)&&J(e,H.lazyClass)){return}t=X(e,"lazyunveilread").detail;if(r){re.updateElem(e,true,e.offsetWidth)}e._lazyRace=true;M++;s(e,t,r,i,a)};var r=ie(function(){H.loadMode=3;a()});var o=function(){if(H.loadMode==3){H.loadMode=2}r()};var l=function(){if(m){return}if(f.now()-e<999){I(l,999);return}m=true;H.loadMode=3;a();q("scroll",o,true)};return{_:function(){e=f.now();k.elements=D.getElementsByClassName(H.lazyClass);v=D.getElementsByClassName(H.lazyClass+" "+H.preloadClass);q("scroll",a,true);q("resize",a,true);q("pageshow",function(e){if(e.persisted){var t=D.querySelectorAll("."+H.loadingClass);if(t.length&&t.forEach){U(function(){t.forEach(function(e){if(e.complete){R(e)}})})}}});if(u.MutationObserver){new MutationObserver(a).observe(O,{childList:true,subtree:true,attributes:true})}else{O[P]("DOMNodeInserted",a,true);O[P]("DOMAttrModified",a,true);setInterval(a,999)}q("hashchange",a,true);["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){D[P](e,a,true)});if(/d$|^c/.test(D.readyState)){l()}else{q("load",l);D[P]("DOMContentLoaded",a);I(l,2e4)}if(k.elements.length){t();ee._lsFlush()}else{a()}},checkElems:a,unveil:R,_aLSL:o}}(),re=function(){var a;var n=te(function(e,t,a,i){var r,n,s;e._lazysizesWidth=i;i+="px";e.setAttribute("sizes",i);if(j.test(t.nodeName||"")){r=t.getElementsByTagName("source");for(n=0,s=r.length;n<s;n++){r[n].setAttribute("sizes",i)}}if(!a.detail.dataAttr){Y(e,a.detail)}});var i=function(e,t,a){var i;var r=e.parentNode;if(r){a=s(e,r,a);i=X(e,"lazybeforesizes",{width:a,dataAttr:!!t});if(!i.defaultPrevented){a=i.detail.width;if(a&&a!==e._lazysizesWidth){n(e,r,i,a)}}}};var e=function(){var e;var t=a.length;if(t){e=0;for(;e<t;e++){i(a[e])}}};var t=ie(e);return{_:function(){a=D.getElementsByClassName(H.autosizesClass);q("resize",t)},checkElems:t,updateElem:i}}(),t=function(){if(!t.i&&D.getElementsByClassName){t.i=true;re._();e._()}};return I(function(){H.init&&t()}),k={cfg:H,autoSizer:re,loader:e,init:t,uP:Y,aC:K,rC:Q,hC:J,fire:X,gW:s,rAF:ee}}(e,e.document,Date);e.lazySizes=t,"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof window?window:{});
/* https://github.com/Spope/MiniMasonry.js/*/
window.MiniMasonry=function(){"use strict";function t(t){return this._sizes=[],this._columns=[],this._container=null,this._count=null,this._width=0,this._resizeTimeout=null,this.conf={baseWidth:255,gutterX:null,gutterY:null,gutter:10,container:null,minify:!0,ultimateGutter:5,surroundingGutter:!0},this.init(t),this}return t.prototype.init=function(t){for(var i in this.conf)null!=t[i]&&(this.conf[i]=t[i]);if(null!=this.conf.gutterX&&null!=this.conf.gutterY||(this.conf.gutterX=this.conf.gutterY=this.conf.gutter),this._container=document.querySelector(this.conf.container),!this._container)throw new Error("Container not found or missing");window.addEventListener("resize",this.resizeThrottler.bind(this)),this.layout()},t.prototype.reset=function(){this._sizes=[],this._columns=[],this._count=null,this._width=this._container.clientWidth;var t=this.conf.baseWidth;this._width<t&&(this._width=t,this._container.style.minWidth=t+"px"),1==this.getCount()&&(this.conf.gutterX=this.conf.ultimateGutter,this._count=1),this._width<this.conf.baseWidth+2*this.conf.gutterX&&(this.conf.gutterX=0)},t.prototype.getCount=function(){return this.conf.surroundingGutter?Math.floor((this._width-this.conf.gutterX)/(this.conf.baseWidth+this.conf.gutterX)):Math.floor((this._width+this.conf.gutterX)/(this.conf.baseWidth+this.conf.gutterX))},t.prototype.computeWidth=function(){var t=this.conf.surroundingGutter?(this._width-this.conf.gutterX)/this._count-this.conf.gutterX:(this._width+this.conf.gutterX)/this._count-this.conf.gutterX;return t=Number.parseFloat(t.toFixed(2))},t.prototype.layout=function(){if(this._container){this.reset(),null==this._count&&(this._count=this.getCount());for(var t=this.computeWidth(),i=0;i<this._count;i++)this._columns[i]=0;for(var n=this._container.querySelectorAll(this.conf.container+" > *"),s=0;s<n.length;s++)n[s].style.width=t+"px",this._sizes[s]=n[s].clientHeight;var o,e=this.conf.surroundingGutter?this.conf.gutterX:0;this._count>this._sizes.length&&(o=this._sizes.length*(t+this.conf.gutterX)-this.conf.gutterX,e=(this._width-o)/2);for(var h=0;h<n.length;h++){var r=this.conf.minify?this.getShortest():this.getNextColumn(h),u=0;!this.conf.surroundingGutter&&r==this._columns.length||(u=this.conf.gutterX);var c=e+(t+u)*r,l=this._columns[r];n[h].style.transform="translate3d("+Math.round(c)+"px,"+Math.round(l)+"px,0)",this._columns[r]+=this._sizes[h]+(1<this._count?this.conf.gutterY:this.conf.ultimateGutter)}this._container.style.height=this._columns[this.getLongest()]-this.conf.gutterY+"px"}else console.error("Container not found")},t.prototype.getNextColumn=function(t){return t%this._columns.length},t.prototype.getShortest=function(){for(var t=0,i=0;i<this._count;i++)this._columns[i]<this._columns[t]&&(t=i);return t},t.prototype.getLongest=function(){for(var t=0,i=0;i<this._count;i++)this._columns[i]>this._columns[t]&&(t=i);return t},t.prototype.resizeThrottler=function(){this._resizeTimeout||(this._resizeTimeout=setTimeout(function(){this._resizeTimeout=null,this._container.clientWidth!=this._width&&this.layout()}.bind(this),33))},t}();
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).reframe=t()}(this,function(){"use strict";function t(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var i=Array(e),o=0,t=0;t<n;t++)for(var r=arguments[t],f=0,d=r.length;f<d;f++,o++)i[o]=r[f];return i}return function(e,s){return void 0===s&&(s="js-reframe"),("string"==typeof e?t(document.querySelectorAll(e)):"length"in e?t(e):[e]).forEach(function(e){var t,n,i,o,r,f,d,l;-1!==e.className.split(" ").indexOf(s)||-1<e.style.width.indexOf("%")||(i=e.getAttribute("height")||e.offsetHeight,o=e.getAttribute("width")||e.offsetWidth,r=("string"==typeof i?parseInt(i):i)/("string"==typeof o?parseInt(o):o)*100,(f=document.createElement("div")).className=s,(d=f.style).position="relative",d.width="100%",d.paddingTop=r+"%",(l=e.style).position="absolute",l.width="100%",l.height="100%",l.left="0",l.top="0",null!==(t=e.parentNode)&&void 0!==t&&t.insertBefore(f,e),null!==(n=e.parentNode)&&void 0!==n&&n.removeChild(e),f.appendChild(e))})}});
//smoothscroll.js file
/*
 * smoothscroll polyfill - v0.3.5
 * https://iamdustan.github.io/smoothscroll
 * 2016 (c) Dustan Kasten, Jeremias Menichelli - MIT License
 */

(function(w, d, undefined) {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   * undefined: undefined
   */

  // polyfill
  function polyfill() {
    // return when scrollBehavior interface is supported
    if ('scrollBehavior' in d.documentElement.style) {
      return;
    }

    /*
     * globals
     */
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * object gathering original scroll methods
     */
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    /*
     * define timing method
     */
    var now = w.performance && w.performance.now
      ? w.performance.now.bind(w.performance) : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} x
     * @returns {Boolean}
     */
    function shouldBailOut(x) {
      if (typeof x !== 'object'
            || x === null
            || x.behavior === undefined
            || x.behavior === 'auto'
            || x.behavior === 'instant') {
        // first arg not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof x === 'object'
            && x.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError('behavior not valid');
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    /*
     * ORIGINAL METHODS OVERRIDES
     */

    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scroll.call(
          w,
          arguments[0].left || arguments[0],
          arguments[0].top || arguments[1]
        );
        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left,
        ~~arguments[0].top
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left || arguments[0],
          arguments[0].top || arguments[1]
        );
        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      if ( typeof arguments[0] !== 'undefined' ) {
        // avoid smooth behavior if not required
        if (shouldBailOut(arguments[0])) {
          original.elScroll.call(
              this,
              arguments[0].left || arguments[0],
              arguments[0].top || arguments[1]
          );
          return;
        }

        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
            this,
            this,
            arguments[0].left,
            arguments[0].top
        );
      }
    };

  }

  polyfill();
  
})(window, document);

KING = {
	version: '3.8.0'
};

/*
 * vanilla javascript styled effect inspired by
 * http://wellstyled.com/en/javascript-styleselect-jquery-plugin/
 */


window.styledSelectUpgraded = function($select, maxHeightCap) {

	if ( ! $select.hasClass('styled') ) {

		
		// original part (old fn)

		var $selElm = $select;

		$selElm.wrap('<span><'+'/span>');
		$selElm.after('<span><'+'/span>');

		var $selReplace = $selElm.next(),
			$selCover = $selElm.parent();

		$selElm.css({
			'opacity': 0,
			'visibility': 'visible',
			'position': 'absolute',
			'top' :0,
			'left': 0,
			'display': 'inline',
			'z-index': 1
		}).attr('tabindex', '-1');

		$selCover.addClass('regular-select-cover').css({
			'display': 'inline-block',
			'position': 'relative',
			'top': 0,
			'left': 0,
			'z-index': 0,
			'vertical-align': 'middle',
			'text-align': 'left'
		}).attr('tabindex', '0');

		$selReplace.addClass('regular-select-inner').css({
			'display': 'block',
			'white-space': 'nowrap'
		});

		$selElm.on('change',function() {
			if ( this.selectedIndex >= 0 ) {
				$(this).next().html(this.options[this.selectedIndex].text);
			}
		});
		$selReplace.text($selElm[0].options[$selElm[0].selectedIndex].text);
		$selCover.width($selElm.width()+'px');

		$selElm.addClass('styled');

		// upgraded code

		var $selectContainer = $select.parent();

		var listDOM = '<span class="regular-select-content">';
		$select.find('option').each(function(){
			listDOM += '<span class="regular-select-item' + ( $(this).prop('selected') ? ' selected ' : '' ) + '" data-value="' + encodeURIComponent($(this).val()) + '">' + $(this).text() + '</span>';
		});
		listDOM += '</span>';
		$selectContainer.append(listDOM);

		$selectContainer.find('.regular-select-item').on('click', function(){
			$selectContainer.find('.selected').removeClass('selected');
			$(this).addClass('selected');
			$select.val(decodeURIComponent($(this).data('value')));
			$select.trigger('change');
		}).on('keypress', function(e){
			if ( e.which == 13 ) {
				$(this).trigger('click');
				var $cover = $(this).parent().parent().parent();
				$cover.find('.regular-select-item').attr('tabindex', '-1');
				$cover.removeClass('content-opened');
				setTimeout(function(){
					$cover.find('.opened-with-tab').removeClass('opened-with-tab');
				}, 90);
			}
		});

		$selectContainer.parent().css('position', 'relative');

		$selectContainer.on('click', function(e){

			e.stopPropagation();
			var _this = $(this)[0];

			$('.regular-select-cover.content-opened').each(function(){
				if ( $(this)[0] != _this ) {
					$(this).removeClass('content-opened');
					$(this).parent().css('zIndex', 9);
				}
			});

			if ( ! $(this).hasClass('content-opened') ) {

				$(this).addClass('content-opened');
				$(this).parent().css('zIndex', 1000); 
				var $selectHandle = $(this);

				var $selectContent = $(this).find('.regular-select-content');
				$selectContent.css('maxHeight', 'none');
				if ( maxHeightCap && $selectContent.outerHeight() > $(window).height() - $selectContent.offset().top - 20 ) {
					$selectContent.css('maxHeight', $(window).height() - $selectContent.offset().top - 20 );
				}

				$(window).on('click.select-helper', function(){
					if ( $selectHandle.hasClass('content-opened') ) {
						$selectHandle.removeClass('content-opened');
						$selectHandle.parent().css('zIndex', 9);
					}
				});

			} else {
				$(this).parent().css('zIndex', 9);
				$(this).removeClass('content-opened');
				$(window).off('click.select-helper');
			}

		}).on('keypress', function(e){
			if ( e.keyCode == window.KEYCODES.RETURN ) {
				if ( ! $(this).hasClass('opened-with-tab') ) {
					$(this).addClass('opened-with-tab');
					$(this).trigger('click');
					$(this).find('.regular-select-item').attr('tabindex', '0');
				}
			}
		});

		$selectContainer.find('.regular-select-inner').attr('data-title', $selectContainer.parent().find('label').text());

	 	$selectContainer.append('<svg class="svg symbol symbol--arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M13.828 14.414l4-4L16.414 9l-4 4-4-4L7 10.414l5.414 5.414 1.414-1.414z" fill="#000"/></svg>');

	}

};

// debouncing

window.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// King Product Gallery Mobile Helpers
// for gallery (flickity) resizing

window.KingProductGalleryMobileHelpers = function($product){

	var _spo = window.productData[$product.data('id')],

			$sProductCarousel = _spo.$productCarousel,
			$sProductGallery = _spo.$productGallery,
			$sProductGalleryItem = _spo.$productGalleryItem,
			sProductFlkty = _spo.productFlkty;

	var KingProductGalleryMobile = false;
	var flktyEventSet = false;

	if ( parseInt($sProductCarousel.data('size')) > 1 ) {

		$(window).on('resize.product-gallery-mobile-switch', function(){

			var triggerSwitch = 'false';
			if ( ! $product.hasClass('featured-product') ) {

				if ( ! KingProductGalleryMobile && $(window).width() < 768 ) {
					triggerSwitch = 'mobile';
					KingProductGalleryMobile = true;
				} else if ( KingProductGalleryMobile && $(window).width() >= 768 ) {
					triggerSwitch = 'desktop';
					KingProductGalleryMobile = false;
				} 

			} else {

				if ( ( ! KingProductGalleryMobile && $(window).width() < 768 ) || ( ! KingProductGalleryMobile && $(window).width() > 948 ) ) {
					triggerSwitch = 'mobile';
					KingProductGalleryMobile = true;
				} else if ( KingProductGalleryMobile && ( $(window).width() >= 768 && $(window).width() <= 948 ) ) {
					triggerSwitch = 'desktop';
					KingProductGalleryMobile = false;
				} 

			}
			
			if ( triggerSwitch != 'false' ) {

				$sProductCarousel
					.removeClass('product-gallery--fit')
					.removeClass('product-gallery--fill')
					.removeClass('product-gallery--fill-mobile');

				if ( triggerSwitch == 'mobile' ) {

					$sProductCarousel.addClass($sProductCarousel.data('mobile-style'));

					if ( $sProductCarousel.data('mobile-style') == 'product-gallery--fill-mobile' && $sProductCarousel.hasClass('product-gallery--mobile-variable') && ! flktyEventSet ) {
						flktyEventSet = true;
						sProductFlkty.on('change', function( index ) {
							if ( $(window).width() < 768 || ( $product.hasClass('featured-product') && $(window).width() > 948 ) ) {
								$selectedItem = $sProductGalleryItem.eq(index);
								$sProductCarousel.attr('style', 'height:' + ( $selectedItem.width() / $selectedItem.children('.lazy-image').data('ratio') ) + 'px !important; min-height: 0');
							}
						});
						$(window).on('resize.product-gallery-mobile-fill-helper', function(){
							if ( $(window).width() < 768 || ( $product.hasClass('featured-product') && $(window).width() > 948 ) ) {
								$selectedItem = $sProductGalleryItem.eq(sProductFlkty.selectedIndex);
								$sProductCarousel.attr('style', 'height:' + ( $selectedItem.width() / $selectedItem.children('.lazy-image').data('ratio') ) + 'px !important; min-height: 0');
							}
						}).trigger('resize.product-gallery-mobile-fill-helper');
					}

				} else if ( triggerSwitch == 'desktop' ) {
					$sProductCarousel.addClass($sProductCarousel.data('desktop-style'));
					$sProductCarousel.removeAttr('style');
				}

				KING.Product.unmount();

				setTimeout(function(){
					$product.find('.product-gallery__item').attr('style', 'position: absolute');
	    		KING.Product._mountGalleryResizer($product.find('.product-gallery'), $product);
		    	$(window).trigger('resize');
		    	setTimeout(function(){
			    	sProductFlkty.resize();
		    	}, 10)
				}, 10);

			}

		}).trigger('resize.product-gallery-mobile-switch');

	}

}

// Returns image url with size format

window.getSizedImageUrl = function(src, size) {

  if ( size === null || src === null ) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  var match = src.match(
    /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
  );

  if (match !== null) {
    var prefix = src.split(match[0]);
    var suffix = match[0];
    return removeProtocol(prefix[0] + '_' + size + suffix);
  }

	function removeProtocol(path) {
	  return path.replace(/http(s)?:/, '');
	}

	return src;

}

// Returns readable time from UTC

window.formatTime = function(format, utc) {

	var date = new Date(utc);
  var nDay = date.getDay(),
    nDate = date.getDate(),
    nMonth = date.getMonth(),
    nYear = date.getFullYear(),
    nHour = date.getHours(),
    aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    aMonths = window.month_names,
    aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    isLeapYear = function() {
      return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
    },
    getThursday = function() {
      var target = new Date(date);
      target.setDate(nDate - ((nDay+6)%7) + 3);
      return target;
    },
    zeroPad = function(nNum, nPad) {
      return ((Math.pow(10, nPad) + nNum) + '').slice(1);
    };
  return format.replace(/%[a-z]/gi, function(sMatch) {
    return (({
      '%a': aDays[nDay].slice(0,3),
      '%A': aDays[nDay],
      '%b': aMonths[nMonth].slice(0,3),
      '%B': aMonths[nMonth],
      '%c': date.toUTCString(),
      '%C': Math.floor(nYear/100),
      '%d': zeroPad(nDate, 2),
      '%e': nDate,
      '%F': date.toISOString().slice(0,10),
      '%G': getThursday().getFullYear(),
      '%g': (getThursday().getFullYear() + '').slice(2),
      '%H': zeroPad(nHour, 2),
      '%I': zeroPad((nHour+11)%12 + 1, 2),
      '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
      '%k': nHour,
      '%l': (nHour+11)%12 + 1,
      '%m': zeroPad(nMonth + 1, 2),
      '%n': nMonth + 1,
      '%M': zeroPad(date.getMinutes(), 2),
      '%p': (nHour<12) ? 'AM' : 'PM',
      '%P': (nHour<12) ? 'am' : 'pm',
      '%s': Math.round(date.getTime()/1000),
      '%S': zeroPad(date.getSeconds(), 2),
      '%u': nDay || 7,
      '%V': (function() {
              var target = getThursday(),
                n1stThu = target.valueOf();
              target.setMonth(0, 1);
              var nJan1 = target.getDay();
              if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
              return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
      '%w': nDay,
      '%x': date.toLocaleDateString(),
      '%X': date.toLocaleTimeString(),
      '%y': (nYear + '').slice(2),
      '%Y': nYear,
      '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
      '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
    }[sMatch] || '') + '') || sMatch;
  });

}

// Returns pseudo content

window.getPseudoContent = function(selector) {
	var element = document.querySelector(selector),
			pseudo = window.getComputedStyle(element, ':after');
	return pseudo.getPropertyValue('content');
}

/*!
 * Serialize all form data into a SearchParams string
 * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */

window.serialize = function(form) {
  var arr = [];
  Array.prototype.slice.call(form.elements).forEach(function(field) {
    if (
      !field.name ||
      field.disabled ||
      ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1
    )
      return;
    if (field.type === 'select-multiple') {
      Array.prototype.slice.call(field.options).forEach(function(option) {
        if (!option.selected) return;
        arr.push(
          encodeURIComponent(field.name) +
            '=' +
            encodeURIComponent(option.value)
        );
      });
      return;
    }
    if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked)
      return;
    arr.push(
      encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value)
    );
  });
  return arr.join('&');
}

// get jsonp

window.getJSONP = function(url, success) {

  var ud = '_' + +new Date,
      script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0] 
             || document.documentElement;

  window[ud] = function(data) {
      head.removeChild(script);
      success && success(data);
  };

  script.src = url.replace('callback=?', 'callback=' + ud);
  head.appendChild(script);

}

window.objectToQueryParams = function(obj, parentKey) {
  var output = '';
  parentKey = parentKey || null;

  Object.keys(obj).forEach(function(key) {
    var outputKey = key + '=';
    if (parentKey) {
      outputKey = parentKey + '[' + key + ']';
    }

    switch (trueTypeOf(obj[key])) {
      case 'object':
        output += objectToQueryParams(obj[key], parentKey ? outputKey : key);
        break;
      case 'array':
        output += outputKey + '=' + obj[key].join(',') + '&';
        break;
      default:
        if (parentKey) {
          outputKey += '=';
        }
        output += outputKey + encodeURIComponent(obj[key]) + '&';
        break;
    }
  });

  return output;
}
function trueTypeOf(obj) {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}

// Krown Themes
// scrollDOWN() / scrollTOP() functions

window.slideUp = function(target, duration) {
	target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}
window.slideDown = function(target, duration) {
	target.style.removeProperty('display');
  var display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  var height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

// Extend CASH with some "missing" jQuery functions

$.fn.scrollTop = function(value){
	if ( typeof value === "number" ) {
		if ( this[0] == window ) {
			return this[0].scrollY = value;
		} else {
			return this[0].scrollTop = value;
		}
	} else {
		if ( this[0] == window ) {
			return this[0].scrollY;
		} else {
			return this[0].scrollTop;
		}
	}
}

window.inArray = function( elem, array ) {
  if ( array.indexOf ) {
    return array.indexOf( elem );
  }
  for ( var i = 0, length = array.length; i < length; i++ ) {
    if ( array[ i ] === elem ) {
       return i;
    }
  }
  return -1;
}

window.grep = function(items, callback) {
  var filtered = [],
      len = items.length,
      i = 0;
  for (i; i < len; i++) {
    var item = items[i];
    var cond = callback(item);
    if (cond) {
        filtered.push(item);
    }
  }
  return filtered;
};

window._htmlEscape = function(input) {
  return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

window.KEYCODES = {
  TAB: 9,
  ESC: 27,
  DOWN: 40,
  RIGHT: 39,
  UP: 38,
  LEFT: 37,
  RETURN: 13
}
KING.Shortcodes = {};

// Toggles

KING.Shortcodes.Toggles = {
 
  mount: function() {

    $('.toggles:not(.init)').each(function(){

      $(this).addClass('init');

      var $titles = $(this).find('.toggle__title'),
          $contents = $(this).find('.toggle__content'),
          i = 0;

      $titles.each(function(){

        $(this)
          .append('<span class="low-dpi"><svg class="svg symbol symbol--minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M18 13H6v-2h12v2z" fill="#000"/></svg></span><span class="high-dpi"><svg class="svg symbol symbol--minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M18 12.5H6V11h12v1.5z" fill="#000"/></svg></span>')
          .append('<span class="low-dpi"><svg class="svg symbol symbol--plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13V18H13V13H18V11H13V6H11V11H6V13H11Z" fill="black"/></svg></span><span class="high-dpi"><svg class="svg symbol symbol--plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M10.75 12.25V17h1.5v-4.75H17v-1.5h-4.75V6h-1.5v4.75H6v1.5h4.75z" fill="#000"/></svg></span>');
      
        $(this).on('click', function(){

          const $toggle = $(this).next('.toggle__content');

          if ( ! $(this).hasClass('opened') ) {
            $(this).addClass('opened');
            $(this).attr('aria-expanded', 'true');
            window.slideDown($toggle[0], 200)
          } else {
            $(this).removeClass('opened');
            $(this).attr('aria-expanded', 'false');
            window.slideUp($toggle[0], 200)
          }
          
        }).on('keydown', function(e){
          if ( e.keyCode == window.KEYCODES.RETURN ) {
            $(this).trigger('click');
          }
        });

      });

      $(this).find('.contents').remove();

    });

  }

}

// Mount in page

$(document).ready(function(){
  if ( $('.toggles').length > 0 ) {
    KING.Shortcodes.Toggles.mount();
  }
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-toggles') ) {
    KING.Shortcodes.Toggles.mount();
  }

}).on('shopify:block:select', function(e){

  var $block = $(e.target); 

  if ( $block.hasClass('toggle') ) {
    if ( ! $block.find('.toggle__title').hasClass('opened') ) {
      $block.find('.toggle__title').addClass('opened');
      window.slideDown($block.find('.toggle__content')[0], 200);
    }
  }

}).on('shopify:block:deselect', function(e){

  var $block = $(e.target);

  if ( $block.hasClass('toggle') ) {
    if ( $block.find('.toggle__title').hasClass('opened') ) {
      $block.find('.toggle__title').removeClass('opened');
      window.slideUp($block.find('.toggle__content')[0], 200);
    }
  }

});

// Content slider
 
KING.Shortcodes.ContentSlider = {

  mount: function($section) {

    var $slider = $section.find('.content-slider');

    if ( $slider.find('.content-slider__item').length > 1 ) {

      var flkty = new Flickity($slider[0], {
        cellSelector: '.content-slider__item',
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        adaptiveHeight: true,
        accessibility: true,
        autoPlay: $slider.data('autoplay'),
        pauseAutoPlayOnHover: false
      });

      $slider.append('<div class="flickity-custom-nav"><span class="prev">' + window.KINGDOMSettings.symbol_arrow + '</span><span class="current">1</span><span>/</span><span class="total">' + $slider.find('.content-slider__item').length + '</span><span class="next">' + window.KINGDOMSettings.symbol_arrow + '</span></div>');

      flkty.on('select', function(){
        $slider.find('.current').html(flkty.selectedIndex+1);
      });

      $slider.find('.next').on('click', function(){
        flkty.next();
      });

      $slider.find('.prev').on('click', function(){
        flkty.previous();
      });

    }

  }

}

// Tabs

KING.Shortcodes.Tabs = {

  mount: function($section) {

    var $titles = $section.children('.titles').children('h5'),
        $contents = $section.children('.contents').children('div'),
        $openedT = $titles.eq(0),
        $openedC = $contents.eq(0);

    $openedT.addClass('opened');
    window.slideDown($openedC[0], 0);

    $titles.find('a').prop('href', '#').off('click');

    $titles.on('click', function(e){

      $openedT.removeClass('opened');
      $openedT = $(this);
      $openedT.addClass('opened');

      window.slideUp($openedC[0], 200);
      $openedC = $contents.eq($(this).index());
      setTimeout(function(){
        window.slideDown($openedC[0], 200)
      }, 200);

      e.preventDefault();

    }).on('keydown', function(e){
      if ( e.keyCode == window.KEYCODES.RETURN ) {
        $(this).trigger('click');
      }
    });

  }

}

// Mount in page

$(document).ready(function(){
  if ( $('.krown-tabs').length > 0 ) {
    $('.krown-tabs').each(function(){
      KING.Shortcodes.Tabs.mount($(this));
    });
  }
});

KING.AnnouncementBar = {

	mount: function() {

		var $announcement = $('.announcement');

		if ( $('.announcement__exit').length > 0 ) {
			$('.announcement__exit').on('click', function(){
				$('body').addClass('no-transitions');
				setTimeout(function(){
					$('body').removeClass('show-announcement-bar');
						localStorage.setItem('announcement-dismissed', 'true');
						setTimeout(function(){
							$(window).trigger('resize');
							$('body').removeClass('no-transitions');
					}, 100);
				}, 10);
			});
		}

	}

}

// Mount in page

if ( $('.mount-announcement').length > 0 ) {
	KING.AnnouncementBar.mount();
} 

// Shopify events

$(document).on('shopify:section:load, shopify:section:select', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-announcement') ) {
		if ( $('.announcement').length > 0 ) {
			$('body').addClass('show-announcement-bar');
		} else {
			$('body').removeClass('show-announcement-bar');
		}
	}

})
KING.Popup = {

	$popup: null,

	mount: function() {

		this.$popup = $('#shopify-section-popup');

		var show = this.$popup.find('.popup-content').data('show'),
				freq = this.$popup.find('.popup-content').data('freq'),
				enable = this.$popup.find('.popup-content').data('enable');

		if ( show > 0 && enable ) {
			setTimeout((function(){
				this._trigger(show, freq);
			}).bind(this), parseInt(show*1000));
		}

		this.$popup.find('.popup-close').on('click', (function(e){
			this._hide();
		}).bind(this));

		this.$popup.find('.popup-background').on('click', (function(e){
			this._hide();
		}).bind(this));

	},

	_show: function() {
		this.$popup.addClass('active');
	},

	_hide: function() {
		this.$popup.removeClass('active');
	},

	_trigger: function(show, freq) {

		var popupKey = 'popup-' + document.location.hostname,
				popupStorage = localStorage.getItem(popupKey) != null ? JSON.parse(localStorage.getItem(popupKey)) : null;

		if ( popupStorage != null ) {
			
			if ( popupStorage['show'] != show || popupStorage['freq'] != freq ) {

				this._refreshStorage(popupKey, show, freq);;

				// user saw the ad but settings are different - show it!
				this._show();

			} else {

				// user saw the ad so we need to check if he should see it again

				if ( freq == 'every' ) { 

					if ( sessionStorage[popupKey] == null || sessionStorage[popupKey] != 'shown' ) {
						this._show();
						this._refreshStorage(popupKey, show, freq);;
					}

				} else {

					var shownAt = popupStorage['shown'],
							nowAt = new Date().getTime(),
							inBetween = Math.round((nowAt - shownAt) / 1000);

					if ( freq == 'day' && inBetween > 129600 ) {
						this._show();
						this._refreshStorage(popupKey, show, freq);;
					} else if ( freq == 'week' && inBetween > 907200 ) {
						this._show();
						this._refreshStorage(popupKey, show, freq);;
					}

				}

			}

		} else {

			this._refreshStorage(popupKey, show, freq);

			// user never saw the ad - show it!

			this._show();

		}

	},

	_refreshStorage: function(popupKey, show, freq) {

		localStorage.setItem(popupKey, JSON.stringify({
			'show': show,
			'freq': freq,
			'shown': new Date().getTime()
		}));

		sessionStorage[popupKey] = 'shown';

	}

}


// Mount in page

if ( $('.mount-popup').length > 0 ) {
	KING.Popup.mount($(this));
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-popup') ) {
		window.KING.Popup.mount();
	}

}).on('shopify:section:select', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-popup') ) {
		window.KING.Popup._show();
	}

}).on('shopify:section:deselect', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-popup') ) {
		window.KING.Popup._hide();
	}

});
KING.Sidebar = {

	$sidebar: null,

	A11Y_TAB_EVENT: null,
	A11Y_ARROW_EVENT: null,

	opened: null,

	SCROLL_StickySidebar: function(){

 		var $sidebar = KING.Sidebar.$sidebar,
 				scrollTop = $(window).scrollTop(),
				screenHeight = $(window).height(),
				sidebarHeight = $sidebar.outerHeight();

		if ( sidebarHeight > screenHeight ) {

			if ( scrollTop < sidebarHeight - screenHeight ) {
				$sidebar.css('transform', 'translate3d(0,' + ( scrollTop * -1 ) + 'px, 0)');
			} else {
				$sidebar.css('transform', 'translate3d(0,' + ( ( sidebarHeight - screenHeight ) * -1 ) + 'px, 0)');
			}

		}

	},

	mount: function() {

		// Sticky try out

		this.$sidebar = $('.sidebar');
	 	var $body = $('body');

	 	var $sidebarSubmenuFirst = $('.sidebar__submenu--first'),
	 			$sidebarSubmenuSecond = $('.sidebar__submenu--second');

	 	window.addEventListener('scroll', KING.Sidebar.SCROLL_StickySidebar, {passive:true});

	 	$(window).on('resize.sticky-sidebar', window.debounce((function(){

			var screenHeight = $(window).height(),
					sidebarHeight = this.$sidebar.outerHeight();

			if ( sidebarHeight > screenHeight ) {
				KING.Sidebar.SCROLL_StickySidebar();
			} else {
				this.$sidebar.css('transform', 'translate3d(0, 0, 0)');
			}

			$('.sidebar__cart, .sidebar__cart .cart, .sidebar__search, .collection__filters, .collection__filters .filters').css('height', window.innerHeight);
			$('.sidebar__menus').css('height', window.innerHeight);
			$('.sidebar__search.predictive-search .sidebar__search-results').css('maxHeight', window.innerHeight - 170);

	 	}).bind(this), 300)).trigger('resize.sticky-sidebar');
	 	setTimeout(function(){
	 		$(window).trigger('resize.sticky-sidebar');
	 	}, 310);

	 	var sidebarParentFLAG = false,
	 			$sidebarSeconds = $('.sidebar__seconds'),
	 			$sidebarSecondsDOM = $sidebarSeconds.find('.sidebar__menu'),
	 			sidebarSecondsFLAG = false,
	 			$sidebarThirds = $('.sidebar__thirds'),
	 			$sidebarThirdsDOM = $sidebarThirds.find('.sidebar__menu'),
	 			sidebarThirdsFLAG = false;

	 	$('.has-first-submenu').each(function(){
	 		$(this)[0].addEventListener('touchstart', function(e){
	 			if ( $(window).width() > 948 ) {
		 			$(this).children('a').css('pointerEvents', 'none');
	 				$(this).trigger('mouseenter');
	 			}
	 		}, {passive: true});
	 	});

	 	var $sidebar = this.$sidebar;

	 	$('.has-first-submenu').on('mouseenter', function(e){

	 		if ( $(window).width() > 948 ) {

		 		e.preventDefault();

		 		$body.addClass('show-overlay');
		 		$sidebarSeconds.addClass('opened');
			 	sidebarSecondsFLAG = true;

		 		var $openedSubmenu = $(this).children('.sidebar__submenu').clone();
			 	if ( $sidebarSecondsDOM.find('.sidebar__submenu') && $sidebarSecondsDOM.find('.sidebar__submenu').data('handle') != $openedSubmenu.data('handle') ) {
		 			$sidebarSecondsDOM.html($openedSubmenu[0].outerHTML);
			 	}

		 		$sidebarSecondsDOM.children('.sidebar__submenu').find('.sub-menu').css('paddingTop', $(this)[0].getBoundingClientRect().top);
		 		setTimeout(function(){
		 			$sidebarSecondsDOM.children('.sidebar__submenu').addClass('submenu-opened');
		 		}, 10);	

			 	$sidebarSecondsDOM.find('.has-second-submenu').each(function(){
			 		$(this)[0].addEventListener('touchstart', function(){
			 			$(this).trigger('mouseenter');
		 				if ( sidebarThirdsFLAG ) {
					 		$sidebarThirds.removeClass('opened');
					 		$sidebarThirds.find('.submenu-opened').removeClass('submenu-opened');
					 		sidebarThirdsFLAG = false;
		 				}
		 			}, {passive: true});
			 	});

		 		$sidebarSecondsDOM.find('.has-second-submenu').on('mouseenter', function(e){

		 			e.preventDefault();
			 		$sidebarThirds.addClass('opened');
			 		sidebarThirdsFLAG = true;

			 		var $openedSubmenu = $(this).children('.sidebar__submenu').clone();
			 		if ( $sidebarThirdsDOM.find('.sidebar__submenu') && $sidebarThirdsDOM.find('.sidebar__submenu').data('handle') != $openedSubmenu.data('handle') ) {
			 			$sidebarThirdsDOM.html($openedSubmenu[0].outerHTML);
			 		}

		 			$sidebarThirdsDOM.children('.sidebar__submenu').find('.sub-menu').css('paddingTop', $(this)[0].getBoundingClientRect().top);
			 		setTimeout(function(){
			 			$sidebarThirdsDOM.children('.sidebar__submenu').addClass('submenu-opened');
			 		}, 10);	

		 		}).on('mouseleave', function(){
			 		$sidebarThirds.removeClass('opened');
		 			$sidebarThirds.find('.submenu-opened').removeClass('submenu-opened');
				 	sidebarThirdsFLAG = false;
		 		});

		 	}

	 	}).on('mouseleave', function(){
	 		$body.removeClass('show-overlay');
	 		$sidebarSeconds.removeClass('opened');
	 		$sidebarSeconds.find('.submenu-opened').removeClass('submenu-opened');
	 		sidebarSecondsFLAG = false;
	 	})

	 	$sidebarSeconds.on('mouseenter', function(){
	 		$body.addClass('show-overlay');
	 		$sidebarSeconds.addClass('opened');
	 		$sidebarSeconds.find('.sidebar__submenu--first').addClass('submenu-opened');
	 	})
	 	$sidebarSeconds.on('mouseleave', function(){
	 		$sidebarSeconds.removeClass('opened');
	 		$sidebarSeconds.find('.submenu-opened').removeClass('submenu-opened');
	 		$body.removeClass('show-overlay');
	 		sidebarSecondsFLAG = false;
	 	});

	 	$sidebarThirds.on('mouseenter', function(){
	 		$body.addClass('show-overlay');
	 		$sidebarThirds.addClass('opened');
	 		$sidebarSeconds.addClass('opened');
	 		$sidebarSeconds.find('.sidebar__submenu--first').addClass('submenu-opened');
	 		$sidebarThirds.find('.sidebar__submenu--second').addClass('submenu-opened');
	 	});
	 	$sidebarThirds.on('mouseleave', function(){
	 		$sidebarThirds.removeClass('opened');
	 		$sidebarThirds.find('.submenu-opened').removeClass('submenu-opened');
	 		sidebarThirdsFLAG = false;
	 		$sidebarSeconds.removeClass('opened');
	 		$sidebarSeconds.find('.submenu-opened').removeClass('submenu-opened');
	 		sidebarSecondsFLAG = false;
	 		$body.removeClass('show-overlay');
	 	});

	 	// a11y setup


		let activeElement = document.activeElement;
		let activeMenu_l1 = null;
		let activeMenu_l2 = null;
		let activeMenu_lFlag = false;
	  $(document).on('keyup', function(e) {

	    if ( e.keyCode == window.KEYCODES.TAB ) {


	    	if ( document.activeElement.classList.contains('parent-has-submenu') ) {

	    		// first level of submenus - open secondary sidebar
	    		$(document.activeElement).parent().trigger('mouseenter');

	    		// second level of submenus - open third sidebar
	    		if ( document.activeElement.classList.contains('sub-menu__link-second') ) {
	    			if ( ! document.activeElement.classList.contains('sub-menu__last-second') ) {
	    				activeMenu_l2 = $(document.activeElement).parent().next('li').children('a');
	    			} else {
	    				activeMenu_l2 = activeMenu_l1;
	    				activeMenu_lFlag = true;
	    			}
	    			if ( ! activeMenu_l2 ) {
	    			}
	    		} else {
	    			activeMenu_l1 = $(document.activeElement).parent().next('li').children('a');
	    			if ( activeMenu_l1.length <= 0 ) {
	    				if ( $(document.activeElement).attr('data-type') == 'primary' ) {
	    					activeMenu_l1 = $('.secondary-menu').find('a').eq(0);
	    				} else if ( $(document.activeElement).attr('data-type') == 'secondary' ) {
	    					if ( $('.accounts-menu').length > 0 ) {
	    						activeMenu_l1 = $('.accounts-menu').find('a').eq(0);
	    					} else if ( $('.sidebar .localization-form__item').length > 0 ) {
	    						activeMenu_l1 = $('.sidebar .localization-form__item').eq(0).find('button').eq(0);
	    					} else {
	    						activeMenu_l1 = $('.sidebar .sidebar__search form');
	    					}
	    				}
	    			}
	    		}

	    	} else if ( activeElement.classList.contains('sub-menu__last-second') ) {

	    		// second submenu items
    			if ( ! activeElement.classList.contains('parent-has-submenu') || activeElement.classList.contains('ran-over') ) {
    				if ( activeMenu_l1.length > 0 ) {
	    				activeMenu_l1[0].focus();
    				}
    				$sidebarSeconds.trigger('mouseleave');
    			} else {
    				activeElement.classList.add('ran-over');
    			}

	    	} else if ( activeElement.classList.contains('sub-menu__last-third') ) {
    				if ( activeMenu_l2.length > 0 ) {
		    			activeMenu_l2[0].focus();
		    		}

				 		$sidebarThirds.removeClass('opened');
				 		$sidebarThirds.find('.submenu-opened').removeClass('submenu-opened');
				 		sidebarThirdsFLAG = false;

				 		if ( activeMenu_lFlag ) {
				 			activeMenu_lFlag = false;
	    				$sidebarSeconds.trigger('mouseleave');
				 		}

	    	}

	      activeElement = document.activeElement;

	    }
	  });

	  $(document).on('keydown', function(e){
	    if ( e.keyCode == window.KEYCODES.TAB ) {
	    	if ( activeElement.classList.contains('parent-has-submenu') ) {

	    		e.preventDefault();

	    		// focus on second level
	    		$sidebarSeconds.find('a').eq(0)[0].focus();

	    		// focus on third level
	    		if ( activeElement.classList.contains('sub-menu__link-second') ) {
	    			$sidebarThirds.find('a').eq(0)[0].focus();
	    		}

	  		} 
	  	}
	  });

	 	// Cart setup

	 	if ( ! $('body').hasClass('template-cart') && window.KINGDOMSettings.cart_action == 'overlay' ) {

		 	$('.sidebar__cart-handle, .sidebar__cart-close').on('click', (function(e){
				$('.sidebar__cart, .sidebar__cart .cart').css('height', window.innerHeight);
		 		e.preventDefault();
		 		if ( ! $('.sidebar__cart').hasClass('opened') ) {
		 			this.openSidebar('cart');
		 		} else {
		 			this.closeSidebar('cart');
		 		}
		 	}).bind(this))

		 	$('.sidebar__cart-handle').on('keyup', (function(e){
				if ( e.keyCode == window.KEYCODES.RETURN ) {
					$('.sidebar__cart .sidebar__cart-close')[0].focus();
				}
		 	}).bind(this));

		 	$('.sidebar__cart-close').on('keyup', (function(e){
				if ( e.keyCode == window.KEYCODES.RETURN && $('.sidebar__cart').hasClass('opened') ) {
		 			this.closeSidebar('cart');
				}
		 	}).bind(this));

		}

		// Mobile menu

		$('.sidebar__menu-handle, .sidebar__menus-close').on('click', (function(e){
			e.preventDefault();
			$('.sidebar__menus').removeClass('kill-overflow');
	 		if ( ! $('.sidebar__menus').hasClass('opened') ) {
		 		this.openSidebar('menu');
	 		} else {
	 			this.closeSidebar('menu');
	 		}
		}).bind(this));

		// Search

		if ( window.KINGDOMSettings.predictive_search_enabled == "false" ) {

			$('.sidebar__search-handle, .sidebar__search-close').on('click', (function(e){

				e.preventDefault();

		 		if ( ! $('.sidebar__search').hasClass('opened') ) {
		 			$('.sidebar__search').addClass('opened');
		 			$('.sidebar__search input[type="search"]').attr('placeholder', $('.sidebar__search input[type="search"]').data('responsive-placeholder'));
		 			setTimeout(function(){
		 				$('.sidebar__search input[type="search"]')[0].focus();
		 			}, 100);
		 		} else {
		 			$('.sidebar__search').removeClass('opened');
		 		}

			}).bind(this));

		} else {
			$('.sidebar__search-handle, .sidebar__search-close').on('click', (function(e){
				if ( window.getPseudoContent('.sidebar__search').indexOf('predictive-mobile') >= 0 ) {
					e.preventDefault();
			 		if ( ! $('.sidebar__search').hasClass('opened') ) {
			 			this.openSidebar('search');
			 		} else {
			 			this.closeSidebar('search');
			 		}
			 	}
			}).bind(this));
		}

		// closing each sidebar via overlay

	 	$('.cart-overlay-background').on('click', (function(){
	 		this.closeSidebar(this.opened);
	 	}).bind(this));

	 	// closing via esc key

		document.addEventListener('keydown', (function(e){
			if ( e.keyCode == window.KEYCODES.ESC ) {
				this.closeSidebar(this.opened);
				if ( $sidebarSeconds.length > 0 && $sidebarSeconds.hasClass('opened') ) {
					$sidebarSeconds.trigger('mouseleave');
				}
			}
		}).bind(this));

	 	var submenuLevel = 0;

	 	$('.sidebar__menus .sidebar__menu .has-submenu > a').each(function(){

		 	$(this).on('click', function(e){
		 		if ( $(window).width() <= 948 ) {
			 		e.preventDefault();
			 		e.stopPropagation();
			 		$('.sidebar__menus').addClass('kill-overflow');
			 		$('.sidebar__menus').scrollTop(0);
			 		if ( $(this).parent().hasClass('has-second-submenu') ) {
			 			submenuLevel = 2;
			 		} else {
			 			submenuLevel = 1;
			 		}
			 		$(this).parent().addClass('open-submenu');
			 		$(this).parent().parent().addClass('opened-submenu');
			 		$(this).closest('.sidebar__menus').addClass('opened-submenus');
			 		$(this).parent().parent().parent().siblings('nav').addClass('opened-other-submenu');
			 	}
		 	});

	 	});

	 	$('.sidebar__menus-back').on('click', function(e){
	 		if ( submenuLevel == 1 ) {
	 			submenuLevel = 0;
	 			$('.sidebar__menus').removeClass('opened-submenus');
	 			$('.sidebar__menus').find('nav.opened-other-submenu').removeClass('opened-other-submenu');
	 			$('.sidebar__menus').find('.opened-submenu').removeClass('opened-submenu');
	 			$('.sidebar__menus').find('.open-submenu').removeClass('open-submenu');
				$('.sidebar__menus').removeClass('kill-overflow');
	 		} else if ( submenuLevel == 2 ) {
	 			submenuLevel = 1;
	 			$('.has-second-submenu.open-submenu').parent().removeClass('opened-submenu');
	 			$('.has-second-submenu.open-submenu').removeClass('open-submenu');
	 		}

	 	});

	},

	openSidebar(type){

		this.opened = type;

		if ( type == 'filters' ) {
			$('.collection__filters').addClass('opened');
			$('.filters-overlay-background').addClass('show');
			this._mountA11YHelper($('.collection__filters')[0]);
		} else {
			if ( type == 'cart' ) {
				$('.sidebar__cart').addClass('opened');
				var translation = this.$sidebar[0].getBoundingClientRect().y * -1;
				this._mountA11YHelper($('.sidebar__cart')[0]);
				$('.sidebar__cart').css('transform', 'translateY(' + translation + 'px)');
			} else if ( type == 'menu' ) {
	 			$('.sidebar__menus').addClass('opened');
			} else if ( type == 'search' ) {
				$('.sidebar__search').addClass('opened');
	 			setTimeout(function(){
	 				$('.sidebar__search input[type="search"]')[0].focus();
	 			}, 100);
			}  
			$('.cart-overlay-background').addClass('show');
		}
 
		$('body').addClass('overflow-hidden');

	},

	closeSidebar(type){

		$('body').removeClass('overflow-hidden');

		$('.cart-overlay-background').removeClass('show');
		if ( type == 'cart' ) {
 			$('.sidebar__cart').removeClass('opened');
				this._unmountA11YHelper($('.sidebar__cart')[0]);
		} else if ( type == 'menu' ) {
 			$('.sidebar__menus').removeClass('opened');
		} else if ( type == 'search' ) {
 			$('.sidebar__search').removeClass('opened')
		} else if ( type == 'local-availability' ) {
			$('#StoreAvailabilityModal').removeClass('opened');
      $('.locals-overlay-background').removeClass('show');
		} else if ( type == 'filters' ) {
			$('.collection__filters').removeClass('opened');
			$('.filters-overlay-background').removeClass('show');
			this._unmountA11YHelper($('.collection__filters')[0]);
		}

	},

	_mountA11YHelper: function(sidebar, forcedFocus){

		let focusable = forcedFocus ? forcedFocus : sidebar.querySelectorAll('[tabindex="0"], button, [href], input:not([type="hidden"]), select, textarea, .regular-select-cover');

		let firstFocusable = focusable[0];
		let lastFocusable = focusable[focusable.length - 1];

		if ( sidebar.classList.contains('sidebar__cart') && ! sidebar.querySelector('.cart__form').classList.contains('cart--empty') ) {
			lastFocusable = focusable[focusable.length - 2];
		}

		this.A11Y_TAB_EVENT = (function(firstFocusable, lastFocusable, e){
		  let isTabPressed = (e.key === 'Tab' || e.keyCode === window.KEYCODES.TAB);
		  if (!isTabPressed) { 
		    return; 
		  }
		  if ( e.shiftKey ) /* shift + tab */ {
		    if (document.activeElement === firstFocusable) {
	     		lastFocusable.focus();
	        e.preventDefault();
	      }
	    } else /* tab */ {
		    if (document.activeElement === lastFocusable) {
	      	firstFocusable.focus();
	        e.preventDefault();
	      }
	    }
		}).bind(this, firstFocusable, lastFocusable)

 		sidebar.addEventListener('keydown', this.A11Y_TAB_EVENT);

	},

	_unmountA11YHelper: function(sidebar){
		sidebar.removeEventListener('keydown', this.A11Y_TAB_EVENT);
	},

	unmount: function() {
	 	window.removeEventListener('scroll', KING.Sidebar.SCROLL_StickySidebar);
		$(window).off('resize.sticky-sidebar');
	}

}

// Mount in page

$(document).ready(function(){
  KING.Sidebar.mount();
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-sidebar') ) {
    KING.Sidebar.mount();
    if ( $section.find('.localization-form__item').length > 0 ) {
	    KING.Localization.mount();
	  }
  }

}).on('shopify:section:unload', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-sidebar') ) {
    KING.Sidebar.unmount();
  }

}); 
window.cartFormAjax = function(){

	var $form = $('.cart__form');

	$('#cart').find('.cart-item:not(.ajax-init)').each(function(){

		var $item = $(this);
		$item.addClass('ajax-init');

		var $remove = $(this).find('.remove');
		$remove.data('href', $remove.attr('href'));
		$remove.removeAttr('href');

		var $qty = $(this).find('.qty');
		$qty.data('href', $qty.attr('data-href'));
		$qty.removeAttr('data-href');


		// Remove items

		$remove.on('click', function(e){
			e.preventDefault();
			updateCartQty($form, $item, 0);
		});

		// Update quantities

		$qty.on('input', window.debounce(function(e){
			e.preventDefault();
			e.target.blur();
			updateCartQty($form, $item, parseInt($qty.val()));
		}, 300)).on('click', function(e){
			e.target.select();
		});

	});

}

window.cartFormAjax();

function updateCartQty($form, $item, newQty) {

	$form.addClass('processing');
	$form.find('.alert').remove();

  fetch(window.KINGDOMSettings.routes.cart_change_url + '.js', {
    body: JSON.stringify({
      id: $item.data('id'),
      quantity: newQty
    }),
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {

	  if ( response.ok ) { 

	  	fetch(window.KINGDOMSettings.routes.cart_url, {
        credentials: 'same-origin',
        method: 'GET'
      }).then(function (response) {

        response.text().then(function(html) {

        	var $html = $(html);

					if ( $html.find('.sidebar__cart-handle .count').html() == '0' ) {
						$('.cart__title').html($('.cart__title').data('cart-empty'));
						$('.cart__form').addClass('cart--empty');
					} else {
						$('.cart__title').html($html.find('.cart__title').html());
						$('.cart__form').html($html.find('.cart__form').html());
						window.cartFormAjax();
					}

					$('.sidebar__cart-handle .count').html($html.find('.sidebar__cart-handle .count').html());
					$form.removeClass('processing');

					if ( newQty > parseInt($html.find('.cart-item[data-id="' + $item.data('id') + '"]').data('qty')) ) {
						$form.prepend('<span class="alert alert--error">' + window.KINGDOMSettings.locales.cart_add_error.replace('{{ title }}', $item.data('title')) + '</span>');	
					} else if ( newQty == 0 ) {
						$item.remove();
					}

        });

      });

	  } else {
			$form.prepend('<span class="alert alert--error">' + window.KINGDOMSettings.locales.cart_general_error + '</span>');	
			$form.removeClass('processing');
	  }

  });

}
KING.Localization = {

	mount: function() {

		$('.localization-form__item .regular-select-cover').each(function(){

			if ( ! $(this).hasClass('init') ) {

				$(this).addClass('init');

				/*var widthBasedOnLocation = $(this).data('location') == 'footer' ? 120 : 100;
				var selectContentWidth = Math.ceil($(this).find('.regular-select-content').outerWidth(true)),
						selectInnerWidth = Math.ceil($(this).find('.regular-select-inner').outerWidth(true));
				$(this).attr('style', 'width: ' + ( Math.max(widthBasedOnLocation, Math.max(selectInnerWidth, selectContentWidth)) + 1 ) + 'px !important');*/

				$(this).on('click', function(e){

					e.stopPropagation();
					e.preventDefault();
					var _this = $(this)[0];

					$('.regular-select-cover.content-opened').each(function(){
						if ( $(this)[0] != _this ) {
							$(this).removeClass('content-opened');
							$(this).parent().css('zIndex', 9);
						}
					});

					let $content = $('#' + $(this).attr('aria-controls'));

					if ( ! $content.hasClass('content-opened') ) {

						$content.addClass('content-opened');
						$(this).attr('aria-expanded', 'true');
						$content.parent().css('zIndex', 1000);
						var $selectHandle = $(this);

						if ( $content.hasClass('invert-with-fixed') ) {
							if ( $content[0].getBoundingClientRect().y + $content.height() + 55 > window.innerHeight ) {
								$content.addClass('invert');
							}
						} else {
							if ( $content.offset().top + $content.height() + 55 > $('html').height() ) {
								$content.addClass('invert');
							}
						}

						$(window).on('click.select-helper', function(){
							if ( $selectHandle.hasClass('content-opened') ) {
								$selectHandle.removeClass('content-opened').removeClass('invert');
								$selectHandle.parent().css('zIndex', 9);
							}
						});

					} else {
						$(this).attr('aria-expanded', 'false');
						$content.parent().css('zIndex', 9);
						$content.removeClass('content-opened').removeClass('invert');
						$(window).off('click.select-helper');
					}

				}).on('keydown', function(e){
					if ( e.keyCode == window.KEYCODES.RETURN ) {
						if ( ! $(this).hasClass('opened-with-tab') ) {
							$(this).addClass('opened-with-tab');
							$(this).trigger('click');
							$(this).find('.regular-select-item').attr('tabindex', '0');
						}
					} else if ( e.keyCode == window.KEYCODES.ESC ) {
						if ( $(this).attr('aria-expanded') == 'true' ) {
							$(this).attr('aria-expanded', 'false');
							let $content = $('#' + $(this).attr('aria-controls'));
							$content.removeClass('content-opened').removeClass('invert');
							$content.parent().css('zIndex', 9);
						}
					}
				});

			}

		});

	}

}


// Mount in page

$(document).ready(function(){
  if ( $('.localization-form__item').length > 0 ) {
    KING.Localization.mount();
  }
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-footer') && $section.find('.localization-form__item').length > 0 ) {
    KING.Localization.mount();
  }

});
KING.Collection = {

	mount: function(collection) {

  	var _this = {};

		_this.$collection = $(collection);

		if ( _this.$collection.hasClass('collection--slider') ) {

			new Flickity(_this.$collection[0], {
				cellSelector: '.product-item',
	  		cellAlign: 'left',
	  		groupCells: true,
	  		prevNextButtons: false,
	  		pageDots: true
			});

	  }

	  if ( _this.$collection.hasClass('collection--masonry') ) {
	  	
	  	_this.$collection.find('.product-item').css('position', 'absolute');
	  	var masonry = new MiniMasonry({
	  		container: '#collection-portfolio',
	  		gutter: 0,
	  		surroundingGutter: false
	  	});
	  }

	  _this.$collection.find('.product-item a').on('click', function(e){
	  	$(this).addClass('hover');
	  });

	}

}

// Mount in page

if ( $('.mount-collection').length > 0 ) {
	$('.mount-collection').each(function(){
		KING.Collection.mount($(this));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.find('.mount-collection').length > 0 ) {
		KING.Collection.mount($section.find('.mount-collection'));
	}

});
KING.ProductMedia = {

	_productHostedVideos: {},
	_productYouTubeVideos: {},
	_productVimeoVideos: {},
	_productModels: {},

	_plyrStylesLoaded: false,
	_modelStylesLoaded: false,
	_videoLooping: false,

	mount: function($product) {

		var productData = window.productData[$product.data('id')];
		this._videoLooping = productData.$productCarousel.data('video-looping');

		productData.$productGalleryItem.each((function(i, item){

			// init $item variables, media objects

			switch ( $(item).data('product-media-type') ) {
				case 'video': 
					this._productHostedVideos[$(item).data('media-id')] = {
						$item: $(item),
						$carousel: productData.$productCarousel,
						flkty: productData.productFlkty,
						player: null,
						init: false
					}
					break;
				case 'external_video': 
					if ( $(item).data('video-host') == 'vimeo' ) {
						this._productVimeoVideos[$(item).data('media-id')] = {
							$item: $(item),
							$carousel: productData.$productCarousel,
							flkty: productData.productFlkty,
							player: null,
							init: false
						}
					} else if ( $(item).data('video-host') == 'youtube' ) {
						this._productYouTubeVideos[$(item).data('media-id')] = {
							$item: $(item),
							$carousel: productData.$productCarousel,
							flkty: productData.productFlkty,
							player: null,
							init: false
						}
					}
					break;
				case 'model': 
					this._productModels[$(item).data('media-id')] = {
						$item: $(item),
						$carousel: productData.$productCarousel,
						flkty: productData.productFlkty,
						player: null,
						init: false
					}
			}

		}).bind(this));

		// check video array

		if ( Object.keys(this._productHostedVideos).length > 0 ) {
			if ( ! Shopify.Plyr ) {
				window.Shopify.loadFeatures([
	        {
	          name: 'video-ui',
	          version: '1.0',
	          onLoad: (function(){
	          	this._mountSelfHostedVideos();
	          }).bind(this)
	        }
	      ]);
        this.LibraryLoader.load('plyrShopifyStyles', (function(){
        	this._plyrStylesLoaded = true;
        	$('.plyr').addClass('lazyloaded');
					$('.plyr').find('video').addClass('loaded');
					setTimeout(function(){
						$('.plyr').addClass('reset-transitions');
					}, 50);
        }).bind(this));
			} else {
      	this._mountSelfHostedVideos();
			}
		}

		// check YouTube array

		if ( Object.keys(this._productYouTubeVideos).length > 0 ) {
			if ( ! window.YT ) {
        this.LibraryLoader.load('youtubeSdk');
			} else {
				KING.ProductMedia._mountYouTubeVideos();
			}
		}

		// check Vimeo array

		if ( Object.keys(this._productVimeoVideos).length > 0 ) {
			if ( ! window.Vimeo ) {
        this.LibraryLoader.load('vimeoSdk', (function(){
					KING.ProductMedia._mountVimeoVideos();
        }).bind(this));
			} else {
				KING.ProductMedia._mountVimeoVideos();
			}
		}

		// check models array

		var $xrButton = $product.find('.product-gallery__view-in-space');

		if ( Object.keys(this._productModels).length > 0 ) {

			if ( ! Shopify.ModelViewerUI ) {
				window.Shopify.loadFeatures([
	        {
	          name: 'model-viewer-ui',
	          version: '1.0',
	          onLoad: (function(){
	          	this._mountModels();
	          }).bind(this)
	        }
	      ]);
				this.LibraryLoader.load('modelViewerUiStyles', (function(){
					this._modelStylesLoaded = true;
					$('.shopify-model-viewer-ui').addClass('lazyloaded');
				}).bind(this));
			} else {
				this._mountModels();
			}

			if ( ! Shopify.ShopifyXR ) {
				window.Shopify.loadFeatures([
		      {
		        name: 'shopify-xr',
		        version: '1.0',
		        onLoad: (function(){

    					if ( ! window.ShopifyXR ) {
			        	document.addEventListener('shopify_xr_initialized', (function(){
		          		this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
			        	}).bind(this));
			        } else {
		          	this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
			        }

		        	document.addEventListener('shopify_xr_launch', (function(){
		        		this._triggerAutoPlayOFF(productData.$productCarousel);
		        	}).bind(this));

	          }).bind(this)
		      }
	      ]);
			} else {
      	this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
			}

			// bind flickity events for models

			if ( $xrButton.length > 0 ) {
				productData.productFlkty.on('change', (function(i){
					if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'model' ) {
						$xrButton.attr('data-shopify-model3d-id', productData.$productGalleryItem.eq(i).data('media-id'));
					} else {
						$xrButton.attr('data-shopify-model3d-id', $xrButton.data('shopify-first-model3d-id'));
					}
				}).bind(this));
			}

			productData.productFlkty.on('settle', (function(i){
				if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'model' ) {
					this._triggerAutoPlayON(productData.$productGalleryItem.eq(i));
				}
			}).bind(this));

			productData.productFlkty.on('staticClick', (function(e, p, elm, i){
				if ( $(elm).data('product-media-type') == 'model' ) {
					if ( $(elm).find('model-viewer').hasClass('shopify-model-viewer-ui__disabled') ) {
						this._triggerAutoPlayON($(elm));
					}
				}
			}).bind(this));

		}

		// bind flickity events for all media

		if ( productData.$productCarousel.data('size') > 1 ) {

			var oldIndex = productData.productFlkty.selectedIndex;
			productData.productFlkty.on('change', (function(i){

				if ( productData.$productGalleryItem.eq(oldIndex).data('product-media-type') == 'external_video' ) {
					productData.$productGalleryItem.eq(i).find('iframe').attr('tabindex', '-1');
				}
				this._triggerAutoPlayOFF(productData.$productCarousel);
				oldIndex = i;

				if ( productData.$productGalleryItem.eq(i).data('product-media-type') != 'model' ) {
					this._triggerAutoPlayON(productData.$productGalleryItem.eq(i));
				}
				if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'external_video' ) {
					productData.$productGalleryItem.eq(i).find('iframe').attr('tabindex', '0');
				}

			}).bind(this));

			productData.productFlkty.on('dragStart', function(e){
				$(e.currentTarget).addClass('dragging');
			});
			productData.productFlkty.on('dragEnd', function(e){
				$(e.currentTarget).removeClass('dragging');
			});

		}

	},

	_triggerAutoPlayON: function($slide) {
		if ( $slide.hasClass('init-js-actions') ) {
			if ( $('body').hasClass('no-touch') && $(window).width() > 640 )  {
				switch ( $slide.data('product-media-type') ) {
					case 'video':
						this._productHostedVideos[$slide.data('media-id')].player.play();
						break;
					case 'external_video':
						if ( $slide.data('video-host') == 'youtube' ) {
							this._productYouTubeVideos[$slide.data('media-id')].player.playVideo();
						} else if ( $slide.data('video-host') == 'vimeo' ) {
							this._productVimeoVideos[$slide.data('media-id')].player.play();
						}
						break;
					case 'model':
						this._productModels[$slide.data('media-id')].player.play();
						break;
				}
			}
		}
	},

	_triggerAutoPlayOFF: function($slider) {
		$slider.find('.product-gallery__item').each((function(i, slide){
			if ( $(slide).hasClass('init-js-actions') ) {
				switch ( $(slide).data('product-media-type') ) {
					case 'video':
						this._productHostedVideos[$(slide).data('media-id')].player.pause();
						break;
					case 'external_video':
						if ( $(slide).data('video-host') == 'youtube' && this._productYouTubeVideos[$(slide).data('media-id')].player != null ) {
							this._productYouTubeVideos[$(slide).data('media-id')].player.pauseVideo();
						} else if ( $(slide).data('video-host') == 'vimeo' && this._productVimeoVideos[$(slide).data('media-id')].player != null ) {
							this._productVimeoVideos[$(slide).data('media-id')].player.pause();
						}
						break;
					case 'model':
						this._productModels[$(slide).data('media-id')].player.pause();
						break;
					}
			}
		}).bind(this));
		
	},

	_mountModels: function() {

		for (const key in this._productModels) {

			let obj = this._productModels[key];

			if ( ! obj.init ) {

				obj.init = true;

				let $model = obj.$item.find('model-viewer')[0],
						model = new Shopify.ModelViewerUI(obj.$item.find('model-viewer')[0]);

				obj.player = model;

				if ( obj.$carousel.data('size') > 1 ) {
					$model.addEventListener('shopify_model_viewer_ui_toggle_play', (function(e){
						this._updateFlickityDraggable(obj.flkty, false);
					}).bind(this));
					$model.addEventListener('shopify_model_viewer_ui_toggle_pause', (function(e) {
						this._updateFlickityDraggable(obj.flkty, true);
					}).bind(this));
				}

				if ( this._modelStylesLoaded ) {
					obj.$item.find('.shopify-model-viewer-ui').addClass('lazyloaded');
				}
				obj.$item.addClass('init-js-actions');

			}

		}

	},

	_setupShopifyXr: function(modelsJson) {
		window.ShopifyXR.addModels(modelsJson);
    window.ShopifyXR.setupXRElements();
	},

	_updateFlickityDraggable: function(flkty, draggable) {
		flkty.options.draggable = draggable;
  	flkty.updateDraggable();
	},

	_mountSelfHostedVideos: function() {

		for (const key in this._productHostedVideos) {

			let obj = this._productHostedVideos[key];

			if ( ! obj.init ) {

				obj.init = true;

				let player = new Shopify.Plyr(obj.$item.find('video')[0], {
					loop: {
						active: this._videoLooping
					}
				});
				obj.player = player;

				player.on('ready', (function($item, e){
					if ( this._plyrStylesLoaded ) {
						$item.addClass('init-js-actions');
						$(e.target).addClass('lazyloaded');
						$(e.target).find('video').addClass('loaded');
						setTimeout((function($player){
							$player.addClass('reset-transitions');
						}).bind(this, $(e.target)), 50);
					} 
				}).bind(this, obj.$item));

				if ( obj.$carousel.data('size') > 1 ) {

					player.on('play', (function(e){
						if ( $(e.target).closest('.product-gallery__item').index() == obj.flkty.selectedIndex ) {
							this._updateFlickityDraggable(obj.flkty, false);
						}
					}).bind(this));

					player.on('pause', (function(e){
						if ( $(e.target).closest('.product-gallery__item').index() == obj.flkty.selectedIndex ) {
							this._updateFlickityDraggable(obj.flkty, true);
						}
					}).bind(this));

				}

			}

		}

	},

	_mountYouTubeVideos: function() {

		for (const key in this._productYouTubeVideos) {

			let obj = this._productYouTubeVideos[key];

			if ( ! obj.init ) {

				obj.init = true;

				let player = new YT.Player(obj.$item.find('iframe')[0], {
					events: {
						'onStateChange': (function(e){
							if ( e.data === 0 && this._videoLooping ) {
								e.target.seekTo(0);
							}
						}).bind(this),
						'onReady': (function($item, $iframe){
							$item.addClass('init-js-actions');
							$iframe.parent().addClass('lazyloaded');
							$iframe.attr('tabindex', '-1');
						}).bind(this, obj.$item, obj.$item.find('iframe'))
					}
				});
				obj.player = player;

			}

		}

	},
	
	_mountVimeoVideos: function() {

		for (const key in this._productVimeoVideos) {

			let obj = this._productVimeoVideos[key];

			if ( ! obj.init ) {

				obj.init = true;

				let player = new Vimeo.Player(obj.$item.find('iframe')[0]);
				player.ready().then(function(){
					obj.$item.addClass('init-js-actions');
					obj.$item.find('iframe').parent().addClass('lazyloaded');
					obj.$item.find('iframe').attr('tabindex', '-1');
				});
				obj.player = player;

			}

		}

	},

	unmount: function($gallery) {
		$gallery.find('.product-gallery__item').each((function(i, item){
			delete this._productYouTubeVideos[$(item).data('media-id')];
			delete this._productModels[$(item).data('media-id')];
			delete this._productHostedVideos[$(item).data('media-id')];
		}).bind(this));
	},

	LibraryLoader: (function() {

		var types = {
	    link: 'link',
	    script: 'script'
	  };

	  var status = {
	    requested: 'requested',
	    loaded: 'loaded'
	  };

	  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

	  var libraries = {
	    youtubeSdk: {
	      tagId: 'youtube-sdk',
	      src: 'https://www.youtube.com/iframe_api',
	      type: types.script
	    },
	    vimeoSdk: {
	    	tagId: 'vimeo-sdk',
	    	src: 'https://player.vimeo.com/api/player.js',
	    	type: types.script
	    },
	    plyrShopifyStyles: {
	      tagId: 'plyr-shopify-styles',
	      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
	      type: types.link
	    },
	    modelViewerUiStyles: {
	      tagId: 'shopify-model-viewer-ui-styles',
	      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
	      type: types.link
	    }
	  };

	  function load(libraryName, callback) {
	    var library = libraries[libraryName];

	    if (!library) return;
	    if (library.status === status.requested) return;

	    callback = callback || function() {};
	    if (library.status === status.loaded) {
	      callback();
	      return;
	    }

	    library.status = status.requested;

	    var tag;

	    switch (library.type) {
	      case types.script:
	        tag = createScriptTag(library, callback);
	        break;
	      case types.link:
	        tag = createLinkTag(library, callback);
	        break;
	    }

	    tag.id = library.tagId;
	    library.element = tag;

	    var firstScriptTag = document.getElementsByTagName(library.type)[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	  }

	  function createScriptTag(library, callback) {
	    var tag = document.createElement('script');
	    tag.src = library.src;
	    tag.addEventListener('load', function() {
	      library.status = status.loaded;
	      callback();
	    });
	    return tag;
	  }

	  function createLinkTag(library, callback) {
	    var tag = document.createElement('link');
	    tag.href = library.src;
	    tag.rel = 'stylesheet';
	    tag.type = 'text/css';
	    tag.addEventListener('load', function() {
	      library.status = status.loaded;
	      callback();
	    });
	    return tag;
	  }

	  return {
	    load: load
	  };
	})()

}
KING.Search = {

	$searchForm: null,
	$searchInput: null,
	$searchResults: null,
	$searchMore: null,

	$sidebarOverlay: null,

	mount: function(){

		this.$searchForm = $('.sidebar__search');
		this.$searchInput = this.$searchForm.find('input[type="search"]');
		this.$searchResults = $('.sidebar__search-results');
		this.$searchMore = $('.sidebar__search-link');

		this.$sidebarOverlay = $('.cart-overlay-background');

		$(window).on('resize.search', (function(){
			this.$searchResults.css('maxHeight', document.documentElement.clientHeight - 170);
		}).bind(this));

		// form animation

		this.$searchInput.on('click', (function(e){

			if ( ! this.$searchForm.hasClass('open-search') ) {

				$('.sidebar').addClass('no-transforms');
				this.$searchForm.addClass('open-search');
				this.$searchResults.addClass('show');
				this.$searchMore.addClass('show');
 				$('body').addClass('overflow-hidden');

				this.$sidebarOverlay.addClass('show').on('click.search-close', (function(){
					this._closeSearch();
				}).bind(this));

			}

		}).bind(this));	

		this.$searchForm.find('.sidebar__search-close').on('click', (function(){
			if ( window.getPseudoContent('.sidebar__search').indexOf('predictive-mobile') < 0 ) {
				this._closeSearch();
			}
		}).bind(this));

		// form function

		var searchInputValue = this.$searchInput.val();
		this.$searchInput.on('keyup', window.debounce((function(e){

			if ( searchInputValue != this.$searchInput.val() ) {
				searchInputValue = this.$searchInput.val();

				var query = this.$searchForm.find('input[type="search"]').val();

				if ( query != '' ) {

					if ( ! this.$searchResults.find('.search-item.blank').length > 0 ) {

						this.$searchResults.html('<a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a>');
					}

					this.$searchMore.html('<a class="search-more button button--solid" href="' + window.KINGDOMSettings.routes.search_url + '?q=' + encodeURIComponent(query) + '&options[prefix]=last">' + window.KINGDOMSettings.locales.search_search_for_html.replace('{{ terms }}', window._htmlEscape(query)) + '</a>');

				} else {
					this.$searchResults.html('');
					this.$searchMore.html('');
			  	this.$searchMore.removeClass('push-me');
				}

				var searchDOM = '';

				// new call with xhr

				if ( query != '' ) {

					var configParams = window.objectToQueryParams({
						resources: {
							type:"product,collection" + ( window.KINGDOMSettings.predictive_search_include_pages == "true" ? ",page" : "" ) + ( window.KINGDOMSettings.predictive_search_include_articles == "true" ? ",article" : "" ),
							limit: 4
						}
					});

					var xhr = new XMLHttpRequest();

			    xhr.onreadystatechange = (function() {
			      if (xhr.readyState !== XMLHttpRequest.DONE) {
			        return;
			      }

			      var contentType = xhr.getResponseHeader('Content-Type');

			      if (xhr.status === 200) {
			        try {

			          var response = JSON.parse(xhr.responseText);

			          var productSuggestions = response.resources.results.products,
					  		articleSuggestions = response.resources.results.articles,
					  		pageSuggestions = response.resources.results.pages,
					  		collectionSuggestions = response.resources.results.collections;

							  if ( productSuggestions && productSuggestions.length > 0 ) {

							  	productSuggestions.forEach(function(item, i){

										searchDOM += '<a class="search-item ' + ( i == 0 ? 'first' : '' ) + '" href="' + item.url + '" title="' + item.title + '"><div class="thumbnail">' + ( item.featured_image.url != null ? '<img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + ' 80w, ' + window.getSizedImageUrl(item.featured_image.url, '160x180_crop_center') + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" />' : '<span class="onboarding-svg">' + window.KINGDOMSettings.search_placeholder_image + '</span>' ) + '</div><div class="content"><h3 class="title">' + item.title + '</h3><span class="caption">';

									  if ( window.KINGDOMSettings.predictive_search_show_vendor == "true" ) {
									  	searchDOM += '<span class="vendor">' + window.KINGDOMSettings.locales.search_prefix_by + ' ' + item.vendor + '</span>';
									  }

									  if ( window.KINGDOMSettings.predictive_search_show_price == "true" ) {
									  	searchDOM += '<span class="price">' + theme.Currency.formatMoney(item.price, window.KINGDOMSettings.shop_money_format);
									  	if ( parseInt(item.compare_at_price_max) > parseInt(item.price_min) ) {
									  		searchDOM += '<span class="st">' + theme.Currency.formatMoney(item.compare_at_price_max, window.KINGDOMSettings.shop_money_format) + '</span>';
									  	}
									  	searchDOM += '</span>';
									  }

									  searchDOM += '</span></div></a>';

							  	});

								} 

								if ( collectionSuggestions && collectionSuggestions.length > 0 ) {
									searchDOM += '<span class="search-title">' + window.KINGDOMSettings.locales.search_collection_results_title + '</span>';
							  	collectionSuggestions.forEach(function(item, i){
							  		searchDOM += '<a class="search-item ' + ( i == 0 ? 'first' : '' ) + '" href="' + item.url + '" title="' + item.title + '"><div class="thumbnail">' + ( item.featured_image.url != null ? '<img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + ' 80w, ' + window.getSizedImageUrl(item.featured_image.url, '160x180_crop_center') + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" />' : '<span class="onboarding-svg">' + window.KINGDOMSettings.search_placeholder_image + '</span>' ) + '</div><div class="content"><h3 class="title">' + item.title + '</h3></div></a>';
							  	});
								}

							  if ( articleSuggestions && articleSuggestions.length > 0 ) {
							  	searchDOM += '<span class="search-title">' + window.KINGDOMSettings.locales.search_article_results_title + '</span>';
							  	articleSuggestions.forEach(function(item, i){
							  		searchDOM += '<a class="search-item ' + ( i == 0 ? 'first ' : '' ) + ( item.featured_image.url != null ? '' : 'article' ) + '" href="' + item.url +'">' + ( item.featured_image.url != null ? '<div class="thumbnail"><img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + ' 80w, ' + window.getSizedImageUrl(item.featured_image.url, '160x180_crop_center') + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" /></div>' : '' ) + '<div class="content"><h3 class="title">' + item.title + '</h3>' + '<span class="caption"><span class="vendor" style="opacity: .66">' + window.formatTime('%b %d, %Y', item.published_at) + '</span></span>' + '</div></a>';
							  	});
							  }

							  if ( pageSuggestions && pageSuggestions.length > 0 ) {
							  	searchDOM += '<span class="search-title">' + window.KINGDOMSettings.locales.search_page_results_title + '</span>';
							  	pageSuggestions.forEach(function(item, i){
							  		searchDOM += '<a class="search-item ' + ( i == 0 ? 'first' : '' ) + ' article" href="' + item.url +'"><div class="content"><h3 class="title">' + item.title + '</h3>' + ( item.body != '' ? '<span class="caption"><span class="vendor">' + item.body.replace( /(<([^>]+)>)/ig, '').trim().replace('&nbsp;', '').slice(0, 100) + '...' + '</span></span>' : '' ) + '</div></a>';
							  	});
							  }

							  this.$searchResults.html(searchDOM);
							  if ( searchDOM == '' ) {
							  	this.$searchMore.addClass('push-top');
							  } else {
							  	this.$searchMore.removeClass('push-top');
							  }

			        } catch(error) {

			        }

			        return;

			      } else {

			      }

			      return;

			    }).bind(this);

			    xhr.open(
			      'get',
			      window.KINGDOMSettings.routes.search_url + '/suggest.json?q=' + encodeURIComponent(query) + '&' + configParams
			    );

			    xhr.setRequestHeader('Content-Type', 'application/json');

			    xhr.send(); 

			  }

			}

		}).bind(this), 100));

	},

	_closeSearch: function(){
		this.$searchForm.removeClass('open-search');
		this.$searchResults.removeClass('show');
		this.$searchMore.removeClass('show');
		$('.sidebar').removeClass('no-transforms');
		$('body').removeClass('overflow-hidden');
		this.$sidebarOverlay.removeClass('show').off('click.search-close');
	}


}

// Mount in page

if ( window.KINGDOMSettings.predictive_search_enabled == "true" && $('.sidebar .search-form').length > 0 ) {
	KING.Search.mount();
}
KING.SharePopup = {
	mount: function(){
		const modal = basicLightbox.create(document.querySelector('#share-popup'));
		$('.share-link').on('click', function(e){
			modal.show(function(){
				$('.share-popup').find('.basicLightboxClose').on('click', function(){
					modal.close();
				});
			});
		}).on('keydown', function(e){
			if ( e.keyCode == window.KEYCODES.RETURN ) {
				modal.show();
				KING.Sidebar._mountA11YHelper($('.share-popup')[0]);
				setTimeout(function(){
					$('.share-popup').find('a').eq(0)[0].focus();
					$('.share-popup').find('.basicLightboxClose').on('keydown', function(e){
						if ( e.keyCode == window.KEYCODES.RETURN ) {
							modal.close();
						}
					});
				}, 50);
			}
		})
	}
}

// Mount in page

$(document).ready(function(){
	if ( $('.share-link').length > 0 ) {
		KING.SharePopup.mount();
	}
});

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.find('.share-link').length > 0 ) {
		KING.SharePopup.mount();
	}

});
// filtering tasks

KING.Collection.mountFilters = function(){

	if ( ! $('body').hasClass('template-collection-portfolio') ) {
		window.KingdomInitFilters();
		window.KingdomInitSort();	
		window.KingdomInitFilterSortApply();
	}

	if ( $('.filters-overlay-background').length <= 0 ) {
		$('body').append('<div class="filters-overlay-background" />');
	}

	$('.option select').each(function(){
		window.styledSelectUpgraded($(this), true);
	});

	$('.collection__filters-close').on('click', function(e){
		e.preventDefault();
		if ( $('.collection__filters').hasClass('opened') ) {
 			KING.Sidebar.closeSidebar('filters');
		}
	});

	$('#collection-filters-handle').on('click', function(e){
		e.preventDefault()
		if ( ! $('.collection__filters').hasClass('opened') ) {
 			KING.Sidebar.openSidebar('filters');
		}
	}).on('keyup', function(e){
		if ( e.keyCode == window.KEYCODES.RETURN ) {
			$('.collection__filters .collection__filters-close')[0].focus();
		}
 	});

	$('.filters-overlay-background').on('click', function(e){
 			KING.Sidebar.closeSidebar('filters');
	});

}

// Mount in page

$(document).ready(function(){
	if ( $('body').hasClass('template-collection') ) {
		KING.Collection.mountFilters();
	}
});

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.find('.mount-collection-filters').length > 0 ) {
		KING.Collection.mountFilters();
	}

});
/* ---- 
	Product Page Helpers
	---- */

window.productData = {};

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

/* ---- 
	Money currency format
	---- */

window.theme = window.theme || {};
theme.Currency = (function() {
  var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {

    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {

    	if ( precision != undefined ) {
    		precision = precision;
    	} else {
    		precision = 2;
    	}

      thousands = thousands || ',';
      decimal = decimal || '.';


      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();

// ---->> Store local pickup availability <<

theme.StoreAvailability = (function() {
  var selectors = {
    storeAvailabilityModalOpen: '[data-store-availability-modal-open]',
    storeAvailabilityModalProductTitle:
      '[data-store-availability-modal-product-title]',
    storeAvailabilityUnitSystem: '[data-unit-system]',
    storeAvailabilityLocationDistance: '[data-distance]',
    storeAvailabilityDistanceUnit: '[data-distance-unit]'
  };

  var classes = {
    hidden: 'hide'
  };

  function StoreAvailability(container) {
    this.container = container;
    this.body = document.querySelector('body');
  }

  StoreAvailability.prototype = Object.assign({}, StoreAvailability.prototype, {
    updateContent: function(variantId, productTitle) {
      var options = {
        maximumAge: 3600000, // 1 hour
        timeout: 5000
      };
      var self = this;
      this._fetchStoreAvailabilities(variantId, productTitle);
    },

    clearContent: function() {
      this.container.innerHTML = '';
      if ( document.getElementById('StoreAvailabilityModal') ) {
        document.getElementById('StoreAvailabilityModal').remove();
      }
    },

    _useGeolocation: function(position, variantId, productTitle) {
      var coordinates = position.coords;
      var latitude = coordinates.latitude;
      var longitude = coordinates.longitude;
      if (window.cookiesEnabled()) {
        var latitudeFromCookie = window.getCookie('latitude');
        var longitudeFromCookie = window.getCookie('longitude');
        if (
          latitudeFromCookie &&
          longitudeFromCookie &&
          parseFloat(latitudeFromCookie) === latitude &&
          parseFloat(longitudeFromCookie) === longitude
        ) {
          this._fetchStoreAvailabilities(
            variantId,
            productTitle,
            latitude,
            longitude
          );
        } else {
          var oneHour = 1 / 24;
          window.setCookie('latitude', latitude, oneHour);
          window.setCookie('longitude', longitude, oneHour);
          this._setBuyerLocation(latitude, longitude, variantId, productTitle);
        }
      } else {
        this._fetchStoreAvailabilities(variantId, productTitle);
      }
    },

    _setBuyerLocation: function(latitude, longitude, variantId, productTitle) {
      var self = this;
      fetch('/localization.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: latitude, longitude: longitude })
      }).then(function() {
        self._fetchStoreAvailabilities(
          variantId,
          productTitle,
          latitude,
          longitude
        );
      });
    },

    _fetchStoreAvailabilities: function(
      variantId,
      productTitle,
      latitude,
      longitude
    ) {
      var variantSectionUrl =
         this.container.dataset.baseUrl +
          '/variants/' +
          variantId +
          '/?section_id=store-availability';
      this.clearContent();
      var self = this;
      fetch(variantSectionUrl)
        .then(function(response) {
          return response.text();
        })
        .then(function(storeAvailabilityHTML) {
          self.clearContent();
          if (storeAvailabilityHTML.trim() === '') {
            return;
          }

          var storeAvailabilityDOM = new DOMParser().parseFromString(storeAvailabilityHTML, 'text/html');

          if ( storeAvailabilityDOM.getElementById('StoreAvailabilityModal') ) {
            self.body.appendChild(storeAvailabilityDOM.getElementById('StoreAvailabilityModal'));
          }
          self.container.appendChild(storeAvailabilityDOM.getElementById('StoreAvailability'));

          var storeAvailabilityModalOpen = self.container.querySelector(
            selectors.storeAvailabilityModalOpen
          );
          // Only create modal if open modal element exists
          if (!storeAvailabilityModalOpen) {
            return;
          } else {

            var StoreAvailabilityModal = document.getElementById('StoreAvailabilityModal');
            storeAvailabilityModalOpen.addEventListener('click', function(e){
              e.preventDefault();
              if ( ! StoreAvailabilityModal.classList.contains('opened') ) {
                StoreAvailabilityModal.classList.add('opened');
                document.querySelector('.locals-overlay-background').classList.add('show');
                KING.Sidebar.opened = 'local-availability';
              }
            });

            StoreAvailabilityModal.querySelector('.localization__filters-close').addEventListener('click', function(e){
              if ( StoreAvailabilityModal.classList.contains('opened') ) {
                StoreAvailabilityModal.classList.remove('opened');
                document.querySelector('.locals-overlay-background').classList.remove('show');
              }
            });
            document.querySelector('.locals-overlay-background').addEventListener('click', function(e){if ( StoreAvailabilityModal.classList.contains('opened') ) {
                StoreAvailabilityModal.classList.remove('opened');
                document.querySelector('.locals-overlay-background').classList.remove('show');
              }
            });

          }

          self._updateProductTitle(productTitle);
          if (latitude && longitude) {
            self._updateLocationDistances(latitude, longitude);
          } else {
            self._hideDistanceUnits();
          }
        });
    },

    _updateProductTitle: function(productTitle) {
      var storeAvailabilityModalProductTitle = this.body.querySelector(
        selectors.storeAvailabilityModalProductTitle
      );
      storeAvailabilityModalProductTitle.textContent = productTitle;
    },

    // Haversine Distance
    // The haversine formula is an equation giving great-circle distances between
    // two points on a sphere from their longitudes and latitudes
    _calculateDistance: function(
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      unitSystem
    ) {
      var dtor = Math.PI / 180;
      var radius = unitSystem === 'metric' ? 6378.14 : 3959;

      var rlat1 = latitude1 * dtor;
      var rlong1 = longitude1 * dtor;
      var rlat2 = latitude2 * dtor;
      var rlong2 = longitude2 * dtor;

      var dlon = rlong1 - rlong2;
      var dlat = rlat1 - rlat2;

      var a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(rlat1) * Math.cos(rlat2) * Math.pow(Math.sin(dlon / 2), 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return radius * c;
    },

    _updateLocationDistances: function(latitude, longitude) {
      var countryCode = document.querySelector(
        selectors.storeAvailabilityUnitSystem
      );
      var unitSystem = countryCode.dataset.unitSystem;
      var allDistances = document.querySelectorAll(
        selectors.storeAvailabilityLocationDistance
      );
      var allDistancesArray = Array.from(allDistances);
      var self = this;
      allDistancesArray.forEach(function(locationDistance) {
        var distance = self
          ._calculateDistance(
            latitude,
            longitude,
            parseFloat(locationDistance.dataset.latitude),
            parseFloat(locationDistance.dataset.longitude),
            unitSystem
          )
          .toFixed(1);
        locationDistance.innerHTML = distance;
      });
    },

    _hideDistanceUnits: function() {
      var distanceUnits = document.querySelectorAll(
        selectors.storeAvailabilityDistanceUnit
      );

      if (!distanceUnits) {
        return;
      }

      var distanceUnitsArray = Array.from(distanceUnits);
      distanceUnitsArray.forEach(function(distanceUnit) {
        distanceUnit.classList.add(classes.hidden);
      });
    }
  });

  return StoreAvailability;
})();

/* ---- 
	Product 
	---- */

KING.Product = {

	$product: null,
	$productText: null,

	$productGallery: null,
	$productGalleryItem: null,
	productGalleryNavigation: null,
	$productGalleryNavigationItem: null,

	$productCarousel: null,
	$productCarouselImgs: null,
	productFlkty: null,

	storeAvailabilityContainer: null,
	storeAvailability: null,

  SCROLL_ProductGallery: null,

	mount: function( $productParent ) {

		$product = $productParent.find('.product');

		// Truncated description

		if ( $product.find('.product__description').hasClass('truncated') ) {

		setTimeout((function($product){

			var $productDescription = $product.find('.product__description')
					$productDescriptionInner = $productDescription.children('div'),
					$productDescriptionTrigger = null;

				if ( $productDescriptionInner.height() - 10 >  $productDescription.height() ) {

					$productDescription.after('<a class="truncated__trigger" tabindex="0">' + window.KINGDOMSettings.locales.product_more_description_label + '</a>');
					$productDescriptionTrigger = $product.find('.truncated__trigger');

					$productDescriptionTrigger.on('click', (function(e){

						e.preventDefault();

						if ( ! $productDescription.hasClass('truncated--show') ) {
							$productDescription.addClass('truncated--show');
							$productDescription.css('maxHeight', $productDescriptionInner.height());
	    				$productDescriptionTrigger.text(window.KINGDOMSettings.locales.product_less_description_label);
						} else {
							$productDescription.removeClass('truncated--show');
							$productDescription.attr('style', '');
	    				$productDescriptionTrigger.text(window.KINGDOMSettings.locales.product_more_description_label);
						}

					}).bind(this)).on('keydown', function(e){
            if ( e.keyCode == window.KEYCODES.RETURN ) {
              $(this).trigger('click');
            }
          });

				} else {
					$productDescription.removeClass('truncated');
				}

			}).bind(this, $product), 100);

    }

    // Quantity buttons

    if ( $product.find('.product__quantity').length > 0 ) {

			var $productQty = $product.find('.quantity__selector');
			if ( parseInt($productQty.val()) - 1 < parseInt($productQty.attr('min')) ) {
				$product.find('.quantity__minus').addClass('disabled');
			}
			if ( parseInt($productQty.val()) + 1 > parseInt($productQty.attr('max')) ) {
				$product.find('.quantity__plus').addClass('disabled');
			}

			$product.find('.quantity__minus').on('click', (function($productQty, $productQtyPlus, e){
				e.preventDefault();
				e.stopImmediatePropagation();
				if ( ! $(e.currentTarget).hasClass('disabled') ) {
					var currentQty = parseInt($productQty.val());
					if ( currentQty - 1 >= parseInt( $productQty.attr('min') ) ) {
						$productQty.val(currentQty - 1);
						$productQtyPlus.removeClass('disabled');
					} 
					if ( currentQty - 1 <= parseInt( $productQty.attr('min') ) ) {
						$(e.currentTarget).addClass('disabled');
					}
				}
			}).bind(this, $productQty, $product.find('.quantity__plus')));

			$product.find('.quantity__plus').on('click', (function($productQty, $productQtyMinus, e){
				e.preventDefault();
				e.stopImmediatePropagation();
				if ( ! $(e.currentTarget).hasClass('disabled') ) {
					var currentQty = parseInt($productQty.val());
					if ( currentQty + 1 <= parseInt( $productQty.attr('max') ) ) {
						$productQty.val(currentQty + 1);
						$productQtyMinus.removeClass('disabled');
					}
					if ( currentQty + 1 >= parseInt( $productQty.attr('max') ) ) {
						$(e.currentTarget).addClass('disabled');
					}
				}
			}).bind(this, $productQty, $product.find('.quantity__minus')));

		}


		// Store availability

		this.storeAvailabilityContainer = $product.find('[data-store-availability-container]')[0];
		if ( this.storeAvailabilityContainer ) {
			this.storeAvailability = new theme.StoreAvailability(this.storeAvailabilityContainer);
		}

		// Init product form

		window.cartFormAjax();

		var productIsDisabled = false;
		if ( $product.data('settings-hv') && $product.data('availability') ) {
			this._advancedOptionsSelector($product, JSON.parse($product.find('.product-json')[0].innerHTML));
		} else if ( $product.data('settings-hv') && ! $product.data('availability') ) {
			productIsDisabled = true;
		} 				

		if ( ! $product.hasClass('onboarding--true' ) ) {
			this.initProductForm($product, productIsDisabled);
		}

		if ( $product.find('.product__form').length > 0 && $product.find('.product__form').data('type') == 'overlay' ) {

    	var $form = $product.find('.product__form form'),
			  	$submitSymbol = $product.find('.add-to-cart__symbol'),
			  	$submitButton = $product.find('.product__add-to-cart'),
			  	$cartCount = $('.sidebar__cart-handle .count'),
			  	$cartTitle = $('.cart__title'),
			  	$cartQty = $product.find('.quantity__selector');

  		$submitButton.on('click', function(e){

  			e.preventDefault();

  			var oldText = $submitSymbol.html();
	  		$submitSymbol.html('<span class="preloader" />');
	  		$submitButton.addClass('working');

	  		var itemName = $product.find('.product__title').text(),
	  				itemPrice = $product.find('.product__price--original').attr('data-price'),
	  				itemCurrency = Shopify.currency.active,
	  				itemId = $product.data('id');

        fetch(window.KINGDOMSettings.routes.cart_add_url + '.js', {
          body: window.serialize($form[0]),
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then(function (response) {

          if ( response.ok ) {
            fetch(window.KINGDOMSettings.routes.cart_url, {
              credentials: 'same-origin',
              method: 'GET'
            }).then(function (response) {

              response.text().then(function(html) {
                
                // google pixel

                if ( typeof ga !== 'undefined' ) {
                  ga('ec:addProduct', {
                    'id': itemId,
                    'name': itemName,
                    'price': parseFloat(itemPrice),
                    'quantity': $cartQty.length > 0 ? parseInt($cartQty.val()) : 1
                  });
                  ga('ec:setAction', 'add');
                  ga('send', 'event', 'UX', 'click', 'add to cart');     
                }

                // totals update
                $('#cart .cart__items').html($(html).find('#cart .cart__items')[0].innerHTML);
                $('#CartDetails').html($(html).find('#CartDetails').html());

                if ( $('.cart__form').hasClass('cart--empty') ) {
                  $('.cart__form').removeClass('cart--empty');
                }

                // button animation

                setTimeout(function(){
                  $submitButton.addClass('done');
                  $submitSymbol.html(oldText);
                  setTimeout(function(){
                    $submitButton.addClass('clear');
                    setTimeout(function(){
                      $submitButton.removeClass('working').removeClass('done');
                      setTimeout(function(){
                        $submitButton.removeClass('clear');
                      }, 1000);
                    }, 10);
                  }, 500);
                }, 1000);

                // count changing

                if ( $cartQty.length > 0 ) {

                  var qty = parseInt($cartQty.val());
                  if ( qty == 1 ) {
                    $cartTitle.html($cartTitle.data('added-singular').replace(/{{ count }}|count|{{count}}/g, qty));
                  } else {
                    $cartTitle.html($cartTitle.data('added-plural').replace(/{{ count }}|count|{{count}}/g, qty));
                  }

                  $cartCount.text(parseInt($cartCount.text()) + parseInt($cartQty.val()));

                } else {

                  $cartCount.text(parseInt($cartCount.text()) + 1);
                  $cartTitle.html($cartTitle.data('added-singular').replace(/{{ count }}|count|{{count}}/, 1));

                }

                // open cart sidebar

                KING.Sidebar.openSidebar('cart')
                if ( $submitButton.hasClass('return') ) {
                  $submitButton.removeClass('return');
                  setTimeout(function(){
                    $('.sidebar__cart a').eq(0)[0].focus();
                  }, 100);
                }
                window.cartFormAjax();

              });
              
            });

          } else {

            response.json().then(function(data){
              alert(data.description);
              setTimeout(function(){
                $submitButton.addClass('done');
                $submitSymbol.html('');
                setTimeout(function(){
                  $submitButton.addClass('clear');
                  setTimeout(function(){
                    $submitSymbol.html(oldText);
                    $submitButton.removeClass('working').removeClass('done');
                    setTimeout(function(){
                      $submitButton.removeClass('clear');
                    }, 1000);
                  }, 10);
                }, 500);
              }, 100);
            });

          }
          
          
        });

  		}).on('keydown', function(e){
        if ( e.keyCode == window.KEYCODES.RETURN ) {
          $submitButton.addClass('return');
        }
      });

	  }

	  // Product gallery

  	var _this = {
      optionsMap: {}
    };

		_this.$productGallery = $product.find('.product__gallery');
		_this.$productGalleryItem = $product.find('.product-gallery__item');
		_this.$productCarousel = _this.$productGallery.children('.product-gallery');

		_this.$productGalleryNavigation = $product.find('.product-gallery__thumbnails');
		_this.$productGalleryNavigationItem = $product.find('.product-gallery__thumbnails .thumbnail');
		_this.$productGalleryNavigationItem.eq( $product.data('KingProductImageIndex') != undefined ? $product.data('KingProductImageIndex') : 0 ).addClass('active');

    window.productData[$product.data('id')] = _this;

		// Resize all first

	  this._mountGalleryResizer(_this.$productCarousel, $product);

		var $productThumbnails = $('.product-gallery__thumbnails .thumbnails-holder');
		var gutter = _this.$productCarousel.hasClass('product-gallery--gutter') ? 25 : 0;

		$product.find('.product-gallery__thumbnails .thumbnail').on('click', function(){

			$product.find('.product-gallery__thumbnails .thumbnail.active').removeClass('active');
			$(this).addClass('active');

			if ( _this.$productCarousel.hasClass('flickity-enabled') ) {

				_this.productFlkty.select($(this).index());
				if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
					$productThumbnails[0].scrollLeft = Math.max( $(this).index() - 2, 0 ) * $(this).width();
				}

			} else {

        window.scrollTo({
          top: _this.$productGalleryItem.eq($(this).index()).offset().top - gutter,
          behavior: 'smooth'
        });

				KING.ProductMedia._triggerAutoPlayOFF(_this.$productCarousel);
				KING.ProductMedia._triggerAutoPlayON(_this.$productGalleryItem.eq($(this).index()));

				if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
					$productThumbnails.scrollTop = Math.max( $(this).index() - 1, 0 ) * $(this).height();
				}

			}

		}).on('keypress', function(e){
			if ( e.which == 13 ) {
				$(this).trigger('click');
				_this.$productCarousel.find('.product-gallery__item.is-selected')[0].focus();
			}
		});

		if ( _this.$productCarousel.hasClass('product-gallery--scroll') ) {

      this.SCROLL_ProductGallery = (function(_this){

        if ( ! _this.$productCarousel.hasClass('flickity-enabled') && $(window).width() > 1023 ) {

          _this.$productGalleryItem.each((function(key, elm){

            if ( $(window).scrollTop() + $(window).height() > $(elm).offset().top + $(window).height() / 2 && ! $(elm).hasClass('active') ) {

              $(elm).addClass('active');
              _this.$productGalleryNavigationItem.removeClass('active');
              _this.$productGalleryNavigationItem.eq($(elm).index()).addClass('active');

            } else if ( $(window).scrollTop() + $(window).height() < $(elm).offset().top + $(window).height() / 2 && $(elm).hasClass('active') ) {

              $(elm).removeClass('active');
              _this.$productGalleryNavigationItem.removeClass('active');
              _this.$productGalleryNavigationItem.eq($(elm).index()-1).addClass('active');

            }

            if ( $(window).scrollTop() + $(window).height() > _this.$productGallery.height() && ! _this.$productGalleryNavigation.hasClass('scroll') ) {
              _this.$productGalleryNavigation.addClass('scroll');
            } else if ( $(window).scrollTop() + $(window).height() < _this.$productGallery.height() && _this.$productGalleryNavigation.hasClass('scroll') ) {
              _this.$productGalleryNavigation.removeClass('scroll');
            }

          }).bind(_this));

        }

      }).bind(this, _this);
      window.addEventListener('scroll', this.SCROLL_ProductGallery, {passive:true});
      this.SCROLL_ProductGallery.call();

		}

		// init sliding gallery (always, because it turns into this at responsive)

		if ( parseInt(_this.$productCarousel.data('size')) > 1 ) {

			_this.productFlkty = new Flickity(_this.$productCarousel[0], {
        cellSelector: '.product-gallery__item:not(.remove-from-flick)',
        initialIndex: $product.data('KingProductImageIndex') != undefined ? $product.data('KingProductImageIndex') : 0,
        wrapAround: false,
        prevNextButtons: _this.$productCarousel.hasClass('product-gallery--dots') ? true : false,
        arrowShape: 'M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z',
        pageDots: false,
        cellAlign: 'left',
        accessibility: false,
        setGallerySize: false,
        watchCSS: _this.$productCarousel.hasClass('product-gallery--scroll') ? true : false,
        resize: true,
        on: {
          ready: function(){
            if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
              if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
                var selectedThumbnail = $product.data('KingProductImageIndex') != undefined ? $product.data('KingProductImageIndex') : 0;
                $productThumbnails.scrollLeft = Math.max( selectedThumbnail - 2, 0 ) * 58;
              }
            }
          }
        }
      });
			_this.productFlkty.resize();

			var $cells = _this.$productCarousel.find('.product-gallery__item');

			// scroll animation
			_this.productFlkty.on('scroll', function(event, progress) {

				if ( $(window).width() < 768 || ( $product.hasClass('featured-product' ) && $(window).width() > 948 ) ) {

				  _this.productFlkty.slides.forEach( function( slide, i ) {

				    var img = _this.$productGalleryItem.eq(i).children('*').eq(0);
				    var x = ( slide.target + _this.productFlkty.x ) * -1/3;
			    	img.css('transform', 'translateX( ' + x  + 'px)'); 

			    });

			  } else {

					$cells.removeClass('before-selected after-selected');

					var index = _this.productFlkty.selectedIndex;

					$cells.each(function(){
						if ( $(this).index() < index ) {
							$(this).addClass('before-selected');
						} else if ( $(this).index() > index ) {
							$(this).addClass('after-selected');
						}
					});

			  }

			});

			// change navigation items when slide change
			var $productThumbnails = $product.find('.product-gallery__thumbnails .thumbnails-holder'),
					productThumbnailWidth = _this.$productGalleryNavigationItem.width();

			_this.productFlkty.on('change', function(i) {
				_this.$productGalleryNavigation.find('.active').removeClass('active');
				_this.$productGalleryNavigationItem.eq(i).addClass('active');
				if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
					$productThumbnails.scrollLeft = Math.max( i - 2, 0 ) * productThumbnailWidth;
				}
			});

			// add an extra set of arrows
			if ( _this.$productCarousel.hasClass('product-gallery--dots') ) {

				_this.$productGalleryNavigation.prepend('<button class="flickity-button flickity-prev-next-button previous" type="button" disabled="" aria-label="Previous"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z" class="arrow"></path></svg></button>');
				_this.$productGalleryNavigation.append('<button class="flickity-button flickity-prev-next-button next" type="button" aria-label="Next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>');

				var $productGalleryNavigationPrevious = _this.$productGalleryNavigation.find('.flickity-button.previous'),
						$productGalleryNavigationNext = _this.$productGalleryNavigation.find('.flickity-button.next');

				$productGalleryNavigationPrevious.on('click', function(){
					if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
						_this.productFlkty.select(Math.max(_this.productFlkty.selectedIndex - 1, 0));
					}
				});

				$productGalleryNavigationNext.on('click', function(){
					if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
						_this.productFlkty.select(Math.min(_this.productFlkty.selectedIndex + 1, _this.productFlkty.slides.length));
					}
				});

				_this.productFlkty.on('change', function(i) {
					$productGalleryNavigationPrevious.prop('disabled', false);
					$productGalleryNavigationNext.prop('disabled', false);
					if ( i == 0 ) {
						$productGalleryNavigationPrevious.prop('disabled', true);
					} else if ( i == _this.productFlkty.slides.length - 1 ) {
						$productGalleryNavigationNext.prop('disabled', true);
					}
				});

			}

		}

		// a11y helper

		if ( parseInt(_this.$productCarousel.data('size')) > 1 ) {
			_this.$productGalleryItem.on('focus, focusin', function(){
				if ( ! $(this).hasClass('is-selected') ) {
					_this.$productCarousel.find('.flickity-viewport').scrollLeft = 0;
					_this.productFlkty.select($(this).index());
				}
			});
		}

		// Product Zoom

		if ( $('.product__image-zoom').length > 0 ) {

			$('body').append('<div id="zoom"><img /><span class="zoom__exit"><svg class="svg symbol symbol--zoom-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.2,19.2c-5,0-9-4-9-9s4-9,9-9s9,4,9,9S15.2,19.2,10.2,19.2z M10.2,3.2c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7 C17.2,6.4,14.1,3.2,10.2,3.2z"/><path d="M15.637 17.078l1.414-1.414 5.657 5.657-1.414 1.414zM6.3 9.3h8v2h-8z"/></svg></span><div class="zoom__overlay"></div></div>');

			$('.product__image-zoom').on('click', (function(e){

				$('#zoom').addClass('opened');

				var $image = $('#zoom img');
				$image.attr('src', $(e.currentTarget).data('image'));

				setTimeout((function(){
					if ( $image[0].naturalWidth > 0 ) {
							this._productZoomMount($image);
					} else {
						$image.on('load', (function(){
							this._productZoomMount($image);
						}).bind(this))
					}
				}).bind(this), 200);

			}).bind(this));

			$('.zoom__exit').on('click', (function(e){
				this._productZoomUnmount();
			}).bind(this));

		}

		// Other shortcodes

		if ( $('.toggles').length > 0 ) {
			KING.Shortcodes.Toggles.mount();
		}

		// Mobile hidden content fix (hack)

		if ( $(window).width() < 948 ) {
			setTimeout(function(){
				$(window).trigger('scroll');
			}, 500);
		}

	},

	_mountGalleryResizer: function( $gallery, $product ) {
    
 		if ( $gallery.hasClass('product-gallery--fit') && ( $gallery.hasClass('product-gallery--slider') || $(window).width() < 1024 ) ) {
      $(window).on('resize.lazy-fit-height', function(){
        $gallery.find('.lazy-image').each(function(){
          var $parent = $(this).parent();
          var gutter = "image"==$parent.attr("data-product-media-type")||1024>$(window).width()?0:$gallery.hasClass("product-gallery--thumbnails")?$gallery.hasClass("product-gallery--gutter")?110:100:$gallery.hasClass("product-gallery--gutter")?70:50;
          $parent.css('width', ( $gallery.height() - gutter ) * $(this).data('ratio'));
        });
      }).trigger('resize.lazy-fit-height');
      if ( $gallery.hasClass('flickity-enabled') ) {
        window.productData[$product.data('id')].productFlkty.resize();
      }
    }

	},

	_productZoomMount: function( $image ) {

		$image.css({'left': 0, 'top': 0});

		$(window).on('mousemove.zoom', function(e) {
			e.preventDefault();
			window.clientX = e.clientX;
			window.clientY = e.clientY;
			var x = e.clientX * ( $(window).width() - $image.width() ) / $(window).width();
			var y = e.clientY * ( $(window).height() - $image.height() ) / $(window).height();
			$image.css({'left': x, 'top': y});
		});

		$image.data('ratio', $image[0].naturalWidth / $image[0].naturalHeight);

		$(window).on('resize.zoom', function(){	

			var rf = $(window).width() > 768 ? 1 : 2;

			if ( $image.hasClass('portrait') ) {
				$image.css('width', $(window).width()*rf);
				$image.css('height', $(window).width()*rf / $image.data('ratio'));
			} else {

				$image.css('height', $(window).height()*rf);
				$image.css('width', $(window).height()*rf * $image.data('ratio'));

				if ( $image.width() < $(window).width() ) {
					$image.css('width', $(window).width()*rf);
					$image.css('height', $(window).width()*rf / $image.data('ratio'));
				}

			}

			var x = window.clientX * ( $(window).width() - $image.width() ) / $(window).width();
			var y = window.clientY * ( $(window).height() - $image.height() ) / $(window).height();

		}).trigger('resize.zoom');

		setTimeout(function(){
			if ( $('body').hasClass('touch') ) {
				$('#zoom')[0].scrollTop = ( $(window).height() - $image.height() ) / -2;
				$('#zoom')[0].scrollLeft = ( $(window).width() - $image.width() ) / -2;
			}
			$('#zoom').addClass('loaded');
		}, 50);

	}, 

	_productZoomUnmount: function() {

		$('#zoom').removeClass('opened');

		setTimeout(function(){
			$(window).off('resize.zoom');
			$(window).off('mousemove.zoom');
			$('#zoom img').attr('src', '').removeClass('portrait').removeClass('landscape');
			$('#zoom').removeClass('loaded');
		}, 300);

	},

	initProductForm : function( $product, pdisabled ) {

		var firstVariantEver = true;

		var productSingleObject = JSON.parse($product.find('.product-json')[0].innerHTML),
				productVariants = productSingleObject.variants;

		$product.find('form select.product__variant').on('change', (function(e){
			this._initProductVariantChange(false, productSingleObject, $product);
		}).bind(this));

		this._initProductVariantChange(true, productSingleObject, $product);

		$product.find('select.product__variant').each(function(){
			window.styledSelectUpgraded($(this), false);
		});

		$product.find('.product__variant-holder').removeClass('hidden');

		if ( pdisabled ) {
			$product.find('.product__variant-holder').css('display', 'none');
		} 

	},

	_getProductVariant : function( $product ) {

		/* ---- 
			Get current variant
			---- */

		var optionArray = [];

		$product.find('form select.product__variant').each(function(){
			optionArray.push($(this)[0].value);
		});

		return optionArray;

	},

	_initProductVariantChange : function(firstTime, productSingleObject, $product) {	

		var variant = null,
			options = this._getProductVariant( $product );
      
		productSingleObject.variants.forEach(function(el){
      if ( el.options.equals(options) ) {
        variant = el;
      }
		});

		this._productSelectCallback(variant, $product, productSingleObject);
		if ( ! firstTime && $product.find('.productSelect option').length > 1 && ! $('body').hasClass('template-index') ) {
			this._updateProductVariantState(variant);
		}

	},

	_updateProductVariantState : function(variant) {

	   if (!history.pushState || !variant) {
	    return;
	  }

	  var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
	  window.history.replaceState({path: newurl}, '', newurl);

	},

	_productSelectCallback : function(variant, $product, productSingleObject) {

		var _po = window.productData[$product.data('id')];

		var $addToCart = $product.find('.product__form'),
				$addToCartButton = $product.find('.product__add-to-cart'),
	      $productPrice = $product.find('.product__price--original'),
	      $comparePrice = $product.find('.product__price--compare'),
	      $quantityElements = $product.find('.quantity__selector'),
	      $quantityElementsHolder = $product.find('.product__quantity'),
	      $addToCartText = $product.find('.add-to-cart__text'),
	      $productCarousel = $product.find('.product__gallery .product-gallery'),
	      $productGalleryItem = $product.find('.product__gallery .product-gallery__item');

		if (variant) {

			// Set cart value id

			$product.find('.productSelect').find('option[value="' + variant.id + '"]').prop('selected', true);

			// Swipe to variant slide

			if ( variant.featured_media != null ) {

				var variantImg = $productCarousel.find('.product-gallery__item[data-media-id="' + variant.featured_media.id + '"]');

				if ( variantImg.length > 0 ) {

					if ( $productCarousel.hasClass('product-gallery--slider') || ( $productCarousel.hasClass('product-gallery--scroll') && $(window).width() < 1024 ) ) {
						if ( variantImg.length > 0 ) {
							if ( _po != undefined && _po.productFlkty != undefined && variantImg.data('index') != _po.productFlkty.selectedElement ) {
								_po.productFlkty.select(variantImg.data('index'));
							} else {
								$product.data('KingProductImageIndex', variantImg.data('index'));
							}
						}

					} else {
						$product.data('KingProductImageIndex', variantImg.data('index'));
            window.scrollTo({
              top: variantImg.offset().top,
              behavior: 'smooth'
            });
					}	

				}

			}

			// Display info about variants quantity

			var $variantQuantity = $product.find('.variant-quantity');
			$variantQuantity.text('');

			var DOMVariant = $product.find('.productSelect').find('option[value="' + variant.id + '"]');
			if ( DOMVariant.attr('data-quantity') <= 0 ) {
				if ( DOMVariant.attr('data-inventory') == 'continue' ) {
					$variantQuantity.html(window.KINGDOMSettings.locales.products_preorder);
				} else if ( DOMVariant.attr('data-inventory') == 'deny' ) {
					$variantQuantity.html(window.KINGDOMSettings.locales.products_no_products);
				}
			} else if ( DOMVariant.attr('data-quantity') == '1' ) {
				$variantQuantity.html(window.KINGDOMSettings.locales.products_one_product);
			} else if ( DOMVariant.attr('data-quantity') <= 5 ) {
				$variantQuantity.html(window.KINGDOMSettings.locales.products_few_products.replace('{{ count }}', DOMVariant.attr('data-quantity')));
			} else if ( ! variant.available ) {
				$variantQuantity.html(window.KINGDOMSettings.locales.products_no_products);
			}

			// Edit cart buttons based on stock 
				
			if ( variant.available ) {

				$quantityElements.prop('max', 999);
				$addToCartButton.removeClass('disabled').prop('disabled', false);
				$addToCartText.text($addToCartText.attr('data-add-to-cart-text'));
				$quantityElements.show();
				if ( $quantityElementsHolder != null ) {
					$quantityElementsHolder.show();
				}

			} else {
				$addToCartButton.addClass('disabled').prop('disabled', true);
				$addToCartText.text(window.KINGDOMSettings.locales.products_sold_out_variant);
				$quantityElements.hide();
				if ( $quantityElementsHolder != null ) {
					$quantityElementsHolder.hide();
				}

			}

			// Update price

			$productPrice.html( theme.Currency.formatMoney(variant.price, window.KINGDOMSettings.shop_money_format) );
			$productPrice.attr( 'data-price', variant.price / 100 );
			if ( variant.compare_at_price > variant.price ) {
				$comparePrice.html(theme.Currency.formatMoney(variant.compare_at_price, window.KINGDOMSettings.shop_money_format)).show();
			} else {
				$comparePrice.hide();
			}
			
			if ( $product.find('.unit-price').length > 0 ) {
				if ( variant.unit_price_measurement ) {
					$product.find('.unit-price').html(theme.Currency.formatMoney(variant.unit_price, window.KINGDOMSettings.shop_money_format) + " / " + ( variant.unit_price_measurement.reference_value != 1 ? variant.unit_price_measurement.reference_value + " " : "" ) + variant.unit_price_measurement.reference_unit);
				} else {
					$product.find('.unit-price').empty();
				}
			}

			// Update sku

			if ( $product.find('.product__sku').length > 0 ) {
				if ( variant.sku ) {
					$product.find('.product__sku').text(window.KINGDOMSettings.locales.product_sku + variant.sku);
				} else {
					$product.find('.product__sku').empty();
				}
			}

      // Update barcode

      if ( $product.find('.product__barcode').length > 0 ) {
        if ( variant.barcode ) {
          $product.find('.product__barcode').text(window.KINGDOMSettings.locales.product_barcode + variant.barcode);
        } else {
          $product.find('.product__barcode').empty();
        }
      }

			// Update local pickup

      if (this.storeAvailability) {
        if ( variant.available === false ) {
          this.storeAvailability.clearContent();
        } else {
          this.storeAvailability.updateContent(
            variant.id,
            $product.find('.product__title').text()
          );
          if ( $product.data('single-variant') ) {
            $('body').attr('data-single-variant', '');
          }
        }
      }

		} else {

			// Disable variant completely 

			$addToCartButton.addClass('disabled').prop('disabled', true);
			$addToCartText.text(window.KINGDOMSettings.locales.products_unavailable_variant);
			$quantityElements.hide();
			if ( $quantityElementsHolder != null ) {
				$quantityElementsHolder.hide();
			}

		}

		if ( $product.find('.quantity__selector').length > 0 ) {

			var $productQty = $product.find('.quantity-selector');
			$product.find('.quantity__minus').removeClass('disabled');
			$product.find('.quantity__plus').removeClass('disabled');

			if ( parseInt($productQty.val()) - 1 < parseInt($productQty.attr('min')) ) {
				$product.find('.quantity__minus').addClass('disabled');
			}
			if ( parseInt($productQty.val()) + 1 > parseInt($productQty.attr('max')) ) {
				$product.find('.quantity__plus').addClass('disabled');
			}

		}

	},

	_advancedOptionsSelector: function($product, productJson) {
	  var forceMutation = false;
	  var $addToCartForm = $product.find('.product__form');
	  if (window.MutationObserver && $addToCartForm.length) {
	    if (typeof observer === 'object' && typeof observer.disconnect === 'function') {
	      observer.disconnect();
	    }
	    var config = { childList: true, subtree: true };
	    var observer = new MutationObserver(function() {    
	      Shopify.linkOptionSelectors(productJson, $product);
	      observer.disconnect();
	    });  
	    if ( forceMutation ) {
	      Shopify.linkOptionSelectors(productJson, $product);
	    }
	    observer.observe($addToCartForm[0], config);
	  }
	},

	unmount: function() {
    window.removeEventListener('scroll', this.SCROLL_ProductGallery);
		$(window).off('resize.lazy-fit-height');
	}

}

// Mount in page

if ( $('.mount-product-page').length > 0 ) {
	$('.mount-product-page').each(function(){
		KING.Product.mount($(this));
		KING.ProductMedia.mount($(this).find('.product'));
		window.KingProductGalleryMobileHelpers($(this).find('.product'));
	});
} 

// Mount portfolio page

if ( $('.mount-project-page').length > 0 ) {

  window.productData[$('.project').data('id')] = {
    $productCarousel: $('<span data-video-looping="false" />'),
    $productGalleryItem: $('.product-gallery__item')
  }
	KING.ProductMedia.mount($('.project'));
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);

	setTimeout(function(){

 		if ( $section.hasClass('mount-product-page') ) {
			KING.Product.mount($section);
	  	KING.Product._mountGalleryResizer($section.find('.product-gallery'), $section.find('.product'));
			KING.ProductMedia.mount($section.find('.product'));
			window.KingProductGalleryMobileHelpers($section.find('.product'));
 		} else if ( $section.hasClass('mount-project-page') ) {
			$('.project').data('po', {
				$productCarousel: $('<span data-video-looping="false" />'),
				$productGalleryItem: $('.product-gallery__item')
			})
			KING.ProductMedia.mount($('.project'));
 		}

 	}, 100);

}).on('shopify:section:unload', function(e){

 		var $section = $(e.target);

		if ( $section.hasClass('mount-product-page') ) {
			KING.Product.unmount();
			KING.ProductMedia.unmount($section.find('.product-gallery'));
 		}

});

// quick hack

if ( $('body').hasClass('template-product') ) {
	if ( $('#shopify-section-product-story').children().length <= 0 ) {
		$('#shopify-section-product-story').addClass('blank');
	}
}

// Init Product Review

if ( $('#shopify-product-reviews').length > 0 ) {

	if ( $('#shopify-product-reviews').find('.spr-starrating').length > 0 ) {
		
		var checkI = setInterval(function(){

			if ( $('.spr-reviews').children().length > 0 ) {

				clearInterval(checkI);

			  $('.product-page-reviews').css('display', 'block');

			  turnReviewsFormIntoPopup();

        const reviewsFltky = new Flickity('.spr-reviews', {
          cellSelector: '.spr-review, .spr-pagination',
          cellAlign: 'left',
          groupCells: true,
          prevNextButtons: false,
          pageDots: false,
          adaptiveHeight: true,
          on: {
            ready: function(){
              if ( $('.spr-reviews').hasClass('is-draggable') ) {
                $('.spr-reviews').append('<div class="flickity-custom-nav"><span class="prev">' + window.KINGDOMSettings.symbol_arrow + '</span><span class="next">' + window.KINGDOMSettings.symbol_arrow + '</span></div>');
                $('.spr-reviews').find('.next').on('click', function(){
                  reviewsFltky.next();
                });
                $('.spr-reviews').find('.prev').on('click', function(){
                  reviewsFltky.previous();
                });
              }
            }
          }
        });

				$('.spr-reviews').attr('data-no', $('.spr-review').length);
					
				var ra = $('.spr-summary-starrating').find('.spr-icon-star').length,
						rb = $('.spr-summary-starrating').find('.spr-icon-star-half-alt').length > 0 ? '5' : '0';

				$('.spr-summary-starrating').attr('data-rating', ra + '.' + rb);

				reviewsFltky.on('change', function( index ) {
				  $('.spr-reviews').find('.is-selected').each(function(){
				  	if ( $(this).hasClass('spr-pagination') && $(this).find('.spr-pagination-next').length > 0 ) {
			  		var $paginationObject = $(this),
			  				page = $(this).find('.spr-pagination-next a').data('page'),
								product_id = $(this).find('.spr-pagination-next a').data('product-id');
              JSONP({
                url: SPR.api_url + '/reviews',
                data: {
                  page: page,
                  product_id: product_id,
                  shop: window.location.hostname
                },
                success: function(data){
                  var $reviews = $(data.reviews);
                  $paginationObject.remove();
                  reviewsFltky.append($reviews);
                }
              });
				  	}
				  })
				});

			}

		}, 30);

	} else {

	  $('.product-page-reviews').css('display', 'block');

		var checkI = setInterval(function(){
			if ( $('.spr-form').length > 0 && ! $('.spr-form').hasClass('init') ) {
				clearInterval(checkI);
				turnReviewsFormIntoPopup();
			}
		}, 30);

	}

}

function turnReviewsFormIntoPopup() {

	$('.spr-form').addClass('init').attr('style', '').wrap('<div id="spr-form" class="spr-form-holder" />');
	$('.spr-form-holder').addClass('address-popup');
  $('#spr-form').wrap('<div id="spr-form-modal" />');
  $('#spr-form').append('<div class="basicLightboxClose">×</div>');
  $('#spr-form-modal').addClass('hidden');

  var modal = basicLightbox.create(document.querySelector('#spr-form-modal'));
  $('.spr-summary-actions-newreview').attr('onclick', '').on('click', function(e){
    e.preventDefault();
    modal.show(function(){
      $('#spr-form').find('.basicLightboxClose').on('click', function(){
        modal.close();
      });
    });
  });

}


KING.BlogPosts = {

	mount: function($blog) {

		if ( $blog.find('.blog--slider').length > 0 ) {

	  	var _this = {};

			_this.$slider = $blog.find('.blog--slider');

			this._initSlider(_this.$slider);

	  	$(window).on('resize.blog-slider', window.debounce((function(){
	  		var cellsWidth = 0;
	  		_this.$slider.find('.blog-item').each(function(){
	  			cellsWidth += $(this).outerWidth(true);
	  		})

	  		if ( cellsWidth > _this.$slider.width() && ! _this.$slider.hasClass('is-draggable') ) {
	  			this._initSlider(_this.$slider);
	  		} else if ( cellsWidth <= _this.$slider.width() && _this.$slider.hasClass('is-draggable') ) {
	  			this._initSlider(_this.$slider);
	  		}

	  	}).bind(this), 300));

		}

	},

	_initSlider: function($slider) {
		setTimeout(function(){
			new Flickity($slider[0], {
	  		cellSelector: '.blog-item',
	  		cellAlign: 'left',
	  		groupCells: true,
	  		prevNextButtons: false,
	  		pageDots: true
	  	});
		}, 1);
	}

}

// Mount in page

if ( $('.mount-blog-posts').length > 0 ) {
	$('.mount-blog-posts').each(function(){
		KING.BlogPosts.mount($(this));;
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-blog-posts') ) {
		KING.BlogPosts.mount($section);
	}

});

KING.Gallery = {

	mount: function($gallery) {

  	var _this = {};

		_this.$gallery = $gallery.find('.gallery__content');
		_this.$galleryParent = _this.$gallery.parent();
		_this.$galleryItems = _this.$gallery.find('.gallery__item');

		if ( _this.$galleryParent.hasClass('gallery--mobile-slider-true') ) {
			var flkty = new Flickity(_this.$gallery[0], {
	  		cellSelector: '.gallery__item',
	  		prevNextButtons: false,
	  		cellAlign: 'left',
	  		wrapAround: true,
	  		watchCSS: true
			});
	  }	

	  if ( _this.$gallery.attr('data-lightbox') == 'true' ) {
	  	$gallery.find('.gallery__zoom').each(function(){

	  		let modal = basicLightbox.create('<img src="' + $(this).data('src') + '" />');
	  		$(this).on('click', function(e){
	  			e.preventDefault();
	  			modal.show();
	  		})

	  	});
	  }

	}

}

// Mount in page

if ( $('.mount-gallery').length > 0 ) {
	$('.mount-gallery').each(function(){
		KING.Gallery.mount($(this).find('.gallery'));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);

	if ( $section.hasClass('mount-gallery') ) {
		KING.Gallery.mount($section.find('.gallery'));
	}

});
KING.Slider = {

	SCROLL_SliderHelper: null,
	SliderList: {},

	mount: function($slider) {

		var _this = {}

		_this.$slider = $slider.find('.slider');
		_this.$slides = $slider.find('.slide');
		_this.$images = _this.$slider.find('img');
		_this.$overlays = _this.$slider.find('.slide__overlay');
		_this.$texts = _this.$slider.find('.slide__text');

		if ( _this.$slider.hasClass('slider--scroll') ) {

			// Vertical slider

			var previous = -1,
					currentOld = -1;

			// Add pagination

			_this.$slider.append('<div class="slider__dots" />');

			for (var i = 0; i < _this.$images.length; i++) {
				_this.$slider.find('.slider__dots').append('<span class="dot" />');
			}
			_this.$sliderNavigation = _this.$slider.find('.slider__dots .dot');
			_this.$sliderNavigation.eq(0).addClass('is-selected');

			_this.$sliderNavigation.on('click', function(){
				window.scrollTo({
					top: _this.$slides.eq($(this).index()).offset().top,
					behavior: 'smooth'
				});
			});

			// Scroll effects

			this.SCROLL_SliderHelper = (function(_this){

				var sliderOffset = _this.$slider.offset().top,
						scrollTop = $(window).scrollTop(),
						screenHeight = $(window).height();

				if ( scrollTop >= sliderOffset && scrollTop + screenHeight <= sliderOffset + _this.$slider.height() ) {

					for (var i = 0; i < _this.$images.length; i++) {

						// animate each slide based on scrolling and it's offset
						var transformValue = ( scrollTop - sliderOffset - ( screenHeight * i ) ) / 2;
						if ( Math.abs(transformValue) <= screenHeight / 2 ) {
							this._scrollTransform(transformValue, _this.$images.eq(i), _this.$overlays.eq(i), _this.$texts.eq(i))
						} 

						if ( scrollTop >= ( screenHeight * i ) + sliderOffset - ( screenHeight / 2 ) && ! _this.$sliderNavigation.eq(i).hasClass('is-selected') ) {
							_this.$sliderNavigation.removeClass('is-selected');
							_this.$sliderNavigation.eq(i).addClass('is-selected');
						} 

					}

				} else if ( scrollTop < sliderOffset ) {

					// fix first slide

					var transformValue = 0;
					this._scrollTransform(0, _this.$images.eq(0), _this.$overlays.eq(0), _this.$texts.eq(0));

				} else if ( scrollTop + screenHeight > sliderOffset + _this.$slider.height() ) {

					// fix last slide

					var transformValue = 0;
					this._scrollTransform(0, _this.$images.eq(-1), _this.$overlays.eq(-1), _this.$texts.eq(-1));

				}

				// Toggle slider navigation

				if ( _this.$sliderNavigation.parent().hasClass('in-view') && ( scrollTop + screenHeight > sliderOffset + _this.$slider.height() || scrollTop < sliderOffset ) ) {
					_this.$sliderNavigation.parent().removeClass('in-view');
					if ( scrollTop < sliderOffset ) {
						_this.$sliderNavigation.parent().removeClass('in-bottom');
					} else if ( scrollTop + screenHeight > sliderOffset ) {
						_this.$sliderNavigation.parent().addClass('in-bottom');
					}
				} else if ( ! _this.$sliderNavigation.parent().hasClass('in-view') && ( scrollTop >= sliderOffset && scrollTop + screenHeight <= sliderOffset + _this.$slider.height() ) ) {
					_this.$sliderNavigation.parent().addClass('in-view');
				}

			}).bind(this, _this);
			window.addEventListener('scroll', this.SCROLL_SliderHelper, {passive:true});
			this.SCROLL_SliderHelper.call();

		}

		// Fix slider size (100vh) on mobile devices

		$(window).on('resize.slider-helper', function(){
			if ( $(window).width() < 948 ) {
				//_this.$slides.height(document.documentElement.clientHeight);
				if ( _this.$slider.hasClass('slider--mobile-js-height') && ( _this.$slider.hasClass('slider--horizontal') || _this.$slider.hasClass('slider--horizontal-mobile-true') ) ) {
					_this.$slider.height(document.documentElement.clientHeight - 120);
				}
			}
		}).trigger('resize.slider-helper');

		if ( _this.$slider.hasClass('slider--horizontal') || _this.$slider.hasClass('slider--horizontal-mobile-true') ) {

			// Horizontal slider (flickity powered) 

			_this.flkty = new Flickity(_this.$slider[0], {
	  		cellSelector: '.slide',
	  		prevNextButtons: false,
	  		cellAlign: 'left',
	  		wrapAround: false,
	  		autoPlay: _this.$slider.data('autorotate'),
	  		watchCSS: true
	  	});

	  	this.SliderList[_this.$slider.attr('id')] = _this.flkty;

	  	_this.$slider.data('flkty', _this.flkty);

			_this.flkty.on( 'scroll', function( e, progress ) {

			  _this.flkty.slides.forEach( function( slide, i ) {

			    var img = _this.$images[i];
			    if ( img ) {
			    	
				    var x = ( slide.target + _this.flkty.x ) * -1/3;
			    	img.style.transform = 'translateX( ' + x  + 'px)';

				    var text = _this.$texts[i];
				    var y = ( slide.target + _this.flkty.x ) / 8;
			    	text.style.transform = 'translateX( ' + y  + 'px)';

				    var overlay = _this.$overlays[i];
				    var z = ( ( slide.target + _this.flkty.x ) * -1/10 ) / 100;
			    	overlay.style.opacity = z;
			    }

		    });

			});
			/* - not sure when did i comment this out --
			_this.flkty.on('settle', (function( index ) {
				_this.index = index;
				_this.$images.css('transform', 'none');
				_this.$texts.css('transform', 'none');
				_this.$overlays.css('opacity', '0');
			}).bind(this));*/

		}

	},

	_scrollTransform: function(transformValue, $image, $overlay, $text) {
		if ( $('body').hasClass('no-touch') && window.innerWidth > 948 ) {
			$image.css('transform', 'translate3d(0, ' + transformValue + 'px, 0)');
			if ( transformValue >= 0 ) {
				$overlay.css('opacity', transformValue / ( $(window).height() / 2 ) );
			}
			$text.css('transform', 'translate3d(0, ' + transformValue / 10 + 'px, 0)');
		}
	},

	unmount: function($slider) {
		window.removeEventListener('scroll', this.SCROLL_SliderHelper);
		$(window).off('resize.slider-helper');
	}


}


// Mount in page

if ( $('.mount-slider').length > 0 ) {
	$('.mount-slider').each(function(){
		KING.Slider.mount($(this));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-slider') ) {
		KING.Slider.mount($section);
	}

}).on('shopify:section:unload', function(e){
	
	var $section = $(e.target);
	if ( $section.hasClass('mount-slider') ) {
		KING.Slider.unmount($section);
	}

}).on('shopify:block:select', function(e){

	var $block = $(e.target);

	if ( $block.parent().hasClass('flickity-slider') ) {
		KING.Slider.SliderList[$block[0].closest('.slider').id].select($block.index());
	}
	
});
// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);

}).on('shopify:section:unload', function(e){
	
	var $section = $(e.target);

}).on('shopify:block:select', function(e){

	var $block = $(e.target);

}).on('shopify:block:deselect', function(e){

	var $block = $(e.target);

});
KING.Testimonials = {
	mount: function($section) {
		KING.Shortcodes.ContentSlider.mount($section);
	}
}

// Mount in page

if ( $('.mount-testimonials').length > 0 ) {
	$('.mount-testimonials').each(function(){
		KING.Testimonials.mount($(this));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-testimonials') ) {
		KING.Testimonials.mount($section);
	}

}).on('shopify:block:select', function(e){

	var $block = $(e.target);
	if ( $block.hasClass('testimonial') && $block.closest('.testimonials__container').hasClass('flickity-enabled') ) {
		$block.closest('.flickity-enabled').data('flickity').select($block.index());
	}

});
var canSrc = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA7RtZGF0AAACrAYF//+o3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMTkgYmEyNDg5OSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTcgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0zIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjguMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAACpliIQAJ//+8dzwKZrlxoFv6nFTjrH/8I5IvpuR7wM+8DluLAAQcGNdwkEAAAAKQZokbEJ/8yAHLAAAAAhBnkJ4jf8JeQAAAAgBnmF0Rf8KSAAAAAgBnmNqRf8KSQAAABBBmmhJqEFomUwIR//kQBXxAAAACUGehkURLG8JeQAAAAgBnqV0Rf8KSQAAAAgBnqdqRf8KSAAAAA9BmqxJqEFsmUwI/4cAU8AAAAAJQZ7KRRUsbwl5AAAACAGe6XRF/wpIAAAACAGe62pF/wpIAAAADkGa70moQWyZTAi/AAJPAAAACUGfDUUVLG8JeQAAAAgBny5qRf8KSQAAA8ptb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAACFwABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAC9HRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAACFwAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAoAAAAFoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAhcAAAMAAAEAAAAAAmxtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACzgAAAYAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAIXbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAB13N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAoABaAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAv/4QAYZ2QAC6zZQo35IQAAAwAMAAADAs4PFCmWAQAGaOviSyLAAAAAGHN0dHMAAAAAAAAAAQAAABAAAAGAAAAAFHN0c3MAAAAAAAAAAQAAAAEAAACIY3R0cwAAAAAAAAAPAAAAAQAAAwAAAAABAAAHgAAAAAEAAAMAAAAAAQAAAAAAAAABAAABgAAAAAEAAAeAAAAAAQAAAwAAAAABAAAAAAAAAAEAAAGAAAAAAQAAB4AAAAABAAADAAAAAAEAAAAAAAAAAQAAAYAAAAABAAAGAAAAAAIAAAGAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAQAAAAAQAAAFRzdHN6AAAAAAAAAAAAAAAQAAAC3gAAAA4AAAAMAAAADAAAAAwAAAAUAAAADQAAAAwAAAAMAAAAEwAAAA0AAAAMAAAADAAAABIAAAANAAAADAAAABRzdGNvAAAAAAAAAAEAAAAwAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ny43Ny4xMDA=';
var canVideoPlaying = false;
var canVideo = document.createElement('video');
canVideo.setAttribute('playsinline', 'playsinline');
canVideo.setAttribute('muted', 'muted');
canVideo.setAttribute('autoplay', 'autoplay');
canVideo.setAttribute('loop', 'loop');
canVideo.setAttribute('controls', 'controls');
canVideo.setAttribute('width', 20);
canVideo.setAttribute('height', 20);
canVideo.onplay = function(){
  canVideoPlaying = true;
}
canVideo.setAttribute('src', canSrc);
canVideo.style.position = 'fixed';
canVideo.style.top = '-20px';
canVideo.style.left = '0px';
canVideo.style.zIndex = '997';
document.querySelector('body').appendChild(canVideo);

var playPromise = canVideo.play();
if ( playPromise !== undefined ) {
  playPromise.then(function(){
    autoPlayCallback(true);
    canVideo.remove();
  })
  .catch(function(error){
    if ( canVideoPlaying || error.toString().indexOf('interact with the document') > 0 ) {
      autoPlayCallback(true);
    } else {
      autoPlayCallback(false);
    }
    canVideo.remove();
  })
}

function autoPlayCallback(canAutoplay){
  if ( canAutoplay ) {
    $('.mount-video-background').each(function(){
      loadVideoBackground($(this));
    });
  } else {
     $('.video-text__background .video-text__image').css('display', 'block');
  }
}

function loadVideoBackground($section){
  var $video = $section.find('.video-text__background');
  if ( $video.length > 0 ) {
    $video.prepend('<video autoplay muted loop playsinline><source type="video/mp4" src="' + $video.data('src') + '"></video>');
    $video.find('video')[0].play();
    setTimeout(function(){
      $video.find('video').css('opacity', 1);
    }, 200);
  }
}

// Shopify events

$(document).on('shopify:section:load', function(e){
   var $section = $(e.target);
   if ( $section.hasClass('mount-video-background') ) {
      loadVideoBackground($section);
   }
});
KING.VideoPopup = {

	mount: function($videoPopup){

		$videoPopup.find('.video-popup__link').on('click', function(e){

			e.preventDefault();

			$(this).append('<div class="video-popup__blackout" />');
			setTimeout((function(){
				$(this).find('.video-popup__blackout').css('opacity', 1);
			}).bind(this), 10);

			setTimeout((function(){
				if ( $(this).data('video-source') == 'youtube' ) {
					$(this).append('<iframe class="video-popup__iframe" src="https://youtube.com/embed/' + $(this).data('video-id') + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen />');
				} else if ( $(this).data('video-source') == 'vimeo') { 
					$(this).append('<iframe class="video-popup__iframe" src="https://player.vimeo.com/video/' + $(this).data('video-id') + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen />');
				}
			}).bind(this), 50);

		});

	}

};

// Mount in page

if ( $('.mount-video-popup').length > 0 ) {
	$('.mount-video-popup').each(function(){
		KING.VideoPopup.mount($(this));
	});
};

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-video-popup') ) {
		KING.VideoPopup.mount($section);
	}

});
// Shopify events

$(document).on('shopify:section:load', function(e){
	window.reorderSections();
}).on('shopify:section:unload', function(e){
	window.reorderSections();
}).on('shopify:section:reorder', function(e){
	window.reorderSections();
});

$(document).ready(function(){

	var $body = $('body');
	
	reframe(document.querySelectorAll('.rte iframe[src*="youtube"], .rte iframe[src*="vimeo"]'));

	// Input placeholder helpers
	
	$('input').each(function(){
		$(this).on('change', function(){
			if ( $(this).val() != '' ) {
				$(this).addClass('filled');
			} else {
				$(this).removeClass('filled');
			}
		})
	});

	// a11y tab helper 

	let activeElement = document.activeElement;

  $(document).on('keyup', function(e) {

    if ( e.keyCode == window.KEYCODES.TAB ) {

      if ( activeElement.classList.contains('focus') && e.target != activeElement ) {
      	activeElement.classList.remove('focus');
      }

      if ( e.target.classList.contains('regular-select-cover') ||
      	e.target.classList.contains('search-field') ||
      	e.target.classList.contains('product-item__link') ||
      	e.target.classList.contains('content-slider') || 
      	e.target.classList.contains('blog-item__header') ||
      	e.target.classList.contains('toggle__title') ||
      	e.target.tagName == 'INPUT'
      ) {
      	activeElement = e.target;
        e.target.classList.add('focus');
      } 

    }

  });

	

	// newsletter has jump
	if ( window.location.search == '?customer_posted=true' ) {
		setTimeout(function(){
			$('html').scrollTop($('#contact_form').offset().top - 250);
		}, 300);
	} else if ( window.location.pathname == '/challenge' ) {
		setTimeout(function(){
			$('html').scrollTop(0);
		}, 300);
	}

});

$('input[type="search"]').attr('value', '');
$('form#contact_form').attr('autocomplete', 'off');

if ( !!window.MSInputMethodContext && !!document.documentMode ) {
	$('body').addClass('ie11');
	setTimeout(function(){
		$('.sidebar__cart-handle').off('click');
	}, 50);
} 