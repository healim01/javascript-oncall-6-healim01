import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error("NO INPUT");
    }

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expects) => {
  expects.forEach((exp) => {
    expect(received).toContain(exp);
  });
};

const runExceptions = async ({
  inputs = [],
  retryInputs = [],
  expected = [],
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...retryInputs]);

  // when
  const app = new App();
  await app.run();

  // then
  expectLogContains(getOutput(logSpy), expected);
};

const run = async ({ inputs = [], expected = [] }) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions(inputs);

  // when
  const app = new App();
  await app.run();

  expectLogContains(getOutput(logSpy), expected);
};

describe("기능 테스트", () => {
  test("연속 근무일 시 다음 근무자와 순서를 바꿔 편성되는지 확인(휴일) 테스트", async () => {
    await runExceptions({
      inputs: [
        "5,월",
        "준팍,도밥,고니,수아,루루,글로,솔로스타,우코,슬링키,참새,도리",
        "수아,루루,글로,솔로스타,우코,슬링키,참새,도리,준팍,도밥,고니",
      ],
      expected: [
        "5월 1일 월 준팍" + LINE_SEPARATOR,
        "5월 2일 화 도밥" + LINE_SEPARATOR,
        "5월 3일 수 고니" + LINE_SEPARATOR,
        "5월 4일 목 수아" + LINE_SEPARATOR,
        "5월 5일 금(휴일) 루루" + LINE_SEPARATOR,
        "5월 6일 토 수아" + LINE_SEPARATOR,
      ],
    });
  });

  test("연속 근무일 시 다음 근무자와 순서를 바꿔 편성되는지 확인(평일) 테스트", async () => {
    await runExceptions({
      inputs: [
        "10,월",
        "준팍,도밥,수아,루루,글로,솔로스타,우코,슬링키,참새,도리,고니",
        "수아,루루,글로,솔로스타,우코,슬링키,참새,도리,준팍,도밥,고니",
      ],
      expected: [
        "10월 1일 월 준팍" + LINE_SEPARATOR,
        "10월 2일 화 도밥" + LINE_SEPARATOR,
        "10월 3일 수(휴일) 수아" + LINE_SEPARATOR,
        "10월 4일 목 루루" + LINE_SEPARATOR,
        "10월 5일 금 수아" + LINE_SEPARATOR,
        "10월 6일 토 루루" + LINE_SEPARATOR,
      ],
    });
  });

  test("법정 공휴일 휴일 처리 확인 테스트", async () => {
    await runExceptions({
      inputs: [
        "10,월",
        "준팍,도밥,수아,루루,글로,솔로스타,우코,슬링키,참새,도리,고니",
        "수아,루루,글로,솔로스타,우코,슬링키,참새,도리,준팍,도밥,고니",
      ],
      expected: ["(휴일)"],
    });
  });
});
