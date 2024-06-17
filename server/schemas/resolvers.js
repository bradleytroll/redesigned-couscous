const User = require('../models/User');
const Review = require('../models/Review');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { id }) => {
            return User.findById(id);
        },
        reviews: async () => {
            return Review.find().populate('user');
        },
        review: async (parent, { id }) => {
            return Review.findById(id).populate('user');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            user.token = token;
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !await user.isCorrectPassword(password)) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            user.token = token;
            return user;
        },
        addReview: async (parent, { attraction, rating, comment }, context) => {
            if (!context.user) {
                throw new Error('You need to be logged in!');
            }
            const review = await Review.create({
                attraction,
                rating,
                comment,
                user: context.user._id,
            });
            return review.populate('user');
        },
    },
};

module.exports = resolvers;
