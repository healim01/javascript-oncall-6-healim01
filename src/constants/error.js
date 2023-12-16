const ERROR = Object.freeze({
  ERROR: "[ERROR]",
  INVALID_INPUT: "유효하지 않은 입력 값입니다.",
  INVALID_MONTH: "월은 1~12 사이의 값이어야 합니다.",
  INVALID_STARTDAY_LENGTH: "요일은 한 글자의 값이어야 합니다.",
  INVALID_STARTDAY: "요일은 일월화수목금토 중 하나의 값이어야 합니다.",
  INVALID_NAME_LENGTH: "닉네임은 5글자 이하의 값이어야 합니다.",
  INVALID_WORK_TIME:
    "비상 근무자는 평일 순번, 휴일 순번에 각각 1회만 편성되어야 합니다.",
  INVALID_WORKER_NUMBER: "비상 근무자는 최소 5명, 최대 35명이어야 합니다.",
});
export default ERROR;
