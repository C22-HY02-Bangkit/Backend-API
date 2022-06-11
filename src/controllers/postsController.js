const AppError = require('../utils/AppError');
const { validationResult, matchedData } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const Post = require('../models').post;
const User = require('../models').user;
const UserProfile = require('../models').user_profile;

exports.getPosts = async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'fullname', 'email'],
                include: [
                    {
                        model: UserProfile,
                        as: 'detail',
                        attributes: ['phone_number', 'province', 'address'],
                    },
                ],
            },
        ],
    });

    if (!posts.length) throw new AppError('Posts not found!', 404);

    res.json({
        status: 'success',
        code: 200,
        data: posts,
    });
};

exports.getPost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findOne({
        where: { id },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'fullname', 'email'],
                include: [
                    {
                        model: UserProfile,
                        as: 'detail',
                        attributes: ['phone_number', 'province', 'address'],
                    },
                ],
            },
        ],
    });

    if (!post) throw new AppError('Post not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: post,
    });
};

exports.addPost = async (req, res) => {
    const { id: user_id } = req.user;

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    const newPost = await Post.create({
        id: uuidv4(),
        user_id,
        ...bodyData,
    });

    if (!newPost) throw new AppError('Add post failed!', 404);

    res.json({
        code: 200,
        status: 'success',
        message: 'New post added!',
        data: newPost,
    });
};

exports.editPost = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, {
        locations: ['body'],
        includeOptionals: false,
    });

    //find post to update
    const post = await Post.findOne({ where: { id } });
    if (!post) throw new AppError('Post not found!', 404);

    // check if user has access
    if (post.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    //update post
    const updateDevice = await post.update({ ...bodyData });

    //check post update
    if (!updateDevice) throw new AppError('Update post failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update post success!',
        data: post,
    });
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

    //find post
    const post = await Post.findOne({ where: { id } });
    if (!post) throw new AppError('Post not found!', 404);

    // check if user has access
    if (post.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    //delete post
    await post.destroy();

    res.json({
        code: 200,
        status: 'success',
        message: 'Delete post success!',
        postid: post.id,
    });
};
