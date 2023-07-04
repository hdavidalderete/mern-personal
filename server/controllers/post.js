const Post = require("../models/post");
const { getFileName } = require("../utils/image");

const getPost = async (req, res) => {
  const { path } = req.params;
  const post = await Post.find({ path });
  res.status(200).send({ post });
};

const getPosts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const optionPagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createAt: "desc" },
  };
  Post.paginate({}, optionPagination, (error, post) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send({ post });
    }
  });
};

const createPost = async (req, res) => {
  const postData = req.body;
  const { miniature } = req.files;
  postData.createAt = new Date();
  const newPost = new Post({
    ...postData,
    miniature: getFileName(miniature),
  });
  const post = await newPost.save();
  res.status(201).send({ post });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const postData = req.body;
  const miniature = req.files?.miniature;

  if (miniature) {
    postData.miniature = getFileName(miniature);
  }
  try {
    const post = await Post.findByIdAndUpdate(id, { ...postData });
    res.status(200).send({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndDelete(id);

  res.status(200).send({ msg: "El post se elimino con exito" });
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
