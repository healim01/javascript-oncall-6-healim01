import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readMonthAndStartDay() {
    const input = await Console.readLineAsync(
      "비상 근무를 배정할 월과 시작 요일을 입력하세요> "
    );
    return input;
  },

  async readWeekOnCall() {
    const input = await Console.readLineAsync(
      "평일 비상 근무 순번대로 사원 닉네임을 입력하세요> "
    );
    return input;
  },

  async readWeekendOnCall() {
    const input = await Console.readLineAsync(
      "휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> "
    );
    return input;
  },
};
export default InputView;
