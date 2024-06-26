import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieDetail.module.scss';
import { useLocation } from 'react-router-dom';
import ShowTimeDetail from '~/pages/ShowTimeDetail/ShowTime';
import CommentList from '~/pages/FeedbackDetail/CommentList/index';
import { useState } from 'react';

const cx = classNames.bind(styles);

const MovieDetail = () => {
    const location = useLocation();
    const movie = location?.state?.movie;
    const feedback = location.state?.feedback;

    const [selectedComment, setSelectedComment] = useState(null);

    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('movieDetailContainer')}>
            <div className={cx('moviePoster')}>
                <img src={movie.imageUrl} alt={movie.title} />
            </div>
            <div className={cx('movieDetails')}>
                <h2 className={cx('movieTitle')}>{movie.title}</h2>
                <p className={cx('movieGenre')}>{movie.genre}</p>
                <div className={cx('movieRating')}>
                    <svg className={cx('starIcon')} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {movie.rating}
                </div>
                <p className={cx('movieDescription')}>
                    {/* Thêm mô tả phim tại đây */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna vel faucibus euismod,
                    nibh nisi tincidunt velit, vitae consequat massa ipsum non dolor.
                </p>
            </div>
            <ShowTimeDetail />
            <div className={cx('comment')}>
                <h3 className={cx('reviewsTitle')}>Bình luận từ người xem</h3>
                <div className={cx('commentList')}>
                    {feedback?.userComments ? (
                        feedback.userComments.map((comment, index) => (
                            <CommentList
                                key={index}
                                comment={comment}
                                isSelected={selectedComment === comment}
                                onCommentClick={handleCommentClick}
                            />
                        ))
                    ) : (
                        <div>No comments available</div>
                    )}
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

export default MovieDetail;
