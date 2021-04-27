
import { Logger } from '@nestjs/common/services/logger.service';
import { UserLoginDTO } from './user.dto';
import { ApiException } from 'src/utils/exceptions/api.exception';
import { ApiErrorCode } from 'src/utils/exceptions/api.enumcode';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { encript} from 'src/utils/encription'
import { JwtService } from '@nestjs/jwt';
import { Log4jsLogger } from '@nestx-log4js/core';


@Injectable()
export class UserService {
	readonly logger = new Logger('UserService');
	constructor(
		@InjectRepository(User)
		private readonly UserRepository: Repository<User>,
		private readonly jwtService: JwtService,
	){
		setTimeout(() => {
			this.logger.debug('asda');
		})
	}

	async regist(user: UserLoginDTO) {
		if (!this.checkPhone(user.username)) {
			this.logger.error('无效的手机号: ' + user.username);
			throw new ApiException(ApiErrorCode.INVALID_PHONE, '无效的手机号', 200);
		}
		let userEntity = await this.UserRepository.findOne({username: user.username});
		if (userEntity) {
			throw new ApiException(ApiErrorCode.USERNAME_EXISTS, '该用户名已被注册', 200);
		} else {
			return this.UserRepository.save(user)
			.then(() => {
				return '注册成功'
			})
			.catch((error) => {
				this.logger.error(error);
				throw new ApiException(ApiErrorCode.MYSQL_ERROR, '未知错误', 200);
			});
		}
	}

	async login(user: UserLoginDTO) {
		let userEntity = await this.UserRepository.findOne({username: user.username});
		// this.logger.debug(`userEntity.username, userEntity.password`);
		if (!userEntity) {
			throw new ApiException(ApiErrorCode.USERNAME_NOT_FOUND, '该用户未注册', 200);
		}
		if (userEntity.password === encript(user.password)) {
			let payload = {username: user.username, password: user.password};
			return {
				access_token: this.jwtService.sign(payload),
			};
		} else {
			throw new ApiException(ApiErrorCode.PASSWORD_ERROR, '账号密码错误', 200);
		}
	}

	regExpValidation(param: string, reg: RegExp): boolean {
		return reg.test(param);
	}

	checkPhone(val: string): boolean {
		let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
		return this.regExpValidation(val, phoneReg);
	}

	checkCarId(val: string): boolean {
		var carIdReg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}|[A-Z0-9]{5}[A-Z0-9挂学警港澳]{1}$)/;
		return this.regExpValidation(val, carIdReg);
	}

	checkIdCard(val: string): boolean {
		var carIdReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		return this.regExpValidation(val, carIdReg);
	}

}

