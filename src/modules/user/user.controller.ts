import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags('用户模块')
@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @Post('regist')
    async regist() {
        return await this.UserService.regist()
    }

}
