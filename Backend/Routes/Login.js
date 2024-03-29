import express from "express";
const router = express.Router();
import User from '../DB/User.js';
import httpStatus from 'http-status';
import ApiError from '../Utils/ApiError.js';
import helper from '../Utils/helpers.js';
// import passport from 'passport';
import authMiddleware from '../Auth/authMiddleware.js';

const { acceptableGender, acceptableCountries, comparePassword } = helper;

let authController = {};


router.use('/google-login', authMiddleware)


router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;

  let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailReg.test(email) || !password.length) {
      throw new ApiError("WRONG CREDENTIALS", httpStatus.NOT_ACCEPTABLE, "Wrong credentials")
  }

  try {
      const ifExist = await User.findOne({ email });
      if (!ifExist) {
          throw new ApiError("NO ACCOUNT", httpStatus.NOT_ACCEPTABLE, "Account doesn't exist!")
      }

      const oldPassword = ifExist.password;
      if ( !(await comparePassword(oldPassword, password)) ) {
          throw new ApiError("WRONG PASSWORD", httpStatus.NOT_ACCEPTABLE, "Incorrect credentials")
      }

      // if blacklisted
      if (ifExist.isBlacklisted) {
          throw new ApiError("User Account Suspended", httpStatus.UNAUTHORIZED, "Sorry this Account has been susended")

      }

      if (!ifExist.isVerified) {
          throw new ApiError("Verify Account", httpStatus.UNAUTHORIZED, "Account is not verified")
      }
      const access = await ifExist.generateToken(ifExist.id, ifExist.email)
      const refresh = await ifExist.generateRefreshToken(access.accessToken, false)
      res.status(httpStatus.OK).send({ message: "Account is registered successfully", data: filterObjectData(ifExist, access, refresh) })

  } catch (error) {
      console.log(error)
      res.status(httpStatus.BAD_REQUEST).send(error)
  }
});

router.post('/api/logout', async function(req, res, next) {
  try {
      // await User.findByIdAndUpdate(req.id, {$set: {tokens: []}});
      req.logout();
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
     res.status(httpStatus.BAD_REQUEST).send(error)
  }
});

export default router;
