(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["YngwieUI"] = factory();
	else
		root["YngwieUI"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/yngwie-mvc/src/Controller/main.js":
/*!********************************************************!*\
  !*** ./node_modules/yngwie-mvc/src/Controller/main.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieController)
/* harmony export */ });
/* harmony import */ var _Model_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/main.js */ "./node_modules/yngwie-mvc/src/Model/main.js");
/* harmony import */ var _View_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View/main.js */ "./node_modules/yngwie-mvc/src/View/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");




class YngwieController {

  // CONSTRUCTOR :: {STRING:(... -> *)} -> yngwieController
  constructor(registry) {
    this._registry = registry || {};
  }

  // :: STRING -> BOOLEAN
  // Returns boolean for if any functions are bound to given ID:
  isRegistered(id) {
    return this._registry[id] !== undefined;
  }

  // :: STRING, (... -> VOID) -> this;
  // Binds function to given STRING:
  // NOTE: Functions bound to signal ID are stored in ARRAY, so multiple functions can be bound to the same ID
  register(id, fn) {
    if (this.isRegistered(id) === false) {
      this._registry[id] = [];
    }
    this._registry[id].push(fn);
    return this;
  }

  // :: STRING -> this;
  // Removes function bound to given STRING:
  // NOTE: If ID does not exist, an yngwieError is thrown:
  // NOTE: Unregistering signal removes ALL functions bound to that signal ID:
  unregister(id) {
    if (this.isRegistered(id) === true) {
      delete this._registry[id];
      return this;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_2__.Error("No functions bound to given ID", id);
  }

  // STRING, ... -> this;
  // Applies values to function bound to signal ID
  // NOTE: If ID does not exist, a yngwieError is thrown:
  signal() {
    let id = arguments[0];
    let args = Array.from(arguments);
    if (this.isRegistered(id) === true) {
      this._registry[id].forEach(fn=>{
        fn.apply(this, args.slice(1));
      });
      return this;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_2__.Error("Cannot dispatch value to an ID that doesn't exist", id);
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: {STRING:[*->VOID]} -> yngwieController
  // Static factory method:
  static init(registry) {
    return new YngwieController(registry);
  }

}


/***/ }),

/***/ "./node_modules/yngwie-mvc/src/Model/main.js":
/*!***************************************************!*\
  !*** ./node_modules/yngwie-mvc/src/Model/main.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieModel)
/* harmony export */ });
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/main.js */ "./node_modules/yngwie-mvc/src/Util/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");



class YngwieModel {

  // CONSTRUCTOR :: OBJECT -> yngwieModel
  constructor(data) {
    this._state = data;
  }

  // :: VOID|STRING -> OBJECT
  // Returns data of model with applied scope, otherwise returns all data stored in model:
  state(scope) {
    return scope === undefined ? this._state : YngwieModel.resolveScope(scope, this._state);
  }

  // :: STRING|OBJECT -> *, OBJECT, OBJECT -> *|VOID -> this;
  // Applies function to state and optional scope, replacing state with the result of that function:
  update(a, b) {
    let typeArg = _Util_main_js__WEBPACK_IMPORTED_MODULE_0__["default"].getType(a);
    switch (typeArg) {
      case "Function":
        this._state = a(this._state);
      break;
      case "String":
        this._state[a] = b(this._state, this.state(a));
      break;
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("Argument passed to yngwieModel.update is of an unsupported type", typeArg);
    }
    return this;
  }

  // :: STRING|(yngwieModel -> VOID), (yngwieModel -> VOID)|VOID -> VOID
  // Applies function to every element of scope, if only function is given then it's applied to every element of state:
  each(a, b) {
    let typeArg = _Util_main_js__WEBPACK_IMPORTED_MODULE_0__["default"].getType(a);
    switch (typeArg) {
      case "Function":
        this._state.forEach(elem=>{
          a(YngwieModel.init(elem));
        });
      break;
      case "String":
        let state = this.state(a);
        if (state instanceof Array) {
          state.forEach(elem=>{
            b(YngwieModel.init(elem));
          });
        } else {
          throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("Scope is not an array", typeArg);
        }
      break;
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("Argument passed to YngwieModel.forEach is of an unsupported type", typeArg);
    }
  }

  // :: STRING, *|VOID -> this|*
  // Sets or gets property from model:
  prop(id, val) {
    if (val === undefined) {
      if (this._state[id] !== undefined) {
        return this._state[id];
      }
      throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("No property found for given ID", id);
    } else {
      this._state[id] = val;
    }
    return this;
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: OBJECT -> yngwieModel
  // Static factory method:
  static init(data) {
    return new YngwieModel(data);
  }

  // :: STRING, OBJECT -> OBJECT|UNDEFINED
  // Returns object for the given scope - if scope can't re resolved then UNDEFINED is returned:
  static resolveScope(scope, obj) {
    if (scope !== undefined) {
      let scopes = scope.split(".");
      let result = obj;
      for (let i = 0; i < scopes.length; i++) {
        let currentScope = scopes[i];
        result = result[currentScope];
        if (result === undefined) {
          break;
        }
      }
      return result;
    }
    return obj;
  }

  // :: OBJECT|yngwieModel -> yngwieModel
  // Returns value as yngwieModel:
  static setAsModel(model) {
    return model instanceof YngwieModel
      ? model
      : YngwieModel.init(model);
  }

}


/***/ }),

/***/ "./node_modules/yngwie-mvc/src/Util/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yngwie-mvc/src/Util/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Singleton of utility methods:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {

  // :: * -> STRING
  // Returns type of given value as STRING:
  static getType(val) {
    if (val === undefined) return "undefined";
    if (val === null) return "null";
    return val.constructor.name;
  }
  
});


/***/ }),

/***/ "./node_modules/yngwie-mvc/src/View/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yngwie-mvc/src/View/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieView)
/* harmony export */ });
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util/main.js */ "./node_modules/yngwie-mvc/src/Util/main.js");



class YngwieView {

  // :: CONSTRUCTOR :: yngwieElement|VOID -> yngwieView
  constructor(yngwieElement) {
    this._elem = () => yngwieElement;
    this._fns = [];
    this._node = undefined;
    this._children = [];
  }

  // :: VOID|yngwieElement|STRING, STRING, OBJECT, STRING, [yngwieListener] -> yngwieElement|this|this
  // Setter/getter method for yngwieElement stored by view:
  // NOTE: Getting the yngiweElement stored by view will apply every stored modifer function to that yngwieElement
  elem(arg) {
    switch (_Util_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].getType(arg)) {
      // Applies view to every modifier function, if there are no modifer functions elem is returned:
      case "undefined":
        return this._fns.length > 0
          ? this._fns.reduce((view, fn) => {
            return fn(view);
          }, this._elem())
          : this._elem();
      // Sets _elem to given yngwieElement:
      case "YngwieElement":
        this._elem = () => arg;
        return this;
      // Tries to initalize yngwieElement using given arguments:
      default:
        let args = arguments;
        this._elem = () => yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init.apply(null, args);
        return this;
    }
  }

  // :: (yngwieElement -> yngwieElement) -> this
  // Adds function to apply to yngwieElement when view is retrieved or rendered:
  modify(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: STRING, (EVENT, NODE -> VOID) -> this
  // Initializes yngwieListener for yngwieElement stored by view:
  on(id, fn) {
    return this.modify(yngwieElement=>{
      return yngwieElement.on(id, fn);
    });
  }

  // :: STRING -> this
  // Modifes element of view to show given text:
  text(str) {
    return this.modify(yngwieElement=>{
      return yngwieElement.text(str);
    });
  }

  // :: yngwieView -> this;
  // Appends another yngwieView to this view:
  append(yngwieView) {
    if (YngwieView.is(yngwieView)) {
      this._children.push(yngwieView);
      return this;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Only a yngwieView can be appended to another yngwieView", yngwieView);
  }

  // :: [yngwieView] -> this
  // Appends array of yngwieViews to this view:
  appends(yngwieViews) {
    if (yngwieViews instanceof Array) {
      return yngwieViews.reduce((result, view) => {
        return result.append(view);
      }, this);
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Expected ARRAY to append yngwieViews to this yngwieView", yngwieViews);
  }

  // :: STRING|ELEMENT|VOID, OBJECT|VOID -> ELEMENT
  // Creates and returns rendered ELEMENT from view, storing result of render:
  render(target, context) {
    // Store result of render:
    this._node = YngwieView.render(this, target, context);
    // Return render:
    return this._node;
  }

  // :: VOID -> ELEMENT
  // Re-renders view using stored node:
  // NOTE: If no node has been stored, then a yngwieError is thrown:
  renderAgain() {
    if (this._node) {
      let result = YngwieView.render(this);
      this._node.replaceWith(result);
      this._node = result;
      return this._node;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Cannont re-render view because it hasn't been rendered yet.");
  }

  // STRING|NODE, OBJECT|VOID -> ELEMENT
  // Empties content of given target and appends it with rendered node:
  inject(target, context) {
    let render = this.render();
    let elem = YngwieView.setAsNode(target, context);
    elem.innerHTML = "";
    elem.append(render);
    return elem;
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: yngwieElement|STRING, STRING, OBJECT, STRING, [yngwieListener] -> yngwieView
  // Static factory method:
  static init(yngwieElement) {
    switch (_Util_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].getType(yngwieElement)) {
      case "YngwieElement":
      case "undefined":
        return new YngwieView(yngwieElement);
      default:
        let elem = yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init.apply(null, arguments);
        return new YngwieView(elem);
    }
  }

  // :: * -> BOOLEAN
  // Return TRUE if given value is an instance of YngwieView
  static is(val) {
    return val instanceof YngwieView;
  }

  // STRING|ELEMENT|VOID, DOCUMENT|VOID -> ELEMENT|DOCUMENTFRAGMENT
  // Returns NODE for given target and context
  static setAsNode(target, context) {
    let argType = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].getType(target);
    switch (argType) {
      case "String":
        return context === undefined
          ? document.querySelector(target)
          : context.querySelector(target);
      case "Element":
        return target;
      case "undefined":
        return new DocumentFragment();
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Argument cannot be a NODE", argType);
    }
  }

  // :: ynviewView, STRING|ELEMENT|VOID, DOCUMENT|VOID -> ELEMENT
  // Renders given view and all of it children using given target and context:
  static render(view, target, context) {
    let elem = view.elem();
    let node = YngwieView.setAsNode(target, context);
    let result = view._children.reduce((elem, child) => {
      let view = child.render();
      elem.appendChild(view);
      return elem;
    }, elem === undefined ? node : elem.render(node));
    return result instanceof DocumentFragment
      ? result.querySelector("body").firstElementChild
      : result;
  }

}


/***/ }),

/***/ "./node_modules/yngwie-mvc/src/main.js":
/*!*********************************************!*\
  !*** ./node_modules/yngwie-mvc/src/main.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* reexport safe */ _Model_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "View": () => (/* reexport safe */ _View_main_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Controller": () => (/* reexport safe */ _Controller_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Transform": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_3__.Transform),
/* harmony export */   "Error": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_3__.Error)
/* harmony export */ });
/* harmony import */ var _Model_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/main.js */ "./node_modules/yngwie-mvc/src/Model/main.js");
/* harmony import */ var _View_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/main.js */ "./node_modules/yngwie-mvc/src/View/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller/main.js */ "./node_modules/yngwie-mvc/src/Controller/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");








/***/ }),

/***/ "./node_modules/yngwie/src/Element/main.js":
/*!*************************************************!*\
  !*** ./node_modules/yngwie/src/Element/main.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieElement)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Listener_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Listener/main.js */ "./node_modules/yngwie/src/Listener/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Error/main.js */ "./node_modules/yngwie/src/Error/main.js");




class YngwieElement extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  // CONSTRUCTOR :: STRING. OBJECT, STRING, [yngwieListener] -> yngwieElement
  constructor(tagName, attribs, text, listeners) {
    super(tagName.toUpperCase());     // Stores tagName in ALL CAPS
    this._attribs = attribs || {};     // Element Attributes
    this._text = text;                 // Element text that's appended as first child of this element
    this._listeners = [];            // Listeners bound to this element
  }

  // :: VOID -> STRING
  // Returns tagName of this element:
  tagName() {
    return this._value;
  }

  // :: OBJECT|VOID -> this|OBJECT
  // Sets "attribs" OBJECT with given OBJECT:
  // NOTE: If no argument is given, set attributes are returned:
  attribs(attribs) {
    if (attribs === undefined) {
      return this._attribs;
    } else {
      if (typeof(attribs) === "object") {
        this._attribs = attribs;
        return this;
      }
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]("YngwieElement attributes can only be set with OBJECT", attribs);
    }
  }

  // :: STRING -> BOOLEAN
  // Returns BOOLEAN for if attribute with given name exists in "attribs" OBJECT:
  hasAttribute(name) {
    return this._attribs.hasOwnProperty(name);
  }

  // :: STRING -> *|UNDEFINED
  // Returns value of attribute by name stored in "attribs" OBJECT, otherwise returns UNDEFINED
  getAttribute(name) {
    return this._attribs[name];
  }

  // :: STRING, * -> this
  // Binds  value to "attribs" OBJECT with given name:
  setAttribute(name, value) {
    this._attribs[name] = value;
    return this;
  }

  // :: STRING -> this
  // Remove attribute with given name from "attribs" OBJECT:
  removeAttribute(name) {
    delete this._attribs[name];
    return this;
  }

  // :: STRING|VOID -> this|UNDEFINED
  // Appends text node as first child of element at render with given string as it's value:
  // NOTE: If no argument is given, set text is returned:
  text(str) {
    if (str === undefined) {
      return this._text;
    } else {
      if (typeof(str) === "string") {
        this._text = str;
        return this;
      }
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]("Text of element can only be set with a STRING", str);
    }
  }

  // :: VOID -> this
  // Sets text as UNDEFINED for this element:
  removeText() {
    this._text = undefined;
    return this;
  }

  // :: (yngwieElement -> BOOLEAN) -> [yngwieElement]
  // Returns all the elements that, when the given function is applied to this elements and it's desendants, that function returns TRUE:
  getElementsBy(fn) {
    return this.parse((node, result) => {
      if (node instanceof YngwieElement) {
        if (fn(node) === true) {
          result.push(node);
        }
      }
      return result;
    }, []);
  }

  // :: STRING -> [yngwieElement]
  // Returns an array of YngwieElemnts that have the given tagName:
  // NOTE: Returns an empty array if no elements are found with the given tag name:
  getElementsByTagName(tagName) {
    return this.getElementsBy(elem => elem.tagName() === tagName);
  }

  // STRING, STRING|VOID -> [yngwieElement]
  // Returns an array of yngwieElements that have the given attribute with the given value:
  // NOTE: If no value is given, then any element that has the given attribute name is returned
  getElementsByAttribute(name, value) {
    return this.getElementsBy(elem => {
      if (elem.hasAttribute(name)) {
        if (value === undefined) {
          return true;
        } else {
          return elem.getAttribute(name) === value;
        }
      }
      return false;
    });
  }

  // STRING -> [yngwieElement]
  // Returns all elements that have the given class name
  // NOTE: Returns an empty array if no elements are found with the given class name:
  getElementsByClass(className) {
    return this.getElementsByAttribute("class", className);
  }

  // Returns YngwieElement that has the given ID:
  // NOTE: Returns UNDEFINED if no elements are found with the given ID
  getElementByID(id) {
    return this.getElementsByAttribute("id", id).pop();
  }

  // :: STRING, [(EVENT, ELEMENT) -> VOID]|(EVENT, ELEMENT) -> VOID ->  this
  // Binds listener by event name to node at render:
  // NOTE: Function bound to listener is called in the context of this element
  on(evtName, fns) {
    let listener = _Listener_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].init(evtName, fns);
    this._listeners.push(listener);
    return this;
  }

  // VOID -> yngwieElement
  // Returns clone of this yngwieElement:
  clone() {

    // Copy tagname:
    let tagName = `${this._value}`;

    // Copy attributes:
    let attribs = Object.keys(this._attribs).reduce((result, id) => {
      result[id] = `${this._attribs[id]}`;
      return result;
    }, {});

    // Copy set:
    let text = this._text !== undefined
      ? `${this._text}`
      : undefined;

    // Copy listeners:
    let listeners = this._listeners.map((listener) => {
      return listener.clone();
    });

    // Copy children and return element:
    let elem = new YngwieElement(tagName, attribs, text, listeners);
    return this.children().reduce((elem, child) => {
      child = child.clone();
      return elem.append(child);
    }, elem);

  }

  // :: STRING|ELEMENT, OBJECT -> ELEMENT
  // Transforms this element and it's desendants into a DOM ELEMENT, appending result to given target
  // and rendering that ELEMENT in the context of the given OBJECT. If no target to append is given,
  // the rendered ELEMENT is returned. If no context is given, then DOCUMENT is used by default.
  render(target, ctx) {

    // Check if default context of DOCUMENT should be used:
    let context = ctx === undefined ? document : ctx;

    // Intialize DOMElement:
    let elem = Object.keys(this._attribs).reduce((elem, id) => {
      elem.setAttribute(id, this._attribs[id]);
      return elem;
    }, context.createElement(this._value));

    // Bind Listeners:
    elem = this._listeners.reduce((elem, listener) => {
      return listener.render(elem, this);
    }, elem);

    // If set, create and append text node:
    if (typeof(this._text) === "string") {
      let elemText = context.createTextNode(this._text);
      elem.appendChild(elemText);
    }

    // Render and append all children and return result:
    let result = this.children().reduce((result, child) => {
      child = child.render();
      result.appendChild(child);
      return result;
    }, elem);

    // If target is given, appends result of render to that target:
    if (target !== undefined) {
      // If target is string, find node using query selector:
      if (typeof(target) === "string") {
        context.querySelector(target).appendChild(result);
      } else {
        // Otherise assume that target is DOMElement:
        target.appendChild(result);
      }
    }

    return result;

  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING. OBJECT, STRING, [yngwieListener] -> yngwieElement
  // Static factory method:
  static init(tagName, attribs, text, listeners) {
    return new YngwieElement(tagName, attribs, text, listeners)
  }

  // :: STRING|ELEMENT, [yngwieElement], OBJECT -> ELEMENT
  // Renders an array of yngwieElements in the given context and appends result to given target:
  // NOTE: ELEMENT of target is returned
  static renderTo(target, elems, ctx) {
    let context = ctx === undefined ? document : ctx;
    if (elems instanceof Array) {
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      return elems.reduce((result, elem) => {
        if (elem instanceof YngwieElement) {
          elem.render(result);
          return result;
        }
        throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]("Only YngwieElement can be rendered to target", elem);
      }, node);
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]("Expected array as argument", elems);
  }

  // :: STRING|ELEMENT, yngwieElement, OBJECT -> ELEMENT
  // Replaces the given target with the render of the given instance  of YngwieElement in the given context:
  static inject(target, elem, ctx) {
    if (elem instanceof YngwieElement) {
      let context = ctx === undefined ? document : ctx;
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      let result = elem.render();
      node.replaceWith(result);
      return node;
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]("Only YngwieElement can be injected into target", elem);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Error/main.js":
/*!***********************************************!*\
  !*** ./node_modules/yngwie/src/Error/main.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieError)
/* harmony export */ });
class YngwieError extends Error {

  // CONSTRUCTOR :: STRING, * -> ERROR
  // NOTE :: "data" argument is always cast as STRING:
  constructor(msg, data) {
    super(msg);
    this.data = `${data}`;
  }

  // :: VOID ->  VOID
  // Consoles out stack trace of error, along with the data that caused the exception to be thrown:
  log() {
    console.log(this.stack);
    console.log("What Failed: ", this.data);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Listener/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yngwie/src/Listener/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieListener)
/* harmony export */ });
class YngwieListener {

  // CONSTRUCTOR :: STRING, [(EVENT, ELEMENT -> VOID)] -> yngwieListener
  constructor(evtName, fns) {
    this._evtName = evtName;
    this._fns = fns || [];
  }

  // :: (EVENT, ELEMENT -> VOID) -> this;
  // Adds function to listener:
  add(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: VOID -> yngwieListener
  // Creates clone of this yngwieListener:
  clone() {
    let evtName = `${this._evtName}`;
    let fns = this._fns.map(fn=>{
      return new Function("evt", "elem", fn.toString());
    });
    return new YngwieListener(evtName, fns);
  }

  // :: ELEMENT, OBJECT -> ELEMENT
  // Creates event listener and binds it to given DOM ELEMENT, and calls function of listener to given context
  // NOTE: If no context is given, function is called in the context of the ELEMENT the listener is bound to
  render(elem, ctx) {
    return this._fns.reduce((elem, fn) => {
      elem.addEventListener(this._evtName, function (evt) {
        fn.call(ctx === undefined ? elem : ctx, evt, elem);
      });
      return elem;
    }, elem);
  }

  // :: STRING, [(EVENT, ELEMENT -> VOID)]|(EVENT, ELEMENT -> VOID) -> yngwieListener
  // Static factory method:
  static init(evtName, fns) {
    return fns !== undefined
      ? new YngwieListener(evtName, Array.isArray(fns) === true ? fns : [fns])
      : new YngwieListener(evtName);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Node/main.js":
/*!**********************************************!*\
  !*** ./node_modules/yngwie/src/Node/main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieNode)
/* harmony export */ });
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Error/main.js */ "./node_modules/yngwie/src/Error/main.js");


class YngwieNode {

  // CONSTRUCTOR :: STRING -> yngwieNode
  constructor(value) {
    if (typeof(value) === "string") {
      this._value = value;       // Arbitrary STRING value that can be stored by this node
      this._parent = undefined;  // Parent of this node
      this._first = undefined;   // First child of this node
      this._last = undefined;    // Last child of this node;
      this._next = undefined;    // Next sibling of this node
      this._prev = undefined;    // Previous sibling of the node
    } else {
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Value of YngwieNode must be STRING", value);
    }
  }

  // :: VOID -> [yngwieNode]
  // Returns all the children of this node:
  children() {

    let child = this._first;   // First child
    let children = [];         // Array of children to return

    // Looks for next sibling until there are no more siblings:
    while (child) {
      children.push(child);
      child = child._next;
    }

    // Returns an arrary yngiwNode elements:
    return children;

  }

  // :: yngwieNode -> this
  // Adds given node to children of this node:
  // NOTE: If given node already has a parent, that node is detached and appened to this node:
  append(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // If given node has parent, detach that node from it's parent:
      if (node._parent) {
        node.detach();
      }

      // Set new node as last sibling:
      if (this._first !== undefined) {
        node._prev = this._last;    // Sets new last child's previous node to old last node
        this._last._next = node;    // Set old last child next element to new last child
        this._last = node;         // Set new last child to given node
      } else {
        // If ther are no children, then this node is an only child:
        this._first = node;
        this._last = node;
      }

      // Set parent
      node._parent = this;

      // Return instance:cosnole
      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Can only apppend YngwieNode to other YngwieNodes", node);

  }

  // :: [yngwieNode] -> this
  // Appends an array of YngwieNodes to this instance:
  appends(nodes) {
    if (nodes instanceof Array) {
      return nodes.reduce((result, node) => {
        return this.append(node);
      }, this);
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Expected array as arguemnt", nodes);
  }

  // :: VOID -> this
  // Detaches this node from it's parent:
  detach() {

    // Make previous node's next node this node's next node:
    if (this._prev) {
      this._prev._next = this._next;
    } else {
      // if no previous node, then this node must be first child of parent (if node has parent):
      if (this._parent) {
        this._parent._first = this._next;
      }
    }

    // Make next node's previous node this node's previous node:
    if (this._next) {
      this._next._prev = this._prev;
    }

    // Unset all relations:
    this._next = undefined;
    this._prev = undefined;
    this._parent = undefined;

    // Return instance:
    return this;

  }

  // :: yngwieNode -> this;
  // Inserts given yngwieNode before this instance of yngwieNode:
  // NOTE: a.insertsBefore(b) means "b" is inserted before "a"
  insertBefore(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // Set relations
      node._prev = this._prev;
      node._next = this;
      node._parent = this._parent;

      // Set previous sibling relations:
      if (this._prev) {
        this._prev._next = node;
      } else {
        if (this._parent) {
          this._parent._first = node;
        }
      }

      // Set previous sibling:
      this._prev = node;

      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Can only insert a YngwieNode before other YngwieNodes", node);

  }

  // :: yngwieNode -> yngwieNode
  // Replace this node with given node:
  replaceWith(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // Checks if this node has a parent
      if (this._parent !== undefined) {

        // Replacement is accomplished by first inserting given node, then detatching this node:
        this.insertBefore(node);
        this.detach();

        // Return given node:
        return node;

      }

      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Can only replace YngwieNode if YngwieNode being replaced has parent", this);

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Can only replace a YngwieNode with another YngwieNode", node);

  }

  // :: VOID -> yngwieNode
  // Returns deep clone of this node:
  clone() {
    let value = `${this._value}`;
    let clone = new YngwieNode(value)
    return this.children().reduce((result, child) => {
      clone = child.clone();
      return result.append(clone);
    }, clone);
  }

  // NODE, * -> NODE -> *
  // Applies function to a result and this node, where that function returns the next node to that function is applied to
  // NOTE: Result is returned when there is no next node to apply function to
  step(fn, result) {
    next = fn(this, result);
    if (next) {
      next.step(fn, result);
    }
    return result;
  }

  // :: NODE, * -> *, * -> *
  // Applies function to this node and it's descendants, returning the result of that function:
  parse(fn, result) {
    YngwieNode.parse(this, (node) => {
      result = fn(node, result);
    });
    return result;
  }

  /**
   *
   * Static Function
   *
   */

  // STRING -> yngwieNode
  // Static factory method
  static init(value) {
    return new YngwieNode(value);
  }

  // NODE, NODE -> VOID -> VOID
  // Applies a function to a node and all it's desendants
  // NODE: This is a re-implementation of Crockford's DOM walk algorithm from "Javascript: The Good Parts"
  static parse(node, fn) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      fn(node);
      node = node._first;
      while (node) {
        YngwieNode.parse(node, fn);
        node = node._next;
      }

    } else {

      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Can only parse a YngwieNode", node);

    }

  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/TextNode/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yngwie/src/TextNode/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTextNode)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Error/main.js */ "./node_modules/yngwie/src/Error/main.js");



class YngwieTextNode extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  // CONSTRUCTOR :: STRING -> yngwieTextNode
  constructor(text) {
    super(text);
  }

  // :: VOID -> STRING
  // Returns text of this text node:
  text() {
    return this._value;
  }

  // :: STRING|yngwieTextNode -> this
  // Appends STRING instead of NODE since a TextNode has no children
  append(val) {

    if (typeof(val) === "string") {
        this._value += val;
        return this;
    }

    if (val instanceof YngwieTextNode) {
        this._value += val.text();
        return this;
    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Only STRINGs and other YngwieTextNodes can append a YngwieTextNode", val);
  }

  //:: STRING|ELEMENT|VOID, OBJECT -> TEXT
  // Creates DOM Text node set with the STRING stored in _value:
  render(target, ctx) {
    let context = ctx === undefined ? document : ctx;
    let textNode = context.createTextNode(this._value);
    if (target !== undefined) {
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      target.appendChild(textNode);
    }
    return textNode;
  }

  // :: VOID -> yngwieTextNode
  // Creates a clone of this yngwieTextNode:
  clone() {
    return new YngwieTextNode(`${this._value}`);
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING -> yngwieTextNode
  // Static factory method:
  static init(text) {
    return new YngwieTextNode(text);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Transform/main.js":
/*!***************************************************!*\
  !*** ./node_modules/yngwie/src/Transform/main.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTransform)
/* harmony export */ });
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element/main.js */ "./node_modules/yngwie/src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TextNode/main.js */ "./node_modules/yngwie/src/TextNode/main.js");
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Transform/main.js */ "./node_modules/yngwie/src/Transform/main.js");





class YngwieTransform {

  // CONSTRUCTOR :: * -> yngwieTransform
  constructor(val) {
    this._value = val;                         // Value to transform
    this._type = YngwieTransform.getType(val); // Stores value's type for determining how it can be transformed
  }

  // :: VOID -> NODE
  // Transforms stored value into a DOMElement NODE:
  toNODE() {
    switch (this._type) {
      case "NODE":
        return this._value;
      case "STRING":
        let parser = new DOMParser();
        let doc = parser.parseFromString(this._value, "text/html");
        return doc.body.firstChild;
      case "YNGWIE":
        return this._value.render();
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__["default"]("Cannot transform to NODE from unsuppoted type", this._value);
    }
  }

  // :: VOID -> STRING
  // Transforms stored value into a STRING:
  toSTRING() {
    switch (this._type) {
      case "NODE":
        return this._value.nodeType === 1 ? this._value.outerHTML : this._value.nodeValue;
      case "STRING":
        return this._value;
      case "YNGWIE":
        console.log(this._value);
        let node = this._value.render();
        console.log(node)
        return node.nodeType === 1 ? node.outerHTML : node.nodeValue;
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__["default"]("Cannot transform to STRING from unsuppoted type", this._value);
    }
  }

  // :: VOID -> STRING
  // Transforms stored value into a yngwieElement:
  toYNGWIE() {
    switch (this._type) {
      case "NODE":
      case "STRING":
        return YngwieTransform.init(this._value);
      case "YNGWIE":
        return this._value;
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__["default"]("Cannot transform to YngwieElement from unsuppoted type", this._value);
    }
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING|NODE -> yngwieElement
  // Transforms string of HTML or DOMElement NODE into a yngwieElement
  // NOTE: This DOES NOT transform event handlers into YngwieListener objects:
  static init(html) {
    return walkNode(YngwieTransform.getType(html) === "STRING" ? YngwieTransform.toNODE(html) : html);
  }

  // :: * -> NODE
  // Static factory method that transforms given value into a NODE:
  static toNODE(val) {
    let transform = new YngwieTransform(val);
    return transform.toNODE();
  }

  // :: * -> STRING
  // Static factory method that transforms given value into a STRING:
  static toSTRING(val) {
    let transform = new YngwieTransform(val);
    return transform.toSTRING();
  }

  // :: * -> yngwieElement
  // Static factory method that transforms given value into a yngwieElement:
  static toYNGWIE(val) {
    let transform = new YngwieTransform(val);
    return transform.toYNGWIE();
  }

  // * -> "NODE"|"STRING"|"YNGWIE"|UNDEFINED
  // Returns name of type for given value:
  static getType(val) {

    if (val instanceof Node) {
      return "NODE";
    }

    if (typeof(val) === "string") {
      return "STRING";
    }

    if (val instanceof _Node_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      return "YNGWIE";
    }

    return undefined;

  }

}

/**
 *
 *  Local Functions
 *
 */

// :: NODE, NODE, node.nodeType -> VOID
// Creates an instance of YngwieElement from the given node and all of it's desendents:
// NOTE: Inspired by Crockford's DOM walking algorithm from "Javascript:The Good Parts"
function walkNode(node, result) {

  if (node.nodeType === 1) {
    let attribs = getAttributes(node);
    let elem = new _Element_main_js__WEBPACK_IMPORTED_MODULE_0__["default"](node.tagName, attribs);
    result = result === undefined
      ? elem
      : result.append(elem);
  }

  if (node.nodeType === 3) {
    let textNode = new _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__["default"](node.nodeValue);
    result = result === undefined
      ? textNode
      : result.append(textNode);
  }

  node = node.firstChild;

  while (node) {
    let child = walkNode(node);
    if (child !== undefined) {
        result.append(child);
    }
    node = node.nextSibling;
  }

  return result;

}

// :: DOMElement -> OBJECT
// Returns OBJECT of attributes from the given DOM Element:
function getAttributes(elem) {
  return Array.from(elem.attributes).reduce((result, attrib) => {
    result[attrib.name] = attrib.value;
    return result;
  }, {});
}


/***/ }),

/***/ "./node_modules/yngwie/src/main.js":
/*!*****************************************!*\
  !*** ./node_modules/yngwie/src/main.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* reexport safe */ _Node_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Element": () => (/* reexport safe */ _Element_main_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "TextNode": () => (/* reexport safe */ _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Listener": () => (/* reexport safe */ _Listener_main_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Transform": () => (/* reexport safe */ _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Error": () => (/* reexport safe */ _Error_main_js__WEBPACK_IMPORTED_MODULE_5__["default"])
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element/main.js */ "./node_modules/yngwie/src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextNode/main.js */ "./node_modules/yngwie/src/TextNode/main.js");
/* harmony import */ var _Listener_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Listener/main.js */ "./node_modules/yngwie/src/Listener/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transform/main.js */ "./node_modules/yngwie/src/Transform/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error/main.js */ "./node_modules/yngwie/src/Error/main.js");










/***/ }),

/***/ "./src/Actor/main.js":
/*!***************************!*\
  !*** ./src/Actor/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieActor)
/* harmony export */ });
/* harmony import */ var _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Mapping/main.js */ "./src/Mapping/main.js");
/* harmony import */ var yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yngwie-mvc */ "./node_modules/yngwie-mvc/src/main.js");



class YngwieActor {

  // CONSTRUCTOR :: yngwieModel|OBJECT, {STRING:*->*}, {STRING:STRING} -> this
  constructor(model, actions, behaviors) {
    this._model = yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Model.setAsModel(model);
    this._actions = _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(val => typeof(val) === "function").set(actions);
    this._behaviors = _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(val => typeof(val) === "string").set(behaviors);
  }

  // :: VOID -> yngwieModel
  // Returns model stored by actor:
  model() {
    return this._model;
  }

  // :: STRING, FUNCTION -> this
  // Binds action function to action ID:
  // NOTE: Only one function can be bound to an action - running this for the same actionID will then replace the current function if set
  action(id, fn) {
    try {
      this._actions.setOnce(id, fn);
      return this;
    } catch (err) {
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Error(`Could not set action: ${err.msg}`, err.data);
    }
  }

  // STRING, STRING|[STRING] -> this
  // Binds message to action
  // NOTE: If action is not set, an yngwie Error is thrown:
  when(message, actionID) {
    try {
      if (actionID instanceof Array) {
          for (let i = 0; i < actionID.length; i++) {
            this.when(message, actionID[i]);
          }
          return this;
      }
      if (this._actions.has(actionID)) {
        this._behaviors.set(message, actionID);
        return this;
      }
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Error("Cannot bind message to an action that doesn't exist", actionID);
    } catch (err) {
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Error(`Could not set behavior: ${err.msg}`, err.data);
    }
  }

  // STRING, []*] -> this
  // Sends message to actor, applying given value to action bound to message:
  // NOTE: If behavior does not exist, then an error is thrown:
  send(message, args) {
    try {
      let actionIDs = this._behaviors.get(message);
      actionIDs.forEach(actionID => {
        let action = this._actions.get(actionID)[0];
        action.apply(this, args || []);
      });
    } catch (err) {
      console.log(err)
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Error(`Could not send message: ${err.msg}`, err.data);
    }
  }

  /**
   *
   *  Staitc Mehtods
   *
   */

  // :: yngwieModel|OBJECT, {STRING:*->*}, {STRING:STRING} -> yngwieActor
  // Static Factory method
  static init(model, actions, behaviors) {
    return new YngwieActor(model, actions, behaviors);
  }

}


/***/ }),

/***/ "./src/Mapping/main.js":
/*!*****************************!*\
  !*** ./src/Mapping/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieMapping)
/* harmony export */ });
/* harmony import */ var yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yngwie-mvc */ "./node_modules/yngwie-mvc/src/main.js");


// Binds array of "constrained" values to key of type STRING:
class YngwieMapping {

  // CONSTRUCTOR :: * -> BOOLEAN|VOID -> yngwieMapping
  constructor(constraint) {
    if (typeof(constraint) === 'function' || constraint === undefined) {
      this._constraint = constraint === undefined ? x => x : constraint;
      this._data = {};
    } else {
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error("Constraint for yngwieMapping must either by a FUNCTION or UNDEFINED", constraint);
    }
  }

  // :: * -> BOOLEAN
  // Returns TRUE if given value meets constraint:
  // NOTE: If constraint is UNDEFINED, then always return TRUE
  check(val) {
    return typeof(this._constraint) === 'function'
      ? this._constraint(val)
      : true;
  }

  // :: [*], [*] -> *, * -> * -> *
  // Applues success function to given array of values if all values meet constraint, otherwise applies fail function to first failed value:
  checkAll(arr, succ, fail) {
    if (Array.isArray(arr)) {
      for (let i = 0; i < arr.length; i++) {
        if (this.check(arr[i]) === false) {
          return fail(arr[i]);
        }
      }
      return succ(arr);
    }
    throw new YngwierError("Can only check all values for a given ARRAY", arr);
  }

  // :: STRING -> BOOLEAN
  // Returns TRUE if key is set for this instance, otherwise returns FALSE:
  has(key) {
    if (typeof(key) === 'string') {
      return this._data[key] !== undefined;
    }
    throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error(`Key to check for existence must by a STRING`, key);
  }

  // :: STRING|OBJECT|VOID, *|VOID|VOID -> this
  // Sets given value of given key if value meets constraint. If constraint is FALSE, an error is thrown
  // NOTE: For argument of OBJECT, error is thrown if any value fails to meet constraint
  // NOTE: Values bound to key are always stored as an array:
  set(key, val) {
    // Binds value to key if value meets constraint:
    if (typeof(key) === 'string') {
      if (this.check(val) === true) {
        if (this._data[key] === undefined) {
          this._data[key] = [];
        }
        this._data[key].push(val);
        return this;
      }
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error(`Value to set key "${key}" of yngwieMapping failed constraint`, val)
    }
    // Binds OBJECT to mapping if all values of OBJECT meet constraint:
    if (typeof(key) === 'object') {
      return this.checkAll(Object.values(key), (values) => {
        return Object.entries(key).reduce((result, [key, value]) => {
            if (typeof(key) === 'string') {
              result[key] = value;
              return result;
          }
          throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error(`Could not set key from given OBJECT because of failed constraint`, key);
        }, this._data);
      }, (val) => {
        throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error(`Could not set value from given OBJECT because of failed constraint`, val);
      })
    }
    // Ignores UNDEFINED key and returns instance:
    if (key === undefined) {
      return this;
    };
    // Throws error if key is not of an accepted type:
    throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error("Can only set key of yngwieMapping using either STRING or OBJECT", key);
  }

  // :: STRING, * -> this
  // Ensure that only a single value is bound to the given key if that value meets constraint:
  setOnce(key, val) {
    if (this.has(key)) {
      this.removeKey(key);
    }
    return this.set(key, val);
  }

  // :: STRING -> [*]
  // Returns value of key. If key is not a STRING or does not exist, a yngwieError is thrown:
  get(key) {
    if (typeof(key) === 'string') {
      if (this.has(key) === true) {
        return this._data[key];
      }
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error("Cannot get value of a key that does not exist", key);
    }
    throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error(`Key to get value of must be a STRING`, key);
  }

  // :: STRING -> this
  // Remove key from instance. If key does not exist or is not a STRING, a yngwieError is thrown:
  // NOTE: All values associated with key are removed
  remove(key) {
    if (typeof(key) === 'string') {
      if (this.has(key) === true) {
        delete this._data[key];
        return this;
      }
      throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error("Cannot remove key that does not exist", key);
    }
    throw new yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Error(`Key to remove must be a STRING`, key);
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: * -> BOOLEAN|VOID -> yngwieMapping
  // Static factory method
  static init(constraint) {
    return new YngwieMapping(constraint);
  }

  // :: * -> BOOLEAN
  // Returns TURE if given value is instance of YngwieMapping:
  static is(val) {
    return val instanceof YngwieMapping;
  }

}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Actor": () => (/* reexport safe */ _Actor_main_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Mapping": () => (/* reexport safe */ _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "View": () => (/* reexport safe */ yngwie_mvc__WEBPACK_IMPORTED_MODULE_2__.View),
/* harmony export */   "Model": () => (/* reexport safe */ yngwie_mvc__WEBPACK_IMPORTED_MODULE_2__.Model),
/* harmony export */   "Error": () => (/* reexport safe */ yngwie_mvc__WEBPACK_IMPORTED_MODULE_2__.Error)
/* harmony export */ });
/* harmony import */ var _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mapping/main.js */ "./src/Mapping/main.js");
/* harmony import */ var _Actor_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Actor/main.js */ "./src/Actor/main.js");
/* harmony import */ var yngwie_mvc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yngwie-mvc */ "./node_modules/yngwie-mvc/src/main.js");






})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDSjtBQUNHOztBQVE1QyIsInNvdXJjZXMiOlsid2VicGFjazovL1luZ3dpZVVJL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUtbXZjL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llLW12Yy9zcmMvTW9kZWwvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUtbXZjL3NyYy9VdGlsL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llLW12Yy9zcmMvVmlldy9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS1tdmMvc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9FbGVtZW50L21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9FcnJvci9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvTGlzdGVuZXIvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL05vZGUvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL1RleHROb2RlL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9UcmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9zcmMvQWN0b3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL3NyYy9NYXBwaW5nL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1luZ3dpZVVJL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlluZ3dpZVVJXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlluZ3dpZVVJXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiaW1wb3J0IFluZ3dpZU1vZGVsIGZyb20gXCIuLi9Nb2RlbC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVmlldyBmcm9tIFwiLi4vVmlldy9tYWluLmpzXCI7XG5pbXBvcnQge0Vycm9yIGFzIFluZ3dpZUVycm9yfSBmcm9tIFwieW5nd2llXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUNvbnRyb2xsZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IHtTVFJJTkc6KC4uLiAtPiAqKX0gLT4geW5nd2llQ29udHJvbGxlclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyeSkge1xuICAgIHRoaXMuX3JlZ2lzdHJ5ID0gcmVnaXN0cnkgfHwge307XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIGJvb2xlYW4gZm9yIGlmIGFueSBmdW5jdGlvbnMgYXJlIGJvdW5kIHRvIGdpdmVuIElEOlxuICBpc1JlZ2lzdGVyZWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlbaWRdICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICguLi4gLT4gVk9JRCkgLT4gdGhpcztcbiAgLy8gQmluZHMgZnVuY3Rpb24gdG8gZ2l2ZW4gU1RSSU5HOlxuICAvLyBOT1RFOiBGdW5jdGlvbnMgYm91bmQgdG8gc2lnbmFsIElEIGFyZSBzdG9yZWQgaW4gQVJSQVksIHNvIG11bHRpcGxlIGZ1bmN0aW9ucyBjYW4gYmUgYm91bmQgdG8gdGhlIHNhbWUgSURcbiAgcmVnaXN0ZXIoaWQsIGZuKSB7XG4gICAgaWYgKHRoaXMuaXNSZWdpc3RlcmVkKGlkKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5W2lkXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9yZWdpc3RyeVtpZF0ucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpcztcbiAgLy8gUmVtb3ZlcyBmdW5jdGlvbiBib3VuZCB0byBnaXZlbiBTVFJJTkc6XG4gIC8vIE5PVEU6IElmIElEIGRvZXMgbm90IGV4aXN0LCBhbiB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIC8vIE5PVEU6IFVucmVnaXN0ZXJpbmcgc2lnbmFsIHJlbW92ZXMgQUxMIGZ1bmN0aW9ucyBib3VuZCB0byB0aGF0IHNpZ25hbCBJRDpcbiAgdW5yZWdpc3RlcihpZCkge1xuICAgIGlmICh0aGlzLmlzUmVnaXN0ZXJlZChpZCkgPT09IHRydWUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9yZWdpc3RyeVtpZF07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTm8gZnVuY3Rpb25zIGJvdW5kIHRvIGdpdmVuIElEXCIsIGlkKTtcbiAgfVxuXG4gIC8vIFNUUklORywgLi4uIC0+IHRoaXM7XG4gIC8vIEFwcGxpZXMgdmFsdWVzIHRvIGZ1bmN0aW9uIGJvdW5kIHRvIHNpZ25hbCBJRFxuICAvLyBOT1RFOiBJZiBJRCBkb2VzIG5vdCBleGlzdCwgYSB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIHNpZ25hbCgpIHtcbiAgICBsZXQgaWQgPSBhcmd1bWVudHNbMF07XG4gICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMuaXNSZWdpc3RlcmVkKGlkKSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fcmVnaXN0cnlbaWRdLmZvckVhY2goZm49PntcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJncy5zbGljZSgxKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgZGlzcGF0Y2ggdmFsdWUgdG8gYW4gSUQgdGhhdCBkb2Vzbid0IGV4aXN0XCIsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjoge1NUUklORzpbKi0+Vk9JRF19IC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChyZWdpc3RyeSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihyZWdpc3RyeSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL1V0aWwvbWFpbi5qc1wiO1xuaW1wb3J0IHtFcnJvciBhcyBZbmd3aWVFcnJvcn0gZnJvbSBcInluZ3dpZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVNb2RlbCB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogT0JKRUNUIC0+IHluZ3dpZU1vZGVsXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGRhdGE7XG4gIH1cblxuICAvLyA6OiBWT0lEfFNUUklORyAtPiBPQkpFQ1RcbiAgLy8gUmV0dXJucyBkYXRhIG9mIG1vZGVsIHdpdGggYXBwbGllZCBzY29wZSwgb3RoZXJ3aXNlIHJldHVybnMgYWxsIGRhdGEgc3RvcmVkIGluIG1vZGVsOlxuICBzdGF0ZShzY29wZSkge1xuICAgIHJldHVybiBzY29wZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fc3RhdGUgOiBZbmd3aWVNb2RlbC5yZXNvbHZlU2NvcGUoc2NvcGUsIHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xPQkpFQ1QgLT4gKiwgT0JKRUNULCBPQkpFQ1QgLT4gKnxWT0lEIC0+IHRoaXM7XG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gc3RhdGUgYW5kIG9wdGlvbmFsIHNjb3BlLCByZXBsYWNpbmcgc3RhdGUgd2l0aCB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHVwZGF0ZShhLCBiKSB7XG4gICAgbGV0IHR5cGVBcmcgPSBVdGlsLmdldFR5cGUoYSk7XG4gICAgc3dpdGNoICh0eXBlQXJnKSB7XG4gICAgICBjYXNlIFwiRnVuY3Rpb25cIjpcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBhKHRoaXMuX3N0YXRlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICB0aGlzLl9zdGF0ZVthXSA9IGIodGhpcy5fc3RhdGUsIHRoaXMuc3RhdGUoYSkpO1xuICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgdG8geW5nd2llTW9kZWwudXBkYXRlIGlzIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGVcIiwgdHlwZUFyZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfCh5bmd3aWVNb2RlbCAtPiBWT0lEKSwgKHluZ3dpZU1vZGVsIC0+IFZPSUQpfFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIGV2ZXJ5IGVsZW1lbnQgb2Ygc2NvcGUsIGlmIG9ubHkgZnVuY3Rpb24gaXMgZ2l2ZW4gdGhlbiBpdCdzIGFwcGxpZWQgdG8gZXZlcnkgZWxlbWVudCBvZiBzdGF0ZTpcbiAgZWFjaChhLCBiKSB7XG4gICAgbGV0IHR5cGVBcmcgPSBVdGlsLmdldFR5cGUoYSk7XG4gICAgc3dpdGNoICh0eXBlQXJnKSB7XG4gICAgICBjYXNlIFwiRnVuY3Rpb25cIjpcbiAgICAgICAgdGhpcy5fc3RhdGUuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgYShZbmd3aWVNb2RlbC5pbml0KGVsZW0pKTtcbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZShhKTtcbiAgICAgICAgaWYgKHN0YXRlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBzdGF0ZS5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgIGIoWW5nd2llTW9kZWwuaW5pdChlbGVtKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiU2NvcGUgaXMgbm90IGFuIGFycmF5XCIsIHR5cGVBcmcpO1xuICAgICAgICB9XG4gICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCB0byBZbmd3aWVNb2RlbC5mb3JFYWNoIGlzIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGVcIiwgdHlwZUFyZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqfFZPSUQgLT4gdGhpc3wqXG4gIC8vIFNldHMgb3IgZ2V0cyBwcm9wZXJ0eSBmcm9tIG1vZGVsOlxuICBwcm9wKGlkLCB2YWwpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZVtpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVbaWRdO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTm8gcHJvcGVydHkgZm91bmQgZm9yIGdpdmVuIElEXCIsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3RhdGVbaWRdID0gdmFsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogT0JKRUNUIC0+IHluZ3dpZU1vZGVsXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoZGF0YSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTW9kZWwoZGF0YSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIE9CSkVDVCAtPiBPQkpFQ1R8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gc2NvcGUgLSBpZiBzY29wZSBjYW4ndCByZSByZXNvbHZlZCB0aGVuIFVOREVGSU5FRCBpcyByZXR1cm5lZDpcbiAgc3RhdGljIHJlc29sdmVTY29wZShzY29wZSwgb2JqKSB7XG4gICAgaWYgKHNjb3BlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBzY29wZXMgPSBzY29wZS5zcGxpdChcIi5cIik7XG4gICAgICBsZXQgcmVzdWx0ID0gb2JqO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTY29wZSA9IHNjb3Blc1tpXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0W2N1cnJlbnRTY29wZV07XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfHluZ3dpZU1vZGVsIC0+IHluZ3dpZU1vZGVsXG4gIC8vIFJldHVybnMgdmFsdWUgYXMgeW5nd2llTW9kZWw6XG4gIHN0YXRpYyBzZXRBc01vZGVsKG1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsIGluc3RhbmNlb2YgWW5nd2llTW9kZWxcbiAgICAgID8gbW9kZWxcbiAgICAgIDogWW5nd2llTW9kZWwuaW5pdChtb2RlbCk7XG4gIH1cblxufVxuIiwiLy8gU2luZ2xldG9uIG9mIHV0aWxpdHkgbWV0aG9kczpcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvLyA6OiAqIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHR5cGUgb2YgZ2l2ZW4gdmFsdWUgYXMgU1RSSU5HOlxuICBzdGF0aWMgZ2V0VHlwZSh2YWwpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcbiAgICByZXR1cm4gdmFsLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgXG59XG4iLCJpbXBvcnQge0VsZW1lbnQgYXMgWW5nd2llRWxlbWVudCwgRXJyb3IgYXMgWW5nd2llRXJyb3J9IGZyb20gXCJ5bmd3aWVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVmlldyB7XG5cbiAgLy8gOjogQ09OU1RSVUNUT1IgOjogeW5nd2llRWxlbWVudHxWT0lEIC0+IHluZ3dpZVZpZXdcbiAgY29uc3RydWN0b3IoeW5nd2llRWxlbWVudCkge1xuICAgIHRoaXMuX2VsZW0gPSAoKSA9PiB5bmd3aWVFbGVtZW50O1xuICAgIHRoaXMuX2ZucyA9IFtdO1xuICAgIHRoaXMuX25vZGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgfVxuXG4gIC8vIDo6IFZPSUR8eW5nd2llRWxlbWVudHxTVFJJTkcsIFNUUklORywgT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVMaXN0ZW5lcl0gLT4geW5nd2llRWxlbWVudHx0aGlzfHRoaXNcbiAgLy8gU2V0dGVyL2dldHRlciBtZXRob2QgZm9yIHluZ3dpZUVsZW1lbnQgc3RvcmVkIGJ5IHZpZXc6XG4gIC8vIE5PVEU6IEdldHRpbmcgdGhlIHluZ2l3ZUVsZW1lbnQgc3RvcmVkIGJ5IHZpZXcgd2lsbCBhcHBseSBldmVyeSBzdG9yZWQgbW9kaWZlciBmdW5jdGlvbiB0byB0aGF0IHluZ3dpZUVsZW1lbnRcbiAgZWxlbShhcmcpIHtcbiAgICBzd2l0Y2ggKFV0aWwuZ2V0VHlwZShhcmcpKSB7XG4gICAgICAvLyBBcHBsaWVzIHZpZXcgdG8gZXZlcnkgbW9kaWZpZXIgZnVuY3Rpb24sIGlmIHRoZXJlIGFyZSBubyBtb2RpZmVyIGZ1bmN0aW9ucyBlbGVtIGlzIHJldHVybmVkOlxuICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fZm5zLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHRoaXMuX2Zucy5yZWR1Y2UoKHZpZXcsIGZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm4odmlldyk7XG4gICAgICAgICAgfSwgdGhpcy5fZWxlbSgpKVxuICAgICAgICAgIDogdGhpcy5fZWxlbSgpO1xuICAgICAgLy8gU2V0cyBfZWxlbSB0byBnaXZlbiB5bmd3aWVFbGVtZW50OlxuICAgICAgY2FzZSBcIlluZ3dpZUVsZW1lbnRcIjpcbiAgICAgICAgdGhpcy5fZWxlbSA9ICgpID0+IGFyZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAvLyBUcmllcyB0byBpbml0YWxpemUgeW5nd2llRWxlbWVudCB1c2luZyBnaXZlbiBhcmd1bWVudHM6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdGhpcy5fZWxlbSA9ICgpID0+IFluZ3dpZUVsZW1lbnQuaW5pdC5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4geW5nd2llRWxlbWVudCkgLT4gdGhpc1xuICAvLyBBZGRzIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIHluZ3dpZUVsZW1lbnQgd2hlbiB2aWV3IGlzIHJldHJpZXZlZCBvciByZW5kZXJlZDpcbiAgbW9kaWZ5KGZuKSB7XG4gICAgdGhpcy5fZm5zLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAoRVZFTlQsIE5PREUgLT4gVk9JRCkgLT4gdGhpc1xuICAvLyBJbml0aWFsaXplcyB5bmd3aWVMaXN0ZW5lciBmb3IgeW5nd2llRWxlbWVudCBzdG9yZWQgYnkgdmlldzpcbiAgb24oaWQsIGZuKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZ5KHluZ3dpZUVsZW1lbnQ9PntcbiAgICAgIHJldHVybiB5bmd3aWVFbGVtZW50Lm9uKGlkLCBmbik7XG4gICAgfSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBNb2RpZmVzIGVsZW1lbnQgb2YgdmlldyB0byBzaG93IGdpdmVuIHRleHQ6XG4gIHRleHQoc3RyKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZ5KHluZ3dpZUVsZW1lbnQ9PntcbiAgICAgIHJldHVybiB5bmd3aWVFbGVtZW50LnRleHQoc3RyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDo6IHluZ3dpZVZpZXcgLT4gdGhpcztcbiAgLy8gQXBwZW5kcyBhbm90aGVyIHluZ3dpZVZpZXcgdG8gdGhpcyB2aWV3OlxuICBhcHBlbmQoeW5nd2llVmlldykge1xuICAgIGlmIChZbmd3aWVWaWV3LmlzKHluZ3dpZVZpZXcpKSB7XG4gICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHluZ3dpZVZpZXcpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgYSB5bmd3aWVWaWV3IGNhbiBiZSBhcHBlbmRlZCB0byBhbm90aGVyIHluZ3dpZVZpZXdcIiwgeW5nd2llVmlldyk7XG4gIH1cblxuICAvLyA6OiBbeW5nd2llVmlld10gLT4gdGhpc1xuICAvLyBBcHBlbmRzIGFycmF5IG9mIHluZ3dpZVZpZXdzIHRvIHRoaXMgdmlldzpcbiAgYXBwZW5kcyh5bmd3aWVWaWV3cykge1xuICAgIGlmICh5bmd3aWVWaWV3cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4geW5nd2llVmlld3MucmVkdWNlKChyZXN1bHQsIHZpZXcpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQodmlldyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgQVJSQVkgdG8gYXBwZW5kIHluZ3dpZVZpZXdzIHRvIHRoaXMgeW5nd2llVmlld1wiLCB5bmd3aWVWaWV3cyk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVHxWT0lELCBPQkpFQ1R8Vk9JRCAtPiBFTEVNRU5UXG4gIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgcmVuZGVyZWQgRUxFTUVOVCBmcm9tIHZpZXcsIHN0b3JpbmcgcmVzdWx0IG9mIHJlbmRlcjpcbiAgcmVuZGVyKHRhcmdldCwgY29udGV4dCkge1xuICAgIC8vIFN0b3JlIHJlc3VsdCBvZiByZW5kZXI6XG4gICAgdGhpcy5fbm9kZSA9IFluZ3dpZVZpZXcucmVuZGVyKHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG4gICAgLy8gUmV0dXJuIHJlbmRlcjpcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gRUxFTUVOVFxuICAvLyBSZS1yZW5kZXJzIHZpZXcgdXNpbmcgc3RvcmVkIG5vZGU6XG4gIC8vIE5PVEU6IElmIG5vIG5vZGUgaGFzIGJlZW4gc3RvcmVkLCB0aGVuIGEgeW5nd2llRXJyb3IgaXMgdGhyb3duOlxuICByZW5kZXJBZ2FpbigpIHtcbiAgICBpZiAodGhpcy5fbm9kZSkge1xuICAgICAgbGV0IHJlc3VsdCA9IFluZ3dpZVZpZXcucmVuZGVyKHRoaXMpO1xuICAgICAgdGhpcy5fbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgdGhpcy5fbm9kZSA9IHJlc3VsdDtcbiAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub250IHJlLXJlbmRlciB2aWV3IGJlY2F1c2UgaXQgaGFzbid0IGJlZW4gcmVuZGVyZWQgeWV0LlwiKTtcbiAgfVxuXG4gIC8vIFNUUklOR3xOT0RFLCBPQkpFQ1R8Vk9JRCAtPiBFTEVNRU5UXG4gIC8vIEVtcHRpZXMgY29udGVudCBvZiBnaXZlbiB0YXJnZXQgYW5kIGFwcGVuZHMgaXQgd2l0aCByZW5kZXJlZCBub2RlOlxuICBpbmplY3QodGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IHJlbmRlciA9IHRoaXMucmVuZGVyKCk7XG4gICAgbGV0IGVsZW0gPSBZbmd3aWVWaWV3LnNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlbGVtLmFwcGVuZChyZW5kZXIpO1xuICAgIHJldHVybiBlbGVtO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiB5bmd3aWVFbGVtZW50fFNUUklORywgU1RSSU5HLCBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVWaWV3XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoeW5nd2llRWxlbWVudCkge1xuICAgIHN3aXRjaCAoVXRpbC5nZXRUeXBlKHluZ3dpZUVsZW1lbnQpKSB7XG4gICAgICBjYXNlIFwiWW5nd2llRWxlbWVudFwiOlxuICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICByZXR1cm4gbmV3IFluZ3dpZVZpZXcoeW5nd2llRWxlbWVudCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZXQgZWxlbSA9IFluZ3dpZUVsZW1lbnQuaW5pdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gbmV3IFluZ3dpZVZpZXcoZWxlbSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogKiAtPiBCT09MRUFOXG4gIC8vIFJldHVybiBUUlVFIGlmIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIFluZ3dpZVZpZXdcbiAgc3RhdGljIGlzKHZhbCkge1xuICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBZbmd3aWVWaWV3O1xuICB9XG5cbiAgLy8gU1RSSU5HfEVMRU1FTlR8Vk9JRCwgRE9DVU1FTlR8Vk9JRCAtPiBFTEVNRU5UfERPQ1VNRU5URlJBR01FTlRcbiAgLy8gUmV0dXJucyBOT0RFIGZvciBnaXZlbiB0YXJnZXQgYW5kIGNvbnRleHRcbiAgc3RhdGljIHNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpIHtcbiAgICBsZXQgYXJnVHlwZSA9IFV0aWwuZ2V0VHlwZSh0YXJnZXQpO1xuICAgIHN3aXRjaCAoYXJnVHlwZSkge1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gY29udGV4dCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgICA6IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICAgICAgY2FzZSBcIkVsZW1lbnRcIjpcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgcmV0dXJuIG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBjYW5ub3QgYmUgYSBOT0RFXCIsIGFyZ1R5cGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IHludmlld1ZpZXcsIFNUUklOR3xFTEVNRU5UfFZPSUQsIERPQ1VNRU5UfFZPSUQgLT4gRUxFTUVOVFxuICAvLyBSZW5kZXJzIGdpdmVuIHZpZXcgYW5kIGFsbCBvZiBpdCBjaGlsZHJlbiB1c2luZyBnaXZlbiB0YXJnZXQgYW5kIGNvbnRleHQ6XG4gIHN0YXRpYyByZW5kZXIodmlldywgdGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IGVsZW0gPSB2aWV3LmVsZW0oKTtcbiAgICBsZXQgbm9kZSA9IFluZ3dpZVZpZXcuc2V0QXNOb2RlKHRhcmdldCwgY29udGV4dCk7XG4gICAgbGV0IHJlc3VsdCA9IHZpZXcuX2NoaWxkcmVuLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGxldCB2aWV3ID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZWxlbSA9PT0gdW5kZWZpbmVkID8gbm9kZSA6IGVsZW0ucmVuZGVyKG5vZGUpKTtcbiAgICByZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudFxuICAgICAgPyByZXN1bHQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgIDogcmVzdWx0O1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVNb2RlbCBmcm9tIFwiLi9Nb2RlbC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVmlldyBmcm9tIFwiLi9WaWV3L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVDb250cm9sbGVyIGZyb20gXCIuL0NvbnRyb2xsZXIvbWFpbi5qc1wiO1xuaW1wb3J0IHtUcmFuc2Zvcm0sIEVycm9yfSBmcm9tIFwieW5nd2llXCI7XG5cbmV4cG9ydCB7XG4gIFluZ3dpZU1vZGVsIGFzIE1vZGVsLFxuICBZbmd3aWVWaWV3IGFzIFZpZXcsXG4gIFluZ3dpZUNvbnRyb2xsZXIgYXMgQ29udHJvbGxlcixcbiAgVHJhbnNmb3JtLFxuICBFcnJvclxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUxpc3RlbmVyIGZyb20gXCIuLi9MaXN0ZW5lci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRWxlbWVudCBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVMaXN0ZW5lcl0gLT4geW5nd2llRWxlbWVudFxuICBjb25zdHJ1Y3Rvcih0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpIHtcbiAgICBzdXBlcih0YWdOYW1lLnRvVXBwZXJDYXNlKCkpOyAgICAgLy8gU3RvcmVzIHRhZ05hbWUgaW4gQUxMIENBUFNcbiAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicyB8fCB7fTsgICAgIC8vIEVsZW1lbnQgQXR0cmlidXRlc1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0OyAgICAgICAgICAgICAgICAgLy8gRWxlbWVudCB0ZXh0IHRoYXQncyBhcHBlbmRlZCBhcyBmaXJzdCBjaGlsZCBvZiB0aGlzIGVsZW1lbnRcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTsgICAgICAgICAgICAvLyBMaXN0ZW5lcnMgYm91bmQgdG8gdGhpcyBlbGVtZW50XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHRhZ05hbWUgb2YgdGhpcyBlbGVtZW50OlxuICB0YWdOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIDo6IE9CSkVDVHxWT0lEIC0+IHRoaXN8T0JKRUNUXG4gIC8vIFNldHMgXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gT0JKRUNUOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IGF0dHJpYnV0ZXMgYXJlIHJldHVybmVkOlxuICBhdHRyaWJzKGF0dHJpYnMpIHtcbiAgICBpZiAoYXR0cmlicyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXR0cmlicztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZihhdHRyaWJzKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJZbmd3aWVFbGVtZW50IGF0dHJpYnV0ZXMgY2FuIG9ubHkgYmUgc2V0IHdpdGggT0JKRUNUXCIsIGF0dHJpYnMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBCT09MRUFOXG4gIC8vIFJldHVybnMgQk9PTEVBTiBmb3IgaWYgYXR0cmlidXRlIHdpdGggZ2l2ZW4gbmFtZSBleGlzdHMgaW4gXCJhdHRyaWJzXCIgT0JKRUNUOlxuICBoYXNBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+ICp8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgdmFsdWUgb2YgYXR0cmlidXRlIGJ5IG5hbWUgc3RvcmVkIGluIFwiYXR0cmlic1wiIE9CSkVDVCwgb3RoZXJ3aXNlIHJldHVybnMgVU5ERUZJTkVEXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICogLT4gdGhpc1xuICAvLyBCaW5kcyAgdmFsdWUgdG8gXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gbmFtZTpcbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXR0cmlic1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gUmVtb3ZlIGF0dHJpYnV0ZSB3aXRoIGdpdmVuIG5hbWUgZnJvbSBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8Vk9JRCAtPiB0aGlzfFVOREVGSU5FRFxuICAvLyBBcHBlbmRzIHRleHQgbm9kZSBhcyBmaXJzdCBjaGlsZCBvZiBlbGVtZW50IGF0IHJlbmRlciB3aXRoIGdpdmVuIHN0cmluZyBhcyBpdCdzIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IHRleHQgaXMgcmV0dXJuZWQ6XG4gIHRleHQoc3RyKSB7XG4gICAgaWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZihzdHIpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuX3RleHQgPSBzdHI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiVGV4dCBvZiBlbGVtZW50IGNhbiBvbmx5IGJlIHNldCB3aXRoIGEgU1RSSU5HXCIsIHN0cik7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIFNldHMgdGV4dCBhcyBVTkRFRklORUQgZm9yIHRoaXMgZWxlbWVudDpcbiAgcmVtb3ZlVGV4dCgpIHtcbiAgICB0aGlzLl90ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4gQk9PTEVBTikgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIHRoZSBlbGVtZW50cyB0aGF0LCB3aGVuIHRoZSBnaXZlbiBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRoaXMgZWxlbWVudHMgYW5kIGl0J3MgZGVzZW5kYW50cywgdGhhdCBmdW5jdGlvbiByZXR1cm5zIFRSVUU6XG4gIGdldEVsZW1lbnRzQnkoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZSgobm9kZSwgcmVzdWx0KSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGZuKG5vZGUpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIFluZ3dpZUVsZW1udHMgdGhhdCBoYXZlIHRoZSBnaXZlbiB0YWdOYW1lOlxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnkoZWxlbSA9PiBlbGVtLnRhZ05hbWUoKSA9PT0gdGFnTmFtZSk7XG4gIH1cblxuICAvLyBTVFJJTkcsIFNUUklOR3xWT0lEIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyB2YWx1ZSBpcyBnaXZlbiwgdGhlbiBhbnkgZWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIG5hbWUgaXMgcmV0dXJuZWRcbiAgZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnkoZWxlbSA9PiB7XG4gICAgICBpZiAoZWxlbS5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3MgbmFtZVxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBjbGFzcyBuYW1lOlxuICBnZXRFbGVtZW50c0J5Q2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIFluZ3dpZUVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIElEOlxuICAvLyBOT1RFOiBSZXR1cm5zIFVOREVGSU5FRCBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgZ2V0RWxlbWVudEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiaWRcIiwgaWQpLnBvcCgpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5ULCBFTEVNRU5UKSAtPiBWT0lEXXwoRVZFTlQsIEVMRU1FTlQpIC0+IFZPSUQgLT4gIHRoaXNcbiAgLy8gQmluZHMgbGlzdGVuZXIgYnkgZXZlbnQgbmFtZSB0byBub2RlIGF0IHJlbmRlcjpcbiAgLy8gTk9URTogRnVuY3Rpb24gYm91bmQgdG8gbGlzdGVuZXIgaXMgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIHRoaXMgZWxlbWVudFxuICBvbihldnROYW1lLCBmbnMpIHtcbiAgICBsZXQgbGlzdGVuZXIgPSBZbmd3aWVMaXN0ZW5lci5pbml0KGV2dE5hbWUsIGZucyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVk9JRCAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFJldHVybnMgY2xvbmUgb2YgdGhpcyB5bmd3aWVFbGVtZW50OlxuICBjbG9uZSgpIHtcblxuICAgIC8vIENvcHkgdGFnbmFtZTpcbiAgICBsZXQgdGFnTmFtZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG5cbiAgICAvLyBDb3B5IGF0dHJpYnV0ZXM6XG4gICAgbGV0IGF0dHJpYnMgPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKHJlc3VsdCwgaWQpID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSBgJHt0aGlzLl9hdHRyaWJzW2lkXX1gO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBDb3B5IHNldDpcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgJHt0aGlzLl90ZXh0fWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gQ29weSBsaXN0ZW5lcnM6XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5tYXAoKGxpc3RlbmVyKSA9PiB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuY2xvbmUoKTtcbiAgICB9KTtcblxuICAgIC8vIENvcHkgY2hpbGRyZW4gYW5kIHJldHVybiBlbGVtZW50OlxuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiBlbGVtLmFwcGVuZChjaGlsZCk7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBUcmFuc2Zvcm1zIHRoaXMgZWxlbWVudCBhbmQgaXQncyBkZXNlbmRhbnRzIGludG8gYSBET00gRUxFTUVOVCwgYXBwZW5kaW5nIHJlc3VsdCB0byBnaXZlbiB0YXJnZXRcbiAgLy8gYW5kIHJlbmRlcmluZyB0aGF0IEVMRU1FTlQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGdpdmVuIE9CSkVDVC4gSWYgbm8gdGFyZ2V0IHRvIGFwcGVuZCBpcyBnaXZlbixcbiAgLy8gdGhlIHJlbmRlcmVkIEVMRU1FTlQgaXMgcmV0dXJuZWQuIElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIHRoZW4gRE9DVU1FTlQgaXMgdXNlZCBieSBkZWZhdWx0LlxuICByZW5kZXIodGFyZ2V0LCBjdHgpIHtcblxuICAgIC8vIENoZWNrIGlmIGRlZmF1bHQgY29udGV4dCBvZiBET0NVTUVOVCBzaG91bGQgYmUgdXNlZDpcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQodGhpcy5fdmFsdWUpKTtcblxuICAgIC8vIEJpbmQgTGlzdGVuZXJzOlxuICAgIGVsZW0gPSB0aGlzLl9saXN0ZW5lcnMucmVkdWNlKChlbGVtLCBsaXN0ZW5lcikgPT4ge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLnJlbmRlcihlbGVtLCB0aGlzKTtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHNldCwgY3JlYXRlIGFuZCBhcHBlbmQgdGV4dCBub2RlOlxuICAgIGlmICh0eXBlb2YodGhpcy5fdGV4dCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBlbGVtVGV4dCA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdGV4dCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGVsZW1UZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgYW5kIGFwcGVuZCBhbGwgY2hpbGRyZW4gYW5kIHJldHVybiByZXN1bHQ6XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHRhcmdldCBpcyBnaXZlbiwgYXBwZW5kcyByZXN1bHQgb2YgcmVuZGVyIHRvIHRoYXQgdGFyZ2V0OlxuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gSWYgdGFyZ2V0IGlzIHN0cmluZywgZmluZCBub2RlIHVzaW5nIHF1ZXJ5IHNlbGVjdG9yOlxuICAgICAgaWYgKHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcmlzZSBhc3N1bWUgdGhhdCB0YXJnZXQgaXMgRE9NRWxlbWVudDpcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llTGlzdGVuZXJdIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKVxuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlQsIFt5bmd3aWVFbGVtZW50XSwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gUmVuZGVycyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyBpbiB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXBwZW5kcyByZXN1bHQgdG8gZ2l2ZW4gdGFyZ2V0OlxuICAvLyBOT1RFOiBFTEVNRU5UIG9mIHRhcmdldCBpcyByZXR1cm5lZFxuICBzdGF0aWMgcmVuZGVyVG8odGFyZ2V0LCBlbGVtcywgY3R4KSB7XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgIGlmIChlbGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICByZXR1cm4gZWxlbXMucmVkdWNlKChyZXN1bHQsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgICAgZWxlbS5yZW5kZXIocmVzdWx0KTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgcmVuZGVyZWQgdG8gdGFyZ2V0XCIsIGVsZW0pO1xuICAgICAgfSwgbm9kZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VtZW50XCIsIGVsZW1zKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCB5bmd3aWVFbGVtZW50LCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBSZXBsYWNlcyB0aGUgZ2l2ZW4gdGFyZ2V0IHdpdGggdGhlIHJlbmRlciBvZiB0aGUgZ2l2ZW4gaW5zdGFuY2UgIG9mIFluZ3dpZUVsZW1lbnQgaW4gdGhlIGdpdmVuIGNvbnRleHQ6XG4gIHN0YXRpYyBpbmplY3QodGFyZ2V0LCBlbGVtLCBjdHgpIHtcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgIGxldCBjb250ZXh0ID0gY3R4ID09PSB1bmRlZmluZWQgPyBkb2N1bWVudCA6IGN0eDtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIGxldCByZXN1bHQgPSBlbGVtLnJlbmRlcigpO1xuICAgICAgbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgaW5qZWN0ZWQgaW50byB0YXJnZXRcIiwgZWxlbSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLCAqIC0+IEVSUk9SXG4gIC8vIE5PVEUgOjogXCJkYXRhXCIgYXJndW1lbnQgaXMgYWx3YXlzIGNhc3QgYXMgU1RSSU5HOlxuICBjb25zdHJ1Y3Rvcihtc2csIGRhdGEpIHtcbiAgICBzdXBlcihtc2cpO1xuICAgIHRoaXMuZGF0YSA9IGAke2RhdGF9YDtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gIFZPSURcbiAgLy8gQ29uc29sZXMgb3V0IHN0YWNrIHRyYWNlIG9mIGVycm9yLCBhbG9uZyB3aXRoIHRoZSBkYXRhIHRoYXQgY2F1c2VkIHRoZSBleGNlcHRpb24gdG8gYmUgdGhyb3duOlxuICBsb2coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGFjayk7XG4gICAgY29uc29sZS5sb2coXCJXaGF0IEZhaWxlZDogXCIsIHRoaXMuZGF0YSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTGlzdGVuZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgWyhFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKV0gLT4geW5nd2llTGlzdGVuZXJcbiAgY29uc3RydWN0b3IoZXZ0TmFtZSwgZm5zKSB7XG4gICAgdGhpcy5fZXZ0TmFtZSA9IGV2dE5hbWU7XG4gICAgdGhpcy5fZm5zID0gZm5zIHx8IFtdO1xuICB9XG5cbiAgLy8gOjogKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpIC0+IHRoaXM7XG4gIC8vIEFkZHMgZnVuY3Rpb24gdG8gbGlzdGVuZXI6XG4gIGFkZChmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTGlzdGVuZXJcbiAgLy8gQ3JlYXRlcyBjbG9uZSBvZiB0aGlzIHluZ3dpZUxpc3RlbmVyOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgZXZ0TmFtZSA9IGAke3RoaXMuX2V2dE5hbWV9YDtcbiAgICBsZXQgZm5zID0gdGhpcy5fZm5zLm1hcChmbj0+e1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImV2dFwiLCBcImVsZW1cIiwgZm4udG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVMaXN0ZW5lcihldnROYW1lLCBmbnMpO1xuICB9XG5cbiAgLy8gOjogRUxFTUVOVCwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gQ3JlYXRlcyBldmVudCBsaXN0ZW5lciBhbmQgYmluZHMgaXQgdG8gZ2l2ZW4gRE9NIEVMRU1FTlQsIGFuZCBjYWxscyBmdW5jdGlvbiBvZiBsaXN0ZW5lciB0byBnaXZlbiBjb250ZXh0XG4gIC8vIE5PVEU6IElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiB0aGUgRUxFTUVOVCB0aGUgbGlzdGVuZXIgaXMgYm91bmQgdG9cbiAgcmVuZGVyKGVsZW0sIGN0eCkge1xuICAgIHJldHVybiB0aGlzLl9mbnMucmVkdWNlKChlbGVtLCBmbikgPT4ge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2V2dE5hbWUsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZm4uY2FsbChjdHggPT09IHVuZGVmaW5lZCA/IGVsZW0gOiBjdHgsIGV2dCwgZWxlbSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sIGVsZW0pO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpXXwoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCkgLT4geW5nd2llTGlzdGVuZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChldnROYW1lLCBmbnMpIHtcbiAgICByZXR1cm4gZm5zICE9PSB1bmRlZmluZWRcbiAgICAgID8gbmV3IFluZ3dpZUxpc3RlbmVyKGV2dE5hbWUsIEFycmF5LmlzQXJyYXkoZm5zKSA9PT0gdHJ1ZSA/IGZucyA6IFtmbnNdKVxuICAgICAgOiBuZXcgWW5nd2llTGlzdGVuZXIoZXZ0TmFtZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZih2YWx1ZSkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7ICAgICAgIC8vIEFyYml0cmFyeSBTVFJJTkcgdmFsdWUgdGhhdCBjYW4gYmUgc3RvcmVkIGJ5IHRoaXMgbm9kZVxuICAgICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkOyAgLy8gUGFyZW50IG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fZmlyc3QgPSB1bmRlZmluZWQ7ICAgLy8gRmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9sYXN0ID0gdW5kZWZpbmVkOyAgICAvLyBMYXN0IGNoaWxkIG9mIHRoaXMgbm9kZTtcbiAgICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7ICAgIC8vIE5leHQgc2libGluZyBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7ICAgIC8vIFByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIG5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiVmFsdWUgb2YgWW5nd2llTm9kZSBtdXN0IGJlIFNUUklOR1wiLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBbeW5nd2llTm9kZV1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgY2hpbGRyZW4oKSB7XG5cbiAgICBsZXQgY2hpbGQgPSB0aGlzLl9maXJzdDsgICAvLyBGaXJzdCBjaGlsZFxuICAgIGxldCBjaGlsZHJlbiA9IFtdOyAgICAgICAgIC8vIEFycmF5IG9mIGNoaWxkcmVuIHRvIHJldHVyblxuXG4gICAgLy8gTG9va3MgZm9yIG5leHQgc2libGluZyB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBzaWJsaW5nczpcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFuIGFycmFyeSB5bmdpd05vZGUgZWxlbWVudHM6XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXNcbiAgLy8gQWRkcyBnaXZlbiBub2RlIHRvIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgLy8gTk9URTogSWYgZ2l2ZW4gbm9kZSBhbHJlYWR5IGhhcyBhIHBhcmVudCwgdGhhdCBub2RlIGlzIGRldGFjaGVkIGFuZCBhcHBlbmVkIHRvIHRoaXMgbm9kZTpcbiAgYXBwZW5kKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIElmIGdpdmVuIG5vZGUgaGFzIHBhcmVudCwgZGV0YWNoIHRoYXQgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICAgICAgaWYgKG5vZGUuX3BhcmVudCkge1xuICAgICAgICBub2RlLmRldGFjaCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgbmV3IG5vZGUgYXMgbGFzdCBzaWJsaW5nOlxuICAgICAgaWYgKHRoaXMuX2ZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX2xhc3Q7ICAgIC8vIFNldHMgbmV3IGxhc3QgY2hpbGQncyBwcmV2aW91cyBub2RlIHRvIG9sZCBsYXN0IG5vZGVcbiAgICAgICAgdGhpcy5fbGFzdC5fbmV4dCA9IG5vZGU7ICAgIC8vIFNldCBvbGQgbGFzdCBjaGlsZCBuZXh0IGVsZW1lbnQgdG8gbmV3IGxhc3QgY2hpbGRcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7ICAgICAgICAgLy8gU2V0IG5ldyBsYXN0IGNoaWxkIHRvIGdpdmVuIG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXIgYXJlIG5vIGNoaWxkcmVuLCB0aGVuIHRoaXMgbm9kZSBpcyBhbiBvbmx5IGNoaWxkOlxuICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcGFyZW50XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAvLyBSZXR1cm4gaW5zdGFuY2U6Y29zbm9sZVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBhcHBwZW5kIFluZ3dpZU5vZGUgdG8gb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFt5bmd3aWVOb2RlXSAtPiB0aGlzXG4gIC8vIEFwcGVuZHMgYW4gYXJyYXkgb2YgWW5nd2llTm9kZXMgdG8gdGhpcyBpbnN0YW5jZTpcbiAgYXBwZW5kcyhub2Rlcykge1xuICAgIGlmIChub2RlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gbm9kZXMucmVkdWNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kKG5vZGUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VlbW50XCIsIG5vZGVzKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gdGhpc1xuICAvLyBEZXRhY2hlcyB0aGlzIG5vZGUgZnJvbSBpdCdzIHBhcmVudDpcbiAgZGV0YWNoKCkge1xuXG4gICAgLy8gTWFrZSBwcmV2aW91cyBub2RlJ3MgbmV4dCBub2RlIHRoaXMgbm9kZSdzIG5leHQgbm9kZTpcbiAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IHRoaXMuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vIHByZXZpb3VzIG5vZGUsIHRoZW4gdGhpcyBub2RlIG11c3QgYmUgZmlyc3QgY2hpbGQgb2YgcGFyZW50IChpZiBub2RlIGhhcyBwYXJlbnQpOlxuICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gdGhpcy5fbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIG5leHQgbm9kZSdzIHByZXZpb3VzIG5vZGUgdGhpcyBub2RlJ3MgcHJldmlvdXMgbm9kZTpcbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgdGhpcy5fbmV4dC5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgfVxuXG4gICAgLy8gVW5zZXQgYWxsIHJlbGF0aW9uczpcbiAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gUmV0dXJuIGluc3RhbmNlOlxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXM7XG4gIC8vIEluc2VydHMgZ2l2ZW4geW5nd2llTm9kZSBiZWZvcmUgdGhpcyBpbnN0YW5jZSBvZiB5bmd3aWVOb2RlOlxuICAvLyBOT1RFOiBhLmluc2VydHNCZWZvcmUoYikgbWVhbnMgXCJiXCIgaXMgaW5zZXJ0ZWQgYmVmb3JlIFwiYVwiXG4gIGluc2VydEJlZm9yZShub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBTZXQgcmVsYXRpb25zXG4gICAgICBub2RlLl9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICAgIG5vZGUuX25leHQgPSB0aGlzO1xuICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZyByZWxhdGlvbnM6XG4gICAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZzpcbiAgICAgIHRoaXMuX3ByZXYgPSBub2RlO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGluc2VydCBhIFluZ3dpZU5vZGUgYmVmb3JlIG90aGVyIFluZ3dpZU5vZGVzXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmVwbGFjZSB0aGlzIG5vZGUgd2l0aCBnaXZlbiBub2RlOlxuICByZXBsYWNlV2l0aChub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBDaGVja3MgaWYgdGhpcyBub2RlIGhhcyBhIHBhcmVudFxuICAgICAgaWYgKHRoaXMuX3BhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgLy8gUmVwbGFjZW1lbnQgaXMgYWNjb21wbGlzaGVkIGJ5IGZpcnN0IGluc2VydGluZyBnaXZlbiBub2RlLCB0aGVuIGRldGF0Y2hpbmcgdGhpcyBub2RlOlxuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShub2RlKTtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAvLyBSZXR1cm4gZ2l2ZW4gbm9kZTpcbiAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBZbmd3aWVOb2RlIGlmIFluZ3dpZU5vZGUgYmVpbmcgcmVwbGFjZWQgaGFzIHBhcmVudFwiLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgYSBZbmd3aWVOb2RlIHdpdGggYW5vdGhlciBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmV0dXJucyBkZWVwIGNsb25lIG9mIHRoaXMgbm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IHZhbHVlID0gYCR7dGhpcy5fdmFsdWV9YDtcbiAgICBsZXQgY2xvbmUgPSBuZXcgWW5nd2llTm9kZSh2YWx1ZSlcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2xvbmUgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQoY2xvbmUpO1xuICAgIH0sIGNsb25lKTtcbiAgfVxuXG4gIC8vIE5PREUsICogLT4gTk9ERSAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gYSByZXN1bHQgYW5kIHRoaXMgbm9kZSwgd2hlcmUgdGhhdCBmdW5jdGlvbiByZXR1cm5zIHRoZSBuZXh0IG5vZGUgdG8gdGhhdCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvXG4gIC8vIE5PVEU6IFJlc3VsdCBpcyByZXR1cm5lZCB3aGVuIHRoZXJlIGlzIG5vIG5leHQgbm9kZSB0byBhcHBseSBmdW5jdGlvbiB0b1xuICBzdGVwKGZuLCByZXN1bHQpIHtcbiAgICBuZXh0ID0gZm4odGhpcywgcmVzdWx0KTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5zdGVwKGZuLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gOjogTk9ERSwgKiAtPiAqLCAqIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byB0aGlzIG5vZGUgYW5kIGl0J3MgZGVzY2VuZGFudHMsIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHBhcnNlKGZuLCByZXN1bHQpIHtcbiAgICBZbmd3aWVOb2RlLnBhcnNlKHRoaXMsIChub2RlKSA9PiB7XG4gICAgICByZXN1bHQgPSBmbihub2RlLCByZXN1bHQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogU3RhdGljIEZ1bmN0aW9uXG4gICAqXG4gICAqL1xuXG4gIC8vIFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZFxuICBzdGF0aWMgaW5pdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTm9kZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBOT0RFLCBOT0RFIC0+IFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gYSBub2RlIGFuZCBhbGwgaXQncyBkZXNlbmRhbnRzXG4gIC8vIE5PREU6IFRoaXMgaXMgYSByZS1pbXBsZW1lbnRhdGlvbiBvZiBDcm9ja2ZvcmQncyBET00gd2FsayBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6IFRoZSBHb29kIFBhcnRzXCJcbiAgc3RhdGljIHBhcnNlKG5vZGUsIGZuKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICBmbihub2RlKTtcbiAgICAgIG5vZGUgPSBub2RlLl9maXJzdDtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIFluZ3dpZU5vZGUucGFyc2Uobm9kZSwgZm4pO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHBhcnNlIGEgWW5nd2llTm9kZVwiLCBub2RlKTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVUZXh0Tm9kZSBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgc3VwZXIodGV4dCk7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHRleHQgb2YgdGhpcyB0ZXh0IG5vZGU6XG4gIHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfHluZ3dpZVRleHROb2RlIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBTVFJJTkcgaW5zdGVhZCBvZiBOT0RFIHNpbmNlIGEgVGV4dE5vZGUgaGFzIG5vIGNoaWxkcmVuXG4gIGFwcGVuZCh2YWwpIHtcblxuICAgIGlmICh0eXBlb2YodmFsKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB2YWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBZbmd3aWVUZXh0Tm9kZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB2YWwudGV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFNUUklOR3MgYW5kIG90aGVyIFluZ3dpZVRleHROb2RlcyBjYW4gYXBwZW5kIGEgWW5nd2llVGV4dE5vZGVcIiwgdmFsKTtcbiAgfVxuXG4gIC8vOjogU1RSSU5HfEVMRU1FTlR8Vk9JRCwgT0JKRUNUIC0+IFRFWFRcbiAgLy8gQ3JlYXRlcyBET00gVGV4dCBub2RlIHNldCB3aXRoIHRoZSBTVFJJTkcgc3RvcmVkIGluIF92YWx1ZTpcbiAgcmVuZGVyKHRhcmdldCwgY3R4KSB7XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgIGxldCB0ZXh0Tm9kZSA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdmFsdWUpO1xuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHROb2RlO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB5bmd3aWVUZXh0Tm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZShgJHt0aGlzLl92YWx1ZX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGV4dCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUodGV4dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4uL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL1RyYW5zZm9ybS9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRyYW5zZm9ybSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogKiAtPiB5bmd3aWVUcmFuc2Zvcm1cbiAgY29uc3RydWN0b3IodmFsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbHVlIHRvIHRyYW5zZm9ybVxuICAgIHRoaXMuX3R5cGUgPSBZbmd3aWVUcmFuc2Zvcm0uZ2V0VHlwZSh2YWwpOyAvLyBTdG9yZXMgdmFsdWUncyB0eXBlIGZvciBkZXRlcm1pbmluZyBob3cgaXQgY2FuIGJlIHRyYW5zZm9ybWVkXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IE5PREVcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIERPTUVsZW1lbnQgTk9ERTpcbiAgdG9OT0RFKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh0aGlzLl92YWx1ZSwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIHJldHVybiBkb2MuYm9keS5maXJzdENoaWxkO1xuICAgICAgY2FzZSBcIllOR1dJRVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUucmVuZGVyKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIE5PREUgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSBTVFJJTkc6XG4gIHRvU1RSSU5HKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vZGVUeXBlID09PSAxID8gdGhpcy5fdmFsdWUub3V0ZXJIVE1MIDogdGhpcy5fdmFsdWUubm9kZVZhbHVlO1xuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl92YWx1ZS5yZW5kZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2cobm9kZSlcbiAgICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBub2RlLm91dGVySFRNTCA6IG5vZGUubm9kZVZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBTVFJJTkcgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSB5bmd3aWVFbGVtZW50OlxuICB0b1lOR1dJRSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgIGNhc2UgXCJOT0RFXCI6XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIHJldHVybiBZbmd3aWVUcmFuc2Zvcm0uaW5pdCh0aGlzLl92YWx1ZSk7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gWW5nd2llRWxlbWVudCBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkd8Tk9ERSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFRyYW5zZm9ybXMgc3RyaW5nIG9mIEhUTUwgb3IgRE9NRWxlbWVudCBOT0RFIGludG8gYSB5bmd3aWVFbGVtZW50XG4gIC8vIE5PVEU6IFRoaXMgRE9FUyBOT1QgdHJhbnNmb3JtIGV2ZW50IGhhbmRsZXJzIGludG8gWW5nd2llTGlzdGVuZXIgb2JqZWN0czpcbiAgc3RhdGljIGluaXQoaHRtbCkge1xuICAgIHJldHVybiB3YWxrTm9kZShZbmd3aWVUcmFuc2Zvcm0uZ2V0VHlwZShodG1sKSA9PT0gXCJTVFJJTkdcIiA/IFluZ3dpZVRyYW5zZm9ybS50b05PREUoaHRtbCkgOiBodG1sKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gTk9ERVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSBOT0RFOlxuICBzdGF0aWMgdG9OT0RFKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b05PREUoKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gU1RSSU5HXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIFNUUklORzpcbiAgc3RhdGljIHRvU1RSSU5HKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b1NUUklORygpO1xuICB9XG5cbiAgLy8gOjogKiAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIHluZ3dpZUVsZW1lbnQ6XG4gIHN0YXRpYyB0b1lOR1dJRSh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9ZTkdXSUUoKTtcbiAgfVxuXG4gIC8vICogLT4gXCJOT0RFXCJ8XCJTVFJJTkdcInxcIllOR1dJRVwifFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIG5hbWUgb2YgdHlwZSBmb3IgZ2l2ZW4gdmFsdWU6XG4gIHN0YXRpYyBnZXRUeXBlKHZhbCkge1xuXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIHJldHVybiBcIk5PREVcIjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mKHZhbCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBcIlNUUklOR1wiO1xuICAgIH1cblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG4gICAgICByZXR1cm4gXCJZTkdXSUVcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIH1cblxufVxuXG4vKipcbiAqXG4gKiAgTG9jYWwgRnVuY3Rpb25zXG4gKlxuICovXG5cbi8vIDo6IE5PREUsIE5PREUsIG5vZGUubm9kZVR5cGUgLT4gVk9JRFxuLy8gQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZbmd3aWVFbGVtZW50IGZyb20gdGhlIGdpdmVuIG5vZGUgYW5kIGFsbCBvZiBpdCdzIGRlc2VuZGVudHM6XG4vLyBOT1RFOiBJbnNwaXJlZCBieSBDcm9ja2ZvcmQncyBET00gd2Fsa2luZyBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6VGhlIEdvb2QgUGFydHNcIlxuZnVuY3Rpb24gd2Fsa05vZGUobm9kZSwgcmVzdWx0KSB7XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBsZXQgYXR0cmlicyA9IGdldEF0dHJpYnV0ZXMobm9kZSk7XG4gICAgbGV0IGVsZW0gPSBuZXcgWW5nd2llRWxlbWVudChub2RlLnRhZ05hbWUsIGF0dHJpYnMpO1xuICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVsZW1cbiAgICAgIDogcmVzdWx0LmFwcGVuZChlbGVtKTtcbiAgfVxuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgbGV0IHRleHROb2RlID0gbmV3IFluZ3dpZVRleHROb2RlKG5vZGUubm9kZVZhbHVlKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyB0ZXh0Tm9kZVxuICAgICAgOiByZXN1bHQuYXBwZW5kKHRleHROb2RlKTtcbiAgfVxuXG4gIG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICBsZXQgY2hpbGQgPSB3YWxrTm9kZShub2RlKTtcbiAgICBpZiAoY2hpbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQuYXBwZW5kKGNoaWxkKTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xuXG59XG5cbi8vIDo6IERPTUVsZW1lbnQgLT4gT0JKRUNUXG4vLyBSZXR1cm5zIE9CSkVDVCBvZiBhdHRyaWJ1dGVzIGZyb20gdGhlIGdpdmVuIERPTSBFbGVtZW50OlxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlcyhlbGVtKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGVsZW0uYXR0cmlidXRlcykucmVkdWNlKChyZXN1bHQsIGF0dHJpYikgPT4ge1xuICAgIHJlc3VsdFthdHRyaWIubmFtZV0gPSBhdHRyaWIudmFsdWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSwge30pO1xufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTGlzdGVuZXIgZnJvbSBcIi4vTGlzdGVuZXIvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm0vbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IHtcbiAgWW5nd2llTm9kZSBhcyBOb2RlLFxuICBZbmd3aWVFbGVtZW50IGFzIEVsZW1lbnQsXG4gIFluZ3dpZVRleHROb2RlIGFzIFRleHROb2RlLFxuICBZbmd3aWVMaXN0ZW5lciBhcyBMaXN0ZW5lcixcbiAgWW5nd2llVHJhbnNmb3JtIGFzIFRyYW5zZm9ybSxcbiAgWW5nd2llRXJyb3IgYXMgRXJyb3Jcbn1cbiIsImltcG9ydCBZbmd3aWVNYXBwaW5nIGZyb20gXCIuLi9NYXBwaW5nL21haW4uanNcIjtcbmltcG9ydCAqIGFzIFluZ3dpZU1WQyBmcm9tIFwieW5nd2llLW12Y1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVBY3RvciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogeW5nd2llTW9kZWx8T0JKRUNULCB7U1RSSU5HOiotPip9LCB7U1RSSU5HOlNUUklOR30gLT4gdGhpc1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgYWN0aW9ucywgYmVoYXZpb3JzKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBZbmd3aWVNVkMuTW9kZWwuc2V0QXNNb2RlbChtb2RlbCk7XG4gICAgdGhpcy5fYWN0aW9ucyA9IFluZ3dpZU1hcHBpbmcuaW5pdCh2YWwgPT4gdHlwZW9mKHZhbCkgPT09IFwiZnVuY3Rpb25cIikuc2V0KGFjdGlvbnMpO1xuICAgIHRoaXMuX2JlaGF2aW9ycyA9IFluZ3dpZU1hcHBpbmcuaW5pdCh2YWwgPT4gdHlwZW9mKHZhbCkgPT09IFwic3RyaW5nXCIpLnNldChiZWhhdmlvcnMpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVNb2RlbFxuICAvLyBSZXR1cm5zIG1vZGVsIHN0b3JlZCBieSBhY3RvcjpcbiAgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBGVU5DVElPTiAtPiB0aGlzXG4gIC8vIEJpbmRzIGFjdGlvbiBmdW5jdGlvbiB0byBhY3Rpb24gSUQ6XG4gIC8vIE5PVEU6IE9ubHkgb25lIGZ1bmN0aW9uIGNhbiBiZSBib3VuZCB0byBhbiBhY3Rpb24gLSBydW5uaW5nIHRoaXMgZm9yIHRoZSBzYW1lIGFjdGlvbklEIHdpbGwgdGhlbiByZXBsYWNlIHRoZSBjdXJyZW50IGZ1bmN0aW9uIGlmIHNldFxuICBhY3Rpb24oaWQsIGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2FjdGlvbnMuc2V0T25jZShpZCwgZm4pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgWW5nd2llTVZDLkVycm9yKGBDb3VsZCBub3Qgc2V0IGFjdGlvbjogJHtlcnIubXNnfWAsIGVyci5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyBTVFJJTkcsIFNUUklOR3xbU1RSSU5HXSAtPiB0aGlzXG4gIC8vIEJpbmRzIG1lc3NhZ2UgdG8gYWN0aW9uXG4gIC8vIE5PVEU6IElmIGFjdGlvbiBpcyBub3Qgc2V0LCBhbiB5bmd3aWUgRXJyb3IgaXMgdGhyb3duOlxuICB3aGVuKG1lc3NhZ2UsIGFjdGlvbklEKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChhY3Rpb25JRCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25JRC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy53aGVuKG1lc3NhZ2UsIGFjdGlvbklEW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fYWN0aW9ucy5oYXMoYWN0aW9uSUQpKSB7XG4gICAgICAgIHRoaXMuX2JlaGF2aW9ycy5zZXQobWVzc2FnZSwgYWN0aW9uSUQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVNVkMuRXJyb3IoXCJDYW5ub3QgYmluZCBtZXNzYWdlIHRvIGFuIGFjdGlvbiB0aGF0IGRvZXNuJ3QgZXhpc3RcIiwgYWN0aW9uSUQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFluZ3dpZU1WQy5FcnJvcihgQ291bGQgbm90IHNldCBiZWhhdmlvcjogJHtlcnIubXNnfWAsIGVyci5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyBTVFJJTkcsIFtdKl0gLT4gdGhpc1xuICAvLyBTZW5kcyBtZXNzYWdlIHRvIGFjdG9yLCBhcHBseWluZyBnaXZlbiB2YWx1ZSB0byBhY3Rpb24gYm91bmQgdG8gbWVzc2FnZTpcbiAgLy8gTk9URTogSWYgYmVoYXZpb3IgZG9lcyBub3QgZXhpc3QsIHRoZW4gYW4gZXJyb3IgaXMgdGhyb3duOlxuICBzZW5kKG1lc3NhZ2UsIGFyZ3MpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGFjdGlvbklEcyA9IHRoaXMuX2JlaGF2aW9ycy5nZXQobWVzc2FnZSk7XG4gICAgICBhY3Rpb25JRHMuZm9yRWFjaChhY3Rpb25JRCA9PiB7XG4gICAgICAgIGxldCBhY3Rpb24gPSB0aGlzLl9hY3Rpb25zLmdldChhY3Rpb25JRClbMF07XG4gICAgICAgIGFjdGlvbi5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZU1WQy5FcnJvcihgQ291bGQgbm90IHNlbmQgbWVzc2FnZTogJHtlcnIubXNnfWAsIGVyci5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YWl0YyBNZWh0b2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IHluZ3dpZU1vZGVsfE9CSkVDVCwge1NUUklORzoqLT4qfSwge1NUUklORzpTVFJJTkd9IC0+IHluZ3dpZUFjdG9yXG4gIC8vIFN0YXRpYyBGYWN0b3J5IG1ldGhvZFxuICBzdGF0aWMgaW5pdChtb2RlbCwgYWN0aW9ucywgYmVoYXZpb3JzKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVBY3Rvcihtb2RlbCwgYWN0aW9ucywgYmVoYXZpb3JzKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0Vycm9yIGFzIFluZ3dpZUVycm9yfSBmcm9tIFwieW5nd2llLW12Y1wiO1xuXG4vLyBCaW5kcyBhcnJheSBvZiBcImNvbnN0cmFpbmVkXCIgdmFsdWVzIHRvIGtleSBvZiB0eXBlIFNUUklORzpcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZU1hcHBpbmcge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6ICogLT4gQk9PTEVBTnxWT0lEIC0+IHluZ3dpZU1hcHBpbmdcbiAgY29uc3RydWN0b3IoY29uc3RyYWludCkge1xuICAgIGlmICh0eXBlb2YoY29uc3RyYWludCkgPT09ICdmdW5jdGlvbicgfHwgY29uc3RyYWludCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jb25zdHJhaW50ID0gY29uc3RyYWludCA9PT0gdW5kZWZpbmVkID8geCA9PiB4IDogY29uc3RyYWludDtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ29uc3RyYWludCBmb3IgeW5nd2llTWFwcGluZyBtdXN0IGVpdGhlciBieSBhIEZVTkNUSU9OIG9yIFVOREVGSU5FRFwiLCBjb25zdHJhaW50KTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiAqIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBUUlVFIGlmIGdpdmVuIHZhbHVlIG1lZXRzIGNvbnN0cmFpbnQ6XG4gIC8vIE5PVEU6IElmIGNvbnN0cmFpbnQgaXMgVU5ERUZJTkVELCB0aGVuIGFsd2F5cyByZXR1cm4gVFJVRVxuICBjaGVjayh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mKHRoaXMuX2NvbnN0cmFpbnQpID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHRoaXMuX2NvbnN0cmFpbnQodmFsKVxuICAgICAgOiB0cnVlO1xuICB9XG5cbiAgLy8gOjogWypdLCBbKl0gLT4gKiwgKiAtPiAqIC0+ICpcbiAgLy8gQXBwbHVlcyBzdWNjZXNzIGZ1bmN0aW9uIHRvIGdpdmVuIGFycmF5IG9mIHZhbHVlcyBpZiBhbGwgdmFsdWVzIG1lZXQgY29uc3RyYWludCwgb3RoZXJ3aXNlIGFwcGxpZXMgZmFpbCBmdW5jdGlvbiB0byBmaXJzdCBmYWlsZWQgdmFsdWU6XG4gIGNoZWNrQWxsKGFyciwgc3VjYywgZmFpbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrKGFycltpXSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhaWwoYXJyW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2MoYXJyKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZXJFcnJvcihcIkNhbiBvbmx5IGNoZWNrIGFsbCB2YWx1ZXMgZm9yIGEgZ2l2ZW4gQVJSQVlcIiwgYXJyKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBCT09MRUFOXG4gIC8vIFJldHVybnMgVFJVRSBpZiBrZXkgaXMgc2V0IGZvciB0aGlzIGluc3RhbmNlLCBvdGhlcndpc2UgcmV0dXJucyBGQUxTRTpcbiAgaGFzKGtleSkge1xuICAgIGlmICh0eXBlb2Yoa2V5KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhW2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKGBLZXkgdG8gY2hlY2sgZm9yIGV4aXN0ZW5jZSBtdXN0IGJ5IGEgU1RSSU5HYCwga2V5KTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xPQkpFQ1R8Vk9JRCwgKnxWT0lEfFZPSUQgLT4gdGhpc1xuICAvLyBTZXRzIGdpdmVuIHZhbHVlIG9mIGdpdmVuIGtleSBpZiB2YWx1ZSBtZWV0cyBjb25zdHJhaW50LiBJZiBjb25zdHJhaW50IGlzIEZBTFNFLCBhbiBlcnJvciBpcyB0aHJvd25cbiAgLy8gTk9URTogRm9yIGFyZ3VtZW50IG9mIE9CSkVDVCwgZXJyb3IgaXMgdGhyb3duIGlmIGFueSB2YWx1ZSBmYWlscyB0byBtZWV0IGNvbnN0cmFpbnRcbiAgLy8gTk9URTogVmFsdWVzIGJvdW5kIHRvIGtleSBhcmUgYWx3YXlzIHN0b3JlZCBhcyBhbiBhcnJheTpcbiAgc2V0KGtleSwgdmFsKSB7XG4gICAgLy8gQmluZHMgdmFsdWUgdG8ga2V5IGlmIHZhbHVlIG1lZXRzIGNvbnN0cmFpbnQ6XG4gICAgaWYgKHR5cGVvZihrZXkpID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHRoaXMuY2hlY2sodmFsKSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhW2tleV0ucHVzaCh2YWwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihgVmFsdWUgdG8gc2V0IGtleSBcIiR7a2V5fVwiIG9mIHluZ3dpZU1hcHBpbmcgZmFpbGVkIGNvbnN0cmFpbnRgLCB2YWwpXG4gICAgfVxuICAgIC8vIEJpbmRzIE9CSkVDVCB0byBtYXBwaW5nIGlmIGFsbCB2YWx1ZXMgb2YgT0JKRUNUIG1lZXQgY29uc3RyYWludDpcbiAgICBpZiAodHlwZW9mKGtleSkgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGVja0FsbChPYmplY3QudmFsdWVzKGtleSksICh2YWx1ZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGtleSkucmVkdWNlKChyZXN1bHQsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZihrZXkpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoYENvdWxkIG5vdCBzZXQga2V5IGZyb20gZ2l2ZW4gT0JKRUNUIGJlY2F1c2Ugb2YgZmFpbGVkIGNvbnN0cmFpbnRgLCBrZXkpO1xuICAgICAgICB9LCB0aGlzLl9kYXRhKTtcbiAgICAgIH0sICh2YWwpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKGBDb3VsZCBub3Qgc2V0IHZhbHVlIGZyb20gZ2l2ZW4gT0JKRUNUIGJlY2F1c2Ugb2YgZmFpbGVkIGNvbnN0cmFpbnRgLCB2YWwpO1xuICAgICAgfSlcbiAgICB9XG4gICAgLy8gSWdub3JlcyBVTkRFRklORUQga2V5IGFuZCByZXR1cm5zIGluc3RhbmNlOlxuICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvLyBUaHJvd3MgZXJyb3IgaWYga2V5IGlzIG5vdCBvZiBhbiBhY2NlcHRlZCB0eXBlOlxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHNldCBrZXkgb2YgeW5nd2llTWFwcGluZyB1c2luZyBlaXRoZXIgU1RSSU5HIG9yIE9CSkVDVFwiLCBrZXkpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqIC0+IHRoaXNcbiAgLy8gRW5zdXJlIHRoYXQgb25seSBhIHNpbmdsZSB2YWx1ZSBpcyBib3VuZCB0byB0aGUgZ2l2ZW4ga2V5IGlmIHRoYXQgdmFsdWUgbWVldHMgY29uc3RyYWludDpcbiAgc2V0T25jZShrZXksIHZhbCkge1xuICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICB0aGlzLnJlbW92ZUtleShrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXQoa2V5LCB2YWwpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFsqXVxuICAvLyBSZXR1cm5zIHZhbHVlIG9mIGtleS4gSWYga2V5IGlzIG5vdCBhIFNUUklORyBvciBkb2VzIG5vdCBleGlzdCwgYSB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIGdldChrZXkpIHtcbiAgICBpZiAodHlwZW9mKGtleSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpcy5oYXMoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IGdldCB2YWx1ZSBvZiBhIGtleSB0aGF0IGRvZXMgbm90IGV4aXN0XCIsIGtleSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihgS2V5IHRvIGdldCB2YWx1ZSBvZiBtdXN0IGJlIGEgU1RSSU5HYCwga2V5KTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiB0aGlzXG4gIC8vIFJlbW92ZSBrZXkgZnJvbSBpbnN0YW5jZS4gSWYga2V5IGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhIFNUUklORywgYSB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIC8vIE5PVEU6IEFsbCB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGtleSBhcmUgcmVtb3ZlZFxuICByZW1vdmUoa2V5KSB7XG4gICAgaWYgKHR5cGVvZihrZXkpID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHRoaXMuaGFzKGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgcmVtb3ZlIGtleSB0aGF0IGRvZXMgbm90IGV4aXN0XCIsIGtleSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihgS2V5IHRvIHJlbW92ZSBtdXN0IGJlIGEgU1RSSU5HYCwga2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogKiAtPiBCT09MRUFOfFZPSUQgLT4geW5nd2llTWFwcGluZ1xuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2RcbiAgc3RhdGljIGluaXQoY29uc3RyYWludCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTWFwcGluZyhjb25zdHJhaW50KTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIFRVUkUgaWYgZ2l2ZW4gdmFsdWUgaXMgaW5zdGFuY2Ugb2YgWW5nd2llTWFwcGluZzpcbiAgc3RhdGljIGlzKHZhbCkge1xuICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBZbmd3aWVNYXBwaW5nO1xuICB9XG5cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU1hcHBpbmcgZnJvbSBcIi4vTWFwcGluZy9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQWN0b3IgZnJvbSBcIi4vQWN0b3IvbWFpbi5qc1wiO1xuaW1wb3J0IHtNb2RlbCwgVmlldywgRXJyb3J9IGZyb20gXCJ5bmd3aWUtbXZjXCJcblxuZXhwb3J0IHtcbiAgWW5nd2llQWN0b3IgYXMgQWN0b3IsXG4gIFluZ3dpZU1hcHBpbmcgYXMgTWFwcGluZyxcbiAgVmlldyxcbiAgTW9kZWwsXG4gIEVycm9yXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=