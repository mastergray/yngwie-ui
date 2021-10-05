import YngwieMapping from "../Mapping/main.js";
import * as YngwieUI from "yngwie-mvc";
import Util from "../Util/main.js";

export default class YngwieMachine {

  // CONSTRUCTOR :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING|FUNCTION}|VOID
  constructor(model, processes, actions) {
    this._model = YngwieUI.Model.setAsModel(model);
    this._processes = processes || {};
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
  // Sets "processes" for this instance:
  processes(processes) {
    this._processes = processes;
    return this;
  }

  // STRING, [STRING] -> this
  // Sets "process" for this instance:
  process(id, actions) {
    this._processes[id] = actions;
    return this;
  }

  // STRING, (model:yngwieModel, next:(VOID -> VOID) -> VOID) -> this
  // Sets "action" for this instance:
  // NOTE: Calling "next" will call next action of process this action maybe bound to:
  action(id, fn) {fn
    this._actions[id] = fn;
    return this;
  }

  // :: STRING -> VOID
  // Calls all actions for the given  process ID:
  run(processID) {
    let actions = this._processes[processID];
    Util.forEachCps(0, actions || [], (actionID, next) => {
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
   static init(model, processes, actions) {
     return new YngwieMachine(model, processes, actions);
   }

}
