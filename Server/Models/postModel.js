import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    desc: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Posts", postSchema);

export default postModel;
