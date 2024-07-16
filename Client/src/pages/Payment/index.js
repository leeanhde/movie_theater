import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

const Payment = () => {
    const location = useLocation();
    const {
        selectedSeats,
        movieTitle,
        time,
        selectedDay,
        showDate,
        currentDate: formattedDate,
        totalPrice,
    } = location.state || {};
    const foodListString = selectedFoods.map(food =>
        `${food.foodTitle} x ${food.quantity}`
    ).join(', ');
    const [vnpUrl, setVnpUrl] = useState('');
    const [loading, setLoading] = useState(false);  // Thêm state để theo dõi trạng thái loading khi gửi yêu cầu
    console.log(selectedSeats)
    useEffect(() => {
        const createPaymentUrl = async () => {
            try {
                const response = await axios.post('http://localhost:9999/api/vnpay/create_payment_url', {
                    amount: totalPrice,
                    orderInfo: `selectedSeats: ${selectedSeats}, Time: ${time}, Date: ${showDate}`,
                });
                setVnpUrl(response.data.vnpUrl); // Update vnpUrl state
            } catch (error) {
                console.error('Error creating payment URL:', error);
            }
        };
    })
    // Hàm gửi yêu cầu để tạo vé mới
    const handleBookTicket = async () => {
        setLoading(true);  // Bắt đầu trạng thái loading
        try {
            await axios.post('http://localhost:9999/api/booking/bookticket', {
                userId: 'YOUR_USER_ID',  // Thay thế bằng ID của người dùng
                scheduleId: 'YOUR_SCHEDULE_ID',  // Thay thế bằng ID của lịch chiếu
                seats: selectedSeats.map(seat => ({ seatNumber: seat, seatType: seat.includes('A') ? 2 : 1, seatStatus: 0 })),  // Ví dụ, điều chỉnh seatType và seatStatus theo yêu cầu
                snacks: selectedFoods.map(food => ({ foodId: food._id, foodTitle: food.foodTitle, quantity: food.quantity, foodPrice: food.foodPrice })),
                totalAmount: totalPrice,
                paymentMethod: 'vnpay',  // Hoặc giá trị khác tùy thuộc vào phương thức thanh toán
            });
            alert('Ticket booked successfully!');
        } catch (error) {
            console.error('Failed to book ticket:', error);
            alert('Failed to book ticket.');
        } finally {
            setLoading(false);  // Kết thúc trạng thái loading
        }
    };

    return (
        <div className={cx('payment-page')}>
            <div className={cx('movie-details')}>
                <h2 className={cx('title')}>{movieTitle}</h2>
                <div className={cx('info')}>
                    <p>
                        Thời gian: <span>{time}</span>
                    </p>
                    <p>
                        Ngày chiếu: <span>{showDate}</span>
                    </p>
                    <p>
                        Rạp: <span>Beta Quang Trung</span>
                    </p>
                    <p>Số 645 Quang Trung, Phường 11, Quận Gò Vấp, Thành phố Hồ Chí Minh</p>
                    <p>
                        Phòng chiếu: <span>P5</span>
                    </p>
                    <p>
                        Định dạng: <span>2D Lồng tiếng</span>
                    </p>
                    <p>
                        Ghế: <span>{selectedSeats}</span>
                    </p>
                </div>
            </div>
            <div className={cx('qr-code')}>
                <h3>Quét mã QR bằng MoMo để thanh toán</h3>
                <div className={cx('qr-image')}>{/* Ảnh QR code */}</div>
                <p>Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.</p>
                <button
                    style={{
                        fontSize: '20px',
                        padding: '10px 25px',
                        backgroundColor: '#6ec4ff',
                        border: '1px solid blue',
                        borderRadius: '20px',
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            <div className={cx('total-price')}>
                Tạm tính <span>{totalPrice}</span>
            </div>
            <p className={cx('note')}>Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</p>
            {/* Thêm nút để gọi API bookTicket */}
            <button
                className={cx('book-ticket-btn')}
                onClick={handleBookTicket}
                disabled={loading}
            >
                {loading ? 'Đang đặt vé...' : 'Đặt vé'}
            </button>
        </div>
    );
};

export default Payment;
