import {Error as YngwieError} from "yngwie-mvc";

// Binds array of "constrained" values to key of type STRING:
export default class YngwieMapping {

  // CONSTRUCTOR :: * -> BOOLEAN|VOID -> yngwieMapping
  constructor(constraint) {
    if (typeof(constraint) === 'function' || constraint === undefined) {
      this._constraint = constraint === undefined ? x => x : constraint;
      this._data = {};
    } else {
      throw new YngwieError("Constraint for yngwieMapping must either by a FUNCTION or UNDEFINED", constraint);
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
    throw new YngwieError(`Key to check for existence must by a STRING`, key);
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
      throw new YngwieError(`Value to set key "${key}" of yngwieMapping failed constraint`, val)
    }
    // Binds OBJECT to mapping if all values of OBJECT meet constraint:
    if (typeof(key) === 'object') {
      return this.checkAll(Object.values(key), (values) => {
        return Object.entries(key).reduce((result, [key, value]) => {
            if (typeof(key) === 'string') {
              result[key] = value;
              return result;
          }
          throw new YngwieError(`Could not set key from given OBJECT because of failed constraint`, key);
        }, this._data);
      }, (val) => {
        throw new YngwieError(`Could not set value from given OBJECT because of failed constraint`, val);
      })
    }
    // Ignores UNDEFINED key and returns instance:
    if (key === undefined) {
      return this;
    };
    // Throws error if key is not of an accepted type:
    throw new YngwieError("Can only set key of yngwieMapping using either STRING or OBJECT", key);
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
      throw new YngwieError("Cannot get value of a key that does not exist", key);
    }
    throw new YngwieError(`Key to get value of must be a STRING`, key);
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
      throw new YngwieError("Cannot remove key that does not exist", key);
    }
    throw new YngwieError(`Key to remove must be a STRING`, key);
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
