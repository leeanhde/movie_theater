require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const bodyParser = require("body-parser");
const db = require("./model/index");
const { storyRoute, personRouter } = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(morgan());
//router toi web root
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to RestFul API"
    });
});


//tiep nhan cac request tu Client
// app.use("/api/story", storyRoute);
// app.use("/api/person", personRouter);

// kiem soat url ko xac dinh
app.use(async (req, res, next) => {
    next(httpErrors.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
});


// tiep nhan cac req
app.listen(process.env.PORT || 8080, process.env.HOST_NAME, () => {
    console.log(`Server is running at: ${process.env.HOST_NAME}:${process.env.PORT}`);
    db.connectDB();
});
