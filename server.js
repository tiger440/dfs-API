const Express = require('express');
const BodyParser = require("body-parser");
const Cors = require("cors");

const port = 3000;
const hostname = 'localhost';

const app = Express();

app.use(Cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

app.use("/formation",require("./router/formation.js"))


app.listen(port, function () {
    console.log(`App listening on ${hostname}${port}`);
});