export enum AuthErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  LOGIN_FAILED = 'LOGIN_FAILED',
  SNS_AUTH_CANCELLED = 'SNS_AUTH_CANCELLED',
  SNS_AUTH_FAILED = 'SNS_AUTH_FAILED',
  SERVER_ERROR = 'SERVER_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}

export interface AuthErrorMessage {
  title: string;
  message: string;
}

export const AUTH_ERROR_MESSAGES: Record<AuthErrorType, AuthErrorMessage> = {
  [AuthErrorType.NETWORK_ERROR]: {
    title: '인터넷 연결을 확인해주세요',
    message: '네트워크 연결이 불안정합니다.\n잠시 후 다시 시도해주세요.',
  },
  [AuthErrorType.LOGIN_FAILED]: {
    title: '로그인에 실패했어요',
    message: '아이디 또는 비밀번호를 다시 확인해주세요.',
  },
  [AuthErrorType.SNS_AUTH_CANCELLED]: {
    title: '로그인이 취소되었어요',
    message: 'SNS 로그인이 취소되었습니다.',
  },
  [AuthErrorType.SNS_AUTH_FAILED]: {
    title: 'SNS 로그인에 실패했어요',
    message: '다시 시도해주세요.',
  },
  [AuthErrorType.SERVER_ERROR]: {
    title: '일시적인 오류가 발생했어요',
    message: '서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
  },
  [AuthErrorType.TOKEN_EXPIRED]: {
    title: '로그인 정보가 만료되었어요',
    message: '다시 로그인해주세요.',
  },
  [AuthErrorType.TIMEOUT]: {
    title: '요청 시간이 초과되었어요',
    message: '네트워크 상태를 확인하고 다시 시도해주세요.',
  },
  [AuthErrorType.UNKNOWN]: {
    title: '알 수 없는 오류가 발생했어요',
    message: '잠시 후 다시 시도해주세요.',
  },
};
