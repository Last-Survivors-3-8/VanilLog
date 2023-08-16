import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Comment ||
  mongoose.model('comment', CommentSchema);
