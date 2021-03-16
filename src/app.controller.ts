import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@Controller()
@ApiTags('主路由')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'root'
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
