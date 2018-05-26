const express = require('express'),
path = require('path'),
//cors = require('cors'),
userApi = require('./api/user.api');

const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./dist/client"));

app.use('/api',userApi);
//angular html5mode fixing
app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/client/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at : http://localhost:${port}`);
});