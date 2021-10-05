import YngwieMapping from "../Mapping/main.js";
import * as YngwieUI from "yngwie-mvc";
import Util from "../Util/main.js";

export default class YngwieMachine {

  // CONSTRUCTOR :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING|FUNCTION}|VOID
  constructor(model, tasks, actions) {
    this._model = YngwieUI.Model.setAsModel(model);
    this._tasks = tasks || {};
    this._actions = actions || {};
  }

  // :: OBJECT|VOID -> this|yngwieModel
  // Sets or gets yngwieModel set for this instance:
  model(args) {
    let argtype = YngwieUI.Util.getType(args).toUpperCase();
    switch (argtype) {
      case "UNDEFINED":
        return this._model;
      case "OBJECT":
        this._model = YngwieUI.Model.setAsModel(args);
        return this;
      default:
        throw new YngwieError("Cannot set model with unsupported type", argtype);
    }
  }

  // :: {STRING:[STRING]}|VOID -> this;
  // Sets "tasks" for this instance:
  tasks(tasks) {
    this._tasks = tasks;
    return this;
  }

  // STRING, [STRING] -> this
  // Sets "task" for this instance:
  task(id, actions) {
    this._tasks[id] = actions;
    return this;
  }

  // STRING, (MODEL, RESOLVE, REJECT -> PROMISE(MODEL)) -> this
  // Sets "action" for this instance:
  action(id, fn) {
    this._actions[id] = (model) => new Promise((resolve, reject) => {
      fn.apply(this, [model, resolve, reject]);
    })
    return this;
  }

  // :: STRING -> PROMISE(*)
  // Calls all actions for the given  task ID:
  run(taskID) {
    let actions = this._tasks[taskID];
    if (actions !== undefined) {
      let result = Promise.resolve(this._model)
      for (let i = 0; i < actions.length; i++) {
        let actionID = actions[i];
        let action = this._actions[actionID];
        if (action !== undefined) {
          result.then(action);
        } else {
          return Promise.reject("No Action found for given action ID")
        }
      }
      return result;
    }
    return Promise.reject("No Actions found for given task ID")
    /*Util.forEachCps(0, actions || [], (actionID, next) => {
      this._actions[actionID].call(this, this.model(), next);
    })*/
  }

  /**
   *
   *  Static Methods
   *
   */

   // :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING|FUNCTION}|VOID -> yngwieMachine
   // Static factory method:
   static init(model, tasks, actions) {
     return new YngwieMachine(model, tasks, actions);
   }

}
