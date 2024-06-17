const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/theme-park-reviews', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Apollo Server setup
const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    context: ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || '';

        // Try to retrieve a user with the token
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return null;
            return decoded;
        });

        // Add the user to the context
        return { user };
    },
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});
