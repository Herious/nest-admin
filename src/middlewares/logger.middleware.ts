import { Logger } from '@nestjs/common/services/logger.service';
import { NextFunction } from 'express';

interface _Request extends Request {
	readonly ip: string;
}

function loggerMiddleware(request:_Request, response: Response, next: NextFunction) {
	const logger = new Logger('Middleware');
	// logger.debug(response);
  logger.debug(`${request.ip}  "${request.method} ${request.url}" ${request.headers['content-length']} ${request.headers['user-agent']} ${request.headers['referer']}`);
  next();
};


export { loggerMiddleware }
