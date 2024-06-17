import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations';
import { useHistory } from 'react-router-dom';

function AddReview() {
    const [formState, setFormState] = useState({ attraction: '', rating: 1, comment: '' });
    const [addReview, { error }] = useMutation(ADD_REVIEW);
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addReview({
                variables: { ...formState },
            });
            history.push('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container">
            <h2>Add Review</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="attraction">Attraction</label>
                    <input
                        type="text"
                        className="form-control"
                        id="attraction"
                        name="attraction"
                        value={formState.attraction}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={formState.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        className="form-control"
                        id="comment"
                        name="comment"
                        value={formState.comment}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <div className="alert alert-danger mt-3">Adding review failed</div>}
        </div>
    );
}

export default AddReview;
