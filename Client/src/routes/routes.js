import config from '~/config';

// Layouts
import layouts, { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Feedback from '~/pages/Feedback';
import Profile from '~/pages/Profile/index';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import ShowTime from '~/pages/ShowTime';
import YourTicket from '~/pages/YourTicket';
import MovieList from '~/pages/MovieList';
import BookingSeat from '~/pages/BookingSeat';
import BookingFood from "~/pages/BookingFood";
import Payment from '~/pages/Payment';
import MovieDetail from '~/pages/MovieDetail/index';
import FeedbackDetail from '~/pages/FeedbackDetail';

//Guest
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Landingpage from '~/pages/Landingpage';

//Staff
import ManagerUser from '~/pages/ManagerUser';
import SchedulesStaff from '~/pages/SchedulesStaff';
import MovieBookingInfo from '~/pages/MovieBookingInfo';
import ManageBooking from '~/pages/ManagerBooking';

//Supervisor
import TicketCodeManagement from '~/pages/TicketCodeManagement';
import ManageStaffSchedule from '~/pages/ManageStaffSchedule';
import ManagementStaffInformation from '~/pages/ManageStaffInformation';
import FeedbackReport from '~/pages/FeedbackReport';

//admin
import ManageMovie from '~/pages/ManageMovie';
import ManageShowtime from '~/pages/ManageShowtime';
import ManageSeat from '~/pages/ManageSeat';
import ManageUser from '~/pages/ManageUser';
import ManageRevenue from '~/pages/ManageRevenua';
import ManageStaff from '~/pages/ManageStaff';

// Public routes
const publicRoutes = [
    { path: config.routes.landingpage, component: Landingpage, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.feedback, component: Feedback },
    { path: config.routes.showtime, component: ShowTime },
    { path: config.routes.yourticket, component: YourTicket },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.movielist, component: MovieList },
    { path: config.routes.payment, component: Payment, layout: HeaderOnly },
    { path: config.routes.moviedetail, component: MovieDetail, layout: HeaderOnly },
    { path: config.routes.feedbackdetail, component: FeedbackDetail, layout: HeaderOnly },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.bookingseat, component: BookingSeat, layout: HeaderOnly },
    { path: config.routes.bookingfood, component: BookingFood, layout: HeaderOnly },
];

const privateRoutesStaff = [
    { path: config.routes.manageruser, component: ManagerUser },
    { path: config.routes.schedulesstaff, component: SchedulesStaff },
    { path: config.routes.moviebookinginfo, component: MovieBookingInfo },
    { path: config.routes.managerbooking, component: ManageBooking },
];

const privateRoutesSupervisor = [
    { path: config.routes.ticketcodemanagement, component: TicketCodeManagement },
    { path: config.routes.managestaffschedule, component: ManageStaffSchedule },
    { path: config.routes.managestaffinfomation, component: ManagementStaffInformation },
    { path: config.routes.feedbackreport, component: FeedbackReport },
];

const privateRoutesAdmin = [
    { path: config.routes.managemovie, component: ManageMovie },
    { path: config.routes.manageshowtime, component: ManageShowtime },
    { path: config.routes.manageseat, component: ManageSeat },
    { path: config.routes.manageuser, component: ManageUser },
    { path: config.routes.managestaff, component: ManageStaff },
    { path: config.routes.managerevenue, component: ManageRevenue },
];

export { publicRoutes, privateRoutes, privateRoutesStaff, privateRoutesSupervisor, privateRoutesAdmin };
