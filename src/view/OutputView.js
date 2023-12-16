import { Console } from "@woowacourse/mission-utils";
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
