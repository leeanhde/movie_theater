# Movie Theater Management

The management system allows for easy performance of the functions of movie theater operation management, especially ticket sales of employees and ticket booking by users. The biggest goal of the system is to improve the performance of employees, minimize the time spent conducting ticket sales with each customer, facilitate booking, increase sales, minimize manpower and make the movie theater more competitive compared with other movie theaters

## Table of Contents

- [Movie Theater Management](#movie-theater-management)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Technologies Used](#technologies-used)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.20.2 or higher)
- [npm](https://www.npmjs.com/)

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/leeanhde/movie_theater.git
   ```

2. Navigate to the backend directory:

   ```sh
   cd your-repo-name/Backend
   ```

3. Install the backend, frontend dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file and add the necessary environment variables:

   ```env
   PORT=9999
   DB_URI=your_database_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:

   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../Frontend
   ```

2. Install the frontend dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add the necessary environment variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:

   ```sh
   npm start
   ```

## Technologies Used

- Node.js
- Express
- MongoDB
- React
- Redux
- Others
