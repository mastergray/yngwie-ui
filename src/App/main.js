import YngwieMachine from "../Machine/main.js";

export default class YngwieApp extends YngwieMachine {

  // CONSTRUCTOR :: yngwieModel, {STRING:[STRING]}, {STRING:... -> *}, {STRING:yngwieModel, NEXT -> VOID}, {STRING:[... -> VOID]} -> this
  constructor(model, process, tasks, actions, subscriptions) {
    super(model, process, actions);
    this._tasks = tasks;
    this._subscriptions = subscriptions;
  }

  // :: {STRING:... -> *} -> this
  // Sets "tasks" for this instance:
  tasks(tasks) {
    this._tasks  = tasks;
    return this;
  }

  // STRING, ... -> * -> this
  // Binds function to taskID:
  when(taskID, fn) {
    this._tasks[taskID] = fn;
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
  // Sends array of values to given taskID, returning promise of response
  send(taskID, vals) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this._tasks[taskID].apply(this, [].concat(vals));
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
   static init(model, processs, tasks, actions) {
     return new YngwieApp(model, processs, tasks);
   }



}
