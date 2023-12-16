// View
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
// Model
import OnCall from "../model/OnCall.js";

class OnCallController {
  #month;
  #startDate;
  #weekOnCall;
  #weekendOnCall;
  #onCall;

  constructor() {
    this.#month = 0;
    this.#startDate = "";
    this.#weekOnCall = [];
    this.#weekendOnCall = [];
    this.#onCall = new OnCall();
  }

  async start() {
    await this.#getMonthAndStartDay();
    await this.#getOnCallList();
    this.#setOnCallList();
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
    let isValid = false;

    while (!isValid) {
      try {
        await this.#getWeekOnCall();
        await this.#getWeekendOnCall();
        isValid = true;
      } catch (error) {
        OutputView.error(`유효하지 않은 입력 값입니다. ${error.message}`);
      }
    }
  }

  async #getWeekOnCall() {
    const readWeekOnCall = await InputView.readWeekOnCall();
    this.#weekOnCall = readWeekOnCall.split(",");
    this.#validateOnCall(this.#weekOnCall);
  }

  async #getWeekendOnCall() {
    const readWeekendOnCall = await InputView.readWeekendOnCall();
    this.#weekendOnCall = readWeekendOnCall.split(",");
    this.#validateOnCall(this.#weekendOnCall);
  }

  #validateOnCall(onCallList) {
    const checkNameLength = onCallList.every((name) => name.length < 5);
    if (!checkNameLength) {
      throw new Error("닉네임은 5글자 이하의 값이어야 합니다.");
    }

    const checkDuplicateName = new Set(onCallList).size !== onCallList.length;
    if (checkDuplicateName) {
      throw new Error(
        "비상 근무자는 평일 순번, 휴일 순번에 각각 1회만 편성되어야 합니다."
      );
    }

    if (onCallList.length < 5 || onCallList.length > 35) {
      throw new Error("비상 근무자는 최소 5명, 최대 35명이어야 합니다.");
    }
  }

  #setOnCallList() {
    const onCallList = this.#onCall.setOnCall(
      this.#month,
      this.#startDate,
      this.#weekOnCall,
      this.#weekendOnCall
    );
    OutputView.print("");
    onCallList.forEach((onCall) => OutputView.print(onCall));
  }
}
export default OnCallController;
