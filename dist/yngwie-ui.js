!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.YngwieUI=e():t.YngwieUI=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Actor:()=>d,Error:()=>r,Mapping:()=>c,Model:()=>a,View:()=>h});const n=class{static getType(t){return void 0===t?"undefined":null===t?"null":t.constructor.name}};class r extends Error{constructor(t,e){super(t),this.data=`${e}`}log(){console.log(this.stack),console.log("What Failed: ",this.data)}}class i{constructor(t){if("string"!=typeof t)throw new r("Value of YngwieNode must be STRING",t);this._value=t,this._parent=void 0,this._first=void 0,this._last=void 0,this._next=void 0,this._prev=void 0}children(){let t=this._first,e=[];for(;t;)e.push(t),t=t._next;return e}append(t){if(t instanceof i)return t._parent&&t.detach(),void 0!==this._first?(t._prev=this._last,this._last._next=t,this._last=t):(this._first=t,this._last=t),t._parent=this,this;throw new r("Can only apppend YngwieNode to other YngwieNodes",t)}appends(t){if(t instanceof Array)return t.reduce(((t,e)=>this.append(e)),this);throw new r("Expected array as arguemnt",t)}detach(){return this._prev?this._prev._next=this._next:this._parent&&(this._parent._first=this._next),this._next&&(this._next._prev=this._prev),this._next=void 0,this._prev=void 0,this._parent=void 0,this}insertBefore(t){if(t instanceof i)return t._prev=this._prev,t._next=this,t._parent=this._parent,this._prev?this._prev._next=t:this._parent&&(this._parent._first=t),this._prev=t,this;throw new r("Can only insert a YngwieNode before other YngwieNodes",t)}replaceWith(t){if(t instanceof i){if(void 0!==this._parent)return this.insertBefore(t),this.detach(),t;throw new r("Can only replace YngwieNode if YngwieNode being replaced has parent",this)}throw new r("Can only replace a YngwieNode with another YngwieNode",t)}clone(){let t=`${this._value}`,e=new i(t);return this.children().reduce(((t,n)=>(e=n.clone(),t.append(e))),e)}step(t,e){return next=t(this,e),next&&next.step(t,e),e}parse(t,e){return i.parse(this,(n=>{e=t(n,e)})),e}static init(t){return new i(t)}static parse(t,e){if(!(t instanceof i))throw new r("Can only parse a YngwieNode",t);for(e(t),t=t._first;t;)i.parse(t,e),t=t._next}}class s{constructor(t,e){this._evtName=t,this._fns=e||[]}add(t){return this._fns.push(t),this}clone(){let t=`${this._evtName}`,e=this._fns.map((t=>new Function("evt","elem",t.toString())));return new s(t,e)}render(t,e){return this._fns.reduce(((t,n)=>(t.addEventListener(this._evtName,(function(r){n.call(void 0===e?t:e,r,t)})),t)),t)}static init(t,e){return void 0!==e?new s(t,!0===Array.isArray(e)?e:[e]):new s(t)}}class o extends i{constructor(t,e,n,r){super(t.toUpperCase()),this._attribs=e||{},this._text=n,this._listeners=[]}tagName(){return this._value}attribs(t){if(void 0===t)return this._attribs;if("object"==typeof t)return this._attribs=t,this;throw new r("YngwieElement attributes can only be set with OBJECT",t)}hasAttribute(t){return this._attribs.hasOwnProperty(t)}getAttribute(t){return this._attribs[t]}setAttribute(t,e){return this._attribs[t]=e,this}removeAttribute(t){return delete this._attribs[t],this}text(t){if(void 0===t)return this._text;if("string"==typeof t)return this._text=t,this;throw new r("Text of element can only be set with a STRING",t)}removeText(){return this._text=void 0,this}getElementsBy(t){return this.parse(((e,n)=>(e instanceof o&&!0===t(e)&&n.push(e),n)),[])}getElementsByTagName(t){return this.getElementsBy((e=>e.tagName()===t))}getElementsByAttribute(t,e){return this.getElementsBy((n=>!!n.hasAttribute(t)&&(void 0===e||n.getAttribute(t)===e)))}getElementsByClass(t){return this.getElementsByAttribute("class",t)}getElementByID(t){return this.getElementsByAttribute("id",t).pop()}on(t,e){let n=s.init(t,e);return this._listeners.push(n),this}clone(){let t=`${this._value}`,e=Object.keys(this._attribs).reduce(((t,e)=>(t[e]=`${this._attribs[e]}`,t)),{}),n=void 0!==this._text?`${this._text}`:void 0,r=this._listeners.map((t=>t.clone())),i=new o(t,e,n,r);return this.children().reduce(((t,e)=>(e=e.clone(),t.append(e))),i)}render(t,e){let n=void 0===e?document:e,r=Object.keys(this._attribs).reduce(((t,e)=>(t.setAttribute(e,this._attribs[e]),t)),n.createElement(this._value));if(r=this._listeners.reduce(((t,e)=>e.render(t,this)),r),"string"==typeof this._text){let t=n.createTextNode(this._text);r.appendChild(t)}let i=this.children().reduce(((t,e)=>(e=e.render(),t.appendChild(e),t)),r);return void 0!==t&&("string"==typeof t?n.querySelector(t).appendChild(i):t.appendChild(i)),i}static init(t,e,n,r){return new o(t,e,n,r)}static renderTo(t,e,n){let i=void 0===n?document:n;if(e instanceof Array){let n="string"==typeof t?i.querySelector(t):t;return e.reduce(((t,e)=>{if(e instanceof o)return e.render(t),t;throw new r("Only YngwieElement can be rendered to target",e)}),n)}throw new r("Expected array as argument",e)}static inject(t,e,n){if(e instanceof o){let r=void 0===n?document:n,i="string"==typeof t?r.querySelector(t):t,s=e.render();return i.replaceWith(s),i}throw new r("Only YngwieElement can be injected into target",e)}}class a{constructor(t){this._state=t}state(t){return void 0===t?this._state:a.resolveScope(t,this._state)}update(t,e){let i=n.getType(t);switch(i){case"Function":this._state=t(this._state);break;case"String":this._state[t]=e(this._state,this.state(t));break;default:throw new r("Argument passed to yngwieModel.update is of an unsupported type",i)}return this}each(t,e){let i=n.getType(t);switch(i){case"Function":this._state.forEach((e=>{t(a.init(e))}));break;case"String":let n=this.state(t);if(!(n instanceof Array))throw new r("Scope is not an array",i);n.forEach((t=>{e(a.init(t))}));break;default:throw new r("Argument passed to YngwieModel.forEach is of an unsupported type",i)}}prop(t,e){if(void 0===e){if(void 0!==this._state[t])return this._state[t];throw new r("No property found for given ID",t)}return this._state[t]=e,this}static init(t){return new a(t)}static resolveScope(t,e){if(void 0!==t){let n=t.split("."),r=e;for(let t=0;t<n.length&&(r=r[n[t]],void 0!==r);t++);return r}return e}static setAsModel(t){return t instanceof a?t:a.init(t)}}class h{constructor(t){this._elem=()=>t,this._fns=[],this._node=void 0,this._children=[]}elem(t){switch(n.getType(t)){case"undefined":return this._fns.length>0?this._fns.reduce(((t,e)=>e(t)),this._elem()):this._elem();case"YngwieElement":return this._elem=()=>t,this;default:let e=arguments;return this._elem=()=>o.init.apply(null,e),this}}modify(t){return this._fns.push(t),this}on(t,e){return this.modify((n=>n.on(t,e)))}text(t){return this.modify((e=>e.text(t)))}append(t){if(h.is(t))return this._children.push(t),this;throw new r("Only a yngwieView can be appended to another yngwieView",t)}appends(t){if(t instanceof Array)return t.reduce(((t,e)=>t.append(e)),this);throw new r("Expected ARRAY to append yngwieViews to this yngwieView",t)}render(t,e){return this._node=h.render(this,t,e),this._node}renderAgain(){if(this._node){let t=h.render(this);return this._node.replaceWith(t),this._node=t,this._node}throw new r("Cannont re-render view because it hasn't been rendered yet.")}inject(t,e){let n=this.render(),r=h.setAsNode(t,e);return r.innerHTML="",r.append(n),r}static init(t){switch(n.getType(t)){case"YngwieElement":case"undefined":return new h(t);default:let e=o.init.apply(null,arguments);return new h(e)}}static is(t){return t instanceof h}static setAsNode(t,e){let i=n.getType(t);switch(i){case"String":return void 0===e?document.querySelector(t):e.querySelector(t);case"Element":return t;case"undefined":return new DocumentFragment;default:throw new r("Argument cannot be a NODE",i)}}static render(t,e,n){let r=t.elem(),i=h.setAsNode(e,n),s=t._children.reduce(((t,e)=>{let n=e.render();return t.appendChild(n),t}),void 0===r?i:r.render(i));return s instanceof DocumentFragment?s.querySelector("body").firstElementChild:s}}class c{constructor(t){if("function"!=typeof t&&void 0!==t)throw new r("Constraint for yngwieMapping must either by a FUNCTION or UNDEFINED",t);this._constraint=void 0===t?t=>t:t,this._data={}}check(t){return"function"!=typeof this._constraint||this._constraint(t)}checkAll(t,e,n){if(Array.isArray(t)){for(let e=0;e<t.length;e++)if(!1===this.check(t[e]))return n(t[e]);return e(t)}throw new YngwierError("Can only check all values for a given ARRAY",t)}has(t){if("string"==typeof t)return void 0!==this._data[t];throw new r("Key to check for existence must by a STRING",t)}set(t,e){if("string"==typeof t){if(!0===this.check(e))return void 0===this._data[t]&&(this._data[t]=[]),this._data[t].push(e),this;throw new r(`Value to set key "${t}" of yngwieMapping failed constraint`,e)}if("object"==typeof t)return this.checkAll(Object.values(t),(e=>Object.entries(t).reduce(((t,[e,n])=>{if("string"==typeof e)return t[e]=n,t;throw new r("Could not set key from given OBJECT because of failed constraint",e)}),this._data)),(t=>{throw new r("Could not set value from given OBJECT because of failed constraint",t)}));if(void 0===t)return this;throw new r("Can only set key of yngwieMapping using either STRING or OBJECT",t)}setOnce(t,e){return this.has(t)&&this.removeKey(t),this.set(t,e)}get(t){if("string"==typeof t){if(!0===this.has(t))return this._data[t];throw new r("Cannot get value of a key that does not exist",t)}throw new r("Key to get value of must be a STRING",t)}remove(t){if("string"==typeof t){if(!0===this.has(t))return delete this._data[t],this;throw new r("Cannot remove key that does not exist",t)}throw new r("Key to remove must be a STRING",t)}static init(t){return new c(t)}static is(t){return t instanceof c}}class d{constructor(t,e,n){this._model=a.setAsModel(t),this._actions=c.init((t=>"function"==typeof t)).set(e),this._behaviors=c.init((t=>"string"==typeof t)).set(n)}model(){return this._model}action(t,e){try{return this._actions.setOnce(t,e),this}catch(t){throw new r(`Could not set action: ${t.msg}`,t.data)}}when(t,e){try{if(e instanceof Array){for(let n=0;n<e.length;n++)this.when(t,e[n]);return this}if(this._actions.has(e))return this._behaviors.set(t,e),this;throw new r("Cannot bind message to an action that doesn't exist",e)}catch(t){throw new r(`Could not set behavior: ${t.msg}`,t.data)}}send(t,e){try{this._behaviors.get(t).forEach((t=>{this._actions.get(t)[0].apply(this,e||[])}))}catch(t){throw console.log(t),new r(`Could not send message: ${t.msg}`,t.data)}}static init(t,e,n){return new d(t,e,n)}}return e})()}));