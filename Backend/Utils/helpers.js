import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from './ApiError.js';

const helper = {};

helper.acceptableCountries = ['nigeria'];
helper.acceptableGender = ['male', 'female'];

helper.comparePassword = async function (oldPassword, newPassword) {
    try {
        const compare = await bcrypt.compare(newPassword, oldPassword);
        return compare;
    } catch (error) {
        throw new ApiError("Error with comparing password", httpStatus.BAD_REQUEST, error);
    }
};

export default helper;
