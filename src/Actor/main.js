import YngwieMapping from "../Mapping/main.js";
import * as YngwieMVC from "yngwie-mvc";

export default class YngwieActor {

  // CONSTRUCTOR :: yngwieModel|OBJECT, {STRING:*->*}, {STRING:STRING} -> this
  constructor(model, actions, behaviors) {
    this._model = YngwieMVC.Model.setAsModel(model);
    this._actions = YngwieMapping.init(val => typeof(val) === "function").set(actions);
    this._behaviors = YngwieMapping.init(val => typeof(val) === "string").set(behaviors);
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
      throw new YngwieMVC.Error(`Could not set action: ${err.msg}`, err.data);
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
      throw new YngwieMVC.Error("Cannot bind message to an action that doesn't exist", actionID);
    } catch (err) {
      throw new YngwieMVC.Error(`Could not set behavior: ${err.msg}`, err.data);
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
      throw new YngwieMVC.Error(`Could not send message: ${err.msg}`, err.data);
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
