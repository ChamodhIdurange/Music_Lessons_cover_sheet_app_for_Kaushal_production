const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 8070;
  app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection successful");
});

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter);

const CoversRouter = require("./routes/covers.js");
app.use("/covers", CoversRouter);

const MainCategoryRouter = require("./routes/mainCategory.js");
app.use("/mainCategory", MainCategoryRouter);

const SubCategoryRouter = require("./routes/subCategory.js");
app.use("/subCategory", SubCategoryRouter);

const adminRouter = require("./routes/admins.js");
app.use("/admin", adminRouter);

const feedbackRouter = require("./routes/feedbacks.js");
app.use("/feedback", feedbackRouter);

const orderRouter = require("./routes/orders.js");
app.use("/order", orderRouter);

const customerRouter = require("./routes/customers.js");
app.use("/customer", customerRouter);

const shoppingCartRouter = require("./routes/shoppingCarts.js");
app.use("/shoppingCart",shoppingCartRouter); 

const TestCustomerRouter = require("./routes/Testcustomers.js");
app.use("/testcustomer",TestCustomerRouter );

const TestOrderRouter = require("./routes/testOrders.js");
app.use("/testOrder",TestOrderRouter );

const JWTTestRouter = require("./routes/jwtTestRoute.js");
app.use("/jwtTest",JWTTestRouter );

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
