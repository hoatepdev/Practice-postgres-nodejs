const express = require("express");
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index"));

app.listen(4000, () => console.log("Server listening on port 4000"));
