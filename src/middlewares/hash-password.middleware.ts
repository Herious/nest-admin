import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { encript} from 'src/utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  /**
   * 请求中间件, 用于对用户密码进行加密,避免用户账号密码从数据库泄露
   * @param request 
   * @param response 
   * @param next 
   */
  use(request: Request, response: Response, next: NextFunction) {
    let password = request.body['password'];
    if (password) {
      password = encript(password);
      request.body['password'] = password;
    }
    next();
  }
}
