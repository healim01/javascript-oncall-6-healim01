import {
  DAYS,
  FORMAT_OUTPUT,
  MONTHS,
  SPECIAL_MONTHS,
} from "../constants/system.js";

class OnCall {
  #month;
  #monthDays;
  #startDateIndex;
  #weekOnCall;
  #weekendOnCall;
  #specialDays;

  setOnCall(month, startDay, weekOnCall, weekendOnCall) {
    this.#month = month;
    this.#weekOnCall = weekOnCall;
    this.#weekendOnCall = weekendOnCall;

    const monthIndex = Number(month) - 1;
    this.#startDateIndex = this.#getStartDateIndex(startDay);
    this.#monthDays = this.#getMonthDays(monthIndex);
    this.#specialDays = SPECIAL_MONTHS[monthIndex].split(",");
    const onCallList = this.#setOnCallList();

    return onCallList;
  }

  #getStartDateIndex(startDay) {
    return DAYS.indexOf(startDay);
  }

  #getMonthDays(monthIndex) {
    return MONTHS[monthIndex];
  }

  #setOnCallList() {
    let onCallList = [];
    let yesterdayOnCall = "";

    for (let i = 1; i <= this.#monthDays; i++) {
      const today = (i + this.#startDateIndex - 1) % 7;

      if (today === 0 || today === 6) {
        yesterdayOnCall = this.#getWeekendWorker(yesterdayOnCall);
      } else if (this.#specialDays.includes(i.toString())) {
        yesterdayOnCall = this.#getWeekendWorker(yesterdayOnCall);
        onCallList.push(
          `${this.#month}${FORMAT_OUTPUT.month} ${i}${FORMAT_OUTPUT.date} ${
            DAYS[today]
          }${FORMAT_OUTPUT.holiday} ${yesterdayOnCall}`
        );

        continue;
      } else {
        yesterdayOnCall = this.#getWeekWorker(yesterdayOnCall);
      }

      onCallList.push(
        `${this.#month}${FORMAT_OUTPUT.month} ${i}${FORMAT_OUTPUT.date} ${
          DAYS[today]
        } ${yesterdayOnCall}`
      );
    }

    return onCallList;
  }

  #getWeekendWorker(yesterdayOnCall) {
    if (this.#weekendOnCall[0] !== yesterdayOnCall) {
      yesterdayOnCall = this.#weekendOnCall[0];
      this.#weekendOnCall.shift();
    } else {
      yesterdayOnCall = this.#weekendOnCall[1];
      this.#weekendOnCall.splice(1, 1);
    }
    this.#weekendOnCall.push(yesterdayOnCall);
    return yesterdayOnCall;
  }

  #getWeekWorker(yesterdayOnCall) {
    if (this.#weekOnCall[0] !== yesterdayOnCall) {
      yesterdayOnCall = this.#weekOnCall[0];
      this.#weekOnCall.shift();
    } else {
      yesterdayOnCall = this.#weekOnCall[1];
      this.#weekOnCall.splice(1, 1);
    }
    this.#weekOnCall.push(yesterdayOnCall);
    return yesterdayOnCall;
  }
}
export default OnCall;
