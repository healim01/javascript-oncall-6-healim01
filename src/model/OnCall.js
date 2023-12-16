class OnCall {
  #months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  #specialMonths = [
    "1",
    "0",
    "1",
    "0",
    "5",
    "6",
    "0",
    "15",
    "0",
    "3,9",
    "0",
    "25",
  ];

  setOnCall(month, startDay, weekOnCall, weekendOnCall) {
    const monthIndex = Number(month) - 1;
    const startDateIndex = this.#getStartDateIndex(startDay);
    const monthDays = this.#getMonthDays(monthIndex);
    const specialDays = this.#specialMonths[monthIndex].split(",");
    const onCallList = this.#setOnCallList(
      monthDays,
      startDateIndex,
      weekOnCall,
      weekendOnCall,
      specialDays
    );
    const formattedOnCallList = this.#formatOnCallList(
      month,
      monthDays,
      startDateIndex,
      onCallList
    );

    return formattedOnCallList;
  }

  #getStartDateIndex(startDay) {
    const days = "일월화수목금토";
    return days.indexOf(startDay);
  }

  #getMonthDays(monthIndex) {
    return this.#months[monthIndex];
  }

  #setOnCallList(
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
          onCallList.push(weekendOnCall.shift());
        } else {
          yesterdayOnCall = weekendOnCall[1];
          onCallList.push(weekendOnCall[1]);
          weekendOnCall.splice(1, 1);
        }
      } else if (speicalDays.includes(i.toString())) {
        if (weekendOnCall[0] !== yesterdayOnCall) {
          yesterdayOnCall = weekendOnCall[0];
          onCallList.push(weekendOnCall.shift());
        } else {
          yesterdayOnCall = weekendOnCall[1];
          onCallList.push(weekendOnCall[1]);
          weekendOnCall.splice(1, 1);
        }
      } else {
        if (weekOnCall[0] !== yesterdayOnCall) {
          yesterdayOnCall = weekOnCall[0];
          onCallList.push(weekOnCall.shift());
        } else {
          yesterdayOnCall = weekOnCall[1];
          onCallList.push(weekOnCall[1]);
          weekOnCall.splice(1, 1);
        }
      }
    }

    return onCallList;
  }

  #formatOnCallList(month, monthDays, startDateIndex, onCallList) {
    let formattedOnCallList = "";
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 1; i <= monthDays; i++) {
      const today = (i + startDateIndex - 1) % 7;
      formattedOnCallList += `${month}월 ${i}일 ${days[today]} ${
        onCallList[i - 1]
      }\n`;
    }

    return formattedOnCallList;
  }
}
export default OnCall;
