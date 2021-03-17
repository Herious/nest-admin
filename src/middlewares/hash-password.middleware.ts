import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { encript} from 'src/utils/encription'

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let password = req.body['password'];
    if (password) {
      password = encript(password);
      req.body['password'] = password;
    }
    console.log(req.body['password']);
    next();
  }
}
