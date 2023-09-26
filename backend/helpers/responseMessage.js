module.exports = {
	errorMessages : {
		BAD_REQUEST: 'Bad request.',
		UNAUTHORISED: 'Unauthorised access. Please login to your account.',
		FORBIDDEN: 'You are not authorised to make this request.',
		NOT_FOUND: 'Endpoint not found.',
		RESOURCE_NOT_FOUND: 'Resource not found.',
		SERVER_ERROR: 'Something went wrong, please try again later.',
		UNAUTHORISED_ACCESS: 'You are not Authorised to access this resource. ',
	  },
	USER: {
		NOT_FOUND: 'No User Found.',
		CREATED_SUCCESS: 'User Added Successfully.',
		FETCH_SUCCESS: "Users Fetch Successfully.",
		INVALID_EMAIL: 'User with this email does not exist',
        EMAIL_EXISTS: 'User is already registered with this email address.',
		PHONE_NUMBER_EXISTS:'User is already registered with this mobile number.',
        INVALID_PASSWORD: 'Invalid Password.',
		LOGIN_SUCCESS: 'Login successful.',
		REGISTER_SUCCESS:'Registration successful.',
		PASSWORD_NOT_MATCH: 'Password and Confirm password is not matched.',
		DEACTIVATED: 'Your account is deactivated',
		INVALID_EMAIL_TOKEN: 'Invalid email token',
		RESET_MAIL_SENT: 'Mail has been successfully sent',
		INVALID_REFERENCE: 'Your reset password link has expired',
		SET_NEW_PASSWORD_SUCCESS: 'New Password set successfully.',
		INVALID_AUTH: 'Please use email sign in option to login',
		CURRENT_PASSWORD_NOT_MATCH: 'Old password does not match',
		PASSWORD_CHANGED: 'User password updated successfully',
		DELETED_SUCCESS: "Users Deleted Successfully.",
		UPDATE_SUCCESS: 'User updated successfully',
		UPDATION_FAILED: 'User details updation failed',
		PROFILE_PIC_VALIDATION: 'Please provide file to upload',
		PROFILE_UPDATE_SUCCESS: 'Profile picture updated successfully',
		LOGGED_OUT: 'User logged out successfully'
	},
	JWT: {
        INVALID_AUTHORIZATION: 'Invalid authorization',
        INVALID_TOKEN: 'Invalid token',
        UNAUTHORIZED:'Your account has been disabled by Admin',
    },
	CONTACT: {
		CREATE_SUCCESS: 'Contact request has been sent successfully',
		NOT_FOUND: 'Contact data not found'
	}
}