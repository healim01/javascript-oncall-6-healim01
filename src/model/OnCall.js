import {
  DAYS,
  FORMAT_OUTPUT,
  MONTHS,
  SPECIAL_MONTHS,
} from "../constants/system.js";

class OnCall {
  setOnCall(month, startDay, weekOnCall, weekendOnCall) {
    const monthIndex = Number(month) - 1;
    const startDateIndex = this.#getStartDateIndex(startDay);
    const monthDays = this.#getMonthDays(monthIndex);
    const specialDays = SPECIAL_MONTHS[monthIndex].split(",");
    const onCallList = this.#setOnCallList(
      month,
      monthDays,
      startDateIndex,
      weekOnCall,
      weekendOnCall,
      specialDays
    );

    return onCallList;
  }

  #getStartDateIndex(startDay) {
    return DAYS.indexOf(startDay);
  }

  #getMonthDays(monthIndex) {
    return MONTHS[monthIndex];
  }

  #setOnCallList(
    month,
    monthDays,
    startDateIndex,
    weekOnCall,
    weekendOnCall,
    speicalDays
  ) {
    let onCallList = [];
    let yesterdayOnCall = "";

    for (let i = 1; i <= monthDays; i++) {
      const today = (i + startDateIndex - 1) % 7;

      if (today === 0 || today === 6) {
        if (weekendOnCall[0] !== yesterdayOnCall) {
          yesterdayOnCall = weekendOnCall[0];
          weekendOnCall.shift();
        } else {
          yesterdayOnCall = weekendOnCall[1];
          weekendOnCall.splice(1, 1);
        }
        weekendOnCall.push(yesterdayOnCall);
      } else if (speicalDays.includes(i.toString())) {
        if (weekendOnCall[0] !== yesterdayOnCall) {
          yesterdayOnCall = weekendOnCall[0];
          weekendOnCall.shift();
        } else {
          yesterdayOnCall = weekendOnCall[1];
          weekendOnCall.splice(1, 1);
        }
        onCallList.push(
          `${month}${FORMAT_OUTPUT.month} ${i}${FORMAT_OUTPUT.date} ${DAYS[today]}${FORMAT_OUTPUT.holiday} ${yesterdayOnCall}`
        );
        weekendOnCall.push(yesterdayOnCall);
        continue;
      } else {
        if (weekOnCall[0] !== yesterdayOnCall) {
          yesterdayOnCall = weekOnCall[0];
          weekOnCall.shift();
        } else {
          yesterdayOnCall = weekOnCall[1];
          weekOnCall.splice(1, 1);
        }
        weekOnCall.push(yesterdayOnCall);
      }

      onCallList.push(
        `${month}${FORMAT_OUTPUT.month} ${i}${FORMAT_OUTPUT.date} ${DAYS[today]} ${yesterdayOnCall}`
      );
    }

    return onCallList;
  }
}
export default OnCall;
