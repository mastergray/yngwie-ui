import YngwieMachine from "../Machine/main.js";

export default class YngwieApp extends YngwieMachine {

  // CONSTRUCTOR :: yngwieModel, {STRING:[STRING]}, {STRING:... -> *}, {STRING:yngwieModel, NEXT -> VOID} -> this
  constructor(model, state, behaviors, actions) {
    super(model, state, actions);
    this._behaviors = behaviors;
  }

  // :: {STRING:... -> *} -> this
  // Sets "behaviors" for this instance:
  behaviors(behaviors) {
    this._behaviors  = behaviors;
    return this;
  }

  // STRING, ... -> * -> this
  // Binds function to message:
  when(message, fn) {
    this._behaviors[message] = fn;
    return this;
  }

  // STRING, [*] -> PROMISE(*)
  // Sends array of values to given message, returning promise of response
  send(message, vals) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this._behaviors[message].apply(this, vals);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    })
  }

  /**
   *
   *  Static Methods
   *
   */

   // :: yngwieModel, {STRING:[STRING]}, {STRING:... -> *}, {STRING:yngwieModel, NEXT -> VOID} -> yngwieApp
   // Static factory method:
   static init(model, states, behaviors, actions) {
     return new YngwieApp(model, states, behaviors);
   }



}
