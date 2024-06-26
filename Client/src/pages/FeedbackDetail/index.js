import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './feedbackDetail.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import CommentList from './CommentList/index';

const cx = classNames.bind(styles);

const FeedbackDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const feedback = location.state?.feedback;

    const [selectedComment, setSelectedComment] = useState(null);

    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
    };

    if (!feedback) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>{`Review phim ${feedback.title} trên MoMo`}</h1>
            <div className={cx('movieInfo')}>
                <img src={feedback.imageUrl} alt={feedback.title} className={cx('poster')} />
                <div className={cx('details')}>
                    <div className={cx('ratingContainer')}>
                        <span className={cx('rating')}>{feedback.rating}</span>
                        <span className={cx('maxRating')}>/10 - {feedback.rating > 7 ? 'Cực phẩm' : 'Đáng xem'}</span>
                    </div>
                    <p className={cx('genre')}>{feedback.genre}</p>
                    <p className={cx('releaseDate')}>Ngày chiếu: {feedback.releaseDate}</p>
                    <button className={cx('bookButton')} onClick={() => navigate('/moviedetail')}>
                        Đặt vé ngay
                    </button>
                </div>
            </div>
            <div className={cx('reviewsSection')}>
                <h3 className={cx('reviewsTitle')}>Bình luận từ người xem</h3>
                <div className={cx('commentList')}>
                    {feedback.userComments.map((comment, index) => (
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
