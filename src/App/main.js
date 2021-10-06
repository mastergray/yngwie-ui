import YngwieMachine from "../Machine/main.js";

export default class YngwieApp extends YngwieMachine {

  // CONSTRUCTOR :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING:MODEL, RESOLVE, REJECT -> PROMISE(MODEL)}|VOID, {STRING: ... -> PROMISE(*)}|VOID, {STRING:... -> *}|VOID -> this
  constructor(model, tasks, actions, signals, subscriptions) {
    super(model, tasks, actions);
    this._signals = signals || {};
    this._subscriptions = subscriptions || {};
  }

  // :: {STRING:... -> *} -> this
  // Sets "signals" for this instance:
  signals(signals) {
    this._signals  = signals;
    return this;
  }

  // STRING, ... -> * -> this
  // Binds function to signalID:
  signal(signalID, fn) {
    this._signals[signalID] = fn;
    return this;
  }

  // :: STRING, ... -> VOID|[... -> VOID] -> this
  // Binds array of functions to given subscription ID:
  subscribe(subscriptionID, fn) {
    if (this._subscriptions[subscriptionID] === undefined) {
      this._subscriptions[subscriptionID] = [];
    }
    this._subscriptions[subscriptionID] = this._subscriptions[subscriptionID].concat(fn);
    return this;
  }

  // :: STRING, ... -> VOID -> this
  // Ensures only given function is bound to given subscriptionID:
  subscribeOnce(subscriptionID, fn) {
    this._subscriptions[subscriptionID] = fn;
    return this;
  }

  // :: STRING -> VVOID
  // Removes all functions associated with given subscriptionID:
  unsubscribe(subscriptionID) {
    delete this._subscriptions[subscriptionID];
    return this;
  }

  // :: STRING, *\[*] -> VOID
  // Broadcast value to every function bound to given listenerID:
  // NOTE: Bound function is always run in context of "this" instance:
  broadcast(subscriptionID, vals) {
    this._subscriptions[subscriptionID].forEach(fn=>{
      fn.apply(this, [].concat(vals));
    })
  }

  // STRING, *|[*] -> PROMISE(*)
  // Sends array of values to given signalID, returning promise of response
  send(signalID, vals) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this._signals[signalID].apply(this, [].concat(vals));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    })
  }

  // :: yngwieApp -> this
  // Merges actions, tasks, signals and subscriptions from given app to this instance:
  chain(app) {
    this._tasks = Object.assign(this._tasks, app._tasks);
    this._signals = Object.assign(this._signals, app._signals);
    this._actions = Object.assign(this._actions, app._actions);
    this._subscriptions = Object.assign(this._subscriptions, app._subscriptions);
    return this;
  }

  /**
   *
   *  Static Methods
   *
   */

   // :: yngwieModel|OBJECT|VOID, {STRING:[STRING]}|VOID, {STRING:MODEL, RESOLVE, REJECT -> PROMISE(MODEL)}|VOID, {STRING: ... -> PROMISE(*)}|VOID, {STRING:... -> *}|VOID -> yngwieApp
   // Static factory method:
   static init(model, processs, signals, actions) {
     return new YngwieApp(model, processs, signals);
   }



}
