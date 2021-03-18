import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './user.dto'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户注册接口'
  })
  async regist(@Body() user: UserDTO) {
    return await this.UserService.regist(user)
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录接口'
  })
  async login(@Body() user: UserDTO) {
    return await this.UserService.login(user)
  }

}
