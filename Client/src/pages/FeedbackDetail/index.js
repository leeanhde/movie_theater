import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './feedbackDetail.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import CommentList from './CommentList/index';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import {create} from '../../services/feedbackService'
const cx = classNames.bind(styles);

const FeedbackDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const feedback = location.state?.feedback;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [selectedComment, setSelectedComment] = useState(null);

    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
    };

    if (!feedback) {
        return <div>Loading...</div>;
    }


    const handleRatingChange = (nextValue) => {
        setRating(nextValue);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const feedbackRes = await create({
            rating,
            comment ,
            movieId : feedback._id
        }) 
        feedbackRes && alert(feedbackRes.message);
        setRating(0);
        setComment(''); 
        } catch (error) {
            
        }

    };
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>{`Review phim ${feedback.movieNameVn}`}</h1>
            <div className={cx('movieInfo')}>
                <img src={feedback.largeImage} alt={feedback.movieNameVn} className={cx('poster')} />
                <div className={cx('details')}>
                    <div className={cx('ratingContainer')}>
                        <span className={cx('rating')}>{feedback.averageRating}</span>
                        <span className={cx('maxRating')}>/10 - {feedback.averageRating > 7 ? 'Cực phẩm' : 'Đáng xem'}</span>
                    </div>
                    <p className={cx('genre')}>{feedback.director}</p>
                    <p className={cx('releaseDate')}>Ngày chiếu: {new Date(feedback.fromDate || null)?.toISOString().split('T')[0] || ''}</p>
                    <button className={cx('bookButton')} onClick={() => navigate('/showtime')}>
                        Đặt vé ngay
                    </button>
                </div>
            </div>
            <div className="comment-rating">
            <h2>Leave a Comment and Rating</h2>
            <form onSubmit={handleSubmit}>
                <div className="rating">
                    <label>Rating:</label>
                    <StarRatingComponent
                        name="rate" 
                        starCount={10}
                        value={rating}
                        onStarClick={handleRatingChange}
                    />
                </div>
                <div className="comment">
                    <label>Comment:</label>
                    <textarea 
                        value={comment}
                        onChange={handleCommentChange}
                        rows="4"
                        cols="50"
                        placeholder="Write your comment here..."
                    />
                </div>
                <button type="submit" className="submit-button" style={{padding:"15px 20px",background:'blue',borderRadius:'10%',color:'white'}}>Submit</button>
            </form>
        </div>
            <div className={cx('reviewsSection')}>
                <h3 className={cx('reviewsTitle')}>Bình luận từ người xem</h3>
                <div className={cx('commentList')}>
                    {feedback.feedbacks.map((comment, index) => (
                        <CommentList
                            key={index}
                            comment={comment}
                            isSelected={selectedComment === comment}
                            onCommentClick={handleCommentClick}
                        />
                    ))}
                </div>
                {selectedComment && (
                    <div className={cx('selectedComment')}>
                        <CommentList comment={selectedComment} isSelected={true} onCommentClick={handleCommentClick} />
                        {selectedComment.image && (
                            <img src={selectedComment.image} alt="Review" className={cx('reviewImage')} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackDetail;
