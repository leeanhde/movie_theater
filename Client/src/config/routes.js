const routes = {
    //Guest
    landingpage: 'landingpage',
    login: '/login',
    register: '/register',

    //user router
    home: '/',
    feedback: '/feedback',
    profile: '/@:nickname',
    upload: '/upload',
    search: '/search',
    showtime: '/showtime',
    yourticket: '/yourticket',
    movielist: '/movielist',
    bookingseat: '/showtime/bookingseat',
    bookingfood: '/showtime/bookingfood',
    payment: '/showtime/bookingseat/payment',
    moviedetail: '/moviedetail',
    feedbackdetail: '/feedbackdetail',

    //Admin route
    managemovie: '/managemovie',
    manageshowtime: '/manageshowtime',
    manageseat: '/manageseat',
    manageuser: '/manageuser',
    managerevenue: '/managerevenue',

    //Staff route
    schedulesstaff: '/schedulesstaff',
    manageruser: '/manageruser',
    moviebookinginfo: '/moviebookinginfo/:bookingId',
    managerbooking: '/managerbooking',

    //supervisor route
    ticketcodemanagement: '/ticketcodemanagement',
    managestaffschedule: '/managestaffschedule',
    managestaffinfomation: '/managestaffinfomation',
    feedbackreport: '/feedbackreport'

};

export default routes;
