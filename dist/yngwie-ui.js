!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.YngwieUI=e():t.YngwieUI=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Actor:()=>u,Error:()=>n,Machine:()=>l,Mapping:()=>c,Model:()=>a,View:()=>h});const i=class{static getType(t){return void 0===t?"undefined":null===t?"null":t.constructor.name}};class n extends Error{constructor(t,e){super(t),this.data=`${e}`}log(){console.log(this.stack),console.log("What Failed: ",this.data)}}class r{constructor(t){if("string"!=typeof t)throw new n("Value of YngwieNode must be STRING",t);this._value=t,this._parent=void 0,this._first=void 0,this._last=void 0,this._next=void 0,this._prev=void 0}children(){let t=this._first,e=[];for(;t;)e.push(t),t=t._next;return e}append(t){if(t instanceof r)return t._parent&&t.detach(),void 0!==this._first?(t._prev=this._last,this._last._next=t,this._last=t):(this._first=t,this._last=t),t._parent=this,this;throw new n("Can only apppend YngwieNode to other YngwieNodes",t)}appends(t){if(t instanceof Array)return t.reduce(((t,e)=>this.append(e)),this);throw new n("Expected array as arguemnt",t)}detach(){return this._prev?this._prev._next=this._next:this._parent&&(this._parent._first=this._next),this._next&&(this._next._prev=this._prev),this._next=void 0,this._prev=void 0,this._parent=void 0,this}insertBefore(t){if(t instanceof r)return t._prev=this._prev,t._next=this,t._parent=this._parent,this._prev?this._prev._next=t:this._parent&&(this._parent._first=t),this._prev=t,this;throw new n("Can only insert a YngwieNode before other YngwieNodes",t)}replaceWith(t){if(t instanceof r){if(void 0!==this._parent)return this.insertBefore(t),this.detach(),t;throw new n("Can only replace YngwieNode if YngwieNode being replaced has parent",this)}throw new n("Can only replace a YngwieNode with another YngwieNode",t)}clone(){let t=`${this._value}`,e=new r(t);return this.children().reduce(((t,i)=>(e=i.clone(),t.append(e))),e)}step(t,e){return next=t(this,e),next&&next.step(t,e),e}parse(t,e){return r.parse(this,(i=>{e=t(i,e)})),e}static init(t){return new r(t)}static parse(t,e){if(!(t instanceof r))throw new n("Can only parse a YngwieNode",t);for(e(t),t=t._first;t;)r.parse(t,e),t=t._next}}class s{constructor(t,e){this._evtName=t,this._fns=e||[]}add(t){return this._fns.push(t),this}clone(){let t=`${this._evtName}`,e=this._fns.map((t=>new Function("evt","elem",t.toString())));return new s(t,e)}render(t,e){return this._fns.reduce(((t,i)=>(t.addEventListener(this._evtName,(function(n){i.call(void 0===e?t:e,n,t)})),t)),t)}static init(t,e){return void 0!==e?new s(t,!0===Array.isArray(e)?e:[e]):new s(t)}}class o extends r{constructor(t,e,i,n){super(t.toUpperCase()),this._attribs=e||{},this._text=i,this._listeners=[]}tagName(){return this._value}attribs(t){if(void 0===t)return this._attribs;if("object"==typeof t)return this._attribs=t,this;throw new n("YngwieElement attributes can only be set with OBJECT",t)}hasAttribute(t){return this._attribs.hasOwnProperty(t)}getAttribute(t){return this._attribs[t]}setAttribute(t,e){return this._attribs[t]=e,this}removeAttribute(t){return delete this._attribs[t],this}text(t){if(void 0===t)return this._text;if("string"==typeof t)return this._text=t,this;throw new n("Text of element can only be set with a STRING",t)}removeText(){return this._text=void 0,this}getElementsBy(t){return this.parse(((e,i)=>(e instanceof o&&!0===t(e)&&i.push(e),i)),[])}getElementsByTagName(t){return this.getElementsBy((e=>e.tagName()===t))}getElementsByAttribute(t,e){return this.getElementsBy((i=>!!i.hasAttribute(t)&&(void 0===e||i.getAttribute(t)===e)))}getElementsByClass(t){return this.getElementsByAttribute("class",t)}getElementByID(t){return this.getElementsByAttribute("id",t).pop()}on(t,e){let i=s.init(t,e);return this._listeners.push(i),this}clone(){let t=`${this._value}`,e=Object.keys(this._attribs).reduce(((t,e)=>(t[e]=`${this._attribs[e]}`,t)),{}),i=void 0!==this._text?`${this._text}`:void 0,n=this._listeners.map((t=>t.clone())),r=new o(t,e,i,n);return this.children().reduce(((t,e)=>(e=e.clone(),t.append(e))),r)}render(t,e){let i=void 0===e?document:e,n=Object.keys(this._attribs).reduce(((t,e)=>(t.setAttribute(e,this._attribs[e]),t)),i.createElement(this._value));if(n=this._listeners.reduce(((t,e)=>e.render(t,this)),n),"string"==typeof this._text){let t=i.createTextNode(this._text);n.appendChild(t)}let r=this.children().reduce(((t,e)=>(e=e.render(),t.appendChild(e),t)),n);return void 0!==t&&("string"==typeof t?i.querySelector(t).appendChild(r):t.appendChild(r)),r}static init(t,e,i,n){return new o(t,e,i,n)}static renderTo(t,e,i){let r=void 0===i?document:i;if(e instanceof Array){let i="string"==typeof t?r.querySelector(t):t;return e.reduce(((t,e)=>{if(e instanceof o)return e.render(t),t;throw new n("Only YngwieElement can be rendered to target",e)}),i)}throw new n("Expected array as argument",e)}static inject(t,e,i){if(e instanceof o){let n=void 0===i?document:i,r="string"==typeof t?n.querySelector(t):t,s=e.render();return r.replaceWith(s),r}throw new n("Only YngwieElement can be injected into target",e)}}class a{constructor(t){this._state=t}state(t){return void 0===t?this._state:a.resolveScope(t,this._state)}update(t,e){let r=i.getType(t);switch(r){case"Function":this._state=t(this._state);break;case"String":this._state[t]=e(this._state,this.state(t));break;default:throw new n("Argument passed to yngwieModel.update is of an unsupported type",r)}return this}each(t,e){let r=i.getType(t);switch(r){case"Function":this._state.forEach((e=>{t(a.init(e))}));break;case"String":let i=this.state(t);if(!(i instanceof Array))throw new n("Scope is not an array",r);i.forEach((t=>{e(a.init(t))}));break;default:throw new n("Argument passed to YngwieModel.forEach is of an unsupported type",r)}}prop(t,e){if(void 0===e){if(void 0!==this._state[t])return this._state[t];throw new n("No property found for given ID",t)}return this._state[t]=e,this}static init(t){return new a(t)}static resolveScope(t,e){if(void 0!==t){let i=t.split("."),n=e;for(let t=0;t<i.length&&(n=n[i[t]],void 0!==n);t++);return n}return e}static setAsModel(t){return t instanceof a?t:a.init(t)}}class h{constructor(t){this._elem=t||o.init("div"),this._fns=[],this._node=void 0,this._children=[]}elem(t){switch(i.getType(t)){case"undefined":return this._fns.reduce(((t,e)=>e(t)),this._elem);case"YngwieElement":return this._elem=t,this;default:return this._elem=o.init.apply(null,arguments),this}}modify(t){return this._fns.push(t),this}modifyOnce(t){return this._fns=[t],this}on(t,e){return this._elem.on(t,e),this}text(t){return this._elem.text(t),this}attribs(t){let e=i.getType(t).toUpperCase();switch(e){case"OBJECT":return this._elem.attribs(t),this;case"UNDEFINED":return this._elem.attribs();default:throw new n("Cannot set or get attributes of yngwieView for type of given arugment",e)}}attrib(t,e){let r=i.getType(t).toUpperCase();if(i.getType(e).toUpperCase(),"STRING"===r)return"UNDEFINED"!==r?(this._elem.setAttribute(t,e),this):this._elem.getAttribute(t);throw new n("Name of attribute must be of type STRING",r)}append(t){if(h.is(t))return this._children.push(t),this;throw new n("Only a yngwieView can be appended to another yngwieView",t)}appends(t){if(t instanceof Array)return t.reduce(((t,e)=>t.append(e)),this);throw new n("Expected ARRAY to append yngwieViews to this yngwieView",t)}render(t,e){return this._node=h.render(this,t,e),this._node}renderAgain(){if(this._node){let t=h.render(this);return this._node.replaceWith(t),this._node=t,this._node}throw new n("Cannont re-render view because it hasn't been rendered yet.")}inject(t,e){let i=this.render(),n=h.setAsNode(t,e);return n.innerHTML="",n.append(i),n}static init(t){switch(i.getType(t)){case"YngwieElement":case"undefined":return new h(t);default:let e=o.init.apply(null,arguments);return new h(e)}}static is(t){return t instanceof h}static setAsNode(t,e){let r=i.getType(t);switch(r){case"String":return void 0===e?document.querySelector(t):e.querySelector(t);case"Element":return t;case"undefined":return new DocumentFragment;default:throw new n("Argument cannot be a NODE",r)}}static render(t,e,i){let n=t.elem(),r=h.setAsNode(e,i),s=t._children.reduce(((t,e)=>{let i=e.render();return t.appendChild(i),t}),void 0===n?r:n.render(r));return s instanceof DocumentFragment?s.querySelector("body").firstElementChild:s}}class c{constructor(t){if("function"!=typeof t&&void 0!==t)throw new n("Constraint for yngwieMapping must either by a FUNCTION or UNDEFINED",t);this._constraint=void 0===t?t=>t:t,this._data={}}check(t){return"function"!=typeof this._constraint||this._constraint(t)}checkAll(t,e,i){if(Array.isArray(t)){for(let e=0;e<t.length;e++)if(!1===this.check(t[e]))return i(t[e]);return e(t)}throw new YngwierError("Can only check all values for a given ARRAY",t)}has(t){if("string"==typeof t)return void 0!==this._data[t];throw new n("Key to check for existence must by a STRING",t)}set(t,e){if("string"==typeof t){if(!0===this.check(e))return void 0===this._data[t]&&(this._data[t]=[]),this._data[t].push(e),this;throw new n(`Value to set key "${t}" of yngwieMapping failed constraint`,e)}if("object"==typeof t)return this.checkAll(Object.values(t),(e=>Object.entries(t).reduce(((t,[e,i])=>{if("string"==typeof e)return t[e]=i,t;throw new n("Could not set key from given OBJECT because of failed constraint",e)}),this._data)),(t=>{throw new n("Could not set value from given OBJECT because of failed constraint",t)}));if(void 0===t)return this;throw new n("Can only set key of yngwieMapping using either STRING or OBJECT",t)}setOnce(t,e){return this.has(t)&&this.removeKey(t),this.set(t,e)}get(t){if("string"==typeof t){if(!0===this.has(t))return this._data[t];throw new n("Cannot get value of a key that does not exist",t)}throw new n("Key to get value of must be a STRING",t)}remove(t){if("string"==typeof t){if(!0===this.has(t))return delete this._data[t],this;throw new n("Cannot remove key that does not exist",t)}throw new n("Key to remove must be a STRING",t)}static init(t){return new c(t)}static is(t){return t instanceof c}}class u{constructor(t,e,i){this._model=a.setAsModel(t),this._actions=c.init((t=>"function"==typeof t)).set(e),this._behaviors=c.init((t=>"string"==typeof t)).set(i)}model(){return this._model}action(t,e){try{return this._actions.setOnce(t,e),this}catch(t){throw new n(`Could not set action: ${t.msg}`,t.data)}}when(t,e){try{if(e instanceof Array){for(let i=0;i<e.length;i++)this.when(t,e[i]);return this}if(this._actions.has(e))return this._behaviors.set(t,e),this;throw new n("Cannot bind message to an action that doesn't exist",e)}catch(t){throw new n(`Could not set behavior: ${t.msg}`,t.data)}}send(t,e){try{this._behaviors.get(t).forEach((t=>{this._actions.get(t)[0].apply(this,e||[])}))}catch(t){throw console.log(t),new n(`Could not send message: ${t.msg}`,t.data)}}static init(t,e,i){return new u(t,e,i)}}class d extends i{static forEachCps(t,e,i){t<e.length&&i(e[t],(function(){d.forEachCps(t+1,e,i)}))}}class l{constructor(t,e,i){this._model=a.setAsModel(t),this._states=e||{},this._actions=i||{}}model(t){let e=i.getType(t).toUpperCase();switch(e){case"UNDEFINED":return this._model;case"OBJECT":return this._model=a.setAsModel(t),this;default:throw new YngwieError("Cannot set model with unsupported type",e)}}states(t){return this._states=t,this}state(t,e){return this._states[t]=e,this}action(t,e){return this._actions[t]=e,this}transistion(t){let e=this._states[t];d.forEachCps(0,e||[],((t,e)=>{this._actions[t].call(this,this.model(),e)}))}static init(t,e,i){return new l(t,e,i)}}return e})()}));