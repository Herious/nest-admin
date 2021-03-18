import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { Logger } from '@nestjs/common';


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
    .setTitle('Eagle School')
    .setDescription('项目管理接口文档')
    .setVersion('1.0')
    // .addBearerAuth(
    //   {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'jwt'
    // )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   * 使用log4js日志模块替换默认日志
   */
  app.useLogger(app.get(Log4jsLogger));
  Logger.log(`you application  is running hear: localhost:${listenPort}`)
  await app.listen(listenPort);

}
bootstrap();
