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

  // :: STRING, (... -> *) -> this
  // Ensures only one function is bound to the given signal ID:
  registerOnce(id, fn) {
    this._registry[id] = [fn];
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
    this._elem = yngwieElement || yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init("div");
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
        return  this._fns.reduce((view, fn) => {
          return fn(view);
        }, this._elem);
      // Sets _elem to given yngwieElement:
      case "YngwieElement":
        this._elem = arg;
        return this;
      // Tries to initalize yngwieElement using given arguments:
      default:
        this._elem = yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init.apply(null, arguments);
        return this;
    }
  }

  // :: (yngwieElement -> yngwieElement) -> this
  // Adds function to apply to yngwieElement when view is retrieved or rendered:
  modify(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: (yngwieElement -> yngwieElement) -> this
  // Ensure only the given function will modify the yngwieElement of this view:
  modifyOnce(fn) {
    this._fns = [fn];
    return this;
  }

  // :: STRING, (EVENT, NODE -> VOID) -> this
  // Initializes yngwieListener for yngwieElement stored by view:
  on(id, fn) {
    this._elem.on(id, fn);
    return this;
  }

  // :: STRING -> this
  // Sets text of yngwieElment for this view:
  text(str) {
    this._elem.text(str);
    return this;
  }

  // :: OBJECT|VOID -> this|OBJECT
  // Sets or gets attributes of yngwieElment for this view:
  attribs(arg) {
    let argtype = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].getType(arg).toUpperCase();
    switch (argtype) {
      case "OBJECT":
        this._elem.attribs(arg);
        return this;
      case "UNDEFINED":
        return this._elem.attribs();
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Cannot set or get attributes of yngwieView for type of given arugment", argtype);
    }
  }

  // :: STRING, *|VOID -> this|*
  // Sets or get attribute of yngwieElement:
  attrib(attr, val) {
    let attrType = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].getType(attr).toUpperCase();
    let valType = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__["default"].getType(val).toUpperCase();
    if (attrType === "STRING") {
      if (attrType !== "UNDEFINED") {
        this._elem.setAttribute(attr, val);
        return this;
      }
      return this._elem.getAttribute(attr);
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Name of attribute must be of type STRING", attrType);
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
/* harmony export */   "Transform": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_4__.Transform),
/* harmony export */   "Error": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_4__.Error),
/* harmony export */   "Util": () => (/* reexport safe */ _Util_main_js__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _Model_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/main.js */ "./node_modules/yngwie-mvc/src/Model/main.js");
/* harmony import */ var _View_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/main.js */ "./node_modules/yngwie-mvc/src/View/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller/main.js */ "./node_modules/yngwie-mvc/src/Controller/main.js");
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util/main.js */ "./node_modules/yngwie-mvc/src/Util/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");









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

/***/ "./src/Machine/main.js":
/*!*****************************!*\
  !*** ./src/Machine/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieMachine)
/* harmony export */ });
/* harmony import */ var _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Mapping/main.js */ "./src/Mapping/main.js");
/* harmony import */ var yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yngwie-mvc */ "./node_modules/yngwie-mvc/src/main.js");
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util/main.js */ "./src/Util/main.js");




class YngwieMachine {

  // CONSTRUCTOR :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING|FUNCTION}|VOID
  constructor(model, states, actions) {
    this._model = yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Model.setAsModel(model);
    this._states = states || {};
    this._actions = actions || {};
  }

  // :: OBJECT|VOID -> this|yngwieModel
  // Sets or gets yngwieModel set for this instance:
  model(args) {
    let argtype = yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Util.getType(args).toUpperCase();
    switch (argtype) {
      case "UNDEFINED":
        return this._model;
      case "OBJECT":
        this._model = yngwie_mvc__WEBPACK_IMPORTED_MODULE_1__.Model.setAsModel(args);
        return this;
      default:
        throw new YngwieError("Cannot set model with unsupported type", argtype);
    }
  }

  // :: {STRING:[STRING]}|VOID -> this;
  // Sets "states" for this instance:
  states(states) {
    this._states = states;
    return this;
  }

  // STRING, [STRING] -> this
  // Sets "state" for this instance:
  state(id, actions) {
    this._states[id] = actions;
    return this;
  }

  // STRING, (model:yngwieModel, next:(VOID -> VOID) -> VOID) -> this
  // Sets "action" for this instance:
  // NOTE: Calling "next" will call next action of state this action maybe bound to:
  action(id, fn) {fn
    this._actions[id] = fn;
    return this;
  }

  // :: STRING -> VOID
  // Calls all actions for the given  state ID:
  transistion(stateID) {
    let actions = this._states[stateID];
    _Util_main_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEachCps(0, actions || [], (actionID, next) => {
      this._actions[actionID].call(this, this.model(), next);
    })
  }

  /**
   *
   *  Static Methods
   *
   */

   // :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING|FUNCTION}|VOID -> yngwieMachine
   // Static factory method:
   static init(model, states, actions) {
     return new YngwieMachine(model, states, actions);
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
  // Applies success function to given array of values if all values meet constraint, otherwise applies fail function to first failed value:
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


/***/ }),

/***/ "./src/Util/main.js":
/*!**************************!*\
  !*** ./src/Util/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yngwie-mvc */ "./node_modules/yngwie-mvc/src/main.js");


class Util extends yngwie_mvc__WEBPACK_IMPORTED_MODULE_0__.Util {

  // :: NUMBER, [*], (*, FUNCTION) -> VOID
  // Recursive function for iterating array using CPS:
  static forEachCps(index, arr, onElem) {
    if (index < arr.length) {
      onElem(arr[index], function () {
        Util.forEachCps(index+1, arr, onElem);
      })
    }
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
/* harmony export */   "View": () => (/* reexport safe */ yngwie_mvc__WEBPACK_IMPORTED_MODULE_3__.View),
/* harmony export */   "Model": () => (/* reexport safe */ yngwie_mvc__WEBPACK_IMPORTED_MODULE_3__.Model),
/* harmony export */   "Error": () => (/* reexport safe */ yngwie_mvc__WEBPACK_IMPORTED_MODULE_3__.Error),
/* harmony export */   "Machine": () => (/* reexport safe */ _Machine_main_js__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _Mapping_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mapping/main.js */ "./src/Mapping/main.js");
/* harmony import */ var _Actor_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Actor/main.js */ "./src/Actor/main.js");
/* harmony import */ var _Machine_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Machine/main.js */ "./src/Machine/main.js");
/* harmony import */ var yngwie_mvc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yngwie-mvc */ "./node_modules/yngwie-mvc/src/main.js");








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ0o7QUFDSTtBQUNEOzs7QUFVNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWVVSS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llLW12Yy9zcmMvQ29udHJvbGxlci9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS1tdmMvc3JjL01vZGVsL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llLW12Yy9zcmMvVXRpbC9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS1tdmMvc3JjL1ZpZXcvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUtbXZjL3NyYy9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvRWxlbWVudC9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvRXJyb3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL0xpc3RlbmVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9Ob2RlL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvVHJhbnNmb3JtL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vc3JjL0FjdG9yL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvLi9zcmMvTWFjaGluZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZVVJLy4vc3JjL01hcHBpbmcvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL3NyYy9VdGlsL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1luZ3dpZVVJL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vWW5nd2llVUkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWVVSS8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlluZ3dpZVVJXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlluZ3dpZVVJXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiaW1wb3J0IFluZ3dpZU1vZGVsIGZyb20gXCIuLi9Nb2RlbC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVmlldyBmcm9tIFwiLi4vVmlldy9tYWluLmpzXCI7XG5pbXBvcnQge0Vycm9yIGFzIFluZ3dpZUVycm9yfSBmcm9tIFwieW5nd2llXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUNvbnRyb2xsZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IHtTVFJJTkc6KC4uLiAtPiAqKX0gLT4geW5nd2llQ29udHJvbGxlclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyeSkge1xuICAgIHRoaXMuX3JlZ2lzdHJ5ID0gcmVnaXN0cnkgfHwge307XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIGJvb2xlYW4gZm9yIGlmIGFueSBmdW5jdGlvbnMgYXJlIGJvdW5kIHRvIGdpdmVuIElEOlxuICBpc1JlZ2lzdGVyZWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlbaWRdICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICguLi4gLT4gVk9JRCkgLT4gdGhpcztcbiAgLy8gQmluZHMgZnVuY3Rpb24gdG8gZ2l2ZW4gU1RSSU5HOlxuICAvLyBOT1RFOiBGdW5jdGlvbnMgYm91bmQgdG8gc2lnbmFsIElEIGFyZSBzdG9yZWQgaW4gQVJSQVksIHNvIG11bHRpcGxlIGZ1bmN0aW9ucyBjYW4gYmUgYm91bmQgdG8gdGhlIHNhbWUgSURcbiAgcmVnaXN0ZXIoaWQsIGZuKSB7XG4gICAgaWYgKHRoaXMuaXNSZWdpc3RlcmVkKGlkKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5W2lkXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9yZWdpc3RyeVtpZF0ucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICguLi4gLT4gKikgLT4gdGhpc1xuICAvLyBFbnN1cmVzIG9ubHkgb25lIGZ1bmN0aW9uIGlzIGJvdW5kIHRvIHRoZSBnaXZlbiBzaWduYWwgSUQ6XG4gIHJlZ2lzdGVyT25jZShpZCwgZm4pIHtcbiAgICB0aGlzLl9yZWdpc3RyeVtpZF0gPSBbZm5dO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXM7XG4gIC8vIFJlbW92ZXMgZnVuY3Rpb24gYm91bmQgdG8gZ2l2ZW4gU1RSSU5HOlxuICAvLyBOT1RFOiBJZiBJRCBkb2VzIG5vdCBleGlzdCwgYW4geW5nd2llRXJyb3IgaXMgdGhyb3duOlxuICAvLyBOT1RFOiBVbnJlZ2lzdGVyaW5nIHNpZ25hbCByZW1vdmVzIEFMTCBmdW5jdGlvbnMgYm91bmQgdG8gdGhhdCBzaWduYWwgSUQ6XG4gIHVucmVnaXN0ZXIoaWQpIHtcbiAgICBpZiAodGhpcy5pc1JlZ2lzdGVyZWQoaWQpID09PSB0cnVlKSB7XG4gICAgICBkZWxldGUgdGhpcy5fcmVnaXN0cnlbaWRdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk5vIGZ1bmN0aW9ucyBib3VuZCB0byBnaXZlbiBJRFwiLCBpZCk7XG4gIH1cblxuICAvLyBTVFJJTkcsIC4uLiAtPiB0aGlzO1xuICAvLyBBcHBsaWVzIHZhbHVlcyB0byBmdW5jdGlvbiBib3VuZCB0byBzaWduYWwgSURcbiAgLy8gTk9URTogSWYgSUQgZG9lcyBub3QgZXhpc3QsIGEgeW5nd2llRXJyb3IgaXMgdGhyb3duOlxuICBzaWduYWwoKSB7XG4gICAgbGV0IGlkID0gYXJndW1lbnRzWzBdO1xuICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgIGlmICh0aGlzLmlzUmVnaXN0ZXJlZChpZCkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5W2lkXS5mb3JFYWNoKGZuPT57XG4gICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IGRpc3BhdGNoIHZhbHVlIHRvIGFuIElEIHRoYXQgZG9lc24ndCBleGlzdFwiLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IHtTVFJJTkc6WyotPlZPSURdfSAtPiB5bmd3aWVDb250cm9sbGVyXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQocmVnaXN0cnkpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUNvbnRyb2xsZXIocmVnaXN0cnkpO1xuICB9XG5cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsL21haW4uanNcIjtcbmltcG9ydCB7RXJyb3IgYXMgWW5nd2llRXJyb3J9IGZyb20gXCJ5bmd3aWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTW9kZWwge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IE9CSkVDVCAtPiB5bmd3aWVNb2RlbFxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5fc3RhdGUgPSBkYXRhO1xuICB9XG5cbiAgLy8gOjogVk9JRHxTVFJJTkcgLT4gT0JKRUNUXG4gIC8vIFJldHVybnMgZGF0YSBvZiBtb2RlbCB3aXRoIGFwcGxpZWQgc2NvcGUsIG90aGVyd2lzZSByZXR1cm5zIGFsbCBkYXRhIHN0b3JlZCBpbiBtb2RlbDpcbiAgc3RhdGUoc2NvcGUpIHtcbiAgICByZXR1cm4gc2NvcGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX3N0YXRlIDogWW5nd2llTW9kZWwucmVzb2x2ZVNjb3BlKHNjb3BlLCB0aGlzLl9zdGF0ZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8T0JKRUNUIC0+ICosIE9CSkVDVCwgT0JKRUNUIC0+ICp8Vk9JRCAtPiB0aGlzO1xuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIHN0YXRlIGFuZCBvcHRpb25hbCBzY29wZSwgcmVwbGFjaW5nIHN0YXRlIHdpdGggdGhlIHJlc3VsdCBvZiB0aGF0IGZ1bmN0aW9uOlxuICB1cGRhdGUoYSwgYikge1xuICAgIGxldCB0eXBlQXJnID0gVXRpbC5nZXRUeXBlKGEpO1xuICAgIHN3aXRjaCAodHlwZUFyZykge1xuICAgICAgY2FzZSBcIkZ1bmN0aW9uXCI6XG4gICAgICAgIHRoaXMuX3N0YXRlID0gYSh0aGlzLl9zdGF0ZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgdGhpcy5fc3RhdGVbYV0gPSBiKHRoaXMuX3N0YXRlLCB0aGlzLnN0YXRlKGEpKTtcbiAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQXJndW1lbnQgcGFzc2VkIHRvIHluZ3dpZU1vZGVsLnVwZGF0ZSBpcyBvZiBhbiB1bnN1cHBvcnRlZCB0eXBlXCIsIHR5cGVBcmcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3woeW5nd2llTW9kZWwgLT4gVk9JRCksICh5bmd3aWVNb2RlbCAtPiBWT0lEKXxWT0lEIC0+IFZPSURcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byBldmVyeSBlbGVtZW50IG9mIHNjb3BlLCBpZiBvbmx5IGZ1bmN0aW9uIGlzIGdpdmVuIHRoZW4gaXQncyBhcHBsaWVkIHRvIGV2ZXJ5IGVsZW1lbnQgb2Ygc3RhdGU6XG4gIGVhY2goYSwgYikge1xuICAgIGxldCB0eXBlQXJnID0gVXRpbC5nZXRUeXBlKGEpO1xuICAgIHN3aXRjaCAodHlwZUFyZykge1xuICAgICAgY2FzZSBcIkZ1bmN0aW9uXCI6XG4gICAgICAgIHRoaXMuX3N0YXRlLmZvckVhY2goZWxlbT0+e1xuICAgICAgICAgIGEoWW5nd2llTW9kZWwuaW5pdChlbGVtKSk7XG4gICAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUoYSk7XG4gICAgICAgIGlmIChzdGF0ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgc3RhdGUuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgICBiKFluZ3dpZU1vZGVsLmluaXQoZWxlbSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlNjb3BlIGlzIG5vdCBhbiBhcnJheVwiLCB0eXBlQXJnKTtcbiAgICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgdG8gWW5nd2llTW9kZWwuZm9yRWFjaCBpcyBvZiBhbiB1bnN1cHBvcnRlZCB0eXBlXCIsIHR5cGVBcmcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKnxWT0lEIC0+IHRoaXN8KlxuICAvLyBTZXRzIG9yIGdldHMgcHJvcGVydHkgZnJvbSBtb2RlbDpcbiAgcHJvcChpZCwgdmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5fc3RhdGVbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlW2lkXTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk5vIHByb3BlcnR5IGZvdW5kIGZvciBnaXZlbiBJRFwiLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0YXRlW2lkXSA9IHZhbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IE9CSkVDVCAtPiB5bmd3aWVNb2RlbFxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZU1vZGVsKGRhdGEpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBPQkpFQ1QgLT4gT0JKRUNUfFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIG9iamVjdCBmb3IgdGhlIGdpdmVuIHNjb3BlIC0gaWYgc2NvcGUgY2FuJ3QgcmUgcmVzb2x2ZWQgdGhlbiBVTkRFRklORUQgaXMgcmV0dXJuZWQ6XG4gIHN0YXRpYyByZXNvbHZlU2NvcGUoc2NvcGUsIG9iaikge1xuICAgIGlmIChzY29wZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgc2NvcGVzID0gc2NvcGUuc3BsaXQoXCIuXCIpO1xuICAgICAgbGV0IHJlc3VsdCA9IG9iajtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBjdXJyZW50U2NvcGUgPSBzY29wZXNbaV07XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFtjdXJyZW50U2NvcGVdO1xuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIC8vIDo6IE9CSkVDVHx5bmd3aWVNb2RlbCAtPiB5bmd3aWVNb2RlbFxuICAvLyBSZXR1cm5zIHZhbHVlIGFzIHluZ3dpZU1vZGVsOlxuICBzdGF0aWMgc2V0QXNNb2RlbChtb2RlbCkge1xuICAgIHJldHVybiBtb2RlbCBpbnN0YW5jZW9mIFluZ3dpZU1vZGVsXG4gICAgICA/IG1vZGVsXG4gICAgICA6IFluZ3dpZU1vZGVsLmluaXQobW9kZWwpO1xuICB9XG5cbn1cbiIsIi8vIFNpbmdsZXRvbiBvZiB1dGlsaXR5IG1ldGhvZHM6XG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLy8gOjogKiAtPiBTVFJJTkdcbiAgLy8gUmV0dXJucyB0eXBlIG9mIGdpdmVuIHZhbHVlIGFzIFNUUklORzpcbiAgc3RhdGljIGdldFR5cGUodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gXCJudWxsXCI7XG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG4gIFxufVxuIiwiaW1wb3J0IHtFbGVtZW50IGFzIFluZ3dpZUVsZW1lbnQsIEVycm9yIGFzIFluZ3dpZUVycm9yfSBmcm9tIFwieW5nd2llXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vVXRpbC9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVZpZXcge1xuXG4gIC8vIDo6IENPTlNUUlVDVE9SIDo6IHluZ3dpZUVsZW1lbnR8Vk9JRCAtPiB5bmd3aWVWaWV3XG4gIGNvbnN0cnVjdG9yKHluZ3dpZUVsZW1lbnQpIHtcbiAgICB0aGlzLl9lbGVtID0geW5nd2llRWxlbWVudCB8fCBZbmd3aWVFbGVtZW50LmluaXQoXCJkaXZcIik7XG4gICAgdGhpcy5fZm5zID0gW107XG4gICAgdGhpcy5fbm9kZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICB9XG5cbiAgLy8gOjogVk9JRHx5bmd3aWVFbGVtZW50fFNUUklORywgU1RSSU5HLCBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVFbGVtZW50fHRoaXN8dGhpc1xuICAvLyBTZXR0ZXIvZ2V0dGVyIG1ldGhvZCBmb3IgeW5nd2llRWxlbWVudCBzdG9yZWQgYnkgdmlldzpcbiAgLy8gTk9URTogR2V0dGluZyB0aGUgeW5naXdlRWxlbWVudCBzdG9yZWQgYnkgdmlldyB3aWxsIGFwcGx5IGV2ZXJ5IHN0b3JlZCBtb2RpZmVyIGZ1bmN0aW9uIHRvIHRoYXQgeW5nd2llRWxlbWVudFxuICBlbGVtKGFyZykge1xuICAgIHN3aXRjaCAoVXRpbC5nZXRUeXBlKGFyZykpIHtcbiAgICAgIC8vIEFwcGxpZXMgdmlldyB0byBldmVyeSBtb2RpZmllciBmdW5jdGlvbiwgaWYgdGhlcmUgYXJlIG5vIG1vZGlmZXIgZnVuY3Rpb25zIGVsZW0gaXMgcmV0dXJuZWQ6XG4gICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIHJldHVybiAgdGhpcy5fZm5zLnJlZHVjZSgodmlldywgZm4pID0+IHtcbiAgICAgICAgICByZXR1cm4gZm4odmlldyk7XG4gICAgICAgIH0sIHRoaXMuX2VsZW0pO1xuICAgICAgLy8gU2V0cyBfZWxlbSB0byBnaXZlbiB5bmd3aWVFbGVtZW50OlxuICAgICAgY2FzZSBcIlluZ3dpZUVsZW1lbnRcIjpcbiAgICAgICAgdGhpcy5fZWxlbSA9IGFyZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAvLyBUcmllcyB0byBpbml0YWxpemUgeW5nd2llRWxlbWVudCB1c2luZyBnaXZlbiBhcmd1bWVudHM6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9lbGVtID0gWW5nd2llRWxlbWVudC5pbml0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6ICh5bmd3aWVFbGVtZW50IC0+IHluZ3dpZUVsZW1lbnQpIC0+IHRoaXNcbiAgLy8gQWRkcyBmdW5jdGlvbiB0byBhcHBseSB0byB5bmd3aWVFbGVtZW50IHdoZW4gdmlldyBpcyByZXRyaWV2ZWQgb3IgcmVuZGVyZWQ6XG4gIG1vZGlmeShmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6ICh5bmd3aWVFbGVtZW50IC0+IHluZ3dpZUVsZW1lbnQpIC0+IHRoaXNcbiAgLy8gRW5zdXJlIG9ubHkgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpbGwgbW9kaWZ5IHRoZSB5bmd3aWVFbGVtZW50IG9mIHRoaXMgdmlldzpcbiAgbW9kaWZ5T25jZShmbikge1xuICAgIHRoaXMuX2ZucyA9IFtmbl07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIChFVkVOVCwgTk9ERSAtPiBWT0lEKSAtPiB0aGlzXG4gIC8vIEluaXRpYWxpemVzIHluZ3dpZUxpc3RlbmVyIGZvciB5bmd3aWVFbGVtZW50IHN0b3JlZCBieSB2aWV3OlxuICBvbihpZCwgZm4pIHtcbiAgICB0aGlzLl9lbGVtLm9uKGlkLCBmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBTZXRzIHRleHQgb2YgeW5nd2llRWxtZW50IGZvciB0aGlzIHZpZXc6XG4gIHRleHQoc3RyKSB7XG4gICAgdGhpcy5fZWxlbS50ZXh0KHN0cik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBPQkpFQ1R8Vk9JRCAtPiB0aGlzfE9CSkVDVFxuICAvLyBTZXRzIG9yIGdldHMgYXR0cmlidXRlcyBvZiB5bmd3aWVFbG1lbnQgZm9yIHRoaXMgdmlldzpcbiAgYXR0cmlicyhhcmcpIHtcbiAgICBsZXQgYXJndHlwZSA9IFV0aWwuZ2V0VHlwZShhcmcpLnRvVXBwZXJDYXNlKCk7XG4gICAgc3dpdGNoIChhcmd0eXBlKSB7XG4gICAgICBjYXNlIFwiT0JKRUNUXCI6XG4gICAgICAgIHRoaXMuX2VsZW0uYXR0cmlicyhhcmcpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIGNhc2UgXCJVTkRFRklORURcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW0uYXR0cmlicygpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHNldCBvciBnZXQgYXR0cmlidXRlcyBvZiB5bmd3aWVWaWV3IGZvciB0eXBlIG9mIGdpdmVuIGFydWdtZW50XCIsIGFyZ3R5cGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKnxWT0lEIC0+IHRoaXN8KlxuICAvLyBTZXRzIG9yIGdldCBhdHRyaWJ1dGUgb2YgeW5nd2llRWxlbWVudDpcbiAgYXR0cmliKGF0dHIsIHZhbCkge1xuICAgIGxldCBhdHRyVHlwZSA9IFV0aWwuZ2V0VHlwZShhdHRyKS50b1VwcGVyQ2FzZSgpO1xuICAgIGxldCB2YWxUeXBlID0gVXRpbC5nZXRUeXBlKHZhbCkudG9VcHBlckNhc2UoKTtcbiAgICBpZiAoYXR0clR5cGUgPT09IFwiU1RSSU5HXCIpIHtcbiAgICAgIGlmIChhdHRyVHlwZSAhPT0gXCJVTkRFRklORURcIikge1xuICAgICAgICB0aGlzLl9lbGVtLnNldEF0dHJpYnV0ZShhdHRyLCB2YWwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9lbGVtLmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTmFtZSBvZiBhdHRyaWJ1dGUgbXVzdCBiZSBvZiB0eXBlIFNUUklOR1wiLCBhdHRyVHlwZSk7XG4gIH1cblxuICAvLyA6OiB5bmd3aWVWaWV3IC0+IHRoaXM7XG4gIC8vIEFwcGVuZHMgYW5vdGhlciB5bmd3aWVWaWV3IHRvIHRoaXMgdmlldzpcbiAgYXBwZW5kKHluZ3dpZVZpZXcpIHtcbiAgICBpZiAoWW5nd2llVmlldy5pcyh5bmd3aWVWaWV3KSkge1xuICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaCh5bmd3aWVWaWV3KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IGEgeW5nd2llVmlldyBjYW4gYmUgYXBwZW5kZWQgdG8gYW5vdGhlciB5bmd3aWVWaWV3XCIsIHluZ3dpZVZpZXcpO1xuICB9XG5cbiAgLy8gOjogW3luZ3dpZVZpZXddIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBhcnJheSBvZiB5bmd3aWVWaWV3cyB0byB0aGlzIHZpZXc6XG4gIGFwcGVuZHMoeW5nd2llVmlld3MpIHtcbiAgICBpZiAoeW5nd2llVmlld3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIHluZ3dpZVZpZXdzLnJlZHVjZSgocmVzdWx0LCB2aWV3KSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQuYXBwZW5kKHZpZXcpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIEFSUkFZIHRvIGFwcGVuZCB5bmd3aWVWaWV3cyB0byB0aGlzIHluZ3dpZVZpZXdcIiwgeW5nd2llVmlld3MpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlR8Vk9JRCwgT0JKRUNUfFZPSUQgLT4gRUxFTUVOVFxuICAvLyBDcmVhdGVzIGFuZCByZXR1cm5zIHJlbmRlcmVkIEVMRU1FTlQgZnJvbSB2aWV3LCBzdG9yaW5nIHJlc3VsdCBvZiByZW5kZXI6XG4gIHJlbmRlcih0YXJnZXQsIGNvbnRleHQpIHtcbiAgICAvLyBTdG9yZSByZXN1bHQgb2YgcmVuZGVyOlxuICAgIHRoaXMuX25vZGUgPSBZbmd3aWVWaWV3LnJlbmRlcih0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuICAgIC8vIFJldHVybiByZW5kZXI6XG4gICAgcmV0dXJuIHRoaXMuX25vZGU7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IEVMRU1FTlRcbiAgLy8gUmUtcmVuZGVycyB2aWV3IHVzaW5nIHN0b3JlZCBub2RlOlxuICAvLyBOT1RFOiBJZiBubyBub2RlIGhhcyBiZWVuIHN0b3JlZCwgdGhlbiBhIHluZ3dpZUVycm9yIGlzIHRocm93bjpcbiAgcmVuZGVyQWdhaW4oKSB7XG4gICAgaWYgKHRoaXMuX25vZGUpIHtcbiAgICAgIGxldCByZXN1bHQgPSBZbmd3aWVWaWV3LnJlbmRlcih0aGlzKTtcbiAgICAgIHRoaXMuX25vZGUucmVwbGFjZVdpdGgocmVzdWx0KTtcbiAgICAgIHRoaXMuX25vZGUgPSByZXN1bHQ7XG4gICAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm9udCByZS1yZW5kZXIgdmlldyBiZWNhdXNlIGl0IGhhc24ndCBiZWVuIHJlbmRlcmVkIHlldC5cIik7XG4gIH1cblxuICAvLyBTVFJJTkd8Tk9ERSwgT0JKRUNUfFZPSUQgLT4gRUxFTUVOVFxuICAvLyBFbXB0aWVzIGNvbnRlbnQgb2YgZ2l2ZW4gdGFyZ2V0IGFuZCBhcHBlbmRzIGl0IHdpdGggcmVuZGVyZWQgbm9kZTpcbiAgaW5qZWN0KHRhcmdldCwgY29udGV4dCkge1xuICAgIGxldCByZW5kZXIgPSB0aGlzLnJlbmRlcigpO1xuICAgIGxldCBlbGVtID0gWW5nd2llVmlldy5zZXRBc05vZGUodGFyZ2V0LCBjb250ZXh0KTtcbiAgICBlbGVtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZWxlbS5hcHBlbmQocmVuZGVyKTtcbiAgICByZXR1cm4gZWxlbTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogeW5nd2llRWxlbWVudHxTVFJJTkcsIFNUUklORywgT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVMaXN0ZW5lcl0gLT4geW5nd2llVmlld1xuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KHluZ3dpZUVsZW1lbnQpIHtcbiAgICBzd2l0Y2ggKFV0aWwuZ2V0VHlwZSh5bmd3aWVFbGVtZW50KSkge1xuICAgICAgY2FzZSBcIlluZ3dpZUVsZW1lbnRcIjpcbiAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgcmV0dXJuIG5ldyBZbmd3aWVWaWV3KHluZ3dpZUVsZW1lbnQpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IGVsZW0gPSBZbmd3aWVFbGVtZW50LmluaXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBZbmd3aWVWaWV3KGVsZW0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6ICogLT4gQk9PTEVBTlxuICAvLyBSZXR1cm4gVFJVRSBpZiBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBZbmd3aWVWaWV3XG4gIHN0YXRpYyBpcyh2YWwpIHtcbiAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgWW5nd2llVmlldztcbiAgfVxuXG4gIC8vIFNUUklOR3xFTEVNRU5UfFZPSUQsIERPQ1VNRU5UfFZPSUQgLT4gRUxFTUVOVHxET0NVTUVOVEZSQUdNRU5UXG4gIC8vIFJldHVybnMgTk9ERSBmb3IgZ2l2ZW4gdGFyZ2V0IGFuZCBjb250ZXh0XG4gIHN0YXRpYyBzZXRBc05vZGUodGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IGFyZ1R5cGUgPSBVdGlsLmdldFR5cGUodGFyZ2V0KTtcbiAgICBzd2l0Y2ggKGFyZ1R5cGUpIHtcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgcmV0dXJuIGNvbnRleHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgICAgOiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgICAgIGNhc2UgXCJFbGVtZW50XCI6XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgIHJldHVybiBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQXJndW1lbnQgY2Fubm90IGJlIGEgTk9ERVwiLCBhcmdUeXBlKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiB5bnZpZXdWaWV3LCBTVFJJTkd8RUxFTUVOVHxWT0lELCBET0NVTUVOVHxWT0lEIC0+IEVMRU1FTlRcbiAgLy8gUmVuZGVycyBnaXZlbiB2aWV3IGFuZCBhbGwgb2YgaXQgY2hpbGRyZW4gdXNpbmcgZ2l2ZW4gdGFyZ2V0IGFuZCBjb250ZXh0OlxuICBzdGF0aWMgcmVuZGVyKHZpZXcsIHRhcmdldCwgY29udGV4dCkge1xuICAgIGxldCBlbGVtID0gdmlldy5lbGVtKCk7XG4gICAgbGV0IG5vZGUgPSBZbmd3aWVWaWV3LnNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpO1xuICAgIGxldCByZXN1bHQgPSB2aWV3Ll9jaGlsZHJlbi5yZWR1Y2UoKGVsZW0sIGNoaWxkKSA9PiB7XG4gICAgICBsZXQgdmlldyA9IGNoaWxkLnJlbmRlcigpO1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZCh2aWV3KTtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sIGVsZW0gPT09IHVuZGVmaW5lZCA/IG5vZGUgOiBlbGVtLnJlbmRlcihub2RlKSk7XG4gICAgcmV0dXJuIHJlc3VsdCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnRcbiAgICAgID8gcmVzdWx0LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICA6IHJlc3VsdDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llTW9kZWwgZnJvbSBcIi4vTW9kZWwvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVZpZXcgZnJvbSBcIi4vVmlldy9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQ29udHJvbGxlciBmcm9tIFwiLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuL1V0aWwvbWFpbi5qc1wiO1xuaW1wb3J0IHtUcmFuc2Zvcm0sIEVycm9yfSBmcm9tIFwieW5nd2llXCI7XG5cbmV4cG9ydCB7XG4gIFluZ3dpZU1vZGVsIGFzIE1vZGVsLFxuICBZbmd3aWVWaWV3IGFzIFZpZXcsXG4gIFluZ3dpZUNvbnRyb2xsZXIgYXMgQ29udHJvbGxlcixcbiAgVHJhbnNmb3JtLFxuICBFcnJvcixcbiAgVXRpbFxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUxpc3RlbmVyIGZyb20gXCIuLi9MaXN0ZW5lci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRWxlbWVudCBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVMaXN0ZW5lcl0gLT4geW5nd2llRWxlbWVudFxuICBjb25zdHJ1Y3Rvcih0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpIHtcbiAgICBzdXBlcih0YWdOYW1lLnRvVXBwZXJDYXNlKCkpOyAgICAgLy8gU3RvcmVzIHRhZ05hbWUgaW4gQUxMIENBUFNcbiAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicyB8fCB7fTsgICAgIC8vIEVsZW1lbnQgQXR0cmlidXRlc1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0OyAgICAgICAgICAgICAgICAgLy8gRWxlbWVudCB0ZXh0IHRoYXQncyBhcHBlbmRlZCBhcyBmaXJzdCBjaGlsZCBvZiB0aGlzIGVsZW1lbnRcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTsgICAgICAgICAgICAvLyBMaXN0ZW5lcnMgYm91bmQgdG8gdGhpcyBlbGVtZW50XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHRhZ05hbWUgb2YgdGhpcyBlbGVtZW50OlxuICB0YWdOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIDo6IE9CSkVDVHxWT0lEIC0+IHRoaXN8T0JKRUNUXG4gIC8vIFNldHMgXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gT0JKRUNUOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IGF0dHJpYnV0ZXMgYXJlIHJldHVybmVkOlxuICBhdHRyaWJzKGF0dHJpYnMpIHtcbiAgICBpZiAoYXR0cmlicyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXR0cmlicztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZihhdHRyaWJzKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJZbmd3aWVFbGVtZW50IGF0dHJpYnV0ZXMgY2FuIG9ubHkgYmUgc2V0IHdpdGggT0JKRUNUXCIsIGF0dHJpYnMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBCT09MRUFOXG4gIC8vIFJldHVybnMgQk9PTEVBTiBmb3IgaWYgYXR0cmlidXRlIHdpdGggZ2l2ZW4gbmFtZSBleGlzdHMgaW4gXCJhdHRyaWJzXCIgT0JKRUNUOlxuICBoYXNBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+ICp8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgdmFsdWUgb2YgYXR0cmlidXRlIGJ5IG5hbWUgc3RvcmVkIGluIFwiYXR0cmlic1wiIE9CSkVDVCwgb3RoZXJ3aXNlIHJldHVybnMgVU5ERUZJTkVEXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICogLT4gdGhpc1xuICAvLyBCaW5kcyAgdmFsdWUgdG8gXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gbmFtZTpcbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXR0cmlic1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gUmVtb3ZlIGF0dHJpYnV0ZSB3aXRoIGdpdmVuIG5hbWUgZnJvbSBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8Vk9JRCAtPiB0aGlzfFVOREVGSU5FRFxuICAvLyBBcHBlbmRzIHRleHQgbm9kZSBhcyBmaXJzdCBjaGlsZCBvZiBlbGVtZW50IGF0IHJlbmRlciB3aXRoIGdpdmVuIHN0cmluZyBhcyBpdCdzIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IHRleHQgaXMgcmV0dXJuZWQ6XG4gIHRleHQoc3RyKSB7XG4gICAgaWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZihzdHIpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuX3RleHQgPSBzdHI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiVGV4dCBvZiBlbGVtZW50IGNhbiBvbmx5IGJlIHNldCB3aXRoIGEgU1RSSU5HXCIsIHN0cik7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIFNldHMgdGV4dCBhcyBVTkRFRklORUQgZm9yIHRoaXMgZWxlbWVudDpcbiAgcmVtb3ZlVGV4dCgpIHtcbiAgICB0aGlzLl90ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4gQk9PTEVBTikgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIHRoZSBlbGVtZW50cyB0aGF0LCB3aGVuIHRoZSBnaXZlbiBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRoaXMgZWxlbWVudHMgYW5kIGl0J3MgZGVzZW5kYW50cywgdGhhdCBmdW5jdGlvbiByZXR1cm5zIFRSVUU6XG4gIGdldEVsZW1lbnRzQnkoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZSgobm9kZSwgcmVzdWx0KSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGZuKG5vZGUpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIFluZ3dpZUVsZW1udHMgdGhhdCBoYXZlIHRoZSBnaXZlbiB0YWdOYW1lOlxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnkoZWxlbSA9PiBlbGVtLnRhZ05hbWUoKSA9PT0gdGFnTmFtZSk7XG4gIH1cblxuICAvLyBTVFJJTkcsIFNUUklOR3xWT0lEIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyB2YWx1ZSBpcyBnaXZlbiwgdGhlbiBhbnkgZWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIG5hbWUgaXMgcmV0dXJuZWRcbiAgZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnkoZWxlbSA9PiB7XG4gICAgICBpZiAoZWxlbS5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3MgbmFtZVxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBjbGFzcyBuYW1lOlxuICBnZXRFbGVtZW50c0J5Q2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIFluZ3dpZUVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIElEOlxuICAvLyBOT1RFOiBSZXR1cm5zIFVOREVGSU5FRCBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgZ2V0RWxlbWVudEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiaWRcIiwgaWQpLnBvcCgpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5ULCBFTEVNRU5UKSAtPiBWT0lEXXwoRVZFTlQsIEVMRU1FTlQpIC0+IFZPSUQgLT4gIHRoaXNcbiAgLy8gQmluZHMgbGlzdGVuZXIgYnkgZXZlbnQgbmFtZSB0byBub2RlIGF0IHJlbmRlcjpcbiAgLy8gTk9URTogRnVuY3Rpb24gYm91bmQgdG8gbGlzdGVuZXIgaXMgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIHRoaXMgZWxlbWVudFxuICBvbihldnROYW1lLCBmbnMpIHtcbiAgICBsZXQgbGlzdGVuZXIgPSBZbmd3aWVMaXN0ZW5lci5pbml0KGV2dE5hbWUsIGZucyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVk9JRCAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFJldHVybnMgY2xvbmUgb2YgdGhpcyB5bmd3aWVFbGVtZW50OlxuICBjbG9uZSgpIHtcblxuICAgIC8vIENvcHkgdGFnbmFtZTpcbiAgICBsZXQgdGFnTmFtZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG5cbiAgICAvLyBDb3B5IGF0dHJpYnV0ZXM6XG4gICAgbGV0IGF0dHJpYnMgPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKHJlc3VsdCwgaWQpID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSBgJHt0aGlzLl9hdHRyaWJzW2lkXX1gO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBDb3B5IHNldDpcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgJHt0aGlzLl90ZXh0fWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gQ29weSBsaXN0ZW5lcnM6XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5tYXAoKGxpc3RlbmVyKSA9PiB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuY2xvbmUoKTtcbiAgICB9KTtcblxuICAgIC8vIENvcHkgY2hpbGRyZW4gYW5kIHJldHVybiBlbGVtZW50OlxuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiBlbGVtLmFwcGVuZChjaGlsZCk7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBUcmFuc2Zvcm1zIHRoaXMgZWxlbWVudCBhbmQgaXQncyBkZXNlbmRhbnRzIGludG8gYSBET00gRUxFTUVOVCwgYXBwZW5kaW5nIHJlc3VsdCB0byBnaXZlbiB0YXJnZXRcbiAgLy8gYW5kIHJlbmRlcmluZyB0aGF0IEVMRU1FTlQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGdpdmVuIE9CSkVDVC4gSWYgbm8gdGFyZ2V0IHRvIGFwcGVuZCBpcyBnaXZlbixcbiAgLy8gdGhlIHJlbmRlcmVkIEVMRU1FTlQgaXMgcmV0dXJuZWQuIElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIHRoZW4gRE9DVU1FTlQgaXMgdXNlZCBieSBkZWZhdWx0LlxuICByZW5kZXIodGFyZ2V0LCBjdHgpIHtcblxuICAgIC8vIENoZWNrIGlmIGRlZmF1bHQgY29udGV4dCBvZiBET0NVTUVOVCBzaG91bGQgYmUgdXNlZDpcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQodGhpcy5fdmFsdWUpKTtcblxuICAgIC8vIEJpbmQgTGlzdGVuZXJzOlxuICAgIGVsZW0gPSB0aGlzLl9saXN0ZW5lcnMucmVkdWNlKChlbGVtLCBsaXN0ZW5lcikgPT4ge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLnJlbmRlcihlbGVtLCB0aGlzKTtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHNldCwgY3JlYXRlIGFuZCBhcHBlbmQgdGV4dCBub2RlOlxuICAgIGlmICh0eXBlb2YodGhpcy5fdGV4dCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBlbGVtVGV4dCA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdGV4dCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGVsZW1UZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgYW5kIGFwcGVuZCBhbGwgY2hpbGRyZW4gYW5kIHJldHVybiByZXN1bHQ6XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHRhcmdldCBpcyBnaXZlbiwgYXBwZW5kcyByZXN1bHQgb2YgcmVuZGVyIHRvIHRoYXQgdGFyZ2V0OlxuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gSWYgdGFyZ2V0IGlzIHN0cmluZywgZmluZCBub2RlIHVzaW5nIHF1ZXJ5IHNlbGVjdG9yOlxuICAgICAgaWYgKHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcmlzZSBhc3N1bWUgdGhhdCB0YXJnZXQgaXMgRE9NRWxlbWVudDpcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llTGlzdGVuZXJdIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKVxuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlQsIFt5bmd3aWVFbGVtZW50XSwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gUmVuZGVycyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyBpbiB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXBwZW5kcyByZXN1bHQgdG8gZ2l2ZW4gdGFyZ2V0OlxuICAvLyBOT1RFOiBFTEVNRU5UIG9mIHRhcmdldCBpcyByZXR1cm5lZFxuICBzdGF0aWMgcmVuZGVyVG8odGFyZ2V0LCBlbGVtcywgY3R4KSB7XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgIGlmIChlbGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICByZXR1cm4gZWxlbXMucmVkdWNlKChyZXN1bHQsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgICAgZWxlbS5yZW5kZXIocmVzdWx0KTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgcmVuZGVyZWQgdG8gdGFyZ2V0XCIsIGVsZW0pO1xuICAgICAgfSwgbm9kZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VtZW50XCIsIGVsZW1zKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCB5bmd3aWVFbGVtZW50LCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBSZXBsYWNlcyB0aGUgZ2l2ZW4gdGFyZ2V0IHdpdGggdGhlIHJlbmRlciBvZiB0aGUgZ2l2ZW4gaW5zdGFuY2UgIG9mIFluZ3dpZUVsZW1lbnQgaW4gdGhlIGdpdmVuIGNvbnRleHQ6XG4gIHN0YXRpYyBpbmplY3QodGFyZ2V0LCBlbGVtLCBjdHgpIHtcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgIGxldCBjb250ZXh0ID0gY3R4ID09PSB1bmRlZmluZWQgPyBkb2N1bWVudCA6IGN0eDtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIGxldCByZXN1bHQgPSBlbGVtLnJlbmRlcigpO1xuICAgICAgbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgaW5qZWN0ZWQgaW50byB0YXJnZXRcIiwgZWxlbSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLCAqIC0+IEVSUk9SXG4gIC8vIE5PVEUgOjogXCJkYXRhXCIgYXJndW1lbnQgaXMgYWx3YXlzIGNhc3QgYXMgU1RSSU5HOlxuICBjb25zdHJ1Y3Rvcihtc2csIGRhdGEpIHtcbiAgICBzdXBlcihtc2cpO1xuICAgIHRoaXMuZGF0YSA9IGAke2RhdGF9YDtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gIFZPSURcbiAgLy8gQ29uc29sZXMgb3V0IHN0YWNrIHRyYWNlIG9mIGVycm9yLCBhbG9uZyB3aXRoIHRoZSBkYXRhIHRoYXQgY2F1c2VkIHRoZSBleGNlcHRpb24gdG8gYmUgdGhyb3duOlxuICBsb2coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGFjayk7XG4gICAgY29uc29sZS5sb2coXCJXaGF0IEZhaWxlZDogXCIsIHRoaXMuZGF0YSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTGlzdGVuZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgWyhFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKV0gLT4geW5nd2llTGlzdGVuZXJcbiAgY29uc3RydWN0b3IoZXZ0TmFtZSwgZm5zKSB7XG4gICAgdGhpcy5fZXZ0TmFtZSA9IGV2dE5hbWU7XG4gICAgdGhpcy5fZm5zID0gZm5zIHx8IFtdO1xuICB9XG5cbiAgLy8gOjogKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpIC0+IHRoaXM7XG4gIC8vIEFkZHMgZnVuY3Rpb24gdG8gbGlzdGVuZXI6XG4gIGFkZChmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTGlzdGVuZXJcbiAgLy8gQ3JlYXRlcyBjbG9uZSBvZiB0aGlzIHluZ3dpZUxpc3RlbmVyOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgZXZ0TmFtZSA9IGAke3RoaXMuX2V2dE5hbWV9YDtcbiAgICBsZXQgZm5zID0gdGhpcy5fZm5zLm1hcChmbj0+e1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImV2dFwiLCBcImVsZW1cIiwgZm4udG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVMaXN0ZW5lcihldnROYW1lLCBmbnMpO1xuICB9XG5cbiAgLy8gOjogRUxFTUVOVCwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gQ3JlYXRlcyBldmVudCBsaXN0ZW5lciBhbmQgYmluZHMgaXQgdG8gZ2l2ZW4gRE9NIEVMRU1FTlQsIGFuZCBjYWxscyBmdW5jdGlvbiBvZiBsaXN0ZW5lciB0byBnaXZlbiBjb250ZXh0XG4gIC8vIE5PVEU6IElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiB0aGUgRUxFTUVOVCB0aGUgbGlzdGVuZXIgaXMgYm91bmQgdG9cbiAgcmVuZGVyKGVsZW0sIGN0eCkge1xuICAgIHJldHVybiB0aGlzLl9mbnMucmVkdWNlKChlbGVtLCBmbikgPT4ge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2V2dE5hbWUsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZm4uY2FsbChjdHggPT09IHVuZGVmaW5lZCA/IGVsZW0gOiBjdHgsIGV2dCwgZWxlbSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sIGVsZW0pO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpXXwoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCkgLT4geW5nd2llTGlzdGVuZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChldnROYW1lLCBmbnMpIHtcbiAgICByZXR1cm4gZm5zICE9PSB1bmRlZmluZWRcbiAgICAgID8gbmV3IFluZ3dpZUxpc3RlbmVyKGV2dE5hbWUsIEFycmF5LmlzQXJyYXkoZm5zKSA9PT0gdHJ1ZSA/IGZucyA6IFtmbnNdKVxuICAgICAgOiBuZXcgWW5nd2llTGlzdGVuZXIoZXZ0TmFtZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZih2YWx1ZSkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7ICAgICAgIC8vIEFyYml0cmFyeSBTVFJJTkcgdmFsdWUgdGhhdCBjYW4gYmUgc3RvcmVkIGJ5IHRoaXMgbm9kZVxuICAgICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkOyAgLy8gUGFyZW50IG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fZmlyc3QgPSB1bmRlZmluZWQ7ICAgLy8gRmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9sYXN0ID0gdW5kZWZpbmVkOyAgICAvLyBMYXN0IGNoaWxkIG9mIHRoaXMgbm9kZTtcbiAgICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7ICAgIC8vIE5leHQgc2libGluZyBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7ICAgIC8vIFByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIG5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiVmFsdWUgb2YgWW5nd2llTm9kZSBtdXN0IGJlIFNUUklOR1wiLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBbeW5nd2llTm9kZV1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgY2hpbGRyZW4oKSB7XG5cbiAgICBsZXQgY2hpbGQgPSB0aGlzLl9maXJzdDsgICAvLyBGaXJzdCBjaGlsZFxuICAgIGxldCBjaGlsZHJlbiA9IFtdOyAgICAgICAgIC8vIEFycmF5IG9mIGNoaWxkcmVuIHRvIHJldHVyblxuXG4gICAgLy8gTG9va3MgZm9yIG5leHQgc2libGluZyB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBzaWJsaW5nczpcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFuIGFycmFyeSB5bmdpd05vZGUgZWxlbWVudHM6XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXNcbiAgLy8gQWRkcyBnaXZlbiBub2RlIHRvIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgLy8gTk9URTogSWYgZ2l2ZW4gbm9kZSBhbHJlYWR5IGhhcyBhIHBhcmVudCwgdGhhdCBub2RlIGlzIGRldGFjaGVkIGFuZCBhcHBlbmVkIHRvIHRoaXMgbm9kZTpcbiAgYXBwZW5kKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIElmIGdpdmVuIG5vZGUgaGFzIHBhcmVudCwgZGV0YWNoIHRoYXQgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICAgICAgaWYgKG5vZGUuX3BhcmVudCkge1xuICAgICAgICBub2RlLmRldGFjaCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgbmV3IG5vZGUgYXMgbGFzdCBzaWJsaW5nOlxuICAgICAgaWYgKHRoaXMuX2ZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX2xhc3Q7ICAgIC8vIFNldHMgbmV3IGxhc3QgY2hpbGQncyBwcmV2aW91cyBub2RlIHRvIG9sZCBsYXN0IG5vZGVcbiAgICAgICAgdGhpcy5fbGFzdC5fbmV4dCA9IG5vZGU7ICAgIC8vIFNldCBvbGQgbGFzdCBjaGlsZCBuZXh0IGVsZW1lbnQgdG8gbmV3IGxhc3QgY2hpbGRcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7ICAgICAgICAgLy8gU2V0IG5ldyBsYXN0IGNoaWxkIHRvIGdpdmVuIG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXIgYXJlIG5vIGNoaWxkcmVuLCB0aGVuIHRoaXMgbm9kZSBpcyBhbiBvbmx5IGNoaWxkOlxuICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcGFyZW50XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAvLyBSZXR1cm4gaW5zdGFuY2U6Y29zbm9sZVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBhcHBwZW5kIFluZ3dpZU5vZGUgdG8gb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFt5bmd3aWVOb2RlXSAtPiB0aGlzXG4gIC8vIEFwcGVuZHMgYW4gYXJyYXkgb2YgWW5nd2llTm9kZXMgdG8gdGhpcyBpbnN0YW5jZTpcbiAgYXBwZW5kcyhub2Rlcykge1xuICAgIGlmIChub2RlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gbm9kZXMucmVkdWNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kKG5vZGUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VlbW50XCIsIG5vZGVzKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gdGhpc1xuICAvLyBEZXRhY2hlcyB0aGlzIG5vZGUgZnJvbSBpdCdzIHBhcmVudDpcbiAgZGV0YWNoKCkge1xuXG4gICAgLy8gTWFrZSBwcmV2aW91cyBub2RlJ3MgbmV4dCBub2RlIHRoaXMgbm9kZSdzIG5leHQgbm9kZTpcbiAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IHRoaXMuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vIHByZXZpb3VzIG5vZGUsIHRoZW4gdGhpcyBub2RlIG11c3QgYmUgZmlyc3QgY2hpbGQgb2YgcGFyZW50IChpZiBub2RlIGhhcyBwYXJlbnQpOlxuICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gdGhpcy5fbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIG5leHQgbm9kZSdzIHByZXZpb3VzIG5vZGUgdGhpcyBub2RlJ3MgcHJldmlvdXMgbm9kZTpcbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgdGhpcy5fbmV4dC5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgfVxuXG4gICAgLy8gVW5zZXQgYWxsIHJlbGF0aW9uczpcbiAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gUmV0dXJuIGluc3RhbmNlOlxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXM7XG4gIC8vIEluc2VydHMgZ2l2ZW4geW5nd2llTm9kZSBiZWZvcmUgdGhpcyBpbnN0YW5jZSBvZiB5bmd3aWVOb2RlOlxuICAvLyBOT1RFOiBhLmluc2VydHNCZWZvcmUoYikgbWVhbnMgXCJiXCIgaXMgaW5zZXJ0ZWQgYmVmb3JlIFwiYVwiXG4gIGluc2VydEJlZm9yZShub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBTZXQgcmVsYXRpb25zXG4gICAgICBub2RlLl9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICAgIG5vZGUuX25leHQgPSB0aGlzO1xuICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZyByZWxhdGlvbnM6XG4gICAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZzpcbiAgICAgIHRoaXMuX3ByZXYgPSBub2RlO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGluc2VydCBhIFluZ3dpZU5vZGUgYmVmb3JlIG90aGVyIFluZ3dpZU5vZGVzXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmVwbGFjZSB0aGlzIG5vZGUgd2l0aCBnaXZlbiBub2RlOlxuICByZXBsYWNlV2l0aChub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBDaGVja3MgaWYgdGhpcyBub2RlIGhhcyBhIHBhcmVudFxuICAgICAgaWYgKHRoaXMuX3BhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgLy8gUmVwbGFjZW1lbnQgaXMgYWNjb21wbGlzaGVkIGJ5IGZpcnN0IGluc2VydGluZyBnaXZlbiBub2RlLCB0aGVuIGRldGF0Y2hpbmcgdGhpcyBub2RlOlxuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShub2RlKTtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAvLyBSZXR1cm4gZ2l2ZW4gbm9kZTpcbiAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBZbmd3aWVOb2RlIGlmIFluZ3dpZU5vZGUgYmVpbmcgcmVwbGFjZWQgaGFzIHBhcmVudFwiLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgYSBZbmd3aWVOb2RlIHdpdGggYW5vdGhlciBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmV0dXJucyBkZWVwIGNsb25lIG9mIHRoaXMgbm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IHZhbHVlID0gYCR7dGhpcy5fdmFsdWV9YDtcbiAgICBsZXQgY2xvbmUgPSBuZXcgWW5nd2llTm9kZSh2YWx1ZSlcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2xvbmUgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQoY2xvbmUpO1xuICAgIH0sIGNsb25lKTtcbiAgfVxuXG4gIC8vIE5PREUsICogLT4gTk9ERSAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gYSByZXN1bHQgYW5kIHRoaXMgbm9kZSwgd2hlcmUgdGhhdCBmdW5jdGlvbiByZXR1cm5zIHRoZSBuZXh0IG5vZGUgdG8gdGhhdCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvXG4gIC8vIE5PVEU6IFJlc3VsdCBpcyByZXR1cm5lZCB3aGVuIHRoZXJlIGlzIG5vIG5leHQgbm9kZSB0byBhcHBseSBmdW5jdGlvbiB0b1xuICBzdGVwKGZuLCByZXN1bHQpIHtcbiAgICBuZXh0ID0gZm4odGhpcywgcmVzdWx0KTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5zdGVwKGZuLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gOjogTk9ERSwgKiAtPiAqLCAqIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byB0aGlzIG5vZGUgYW5kIGl0J3MgZGVzY2VuZGFudHMsIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHBhcnNlKGZuLCByZXN1bHQpIHtcbiAgICBZbmd3aWVOb2RlLnBhcnNlKHRoaXMsIChub2RlKSA9PiB7XG4gICAgICByZXN1bHQgPSBmbihub2RlLCByZXN1bHQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogU3RhdGljIEZ1bmN0aW9uXG4gICAqXG4gICAqL1xuXG4gIC8vIFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZFxuICBzdGF0aWMgaW5pdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTm9kZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBOT0RFLCBOT0RFIC0+IFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gYSBub2RlIGFuZCBhbGwgaXQncyBkZXNlbmRhbnRzXG4gIC8vIE5PREU6IFRoaXMgaXMgYSByZS1pbXBsZW1lbnRhdGlvbiBvZiBDcm9ja2ZvcmQncyBET00gd2FsayBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6IFRoZSBHb29kIFBhcnRzXCJcbiAgc3RhdGljIHBhcnNlKG5vZGUsIGZuKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICBmbihub2RlKTtcbiAgICAgIG5vZGUgPSBub2RlLl9maXJzdDtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIFluZ3dpZU5vZGUucGFyc2Uobm9kZSwgZm4pO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHBhcnNlIGEgWW5nd2llTm9kZVwiLCBub2RlKTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVUZXh0Tm9kZSBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgc3VwZXIodGV4dCk7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHRleHQgb2YgdGhpcyB0ZXh0IG5vZGU6XG4gIHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfHluZ3dpZVRleHROb2RlIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBTVFJJTkcgaW5zdGVhZCBvZiBOT0RFIHNpbmNlIGEgVGV4dE5vZGUgaGFzIG5vIGNoaWxkcmVuXG4gIGFwcGVuZCh2YWwpIHtcblxuICAgIGlmICh0eXBlb2YodmFsKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB2YWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBZbmd3aWVUZXh0Tm9kZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB2YWwudGV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFNUUklOR3MgYW5kIG90aGVyIFluZ3dpZVRleHROb2RlcyBjYW4gYXBwZW5kIGEgWW5nd2llVGV4dE5vZGVcIiwgdmFsKTtcbiAgfVxuXG4gIC8vOjogU1RSSU5HfEVMRU1FTlR8Vk9JRCwgT0JKRUNUIC0+IFRFWFRcbiAgLy8gQ3JlYXRlcyBET00gVGV4dCBub2RlIHNldCB3aXRoIHRoZSBTVFJJTkcgc3RvcmVkIGluIF92YWx1ZTpcbiAgcmVuZGVyKHRhcmdldCwgY3R4KSB7XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgIGxldCB0ZXh0Tm9kZSA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdmFsdWUpO1xuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHROb2RlO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB5bmd3aWVUZXh0Tm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZShgJHt0aGlzLl92YWx1ZX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGV4dCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUodGV4dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4uL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL1RyYW5zZm9ybS9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRyYW5zZm9ybSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogKiAtPiB5bmd3aWVUcmFuc2Zvcm1cbiAgY29uc3RydWN0b3IodmFsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbHVlIHRvIHRyYW5zZm9ybVxuICAgIHRoaXMuX3R5cGUgPSBZbmd3aWVUcmFuc2Zvcm0uZ2V0VHlwZSh2YWwpOyAvLyBTdG9yZXMgdmFsdWUncyB0eXBlIGZvciBkZXRlcm1pbmluZyBob3cgaXQgY2FuIGJlIHRyYW5zZm9ybWVkXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IE5PREVcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIERPTUVsZW1lbnQgTk9ERTpcbiAgdG9OT0RFKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh0aGlzLl92YWx1ZSwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIHJldHVybiBkb2MuYm9keS5maXJzdENoaWxkO1xuICAgICAgY2FzZSBcIllOR1dJRVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUucmVuZGVyKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIE5PREUgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSBTVFJJTkc6XG4gIHRvU1RSSU5HKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vZGVUeXBlID09PSAxID8gdGhpcy5fdmFsdWUub3V0ZXJIVE1MIDogdGhpcy5fdmFsdWUubm9kZVZhbHVlO1xuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl92YWx1ZS5yZW5kZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2cobm9kZSlcbiAgICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBub2RlLm91dGVySFRNTCA6IG5vZGUubm9kZVZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBTVFJJTkcgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSB5bmd3aWVFbGVtZW50OlxuICB0b1lOR1dJRSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgIGNhc2UgXCJOT0RFXCI6XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIHJldHVybiBZbmd3aWVUcmFuc2Zvcm0uaW5pdCh0aGlzLl92YWx1ZSk7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gWW5nd2llRWxlbWVudCBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkd8Tk9ERSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFRyYW5zZm9ybXMgc3RyaW5nIG9mIEhUTUwgb3IgRE9NRWxlbWVudCBOT0RFIGludG8gYSB5bmd3aWVFbGVtZW50XG4gIC8vIE5PVEU6IFRoaXMgRE9FUyBOT1QgdHJhbnNmb3JtIGV2ZW50IGhhbmRsZXJzIGludG8gWW5nd2llTGlzdGVuZXIgb2JqZWN0czpcbiAgc3RhdGljIGluaXQoaHRtbCkge1xuICAgIHJldHVybiB3YWxrTm9kZShZbmd3aWVUcmFuc2Zvcm0uZ2V0VHlwZShodG1sKSA9PT0gXCJTVFJJTkdcIiA/IFluZ3dpZVRyYW5zZm9ybS50b05PREUoaHRtbCkgOiBodG1sKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gTk9ERVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSBOT0RFOlxuICBzdGF0aWMgdG9OT0RFKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b05PREUoKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gU1RSSU5HXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIFNUUklORzpcbiAgc3RhdGljIHRvU1RSSU5HKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b1NUUklORygpO1xuICB9XG5cbiAgLy8gOjogKiAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIHluZ3dpZUVsZW1lbnQ6XG4gIHN0YXRpYyB0b1lOR1dJRSh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9ZTkdXSUUoKTtcbiAgfVxuXG4gIC8vICogLT4gXCJOT0RFXCJ8XCJTVFJJTkdcInxcIllOR1dJRVwifFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIG5hbWUgb2YgdHlwZSBmb3IgZ2l2ZW4gdmFsdWU6XG4gIHN0YXRpYyBnZXRUeXBlKHZhbCkge1xuXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIHJldHVybiBcIk5PREVcIjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mKHZhbCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBcIlNUUklOR1wiO1xuICAgIH1cblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG4gICAgICByZXR1cm4gXCJZTkdXSUVcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIH1cblxufVxuXG4vKipcbiAqXG4gKiAgTG9jYWwgRnVuY3Rpb25zXG4gKlxuICovXG5cbi8vIDo6IE5PREUsIE5PREUsIG5vZGUubm9kZVR5cGUgLT4gVk9JRFxuLy8gQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZbmd3aWVFbGVtZW50IGZyb20gdGhlIGdpdmVuIG5vZGUgYW5kIGFsbCBvZiBpdCdzIGRlc2VuZGVudHM6XG4vLyBOT1RFOiBJbnNwaXJlZCBieSBDcm9ja2ZvcmQncyBET00gd2Fsa2luZyBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6VGhlIEdvb2QgUGFydHNcIlxuZnVuY3Rpb24gd2Fsa05vZGUobm9kZSwgcmVzdWx0KSB7XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBsZXQgYXR0cmlicyA9IGdldEF0dHJpYnV0ZXMobm9kZSk7XG4gICAgbGV0IGVsZW0gPSBuZXcgWW5nd2llRWxlbWVudChub2RlLnRhZ05hbWUsIGF0dHJpYnMpO1xuICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVsZW1cbiAgICAgIDogcmVzdWx0LmFwcGVuZChlbGVtKTtcbiAgfVxuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgbGV0IHRleHROb2RlID0gbmV3IFluZ3dpZVRleHROb2RlKG5vZGUubm9kZVZhbHVlKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyB0ZXh0Tm9kZVxuICAgICAgOiByZXN1bHQuYXBwZW5kKHRleHROb2RlKTtcbiAgfVxuXG4gIG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICBsZXQgY2hpbGQgPSB3YWxrTm9kZShub2RlKTtcbiAgICBpZiAoY2hpbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQuYXBwZW5kKGNoaWxkKTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xuXG59XG5cbi8vIDo6IERPTUVsZW1lbnQgLT4gT0JKRUNUXG4vLyBSZXR1cm5zIE9CSkVDVCBvZiBhdHRyaWJ1dGVzIGZyb20gdGhlIGdpdmVuIERPTSBFbGVtZW50OlxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlcyhlbGVtKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGVsZW0uYXR0cmlidXRlcykucmVkdWNlKChyZXN1bHQsIGF0dHJpYikgPT4ge1xuICAgIHJlc3VsdFthdHRyaWIubmFtZV0gPSBhdHRyaWIudmFsdWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSwge30pO1xufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTGlzdGVuZXIgZnJvbSBcIi4vTGlzdGVuZXIvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm0vbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IHtcbiAgWW5nd2llTm9kZSBhcyBOb2RlLFxuICBZbmd3aWVFbGVtZW50IGFzIEVsZW1lbnQsXG4gIFluZ3dpZVRleHROb2RlIGFzIFRleHROb2RlLFxuICBZbmd3aWVMaXN0ZW5lciBhcyBMaXN0ZW5lcixcbiAgWW5nd2llVHJhbnNmb3JtIGFzIFRyYW5zZm9ybSxcbiAgWW5nd2llRXJyb3IgYXMgRXJyb3Jcbn1cbiIsImltcG9ydCBZbmd3aWVNYXBwaW5nIGZyb20gXCIuLi9NYXBwaW5nL21haW4uanNcIjtcbmltcG9ydCAqIGFzIFluZ3dpZU1WQyBmcm9tIFwieW5nd2llLW12Y1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVBY3RvciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogeW5nd2llTW9kZWx8T0JKRUNULCB7U1RSSU5HOiotPip9LCB7U1RSSU5HOlNUUklOR30gLT4gdGhpc1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgYWN0aW9ucywgYmVoYXZpb3JzKSB7XG4gICAgdGhpcy5fbW9kZWwgPSBZbmd3aWVNVkMuTW9kZWwuc2V0QXNNb2RlbChtb2RlbCk7XG4gICAgdGhpcy5fYWN0aW9ucyA9IFluZ3dpZU1hcHBpbmcuaW5pdCh2YWwgPT4gdHlwZW9mKHZhbCkgPT09IFwiZnVuY3Rpb25cIikuc2V0KGFjdGlvbnMpO1xuICAgIHRoaXMuX2JlaGF2aW9ycyA9IFluZ3dpZU1hcHBpbmcuaW5pdCh2YWwgPT4gdHlwZW9mKHZhbCkgPT09IFwic3RyaW5nXCIpLnNldChiZWhhdmlvcnMpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVNb2RlbFxuICAvLyBSZXR1cm5zIG1vZGVsIHN0b3JlZCBieSBhY3RvcjpcbiAgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBGVU5DVElPTiAtPiB0aGlzXG4gIC8vIEJpbmRzIGFjdGlvbiBmdW5jdGlvbiB0byBhY3Rpb24gSUQ6XG4gIC8vIE5PVEU6IE9ubHkgb25lIGZ1bmN0aW9uIGNhbiBiZSBib3VuZCB0byBhbiBhY3Rpb24gLSBydW5uaW5nIHRoaXMgZm9yIHRoZSBzYW1lIGFjdGlvbklEIHdpbGwgdGhlbiByZXBsYWNlIHRoZSBjdXJyZW50IGZ1bmN0aW9uIGlmIHNldFxuICBhY3Rpb24oaWQsIGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2FjdGlvbnMuc2V0T25jZShpZCwgZm4pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgWW5nd2llTVZDLkVycm9yKGBDb3VsZCBub3Qgc2V0IGFjdGlvbjogJHtlcnIubXNnfWAsIGVyci5kYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyBTVFJJTkcsIFNUUklOR3xbU1RSSU5HXSAtPiB0aGlzXG4gIC8vIEJpbmRzIG1lc3NhZ2UgdG8gYWN0aW9uXG4gIC8vIE5PVEU6IElmIGFjdGlvbiBpcyBub3Qgc2V0LCBhbiB5bmd3aWUgRXJyb3IgaXMgdGhyb3duOlxuICB3aGVuKG1lc3NhZ2UsIGFjdGlvbklEKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChhY3Rpb25JRCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aW9uSUQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLndoZW4obWVzc2FnZSwgYWN0aW9uSURbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2FjdGlvbnMuaGFzKGFjdGlvbklEKSkge1xuICAgICAgICB0aGlzLl9iZWhhdmlvcnMuc2V0KG1lc3NhZ2UsIGFjdGlvbklEKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llTVZDLkVycm9yKFwiQ2Fubm90IGJpbmQgbWVzc2FnZSB0byBhbiBhY3Rpb24gdGhhdCBkb2Vzbid0IGV4aXN0XCIsIGFjdGlvbklEKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBZbmd3aWVNVkMuRXJyb3IoYENvdWxkIG5vdCBzZXQgYmVoYXZpb3I6ICR7ZXJyLm1zZ31gLCBlcnIuZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU1RSSU5HLCBbXSpdIC0+IHRoaXNcbiAgLy8gU2VuZHMgbWVzc2FnZSB0byBhY3RvciwgYXBwbHlpbmcgZ2l2ZW4gdmFsdWUgdG8gYWN0aW9uIGJvdW5kIHRvIG1lc3NhZ2U6XG4gIC8vIE5PVEU6IElmIGJlaGF2aW9yIGRvZXMgbm90IGV4aXN0LCB0aGVuIGFuIGVycm9yIGlzIHRocm93bjpcbiAgc2VuZChtZXNzYWdlLCBhcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBhY3Rpb25JRHMgPSB0aGlzLl9iZWhhdmlvcnMuZ2V0KG1lc3NhZ2UpO1xuICAgICAgYWN0aW9uSURzLmZvckVhY2goYWN0aW9uSUQgPT4ge1xuICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5fYWN0aW9ucy5nZXQoYWN0aW9uSUQpWzBdO1xuICAgICAgICBhY3Rpb24uYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIHRocm93IG5ldyBZbmd3aWVNVkMuRXJyb3IoYENvdWxkIG5vdCBzZW5kIG1lc3NhZ2U6ICR7ZXJyLm1zZ31gLCBlcnIuZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGFpdGMgTWVodG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiB5bmd3aWVNb2RlbHxPQkpFQ1QsIHtTVFJJTkc6Ki0+Kn0sIHtTVFJJTkc6U1RSSU5HfSAtPiB5bmd3aWVBY3RvclxuICAvLyBTdGF0aWMgRmFjdG9yeSBtZXRob2RcbiAgc3RhdGljIGluaXQobW9kZWwsIGFjdGlvbnMsIGJlaGF2aW9ycykge1xuICAgIHJldHVybiBuZXcgWW5nd2llQWN0b3IobW9kZWwsIGFjdGlvbnMsIGJlaGF2aW9ycyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU1hcHBpbmcgZnJvbSBcIi4uL01hcHBpbmcvbWFpbi5qc1wiO1xuaW1wb3J0ICogYXMgWW5nd2llVUkgZnJvbSBcInluZ3dpZS1tdmNcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTWFjaGluZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogeW5nd2llTW9kZWx8T0JKRUNUfFZPSUQsIHtTVFJJTkc6W1NUUklOR119fFZPSUQsIHtTVFJJTkd8RlVOQ1RJT059fFZPSURcbiAgY29uc3RydWN0b3IobW9kZWwsIHN0YXRlcywgYWN0aW9ucykge1xuICAgIHRoaXMuX21vZGVsID0gWW5nd2llVUkuTW9kZWwuc2V0QXNNb2RlbChtb2RlbCk7XG4gICAgdGhpcy5fc3RhdGVzID0gc3RhdGVzIHx8IHt9O1xuICAgIHRoaXMuX2FjdGlvbnMgPSBhY3Rpb25zIHx8IHt9O1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfFZPSUQgLT4gdGhpc3x5bmd3aWVNb2RlbFxuICAvLyBTZXRzIG9yIGdldHMgeW5nd2llTW9kZWwgc2V0IGZvciB0aGlzIGluc3RhbmNlOlxuICBtb2RlbChhcmdzKSB7XG4gICAgbGV0IGFyZ3R5cGUgPSBZbmd3aWVVSS5VdGlsLmdldFR5cGUoYXJncykudG9VcHBlckNhc2UoKTtcbiAgICBzd2l0Y2ggKGFyZ3R5cGUpIHtcbiAgICAgIGNhc2UgXCJVTkRFRklORURcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICAgICAgY2FzZSBcIk9CSkVDVFwiOlxuICAgICAgICB0aGlzLl9tb2RlbCA9IFluZ3dpZVVJLk1vZGVsLnNldEFzTW9kZWwoYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHNldCBtb2RlbCB3aXRoIHVuc3VwcG9ydGVkIHR5cGVcIiwgYXJndHlwZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjoge1NUUklORzpbU1RSSU5HXX18Vk9JRCAtPiB0aGlzO1xuICAvLyBTZXRzIFwic3RhdGVzXCIgZm9yIHRoaXMgaW5zdGFuY2U6XG4gIHN0YXRlcyhzdGF0ZXMpIHtcbiAgICB0aGlzLl9zdGF0ZXMgPSBzdGF0ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBTVFJJTkcsIFtTVFJJTkddIC0+IHRoaXNcbiAgLy8gU2V0cyBcInN0YXRlXCIgZm9yIHRoaXMgaW5zdGFuY2U6XG4gIHN0YXRlKGlkLCBhY3Rpb25zKSB7XG4gICAgdGhpcy5fc3RhdGVzW2lkXSA9IGFjdGlvbnM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBTVFJJTkcsIChtb2RlbDp5bmd3aWVNb2RlbCwgbmV4dDooVk9JRCAtPiBWT0lEKSAtPiBWT0lEKSAtPiB0aGlzXG4gIC8vIFNldHMgXCJhY3Rpb25cIiBmb3IgdGhpcyBpbnN0YW5jZTpcbiAgLy8gTk9URTogQ2FsbGluZyBcIm5leHRcIiB3aWxsIGNhbGwgbmV4dCBhY3Rpb24gb2Ygc3RhdGUgdGhpcyBhY3Rpb24gbWF5YmUgYm91bmQgdG86XG4gIGFjdGlvbihpZCwgZm4pIHtmblxuICAgIHRoaXMuX2FjdGlvbnNbaWRdID0gZm47XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gVk9JRFxuICAvLyBDYWxscyBhbGwgYWN0aW9ucyBmb3IgdGhlIGdpdmVuICBzdGF0ZSBJRDpcbiAgdHJhbnNpc3Rpb24oc3RhdGVJRCkge1xuICAgIGxldCBhY3Rpb25zID0gdGhpcy5fc3RhdGVzW3N0YXRlSURdO1xuICAgIFV0aWwuZm9yRWFjaENwcygwLCBhY3Rpb25zIHx8IFtdLCAoYWN0aW9uSUQsIG5leHQpID0+IHtcbiAgICAgIHRoaXMuX2FjdGlvbnNbYWN0aW9uSURdLmNhbGwodGhpcywgdGhpcy5tb2RlbCgpLCBuZXh0KTtcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAgLy8gOjogeW5nd2llTW9kZWx8T0JKRUNUfFZPSUQsIHtTVFJJTkc6W1NUUklOR119fFZPSUQsIHtTVFJJTkd8RlVOQ1RJT059fFZPSUQgLT4geW5nd2llTWFjaGluZVxuICAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICAgc3RhdGljIGluaXQobW9kZWwsIHN0YXRlcywgYWN0aW9ucykge1xuICAgICByZXR1cm4gbmV3IFluZ3dpZU1hY2hpbmUobW9kZWwsIHN0YXRlcywgYWN0aW9ucyk7XG4gICB9XG5cbn1cbiIsImltcG9ydCB7RXJyb3IgYXMgWW5nd2llRXJyb3J9IGZyb20gXCJ5bmd3aWUtbXZjXCI7XG5cbi8vIEJpbmRzIGFycmF5IG9mIFwiY29uc3RyYWluZWRcIiB2YWx1ZXMgdG8ga2V5IG9mIHR5cGUgU1RSSU5HOlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTWFwcGluZyB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogKiAtPiBCT09MRUFOfFZPSUQgLT4geW5nd2llTWFwcGluZ1xuICBjb25zdHJ1Y3Rvcihjb25zdHJhaW50KSB7XG4gICAgaWYgKHR5cGVvZihjb25zdHJhaW50KSA9PT0gJ2Z1bmN0aW9uJyB8fCBjb25zdHJhaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NvbnN0cmFpbnQgPSBjb25zdHJhaW50ID09PSB1bmRlZmluZWQgPyB4ID0+IHggOiBjb25zdHJhaW50O1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDb25zdHJhaW50IGZvciB5bmd3aWVNYXBwaW5nIG11c3QgZWl0aGVyIGJ5IGEgRlVOQ1RJT04gb3IgVU5ERUZJTkVEXCIsIGNvbnN0cmFpbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6ICogLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIFRSVUUgaWYgZ2l2ZW4gdmFsdWUgbWVldHMgY29uc3RyYWludDpcbiAgLy8gTk9URTogSWYgY29uc3RyYWludCBpcyBVTkRFRklORUQsIHRoZW4gYWx3YXlzIHJldHVybiBUUlVFXG4gIGNoZWNrKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YodGhpcy5fY29uc3RyYWludCkgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy5fY29uc3RyYWludCh2YWwpXG4gICAgICA6IHRydWU7XG4gIH1cblxuICAvLyA6OiBbKl0sIFsqXSAtPiAqLCAqIC0+ICogLT4gKlxuICAvLyBBcHBsaWVzIHN1Y2Nlc3MgZnVuY3Rpb24gdG8gZ2l2ZW4gYXJyYXkgb2YgdmFsdWVzIGlmIGFsbCB2YWx1ZXMgbWVldCBjb25zdHJhaW50LCBvdGhlcndpc2UgYXBwbGllcyBmYWlsIGZ1bmN0aW9uIHRvIGZpcnN0IGZhaWxlZCB2YWx1ZTpcbiAgY2hlY2tBbGwoYXJyLCBzdWNjLCBmYWlsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2soYXJyW2ldKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFpbChhcnJbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VjYyhhcnIpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llckVycm9yKFwiQ2FuIG9ubHkgY2hlY2sgYWxsIHZhbHVlcyBmb3IgYSBnaXZlbiBBUlJBWVwiLCBhcnIpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBUUlVFIGlmIGtleSBpcyBzZXQgZm9yIHRoaXMgaW5zdGFuY2UsIG90aGVyd2lzZSByZXR1cm5zIEZBTFNFOlxuICBoYXMoa2V5KSB7XG4gICAgaWYgKHR5cGVvZihrZXkpID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoYEtleSB0byBjaGVjayBmb3IgZXhpc3RlbmNlIG11c3QgYnkgYSBTVFJJTkdgLCBrZXkpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfE9CSkVDVHxWT0lELCAqfFZPSUR8Vk9JRCAtPiB0aGlzXG4gIC8vIFNldHMgZ2l2ZW4gdmFsdWUgb2YgZ2l2ZW4ga2V5IGlmIHZhbHVlIG1lZXRzIGNvbnN0cmFpbnQuIElmIGNvbnN0cmFpbnQgaXMgRkFMU0UsIGFuIGVycm9yIGlzIHRocm93blxuICAvLyBOT1RFOiBGb3IgYXJndW1lbnQgb2YgT0JKRUNULCBlcnJvciBpcyB0aHJvd24gaWYgYW55IHZhbHVlIGZhaWxzIHRvIG1lZXQgY29uc3RyYWludFxuICAvLyBOT1RFOiBWYWx1ZXMgYm91bmQgdG8ga2V5IGFyZSBhbHdheXMgc3RvcmVkIGFzIGFuIGFycmF5OlxuICBzZXQoa2V5LCB2YWwpIHtcbiAgICAvLyBCaW5kcyB2YWx1ZSB0byBrZXkgaWYgdmFsdWUgbWVldHMgY29uc3RyYWludDpcbiAgICBpZiAodHlwZW9mKGtleSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpcy5jaGVjayh2YWwpID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RhdGFba2V5XS5wdXNoKHZhbCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKGBWYWx1ZSB0byBzZXQga2V5IFwiJHtrZXl9XCIgb2YgeW5nd2llTWFwcGluZyBmYWlsZWQgY29uc3RyYWludGAsIHZhbClcbiAgICB9XG4gICAgLy8gQmluZHMgT0JKRUNUIHRvIG1hcHBpbmcgaWYgYWxsIHZhbHVlcyBvZiBPQkpFQ1QgbWVldCBjb25zdHJhaW50OlxuICAgIGlmICh0eXBlb2Yoa2V5KSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrQWxsKE9iamVjdC52YWx1ZXMoa2V5KSwgKHZhbHVlcykgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoa2V5KS5yZWR1Y2UoKHJlc3VsdCwgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKGtleSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihgQ291bGQgbm90IHNldCBrZXkgZnJvbSBnaXZlbiBPQkpFQ1QgYmVjYXVzZSBvZiBmYWlsZWQgY29uc3RyYWludGAsIGtleSk7XG4gICAgICAgIH0sIHRoaXMuX2RhdGEpO1xuICAgICAgfSwgKHZhbCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoYENvdWxkIG5vdCBzZXQgdmFsdWUgZnJvbSBnaXZlbiBPQkpFQ1QgYmVjYXVzZSBvZiBmYWlsZWQgY29uc3RyYWludGAsIHZhbCk7XG4gICAgICB9KVxuICAgIH1cbiAgICAvLyBJZ25vcmVzIFVOREVGSU5FRCBrZXkgYW5kIHJldHVybnMgaW5zdGFuY2U6XG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8vIFRocm93cyBlcnJvciBpZiBrZXkgaXMgbm90IG9mIGFuIGFjY2VwdGVkIHR5cGU6XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgc2V0IGtleSBvZiB5bmd3aWVNYXBwaW5nIHVzaW5nIGVpdGhlciBTVFJJTkcgb3IgT0JKRUNUXCIsIGtleSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICogLT4gdGhpc1xuICAvLyBFbnN1cmUgdGhhdCBvbmx5IGEgc2luZ2xlIHZhbHVlIGlzIGJvdW5kIHRvIHRoZSBnaXZlbiBrZXkgaWYgdGhhdCB2YWx1ZSBtZWV0cyBjb25zdHJhaW50OlxuICBzZXRPbmNlKGtleSwgdmFsKSB7XG4gICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlS2V5KGtleSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldChrZXksIHZhbCk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gWypdXG4gIC8vIFJldHVybnMgdmFsdWUgb2Yga2V5LiBJZiBrZXkgaXMgbm90IGEgU1RSSU5HIG9yIGRvZXMgbm90IGV4aXN0LCBhIHluZ3dpZUVycm9yIGlzIHRocm93bjpcbiAgZ2V0KGtleSkge1xuICAgIGlmICh0eXBlb2Yoa2V5KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0aGlzLmhhcyhrZXkpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW2tleV07XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgZ2V0IHZhbHVlIG9mIGEga2V5IHRoYXQgZG9lcyBub3QgZXhpc3RcIiwga2V5KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKGBLZXkgdG8gZ2V0IHZhbHVlIG9mIG11c3QgYmUgYSBTVFJJTkdgLCBrZXkpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gUmVtb3ZlIGtleSBmcm9tIGluc3RhbmNlLiBJZiBrZXkgZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IGEgU1RSSU5HLCBhIHluZ3dpZUVycm9yIGlzIHRocm93bjpcbiAgLy8gTk9URTogQWxsIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGgga2V5IGFyZSByZW1vdmVkXG4gIHJlbW92ZShrZXkpIHtcbiAgICBpZiAodHlwZW9mKGtleSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpcy5oYXMoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCByZW1vdmUga2V5IHRoYXQgZG9lcyBub3QgZXhpc3RcIiwga2V5KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKGBLZXkgdG8gcmVtb3ZlIG11c3QgYmUgYSBTVFJJTkdgLCBrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiAqIC0+IEJPT0xFQU58Vk9JRCAtPiB5bmd3aWVNYXBwaW5nXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZFxuICBzdGF0aWMgaW5pdChjb25zdHJhaW50KSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVNYXBwaW5nKGNvbnN0cmFpbnQpO1xuICB9XG5cbiAgLy8gOjogKiAtPiBCT09MRUFOXG4gIC8vIFJldHVybnMgVFVSRSBpZiBnaXZlbiB2YWx1ZSBpcyBpbnN0YW5jZSBvZiBZbmd3aWVNYXBwaW5nOlxuICBzdGF0aWMgaXModmFsKSB7XG4gICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIFluZ3dpZU1hcHBpbmc7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtVdGlsIGFzIFluZ3dpZU1WQ1V0aWx9IGZyb20gXCJ5bmd3aWUtbXZjXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWwgZXh0ZW5kcyBZbmd3aWVNVkNVdGlsIHtcblxuICAvLyA6OiBOVU1CRVIsIFsqXSwgKCosIEZVTkNUSU9OKSAtPiBWT0lEXG4gIC8vIFJlY3Vyc2l2ZSBmdW5jdGlvbiBmb3IgaXRlcmF0aW5nIGFycmF5IHVzaW5nIENQUzpcbiAgc3RhdGljIGZvckVhY2hDcHMoaW5kZXgsIGFyciwgb25FbGVtKSB7XG4gICAgaWYgKGluZGV4IDwgYXJyLmxlbmd0aCkge1xuICAgICAgb25FbGVtKGFycltpbmRleF0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVXRpbC5mb3JFYWNoQ3BzKGluZGV4KzEsIGFyciwgb25FbGVtKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU1hcHBpbmcgZnJvbSBcIi4vTWFwcGluZy9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQWN0b3IgZnJvbSBcIi4vQWN0b3IvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZU1hY2hpbmUgZnJvbSBcIi4vTWFjaGluZS9tYWluLmpzXCI7XG5pbXBvcnQge01vZGVsLCBWaWV3LCBFcnJvcn0gZnJvbSBcInluZ3dpZS1tdmNcIlxuXG5cbmV4cG9ydCB7XG4gIFluZ3dpZUFjdG9yIGFzIEFjdG9yLFxuICBZbmd3aWVNYXBwaW5nIGFzIE1hcHBpbmcsXG4gIFZpZXcsXG4gIE1vZGVsLFxuICBFcnJvcixcbiAgWW5nd2llTWFjaGluZSBhcyBNYWNoaW5lXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=