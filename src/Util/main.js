import {Util as YngwieMVCUtil} from "yngwie-mvc";

export default class Util extends YngwieMVCUtil {

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
