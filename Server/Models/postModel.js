import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
      desc: { type: String, required: true },
    likes: [],
    images: [String],
    videos: [String], 
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Posts", postSchema);

export default postModel;
