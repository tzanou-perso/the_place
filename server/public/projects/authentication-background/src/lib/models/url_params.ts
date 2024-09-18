export interface urlParamsLogin {
  errorAsXML: string;
  EnableUseCookie: string;
  x2auth: string;
  canUpdatePwd: string;
  version: string;
  userName: string;
  nonce?: string;
  authData?: string;
  sessionid?: string;
  killOld?: string;
}

export interface urlParamsListFeatures {
  errorAsXML: string;
}

export interface urlParamsLogout {
  reqSeq: string;
  syncAsync: string;
  random: string;
}
