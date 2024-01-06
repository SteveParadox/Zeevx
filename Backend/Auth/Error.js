import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import config from '../config/config';

const errorConverter = (error, req, res, next) => {
    console.log(error)
}


const errorHandler = (error, req, res, next) => {
   console.log(error);
}

export { errorHandler, errorConverter };
