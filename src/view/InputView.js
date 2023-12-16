import { Console } from "@woowacourse/mission-utils";
import MESSAGE from "../constants/message.js";

const InputView = {
  async readMonthAndStartDay() {
    const input = await Console.readLineAsync(MESSAGE.MONTH_AND_STARTDAY);
    return input;
  },

  async readWeekOnCall() {
    const input = await Console.readLineAsync(MESSAGE.WEEKONCALL);
    return input;
  },

  async readWeekendOnCall() {
    const input = await Console.readLineAsync(MESSAGE.WEEKENDONCALL);
    return input;
  },
};
export default InputView;
