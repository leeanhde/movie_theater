import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MovieDetail.module.scss';
import { useLocation } from 'react-router-dom';
import ShowTimeDetail from '~/pages/ShowTimeDetail/ShowTime';
import CommentList from '~/pages/FeedbackDetail/CommentList/index';
import * as movieService from '~/services/movieService'; 
import moment from 'moment';

const cx = classNames.bind(styles);

const MovieDetail = () => {
    const location = useLocation();
    const movie = location?.state?.movie;
    
    const [movieDetail, setMovieDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedback = location.state?.feedback;

    useEffect(() => {
        const fetchMovieDetail = async () => {
            if (movie) {
                console.log(movie)
                try {
                    const detail = await movieService.getMovieDetail(movie._id); 
                    console.log('detail', detail);
                    setMovieDetail(detail);
                    setError(null);
                } catch (error) {
                    console.error('Error fetching movie detail:', error);
                    setError('Failed to load movie details. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchMovieDetail();
    }, []);

    if (isLoading) {
        return <div>Loading movie details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!movieDetail) {
        return <div>No movie details available.</div>;
    }

    console.log(movieDetail);
    const formattedDate = moment(movieDetail.fromDate).format('DD/MM/YYYY');

    return (
        
        <div className={cx('movieDetailContainer')}>
            <div className={cx('moviePoster')}>
                <img src={movieDetail.largeImage} alt={movieDetail.smallImage} />
            </div>
            <div className={cx('movieDetails')}>
                <h2 className={cx('movieTitle')}>{movieDetail.movieNameEnglish}</h2>
                <p className={cx('movieGenre')}>{movieDetail.types}</p>
                <div className={cx('movieRating')}>
                    <svg className={cx('starIcon')} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {movieDetail.duration}
                </div>
                <p className={cx('movieDescription')}>Nội Dung: 
                    {movieDetail.content} 
                </p>
                <p className={cx('movieDuration')}>Thời gian: 
                    {movieDetail.duration} 
                </p>
                <p className={cx('movieActor')}>Diễn viên: 
                    {movieDetail.actor} 
                </p>
                <p className={cx('movieDate')}>Ngày chiếu: 
                    {formattedDate} 
                </p>
                
            </div>
            {/* <ShowTimeDetail /> */}
            {/* <div className={cx('comment')}>
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
            </div> */}
        </div>
    );
};

export default MovieDetail;
