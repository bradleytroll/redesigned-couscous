const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        token: String
    }

    type Review {
        _id: ID
        attraction: String
        user: User
        rating: Int
        comment: String
    }

    type Query {
        users: [User]
        user(id: ID!): User
        reviews: [Review]
        review(id: ID!): Review
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        addReview(attraction: String!, rating: Int!, comment: String): Review
    }
`;

module.exports = typeDefs;
