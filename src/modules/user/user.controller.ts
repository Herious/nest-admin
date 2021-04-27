import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserLoginDTO } from './user.dto'
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户注册接口'
  })
  async regist(@Body() user: UserLoginDTO) {
    return await this.UserService.regist(user)
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录接口'
  })
  async login(@Body() user: UserLoginDTO) {
    return await this.UserService.login(user)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  root() {
    return 'hello word'
  }

}
