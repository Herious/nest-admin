import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './utils/pipe/validation.pipe';
import { TransformInterceptor } from './utils/interceptor/transform.interceptor';
import { loggerMiddleware } from 'src/middlewares/logger.middleware';



async function bootstrap() {
  const listenPort = 3096;

  /**
   * 创建主程序, 移除默认log模块
   */
  const app = await NestFactory.create(AppModule, {logger: false});

  /**
   * 配置 Swagger API
   */
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('user login')
    .setDescription('项目管理接口文档')
    .setVersion('1.0')
    // .addBearerAuth(
    //   {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'jwt'
    // )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   * 配置拦截器
   */
  app.useGlobalInterceptors(new TransformInterceptor());

  /**
   * 配置中间件
  */
  app.use(loggerMiddleware);

  /**
   * 配置管道
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * 配置允许跨域
   */
  app.enableCors()

  /**
   * 使用log4js日志模块替换默认日志
   */
  app.useLogger(app.get(Log4jsLogger));
  Logger.log(`you application  is running hear: localhost:${listenPort}`)
  await app.listen(listenPort);

}
bootstrap();
