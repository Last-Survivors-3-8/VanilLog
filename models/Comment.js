import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Comment ||
  mongoose.model('Comment', CommentSchema);
