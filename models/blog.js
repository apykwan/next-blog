import { Schema, model, models } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: String,
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  }
}, {
  timestamps: true
});

export default models.Blog || model("Blog", blogSchema);