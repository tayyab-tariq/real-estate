import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listingModel.js';
import asyncHandler from 'express-async-handler';


const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};


const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));

  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  const { password, ...rest } = updatedUser._doc;

  res.status(200).json(rest);
});


const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie('access_token');
  res.status(200).json('User has been deleted!');
  
});


const getUserListings = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
});


const getUser = asyncHandler(async (req, res, next) => {
     
  const user = await User.findById(req.params.id);

  if (!user) return next(errorHandler(404, 'User not found!'));

  const { password: pass, ...rest } = user._doc;

  res.status(200).json(rest);
  
});

export {
  test,
  getUser,
  getUserListings,
  updateUser,
  deleteUser
}