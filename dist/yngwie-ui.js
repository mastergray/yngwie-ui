!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.YngwieUI=e():t.YngwieUI=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Actor:()=>u,App:()=>l,Error:()=>i,Machine:()=>d,Mapping:()=>c,Model:()=>a,View:()=>h});const s=class{static getType(t){return void 0===t?"undefined":null===t?"null":t.constructor.name}};class i extends Error{constructor(t,e){super(t),this.data=`${e}`}log(){console.log(this.stack),console.log("What Failed: ",this.data)}}class n{constructor(t){if("string"!=typeof t)throw new i("Value of YngwieNode must be STRING",t);this._value=t,this._parent=void 0,this._first=void 0,this._last=void 0,this._next=void 0,this._prev=void 0}children(){let t=this._first,e=[];for(;t;)e.push(t),t=t._next;return e}append(t){if(t instanceof n)return t._parent&&t.detach(),void 0!==this._first?(t._prev=this._last,this._last._next=t,this._last=t):(this._first=t,this._last=t),t._parent=this,this;throw new i("Can only apppend YngwieNode to other YngwieNodes",t)}appends(t){if(t instanceof Array)return t.reduce(((t,e)=>this.append(e)),this);throw new i("Expected array as arguemnt",t)}detach(){return this._prev?this._prev._next=this._next:this._parent&&(this._parent._first=this._next),this._next&&(this._next._prev=this._prev),this._next=void 0,this._prev=void 0,this._parent=void 0,this}insertBefore(t){if(t instanceof n)return t._prev=this._prev,t._next=this,t._parent=this._parent,this._prev?this._prev._next=t:this._parent&&(this._parent._first=t),this._prev=t,this;throw new i("Can only insert a YngwieNode before other YngwieNodes",t)}replaceWith(t){if(t instanceof n){if(void 0!==this._parent)return this.insertBefore(t),this.detach(),t;throw new i("Can only replace YngwieNode if YngwieNode being replaced has parent",this)}throw new i("Can only replace a YngwieNode with another YngwieNode",t)}clone(){let t=`${this._value}`,e=new n(t);return this.children().reduce(((t,s)=>(e=s.clone(),t.append(e))),e)}step(t,e){return next=t(this,e),next&&next.step(t,e),e}parse(t,e){return n.parse(this,(s=>{e=t(s,e)})),e}static init(t){return new n(t)}static parse(t,e){if(!(t instanceof n))throw new i("Can only parse a YngwieNode",t);for(e(t),t=t._first;t;)n.parse(t,e),t=t._next}}class r{constructor(t,e){this._evtName=t,this._fns=e||[]}add(t){return this._fns.push(t),this}clone(){let t=`${this._evtName}`,e=this._fns.map((t=>new Function("evt","elem",t.toString())));return new r(t,e)}render(t,e){return this._fns.reduce(((t,s)=>(t.addEventListener(this._evtName,(function(i){s.call(void 0===e?t:e,i,t)})),t)),t)}static init(t,e){return void 0!==e?new r(t,!0===Array.isArray(e)?e:[e]):new r(t)}}class o extends n{constructor(t,e,s,i){super(t.toUpperCase()),this._attribs=e||{},this._text=s,this._listeners=[]}tagName(){return this._value}attribs(t){if(void 0===t)return this._attribs;if("object"==typeof t)return this._attribs=t,this;throw new i("YngwieElement attributes can only be set with OBJECT",t)}hasAttribute(t){return this._attribs.hasOwnProperty(t)}getAttribute(t){return this._attribs[t]}setAttribute(t,e){return this._attribs[t]=e,this}removeAttribute(t){return delete this._attribs[t],this}text(t){if(void 0===t)return this._text;if("string"==typeof t)return this._text=t,this;throw new i("Text of element can only be set with a STRING",t)}removeText(){return this._text=void 0,this}getElementsBy(t){return this.parse(((e,s)=>(e instanceof o&&!0===t(e)&&s.push(e),s)),[])}getElementsByTagName(t){return this.getElementsBy((e=>e.tagName()===t))}getElementsByAttribute(t,e){return this.getElementsBy((s=>!!s.hasAttribute(t)&&(void 0===e||s.getAttribute(t)===e)))}getElementsByClass(t){return this.getElementsByAttribute("class",t)}getElementByID(t){return this.getElementsByAttribute("id",t).pop()}on(t,e){let s=r.init(t,e);return this._listeners.push(s),this}clone(){let t=`${this._value}`,e=Object.keys(this._attribs).reduce(((t,e)=>(t[e]=`${this._attribs[e]}`,t)),{}),s=void 0!==this._text?`${this._text}`:void 0,i=this._listeners.map((t=>t.clone())),n=new o(t,e,s,i);return this.children().reduce(((t,e)=>(e=e.clone(),t.append(e))),n)}render(t,e){let s=void 0===e?document:e,i=Object.keys(this._attribs).reduce(((t,e)=>(t.setAttribute(e,this._attribs[e]),t)),s.createElement(this._value));if(i=this._listeners.reduce(((t,e)=>e.render(t,this)),i),"string"==typeof this._text){let t=s.createTextNode(this._text);i.appendChild(t)}let n=this.children().reduce(((t,e)=>(e=e.render(),t.appendChild(e),t)),i);return void 0!==t&&("string"==typeof t?s.querySelector(t).appendChild(n):t.appendChild(n)),n}static init(t,e,s,i){return new o(t,e,s,i)}static renderTo(t,e,s){let n=void 0===s?document:s;if(e instanceof Array){let s="string"==typeof t?n.querySelector(t):t;return e.reduce(((t,e)=>{if(e instanceof o)return e.render(t),t;throw new i("Only YngwieElement can be rendered to target",e)}),s)}throw new i("Expected array as argument",e)}static inject(t,e,s){if(e instanceof o){let i=void 0===s?document:s,n="string"==typeof t?i.querySelector(t):t,r=e.render();return n.replaceWith(r),n}throw new i("Only YngwieElement can be injected into target",e)}}class a{constructor(t){this._state=t}state(t){return void 0===t?this._state:a.resolveScope(t,this._state)}update(t,e){let n=s.getType(t);switch(n){case"Function":this._state=t(this._state);break;case"String":this._state[t]=e(this._state,this.state(t));break;default:throw new i("Argument passed to yngwieModel.update is of an unsupported type",n)}return this}each(t,e){let n=s.getType(t);switch(n){case"Function":this._state.forEach((e=>{t(a.init(e))}));break;case"String":let s=this.state(t);if(!(s instanceof Array))throw new i("Scope is not an array",n);s.forEach((t=>{e(a.init(t))}));break;default:throw new i("Argument passed to YngwieModel.forEach is of an unsupported type",n)}}prop(t,e){if(void 0===e){if(void 0!==this._state[t])return this._state[t];throw new i("No property found for given ID",t)}return this._state[t]=e,this}static init(t){return new a(t)}static resolveScope(t,e){if(void 0!==t){let s=t.split("."),i=e;for(let t=0;t<s.length&&(i=i[s[t]],void 0!==i);t++);return i}return e}static setAsModel(t){return t instanceof a?t:a.init(t)}}class h{constructor(t){this._elem=t||o.init("div"),this._fns=[],this._node=void 0,this._children=[]}elem(t){switch(s.getType(t)){case"undefined":return this._fns.reduce(((t,e)=>e(t)),this._elem);case"YngwieElement":return this._elem=t,this;default:return this._elem=o.init.apply(null,arguments),this}}modify(t){return this._fns.push(t),this}modifyOnce(t){return this._fns=[t],this}on(t,e){return this._elem.on(t,e),this}text(t){return this._elem.text(t),this}attribs(t){let e=s.getType(t).toUpperCase();switch(e){case"OBJECT":return this._elem.attribs(t),this;case"UNDEFINED":return this._elem.attribs();default:throw new i("Cannot set or get attributes of yngwieView for type of given arugment",e)}}attrib(t,e){let n=s.getType(t).toUpperCase();if(s.getType(e).toUpperCase(),"STRING"===n)return"UNDEFINED"!==n?(this._elem.setAttribute(t,e),this):this._elem.getAttribute(t);throw new i("Name of attribute must be of type STRING",n)}append(t){if(h.is(t))return this._children.push(t),this;throw new i("Only a yngwieView can be appended to another yngwieView",t)}appends(t){if(t instanceof Array)return t.reduce(((t,e)=>t.append(e)),this);throw new i("Expected ARRAY to append yngwieViews to this yngwieView",t)}render(t,e){return this._node=h.render(this,t,e),this._node}renderAgain(){if(this._node){let t=h.render(this);return this._node.replaceWith(t),this._node=t,this._node}throw new i("Cannont re-render view because it hasn't been rendered yet.")}inject(t,e){let s=this.render(),i=h.setAsNode(t,e);return i.innerHTML="",i.append(s),i}static init(t){switch(s.getType(t)){case"YngwieElement":case"undefined":return new h(t);default:let e=o.init.apply(null,arguments);return new h(e)}}static is(t){return t instanceof h}static setAsNode(t,e){let n=s.getType(t);switch(n){case"String":return void 0===e?document.querySelector(t):e.querySelector(t);case"Element":return t;case"undefined":return new DocumentFragment;default:throw new i("Argument cannot be a NODE",n)}}static render(t,e,s){let i=t.elem(),n=h.setAsNode(e,s),r=t._children.reduce(((t,e)=>{let s=e.render();return t.appendChild(s),t}),void 0===i?n:i.render(n));return r instanceof DocumentFragment?r.querySelector("body").firstElementChild:r}}class c{constructor(t){if("function"!=typeof t&&void 0!==t)throw new i("Constraint for yngwieMapping must either by a FUNCTION or UNDEFINED",t);this._constraint=void 0===t?t=>t:t,this._data={}}check(t){return"function"!=typeof this._constraint||this._constraint(t)}checkAll(t,e,s){if(Array.isArray(t)){for(let e=0;e<t.length;e++)if(!1===this.check(t[e]))return s(t[e]);return e(t)}throw new YngwierError("Can only check all values for a given ARRAY",t)}has(t){if("string"==typeof t)return void 0!==this._data[t];throw new i("Key to check for existence must by a STRING",t)}set(t,e){if("string"==typeof t){if(!0===this.check(e))return void 0===this._data[t]&&(this._data[t]=[]),this._data[t].push(e),this;throw new i(`Value to set key "${t}" of yngwieMapping failed constraint`,e)}if("object"==typeof t)return this.checkAll(Object.values(t),(e=>Object.entries(t).reduce(((t,[e,s])=>{if("string"==typeof e)return t[e]=s,t;throw new i("Could not set key from given OBJECT because of failed constraint",e)}),this._data)),(t=>{throw new i("Could not set value from given OBJECT because of failed constraint",t)}));if(void 0===t)return this;throw new i("Can only set key of yngwieMapping using either STRING or OBJECT",t)}setOnce(t,e){return this.has(t)&&this.removeKey(t),this.set(t,e)}get(t){if("string"==typeof t){if(!0===this.has(t))return this._data[t];throw new i("Cannot get value of a key that does not exist",t)}throw new i("Key to get value of must be a STRING",t)}remove(t){if("string"==typeof t){if(!0===this.has(t))return delete this._data[t],this;throw new i("Cannot remove key that does not exist",t)}throw new i("Key to remove must be a STRING",t)}static init(t){return new c(t)}static is(t){return t instanceof c}}class u{constructor(t,e,s){this._model=a.setAsModel(t),this._actions=c.init((t=>"function"==typeof t)).set(e),this._behaviors=c.init((t=>"string"==typeof t)).set(s)}model(){return this._model}action(t,e){try{return this._actions.setOnce(t,e),this}catch(t){throw new i(`Could not set action: ${t.msg}`,t.data)}}when(t,e){try{if(e instanceof Array){for(let s=0;s<e.length;s++)this.when(t,e[s]);return this}if(this._actions.has(e))return this._behaviors.set(t,e),this;throw new i("Cannot bind message to an action that doesn't exist",e)}catch(t){throw new i(`Could not set behavior: ${t.msg}`,t.data)}}send(t,e){try{this._behaviors.get(t).forEach((t=>{this._actions.get(t)[0].apply(this,e||[])}))}catch(t){throw console.log(t),new i(`Could not send message: ${t.msg}`,t.data)}}static init(t,e,s){return new u(t,e,s)}}class d{constructor(t,e,s){this._model=a.setAsModel(t),this._tasks=e||{},this._actions=s||{}}model(t){let e=s.getType(t).toUpperCase();switch(e){case"UNDEFINED":return this._model;case"OBJECT":return this._model=a.setAsModel(t),this;default:throw new YngwieError("Cannot set model with unsupported type",e)}}tasks(t){return this._tasks=t,this}task(t,e){return this._tasks[t]=e,this}action(t,e){return this._actions[t]=e,this}run(t){let e=this._tasks[t];if(void 0!==e){let t=Promise.resolve(this._model);for(let s=0;s<e.length;s++){let i=e[s],n=this._actions[i];if(void 0===n)return Promise.reject("No Action found for given action ID");t.then((t=>new Promise(((e,s)=>{n.apply(this,[t,e,s])}))))}return t}return Promise.reject("No Actions found for given task ID")}static init(t,e,s){return new d(t,e,s)}}class l extends d{constructor(t,e,s,i,n){super(t,e,s),this._signals=i||{},this._subscriptions=n||{}}signals(t){return this._signals=t,this}signal(t,e){return this._signals[t]=e,this}subscribe(t,e){return void 0===this._subscriptions[t]&&(this._subscriptions[t]=[]),this._subscriptions[t]=this._subscriptions[t].concat(e),this}subscribeOnce(t,e){return this._subscriptions[t]=e,this}unsubscribe(t){return delete this._subscriptions[t],this}broadcast(t,e){this._subscriptions[t].forEach((t=>{t.apply(this,[].concat(e))}))}send(t,e){return new Promise((async(s,i)=>{try{s(await this._signals[t].apply(this,[].concat(e)))}catch(t){i(t)}}))}chain(t){return this._tasks=Object.assign(this._tasks,t._tasks),this._signals=Object.assign(this._signals,t._signals),this._actions=Object.assign(this._actions,t._actions),this._subscriptions=Object.assign(this._subscriptions,t._subscriptions),this}static init(t,e,s,i){return new l(t,e,s)}}return e})()}));