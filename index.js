const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

const passportConfig = require('./config/passport');
const sequelize = require('./models').sequelize;
const userRoutes = require('./controller/routes/user');
const boardRoutes = require('./controller/routes/board');
const app = express();

app.use(session({
    secret: "Thsdovmfchlrhtkfkdgody!",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800000,
        secure: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(hpp());
// app.use(helmet());
// app.use(cors({
//     origin: true,
//     credentials: true,
//     exposeHeaders: ['Content-Disposition']
// }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views')); // views로 경로 못찾으면 사용 (괜히 더 쓰면 꼬일 수 있음)

app.use('/', userRoutes);
app.use('/', boardRoutes);

sequelize.sync();

let server = app.listen(process.env.PORT || 80, () => {
    let port = server.address().port;
    let host = server.address().host;
    console.log(`서버 온 ~ ${host}:${port}`);
});