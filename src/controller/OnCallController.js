// View
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
// Model
import OnCall from "../model/OnCall.js";
// constants
import ERROR from "../constants/error.js";
import {
  DAYS,
  VALID_MONTH,
  VALID_NAME_LENGTH,
  VALID_WORKER_NUMBER,
} from "../constants/system.js";

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
        OutputView.error(`${ERROR.INVALID_INPUT} ${error.message}`);
      }
    }
  }

  #validateMonthAndStartDay() {
    const month = Number(this.#month);
    const startDay = this.#startDate;

    if (month < VALID_MONTH.min || month > VALID_MONTH.max) {
      throw new Error(ERROR.INVALID_MONTH);
    }

    if (startDay.length !== 1) {
      throw new Error(ERROR.INVALID_STARTDAY_LENGTH);
    }

    if (!DAYS.includes(startDay)) {
      throw new Error(ERROR.INVALID_STARTDAY);
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
        OutputView.error(`${ERROR.ERROR} ${error.message}`);
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
    const checkNameLength = onCallList.every(
      (name) => name.length < VALID_NAME_LENGTH
    );
    if (!checkNameLength) {
      throw new Error(ERROR.INVALID_NAME_LENGTH);
    }

    const checkDuplicateName = new Set(onCallList).size !== onCallList.length;
    if (checkDuplicateName) {
      throw new Error(ERROR.INVALID_WORK_TIME);
    }

    if (
      onCallList.length < VALID_WORKER_NUMBER.min ||
      onCallList.length > VALID_WORKER_NUMBER.max
    ) {
      throw new Error(ERROR.INVALID_WORKER_NUMBER);
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
