import React from 'react';
import classNames from 'classnames/bind';
import styles from './CommentList.module.scss';

const cx = classNames.bind(styles);

const Comment = ({ comment, isSelected, onCommentClick }) => {
    return (
        <div className={cx('comment', { selected: isSelected })} onClick={() => onCommentClick(comment)}>
            <div className={cx('reviewHeader')}>
                <div className={cx('reviewerInfo')}>
                    <span className={cx('reviewer')}>{comment?.userId?.username}</span>
                    <span className={cx('reviewerSource')}>hôm qua</span>
                </div>
                {comment.rating !== null && <div className={cx('reviewRating')}>{comment.rating}/10</div>}
            </div>
            <p className={cx('reviewContent')}>{comment.comment}</p>
        </div>
    );
};

export default Comment;
