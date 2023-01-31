const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/connectDB");
const errorHandler = require("./src/middleware/errorHandler");

const usersRoutes = require("./src/routes/users");
const productsRoutes = require("./src/routes/products");
const ordersRoutes = require("./src/routes/orders");

//configuration
dotenv.config();
const app = express();

//database connection
connectDB();

// 3rd party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/orders", ordersRoutes);

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
