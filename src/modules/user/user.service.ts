
import { Logger } from '@nestjs/common/services/logger.service';
import { UserDTO } from './user.dto';
import { ApiException } from 'src/utils/exceptions/api.exception';
import { ApiErrorCode } from 'src/utils/exceptions/api.enumcode';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';


// @Injectable()
export class UserService {
	private readonly logger = new Logger('UserService');
	constructor(
		@InjectRepository(User)
		private readonly UserRepository: Repository<User>,
	){}

	regist(user: UserDTO) {
		if (!this.checkPhone(user.username)) {
			this.logger.error('无效的手机号: ' + user.username);
			throw new ApiException(ApiErrorCode.INVALID_PHONE, '无效的手机号', 200);
		}
		return this.UserRepository.save(user)
			.then(() => {
				return '注册成功'
			})
			.catch(() => {
				return '注册失败'
			});
		// this.logger.debug(user);

	}

	checkPhone(val: string): boolean {
		if(val == '') {
			return false;
		}
		let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (phoneReg.test(val)) {
			return true;
		} else {
			return false;
		}
	}

	checkCarId(val) {
		if(val == '') {
			return false
		}
		var carIdReg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}|[A-Z0-9]{5}[A-Z0-9挂学警港澳]{1}$)/;
		if (carIdReg.test(val)) {
			return true
		} else {
			return false
		}
	}

	checkIdCard(val) {
		if(val == '') {
			return false
		}
		var carIdReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		if (carIdReg.test(val)) {
			return true
		} else {
			return false
		}
	}


}

