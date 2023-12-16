import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readMonth() {
    const input = await Console.readLineAsync(
      "비상 근무를 배정할 월과 시작 요일을 입력하세요>"
    );
    return input;
  },
};
export default InputView;
