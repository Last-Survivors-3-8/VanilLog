import mongoose from 'mongoose';
import createError from 'http-errors';
import { ERRORS } from '@utils/errors';

export function validateObjectId(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createError(
      ERRORS.INVALID_MONGODB_ID.STATUS_CODE,
      ERRORS.INVALID_MONGODB_ID.MESSAGE,
    );
  }
}
