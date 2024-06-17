import { gql } from '@apollo/client';

export const GET_REVIEWS = gql`
    query getReviews {
        reviews {
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
