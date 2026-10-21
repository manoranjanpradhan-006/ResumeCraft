import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required']
  },
  name: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Guard against compiling model multiple times
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
