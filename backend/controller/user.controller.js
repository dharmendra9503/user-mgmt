const responseHelper = require('../helpers/response');
const message = require('../helpers/responseMessage');
const userService = require('../services/userService');

const welcome = async (req, res, next) => {
	try {
		return responseHelper.success(res, message.USER.CREATED_SUCCESS, 'Welcome');
	}
	catch (error) {
		console.log('error', error);
		return responseHelper.serverError(res, error);
	}
}
const createUser = async (req, res, next) => {
	try {
		let { firstName, lastName, email, mobile } = req.body;
		email = email.toLowerCase();
		const emailExist = await userService.findUserByEmail(email);
		if (emailExist) {
			return responseHelper.badRequestError(res, message.USER.EMAIL_EXISTS);
		}
		const mobileExist = await userService.findUserByMobile(mobile);
		if (mobileExist) {
			return responseHelper.badRequestError(res, message.USER.PHONE_NUMBER_EXISTS);
		}
		let params = {
			firstName,
			lastName,
			email,
			mobile
		};
		const userData = await userService.createUser(params);
		let response = {
			id: userData.id,
			firstName: userData.firstName,
			lastname: userData.lastName,
			email: userData.email,
			mobile: userData.mobile,
		};
		return responseHelper.success(res, message.USER.CREATED_SUCCESS, response);
	} catch (error) {
		console.log('error', error);
		return responseHelper.serverError(res, error);
	}
}

const getUserList = async (req, res, next) => {
	try {
		let { page = 1, limit = 10 } = req.query;
		let data = [];
		limit = +limit;
		page = page === 0 ? 1 : +page;
		const offset = (page - 1) * limit;

		const pageOptions = {
			offset,
			limit
		}

		const attributes = ['firstName', 'lastName', 'email', 'mobile'];
		const userData = await userService.findAllUser(attributes, pageOptions);
		if (userData.data && userData.count === 0) {
			return responseHelper.badRequestError(res, message.USER.NOT_FOUND);
		}
		for (let user of userData.data) {
			data.push({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				mobile: user.mobile
			})
		}
		const currentPage = parseInt(+page);
		const totalPages = Math.ceil((userData.count / limit)) || 1;
		const respData = {
			count: userData.count,
			rows: data,
			itemsPerPage: limit,
			totalPages: Math.ceil((userData.count / limit)) || 1,
			currentPage: parseInt(+page),
			nextPageUrl: currentPage !== totalPages ? `${process.env.BASEURL}/user/list?page=${parseInt(+page)+1}&limit=${+limit}` : '',
			prevPageUrl: page !== 1 ? `${process.env.BASEURL}/user/list?page=${parseInt(+page)-1}` : ''
		};
		return responseHelper.success(res, message.USER.LIST_SUCCESS, respData);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError(res, error);
	}
}

const getUser = async (req, res, next) => {
	try {
		let { id } = req.params;
		const data = await userService.findUserById(id);
		if (!data) {
			return responseHelper.badRequestError(res, message.USER.NOT_FOUND);
		}
		const modifiedData = { id: data._id, ...data.toObject() };
		delete modifiedData._id;
		delete modifiedData.__v;
		delete modifiedData.isActive;
		return responseHelper.success(res, message.USER.FETCH_SUCCESS, modifiedData);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError(res, error);
	}
}

const deleteUser = async (req, res, next) => {
	try {
		let { id } = req.query;
		const data = await userService.deleteUser(id);
		if (data.matchedCount === 0) {
			return responseHelper.badRequestError(res, message.USER.NOT_FOUND);
		}
		if (data.matchedCount !== 0 && data.modifiedCount === 0) {
			return responseHelper.serverError(res, error);
		}
		return responseHelper.success(res, message.USER.DELETED_SUCCESS);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError(res, error);
	}
}

const updateUserDetails = async (req, res, next) => {
	let { id } = req.query;
	const { firstName, lastName, email, mobile } = req.body;

	try {
		const userExistById = await userService.findUserById(id);
		if(!userExistById) {
			return responseHelper.badRequestError(res, message.USER.NOT_FOUND);
		}
		const userExistByEmail = await userService.findUserByEmail(email);
		if(userExistByEmail && userExistById.email !== email) {
			return responseHelper.badRequestError(res, message.USER.EMAIL_EXISTS);
		}
		const userExistByMobile = await userService.findUserByMobile(mobile);
		if(userExistByMobile && userExistById.mobile !== mobile) {
			return responseHelper.badRequestError(res, message.USER.PHONE_NUMBER_EXISTS);
		}
		const params = {
			firstName,
			lastName,
			email, 
			mobile
		}
		const updatedUser = await userService.updateUser(id, params);
		if(!updatedUser) {
			return responseHelper.badRequestError(res, message.USER.NOT_FOUND);
		}
		const modifiedData = { id: updatedUser._id.toHexString(), ...updatedUser.toObject() };
		delete modifiedData._id;
		delete modifiedData.__v;
		delete modifiedData.isActive;
		return responseHelper.success(res, message.USER.UPDATE_SUCCESS, modifiedData);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError(res, error);
	}
}

module.exports = {
	createUser,
	getUserList,
	getUser,
	deleteUser,
	updateUserDetails,
	welcome
};