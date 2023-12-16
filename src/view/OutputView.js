import { Console } from "@woowacourse/mission-utils";
// constants
import ERROR from "../constants/error.js";

const OutputView = {
  print(message) {
    Console.print(message);
  },

  error(error) {
    this.print(`${ERROR.ERROR} ${error}`);
  },
};

export default OutputView;
