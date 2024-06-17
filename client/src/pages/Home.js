import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../utils/queries';

function Home() {
    const { loading, data } = useQuery(GET_REVIEWS);
    const reviews = data?.reviews || [];

    return (
        <div className="container">
            <h1>Welcome to Theme Park Reviews</h1>
            <p>Sign up or log in to add and view reviews of theme park attractions.</p>
            <div className="mt-5">
                <h2>Recent Reviews</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{review.attraction}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating}</h6>
                                <p className="card-text">{review.comment}</p>
                                <footer className="blockquote-footer">Reviewed by {review.user.username}</footer>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
