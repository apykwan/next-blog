import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  image: String
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model("User", userSchema);