const express = require('express');
const app = express();
// const dbConnect = require('./database/dbConnect.js');
const analytics = require('./routes/analytics');
const PORT = 5000;

async function serverStart() {
    try {
        // await dbConnect();
        // console.log("Successfully Connected to Database.");

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use('/api', analytics);

        app.listen(PORT, () => {
            console.log("Server established at port " + PORT);
        });
    } catch (err) {
        console.log(err);
    }
}

serverStart();