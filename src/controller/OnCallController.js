import { Console } from "@woowacourse/mission-utils";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class OnCallController {
  #Month;
  #StartDate;
  constructor() {}

  async start() {
    await this.#getMonthAndStartDay();
  }

  async #getMonthAndStartDay() {
    let isValid = false;

    while (!isValid) {
      try {
        const readMonthAndStartDay = await InputView.readMonthAndStartDay();
        const MonthAndStartDay = readMonthAndStartDay.split(",");
        this.#Month = MonthAndStartDay[0];
        this.#StartDate = MonthAndStartDay[1];
        this.#validateMonthAndStartDay();
        isValid = true;
      } catch (error) {
        OutputView.error(`유효하지 않은 입력 값입니다. ${error.message}`);
      }
    }
  }

  #validateMonthAndStartDay() {
    const days = "일월화수목금토";
    const month = Number(this.#Month);
    const startDay = this.#StartDate;
    console.log(month);
    console.log(startDay, startDay.length);

    if (month < 1 || month > 12) {
      throw new Error("월은 1~12 사이의 값이어야 합니다.");
    }

    if (startDay.length !== 1) {
      throw new Error("요일은 한 글자의 값이어야 합니다.");
    }

    if (!days.includes(startDay)) {
      throw new Error("요일은 일월화수목금토 중 하나의 값이어야 합니다.");
    }
  }
}
export default OnCallController;
