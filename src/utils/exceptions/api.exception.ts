

import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from './api.enumcode';

export class ApiException extends HttpException {

  readonly message: string;
  // private errorCode: ApiErrorCode;
	readonly code: ApiErrorCode;

  constructor(code: ApiErrorCode, message: string, statusCode: number) {

    super({code, message}, statusCode);
    this.message = message;
    this.code = code;
  }

  getErrorCode(): ApiErrorCode {
    return this.code;
  }

  getErrorMessage(): string {
    return this.message;
  }
}

