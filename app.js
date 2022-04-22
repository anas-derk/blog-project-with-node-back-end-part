// create express app

const app = require("express")();

// import and using cross origin resource sharing module for manipulate with requests from external links

const cors = require("cors");

app.use(cors());

// import and using body parser module for manipulate with form data

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// create server and running it

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`The Server Is Running On: http://localhost:${port}`))