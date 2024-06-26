import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    ShowTimeIcon,
    ShowTimeActiveIcon,
    DashboardIcon,
    DashboardActiveIcon,
    ReportIcon,
    ReportActiveIcon,
    SchedulesIcon,
    SchedulesActiveIcon,
    // Import các Icon khác cần thiết
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar({ role }) {
    const renderMenuItems = () => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <MenuItem
                            title="Manage Movie"
                            to={config.routes.managemovie}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        <MenuItem
                            title="Manage Showtime"
                            to={config.routes.manageshowtime}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        <MenuItem
                            title="Manage Seat"
                            to={config.routes.manageseat}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        <MenuItem
                            title="Manage User"
                            to={config.routes.manageuser}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        <MenuItem
                            title="Manage Revenue"
                            to={config.routes.managerevenue}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />

                        {/* Thêm các MenuItem khác cho Admin */}
                    </>
                );
            case 'staff':
                return (
                    <>
                        <MenuItem
                            title="Schedules"
                            to={config.routes.schedulesstaff}
                            icon={<SchedulesIcon />}
                            activeIcon={<SchedulesActiveIcon />}
                        />
                        <MenuItem
                            title="Manager User Infomation"
                            to={config.routes.manageruser}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        <MenuItem
                            title="Movie Manager Booking"
                            to={config.routes.managerbooking}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        <MenuItem
                            title="Food & Drink"
                            to={config.routes.adminDashboard}
                            icon={<DashboardIcon />}
                            activeIcon={<DashboardActiveIcon />}
                        />
                        {/* Thêm các MenuItem khác cho Staff */}
                    </>
                );
            case 'supervisor':
                return (
                    <>
                        <MenuItem
                            title="Ticket Code Management"
                            to={config.routes.ticketcodemanagement}
                            icon={<ReportIcon />}
                            activeIcon={<ReportActiveIcon />}
                        />
                        <MenuItem
                            title="Manager Staff Schedule"
                            to={config.routes.managestaffschedule}
                            icon={<ReportIcon />}
                            activeIcon={<ReportActiveIcon />}
                        />
                        <MenuItem
                            title="Manager Infomation Staff"
                            to={config.routes.managestaffinfomation}
                            icon={<ReportIcon />}
                            activeIcon={<ReportActiveIcon />}
                        />
                        <MenuItem
                            title="Feedback & Report"
                            to={config.routes.feedbackreport}
                            icon={<ReportIcon />}
                            activeIcon={<ReportActiveIcon />}
                        />
                        {/* Thêm các MenuItem khác cho Supervisor */}
                    </>
                );
            default:
                return (
                    <>
                        <MenuItem
                            title="Home"
                            to={config.routes.home}
                            icon={<HomeIcon />}
                            activeIcon={<HomeActiveIcon />}
                        />
                        <MenuItem
                            title="Feedback"
                            to={config.routes.feedback}
                            icon={<UserGroupIcon />}
                            activeIcon={<UserGroupActiveIcon />}
                        />
                        <MenuItem
                            title="Show Time"
                            to={config.routes.showtime}
                            icon={<ShowTimeIcon />}
                            activeIcon={<ShowTimeActiveIcon />}
                        />
                        <MenuItem
                            title="Movie List"
                            to={config.routes.movielist}
                            icon={<LiveIcon />}
                            activeIcon={<LiveActiveIcon />}
                        />
                        <MenuItem
                            title="Your Ticket"
                            to={config.routes.yourticket}
                            icon={<SchedulesIcon />}
                            activeIcon={<SchedulesActiveIcon />}
                        />
                    </>
                );
        }
    };

    const renderSuggestedAccounts = () => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <SuggestedAccounts label="Thống kê doanh thu" />
                        {/* Thêm các SuggestedAccounts khác cho Admin */}
                    </>
                );
            case 'staff':
                return (
                    <>
                        <SuggestedAccounts label="Lịch làm việc" />
                        {/* Thêm các SuggestedAccounts khác cho Staff */}
                    </>
                );
            case 'supervisor':
                return (
                    <>
                        <SuggestedAccounts label="Báo cáo doanh thu" />
                        {/* Thêm các SuggestedAccounts khác cho Supervisor */}
                    </>
                );
            default:
                return (
                    <>
                        <SuggestedAccounts label="Movie is showing" />
                        <SuggestedAccounts label="Movie coming soon" />
                    </>
                );
        }
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>{renderMenuItems()}</Menu>
            {renderSuggestedAccounts()}
        </aside>
    );
}

export default Sidebar;
