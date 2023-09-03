import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    socialLoginType: { type: String, required: true },
    profileImage: { type: String, required: false },
    blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
