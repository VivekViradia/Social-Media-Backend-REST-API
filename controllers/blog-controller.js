import Blog from "../model/Blog";
import User from "../model/User";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log("Error in getAllBlogs", err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

//----------
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log("error", err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "unable to find User by this ID" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTranscation();
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({message:err})
  }
  return res.status(200).json({ blog });
};

//---------
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    console.log("Error", err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};

//----------
export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log("Error", err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blog });
};

//---------
export const deleteById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (err) {
    console.log("Error", err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable to Delete Blog" });
  }
  return res.status(200).json({ message:"Successfully Blog Deleted" });
};
