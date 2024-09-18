export enum HttpCode {
  ShouldProxy = 400,
  Unauthorized = 401,
  Other = 500,
  AccessDenied_510 = 510,
  Unknown = 0,
  MailboxAccessDenied = 511,
  UnknownDomainName = 512,
  UnknownAccount = 513,
  IncorrectPassword = 514,
  AccountOrPassword = 515,
  MailboxNotFound = 516,
  ServiceDisabled = 517,
  AccountHasMoved = 518,
  AccountExists = 520,
  AliasExists = 521,
  MailListExists = 522,
  GroupExists = 523,
  ForwarderExists = 524,
  BadObjectName = 525,
  MailboxDoesNotExistButCanBeCreated = 530,
  OnlyFolderExistButMailboxCanBeCreated = 531,
  MailboxAlreadyExists = 532,
  MailboxAliasAlreadyExists = 533,
  IllegalError = 534,
  ServiceDisabled_536 = 536,
  MobileDisabled = 537,
  AccountIsFull = 538,
  BadMailboxName = 539,
  TLSDisabled_540 = 540,
  TLSDisabled_541 = 541,
  RADIUSRejected = 544,
  ServiceNotLicensed = 549,
  InTransition = 551,
  UnknownGroup = 552,
  UnknownForwarder = 553,
  TooManyFailedLogins = 554,
  AccountInUse = 555,
  MailInDisabled = 557,
  MailInFlowControl = 558,
  MailOutFlowControl = 559,
  RecordDNNotFound = 560,
  RecordDNAlreadyExists = 561,
  AccessDenied = 569,
  NotSupportedError = 570,
  BadEvent = 580,
  ConditionFalse = 581,
  TooManyContacts = 582,
  isDirectory = 598,
  notFound = 599
}

export class HttpError {
  text?: any
  code?: number
  isDisplayable?: boolean

  constructor(text?: any, code?: HttpCode, isDisplayable: boolean = false) {
    this.text = text
    this.code = code
    this.isDisplayable = isDisplayable

    switch (code) {
      case undefined:
        this.text = undefined
        this.isDisplayable = undefined
        break
      case 400:
        this.text = 'HTTP_ERROR.BAD_REQUEST'
        this.isDisplayable = false
        break
      case 401:
        this.text = 'HTTP_ERROR.UNAUTHORIZED'
        this.isDisplayable = false
        break
      case 500:
        this.isDisplayable = false
        break
      case 510:
        this.text = 'HTTP_ERROR.ACCESS_DENIED'
        this.isDisplayable = false
        break
      case 0:
        this.text = 'HTTP_ERROR.UNKNOWN'
        this.isDisplayable = false
        break
      case 511:
        this.text = 'HTTP_ERROR.MAILBOX_ACCESS_DENIED'
        this.isDisplayable = false
        break
      case 512:
        this.text = 'HTTP_ERROR.UNKNOWN_DOMAIN_NAME'
        this.isDisplayable = true
        break
      case 513:
        this.text = 'HTTP_ERROR.UNKNOWN_ACCOUNT'
        this.isDisplayable = true
        break
      case 514:
        this.text = 'HTTP_ERROR.INCORRECT_PASSWORD'
        this.isDisplayable = true
        break
      case 515:
        this.text = 'HTTP_ERROR.ACCOUNT_OR_PASSWORD'
        this.isDisplayable = true
        break
      case 516:
        this.text = 'HTTP_ERROR.MAILBOX_NOT_FOUND'
        this.isDisplayable = false
        break
      case 517:
        this.text = 'HTTP_ERROR.SERVICE_DISABLED'
        this.isDisplayable = false
        break
      case 518:
        this.text = 'HTTP_ERROR.ACCOUNT_HAS_MOVED'
        this.isDisplayable = false
        break
      case 520:
        this.text = 'HTTP_ERROR.ACCOUNT_EXISTS'
        this.isDisplayable = false
        break
      case 521:
        this.text = 'HTTP_ERROR.ALIAS_EXISTS'
        this.isDisplayable = false
        break
      case 522:
        this.text = 'HTTP_ERROR.MAIL_LIST_EXISTS'
        this.isDisplayable = false
        break
      case 523:
        this.text = 'HTTP_ERROR.GROUP_EXISTS'
        this.isDisplayable = false
        break
      case 524:
        this.text = 'HTTP_ERROR.FORWARDER_EXISTS'
        this.isDisplayable = false
        break
      case 525:
        this.text = 'HTTP_ERROR.BAD_OBJECT_NAME'
        this.isDisplayable = false
        break
      case 530:
        this.text = 'HTTP_ERROR.MAILBOX_DOES_NOT_EXIST_BUT_CAN_BE_CREATED'
        this.isDisplayable = false
        break
      case 531:
        this.text = 'HTTP_ERROR.ONLY_FOLDER_EXIST_BUT_MAILBOX_CAN_BE_CREATED'
        this.isDisplayable = false
        break
      case 532:
        this.text = 'HTTP_ERROR.MAILBOX_ALREADY_EXISTS'
        this.isDisplayable = false
        break
      case 533:
        this.text = 'HTTP_ERROR.MAILBOX_ALIAS_ALREADY_EXISTS'
        this.isDisplayable = false
        break
      case 534:
        this.text = 'HTTP_ERROR.ILLEGAL_ERROR'
        this.isDisplayable = false
        break
      case 536:
        this.text = 'HTTP_ERROR.SERVICE_DISABLED'
        this.isDisplayable = false
        break
      case 537:
        this.text = 'HTTP_ERROR.MOBILE_DISABLED'
        this.isDisplayable = false
        break
      case 538:
        this.text = 'HTTP_ERROR.ACCOUNT_IS_FULL'
        this.isDisplayable = false
        break
      case 539:
        this.text = 'HTTP_ERROR.BAD_MAILBOX_NAME'
        this.isDisplayable = false
        break
      case 540:
        this.text = 'HTTP_ERROR.TLS_DISABLED'
        this.isDisplayable = false
        break
      case 541:
        this.text = 'HTTP_ERROR.TLS_DISABLED'
        this.isDisplayable = false
        break
      case 544:
        this.text = 'HTTP_ERROR.RADIUS_REJECTED'
        this.isDisplayable = false
        break
      case 549:
        this.text = 'HTTP_ERROR.SERVICE_NOT_LICENSED'
        this.isDisplayable = false
        break
      case 551:
        this.text = 'HTTP_ERROR.IN_TRANSITION'
        this.isDisplayable = false
        break
      case 552:
        this.text = 'HTTP_ERROR.UNKNOWN_GROUP'
        this.isDisplayable = false
        break
      case 553:
        this.text = 'HTTP_ERROR.UNKNOWN_FORWARDER'
        this.isDisplayable = false
        break
      case 554:
        this.text = 'HTTP_ERROR.TOO_MANY_FAILED_LOGINS'
        this.isDisplayable = false
        break
      case 555:
        this.text = 'HTTP_ERROR.ACCOUNT_IN_USE'
        this.isDisplayable = false
        break
      case 557:
        this.text = 'HTTP_ERROR.MAIL_IN_DISABLED'
        this.isDisplayable = false
        break
      case 558:
        this.text = 'HTTP_ERROR.MAIL_IN_FLOW_CONTROL'
        this.isDisplayable = false
        break
      case 559:
        this.text = 'HTTP_ERROR.MAIL_OUT_FLOW_CONTROL'
        this.isDisplayable = false
        break
      case 560:
        this.text = 'HTTP_ERROR.RECORD_DN_NOT_FOUND'
        this.isDisplayable = false
        break
      case 561:
        this.text = 'HTTP_ERROR.RECORD_DN_ALREADY_EXISTS'
        this.isDisplayable = false
        break
      case 569:
        this.text = 'HTTP_ERROR.ACCESS_DENIED'
        this.isDisplayable = false
        break
      case 570:
        this.text = 'HTTP_ERROR.NOT_SUPPORTED_ERROR'
        this.isDisplayable = false
        break
      case 580:
        this.text = 'HTTP_ERROR.BAD_EVENT'
        this.isDisplayable = false
        break
      case 581:
        this.text = 'HTTP_ERROR.CONDITION_FALSE'
        this.isDisplayable = false
        break
      case 582:
        this.text = 'HTTP_ERROR.TOO_MANY_CONTACTS'
        this.isDisplayable = false
        break
      case 598:
        this.text = 'HTTP_ERROR.IS_DIRECTORY'
        this.isDisplayable = false
        break
      case 599:
        this.text = 'HTTP_ERROR.NOT_FOUND'
        this.isDisplayable = false
        break
      default:
        this.text = 'Unknown Error'
        this.isDisplayable = false
        break
    }

    // Add your initialization code here
  }
}

export type HttpErrors = HttpError[]

export function isHttpError(obj: any): obj is HttpError {
  console.log('isHttpError', obj)
  return obj && (obj.status < 200 || obj.status >= 300)
}
