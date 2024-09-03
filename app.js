const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./Helpers/db')
const { verifyAccessToken } = require('./Helpers/jwthelper')
require('./Helpers/init_redis')
const routes = require('./Routes')
// require('./Helpers/keys')
const PORT = process.env.PORT

const app = express()

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
	res.send({
	  status:1000,
	  message:"Welcome",
	});
  });
app.use("/book",verifyAccessToken, routes.bookroute);
app.use("/user",routes.authroute)

app.use((req, res, next) => {
	res.status(404).send({
	  status: 1001,
	  message: "Route not found",
	});
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
