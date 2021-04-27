import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log4jsModule, LOG4JS_DEFAULT_LAYOUT, LOG4JS_NO_COLOUR_DEFAULT_LAYOUT } from '@nestx-log4js/core';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nest-admin',
        // timezone: 'UTC',
        // charset: 'utf8mb4',
        charset: 'utf8mb4',
        entities: ['./**/*.entity.js'],
        synchronize: true,
        logging: false,  //关闭sql语句打印
      })
    }),
    Log4jsModule.forRoot({
      // name: 'a',
      config: {
        appenders: {
          stdout: {
            type: 'stdout',
            layout: LOG4JS_DEFAULT_LAYOUT
          },
          file: {
            type: 'file',
            filename: './logs/application.log',
            maxLogSize: 20 * 1024 * 1024, // maxLogSize use bytes ad unit
            backups: 10,     // default use 5 so 1KB file size total rotating
            layout: LOG4JS_NO_COLOUR_DEFAULT_LAYOUT
          }
        },
        categories: {
          default: {
            enableCallStack: true,
            appenders: ['stdout', 'file'],
            level: 'debug'
          }
        }
      }
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
