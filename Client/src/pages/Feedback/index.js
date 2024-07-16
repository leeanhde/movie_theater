import classNames from 'classnames/bind';
import styles from './feedback.module.scss';
import { useNavigate } from 'react-router-dom';
import { truncateComment } from '~/services/utils';
import { getAllFeedbackByMovie } from '~/services/feedbackService';
import { useEffect, useState } from 'react';
function Feedback() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const [feedbacks,setFeedbacks] = useState([]);
    useEffect(() => {
        async function main(){
            const feedback = await getAllFeedbackByMovie();
            console.log("🚀 ~ main ~ feedback:", feedback.movies)
            setFeedbacks(feedback.movies)
        }
        main();
    }, []);

    const handleFeedbackClick = (feedback) => {
        navigate('/feedbackdetail', { state: { feedback } });
    };
    return (
        <div className={cx('app')}>
            <h1>Feedback</h1>
            <div className={cx('video-panel')}>
                {feedbacks && feedbacks?.length !== 0 && feedbacks.slice(0, 3).map((feedback) => (
                    <div key={feedback._id} className={cx('video-card')} onClick={() => handleFeedbackClick(feedback)}>
                        <img src={feedback.largeImage} alt={feedback.movieNameEnglish} />
                        <div className={cx('video-details')}>
                            <h3>{feedback.movieNameEnglish}</h3>
                            <div className={cx('video-stats')}>
                                <span className={cx('rating')}>{feedback.averageRating}</span>
                                <span className={cx('comments')}>{feedback.totalComments}</span>
                            </div>
                        </div>
                        <div className={cx('comments')}>
                            {console.log(feedback?.feedbacks[0]?._id)}
                            {feedback?.feedbacks.slice(0, 1).map((comment, index) => (
                                <div key={`${feedback?._id}-${index}`} className={cx('comment')}>
                                    <div className={cx('user-info')}>
                                        <img
                                            src="data:image/png;base64,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"
                                            alt="User"
                                        />
                                        <span className={cx('username')}>{comment?.userId?.username}</span>
                                    </div>
                                    <p className={cx('comment-text')}>{comment?.content}</p>
                                    {comment?.rating !== null && <div className={cx('rating')}>{comment?.rating}/10</div>} 
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button className={cx('load-more')}>Read more!</button>
        </div>
    );
}

export default Feedback;
