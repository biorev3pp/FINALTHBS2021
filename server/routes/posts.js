const express =  require('express');

const { getPosts, getPost, createPost, updatePost, likePost, deletePost } =  require('../controllers/posts.cjs');

const prospectRoutes = express.Router();

prospectRoutes.get('/', getPosts);
prospectRoutes.post('/', createPost);
prospectRoutes.get('/:id', getPost);
prospectRoutes.patch('/:id', updatePost);
prospectRoutes.delete('/:id', deletePost);
prospectRoutes.patch('/:id/likePost', likePost);

module.exports = prospectRoutes;