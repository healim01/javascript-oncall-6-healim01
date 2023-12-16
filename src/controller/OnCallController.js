import { Console } from "@woowacourse/mission-utils";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class OnCallController {
  #month;
  #startDate;
  #weekOnCall;
  #weekendOnCall;

  constructor() {
    this.#month = 0;
    this.#startDate = "";
    this.#weekOnCall = [];
    this.#weekendOnCall = [];
  }

  async start() {
    await this.#getMonthAndStartDay();
    await this.#getOnCallList();
  }

  async #getMonthAndStartDay() {
    let isValid = false;

    while (!isValid) {
      try {
        const readMonthAndStartDay = await InputView.readMonthAndStartDay();
        const MonthAndStartDay = readMonthAndStartDay.split(",");
        this.#month = MonthAndStartDay[0];
        this.#startDate = MonthAndStartDay[1];
        this.#validateMonthAndStartDay();
        isValid = true;
      } catch (error) {
        OutputView.error(`유효하지 않은 입력 값입니다. ${error.message}`);
      }
    }
  }

  #validateMonthAndStartDay() {
    const days = "일월화수목금토";
    const month = Number(this.#month);
    const startDay = this.#startDate;

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

  async #getOnCallList() {
    await this.#getWeekOnCall();
    // this.#getWeekendOnCall();
  }

  async #getWeekOnCall() {
    let isValid = false;

    while (!isValid) {
      try {
        const readWeekOnCall = await InputView.readWeekOnCall();
        this.#weekOnCall = readWeekOnCall.split(",");
        this.#validateWeekOnCall();
        isValid = true;
      } catch (error) {
        OutputView.error(`유효하지 않은 입력 값입니다. ${error.message}`);
      }
    }
  }

  #validateWeekOnCall() {
    const checkNameLength = this.#weekOnCall.every((name) => name.length < 5);
    if (!checkNameLength) {
      throw new Error("닉네임은 5글자 이하의 값이어야 합니다.");
    }

    const checkDuplicateName =
      new Set(this.#weekOnCall).size !== this.#weekOnCall.length;
    if (checkDuplicateName) {
      throw new Error(
        "비상 근무자는 평일 순번, 휴일 순번에 각각 1회만 편성되어야 합니다."
      );
    }

    if (this.#weekOnCall.length < 5 || this.#weekOnCall.length > 35) {
      throw new Error("비상 근무자는 최소 5명, 최대 35명이어야 합니다.");
    }
  }
}
export default OnCallController;
