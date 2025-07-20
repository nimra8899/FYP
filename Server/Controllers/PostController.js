import postModel from '../Models/postModel.js';
import mongoose from 'mongoose';
import UserModel from "../Models/userModel.js";


// Create new post
export const createPost = async (req, res) => {

    try {
        console.log("Creating post with data:", req.body);
    const newPost = new postModel({
      ...req.body,
      images: req.body.images || [],
      videos: req.body.videos || [],
    });

    await newPost.save();
    const populatedPost = await newPost.populate('userId', 'firstname lastname profilePicture');
    res.status(200).json(populatedPost);
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post", error });
  }
};



// get a post
export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


//Update a Post
// Update a Post
export const updatePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body

  try {
    const post = await postModel.findById(postId)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Action forbidden" })
    }

    // Update fields including images/videos if present
    await post.updateOne({ $set: req.body })

    // Fetch the updated post and populate user data
    const updatedPost = await postModel
      .findById(postId)
      .populate("userId", "firstname lastname profilePicture")

    res.status(200).json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    res.status(500).json({ message: "Failed to update post", error })
  }
}



// delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}


// Like/Dislike a Post

export const like_dislike_Post = async (req, res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked.")
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post unliked.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// Get timeline a Posts
export const timeline = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch own posts with populated user info
    const currentUserPosts = await postModel
      .find({ userId })
      .populate('userId', 'firstname lastname profilePicture');

    // Fetch followed users' posts using aggregation
    const followingUserPostsAgg = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'followingUserPosts'
        }
      },
      { $project: { followingUserPosts: 1, _id: 0 } }
    ]);

    const followingPosts = followingUserPostsAgg[0]?.followingUserPosts || [];

    // Manually populate userId field in each followed user's post
    const populatedFollowingPosts = await Promise.all(
      followingPosts.map(async (post) => {
        const user = await UserModel.findById(post.userId).select(
          'firstname lastname profilePicture'
        );
        return {
  _id: post._id,
  desc: post.desc,
  images: post.images,
  videos: post.videos,
  likes: post.likes,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  userId: user,
};

      })
    );

    // Combine and sort all posts
    const allPosts = [...currentUserPosts, ...populatedFollowingPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch timeline posts', error });
  }
};
