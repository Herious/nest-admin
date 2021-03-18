export enum ApiErrorCode {
	TIMEOUT = -1, // 系统繁忙
	SUCCESS = 0, // 成功

	VALIDATION_FAILED = 10001, //参数校验失败
	REGISTER_FAILED = 10010,	//用户注册失败, 用户已注册
	LOGIN_FAILED = 10010,	//用户名和密码不匹配

	TRANSACTION_FAILED = 10030,	//数据库事务执行失败
	Appeal_NOT_FOUND = 10031, //未查询到数据库结果
	INVALID_PHONE = 10040,
	USERNAME_EXISTS = 10041,
	USERNAME_NOT_FOUND = 10042,
	PASSWORD_ERROR = 10043,

	MYSQL_ERROR = 10096,



}