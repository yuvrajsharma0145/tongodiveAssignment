const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5500;


app.use(express.json());


app.use(cors());

const userRoute = require('./Router/UserRouter');
app.use('/user', userRoute);




const mongurl = "mongodb://localhost:27017/Tongodive";
mongoose.connect(mongurl)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb', err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
