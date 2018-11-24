/** require dependencies */
const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/Database";

/** connect to MongoDB datastore */
mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .catch(error => {
    console.error(`mongoose connect error: ${error}`);
  });

let port = 5000 || process.env.PORT;

/** set up routes {API Endpoints} */
router.route("*").get((req, res, next) => {
  console.log("GET req.url", req.url);
  next();
});
routes(router);

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use("/api", router);

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
