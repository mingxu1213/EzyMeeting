const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const auth_code = require('./router/auth_code');
const create_database = require('./router/create_database');
const calendar_info = require('./router/calendar_info');
const add_booking = require('./router/add_booking');
const availableTime_info = require('./router/availableTime_info');
const availabletime_modify = require('./router/availableTime_modify');
const subjects_modify = require('./router/subjects_modification');
const subjects_info = require('./router/subjects_info');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use('/', auth_code);
app.use('/authorize', create_database);
app.use('/calendarinfo', calendar_info);
app.use('/addbooking', add_booking);
app.use('/availabletimeinfo', availableTime_info);
app.use('/availabletimemodify', availabletime_modify);
app.use('/subjectsmodify', subjects_modify);
app.use('/subjectsinfo', subjects_info);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running ${PORT}`));