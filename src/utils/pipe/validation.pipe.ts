// 添加 pipe/validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger, HttpStatus } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiException } from '../exceptions/api.exception';
import { ApiErrorCode } from '../exceptions/api.enumcode';
/**
 * 当出现异常的情况下，会转而通过自定义的HttpExceptionFilter异常过滤器，返回指定的异常对象到前端
 *  管道验证:
 * @Pram - 1.可以把验证函数实例在Body装饰器、Headers装饰器等方法的参数中
 *       - 2.可以写在验证方法的头上，使用UsePipes装饰器，传入实例pipe
 *       - 3.也可以写在验证的整个controller类上，同样使用UsePipes装饰器，传入实例pipe
 *       - 4.当然也可以全局创建pipe，在mian.ts文件的bootstrap里面加入app.useGlobalPipes(new ValidatePipe());来实例管道
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    // Nest支持同步和异步管道
    public async transform(value: any, { metatype }: ArgumentMetadata) {
      if (!metatype || !this.toValidate(metatype)) { // 当metatype不存在或者,验证metatype不是以下类型，直接返回value
        return value;
      }
      const object = plainToClass(metatype, value); // 类转换器函数plainToClass()将我们的普通JavaScript参数对象转换为类型化对象，以便我们可以应用验证。
      const errors: ValidationError[] = await validate(object); // 认证这些属性是否通过
      if (errors.length > 0) {
        Logger.error(errors[0].constraints);
        const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
        Logger.error(`Validation failed: ${msg}`);
        // throw new BadRequestException(`Validation failed: ${msg}`);
        throw new ApiException(ApiErrorCode.VALIDATION_FAILED, `Validation failed: ${msg}`, HttpStatus.BAD_REQUEST);
      }
      return value;
    }

    private toValidate(metatype: any): boolean { // 验证metatype是不是以下类型
      const types: any[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    }
}
