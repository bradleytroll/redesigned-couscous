import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation addReview($attraction: String!, $rating: Int!, $comment: String) {
        addReview(attraction: $attraction, rating: $rating, comment: $comment) {
            _id
            attraction
            rating
            comment
            user {
                username
            }
        }
    }
`;
