import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from './ApiError.js';

const helper = {
    acceptableCountries: ['nigeria'],
    acceptableGender: ['male', 'female'],
    
    comparePassword: async function (oldPassword, newPassword) {
        try {
            const compare = await bcrypt.compare(newPassword, oldPassword);
            return compare;
        } catch (error) {
            throw new ApiError("Error with comparing password", httpStatus.BAD_REQUEST, error);
        }
    }
};

export default helper;