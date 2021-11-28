const router = require("express").Router();
const Order = require("../models/order");
let Feedback = require("../models/order");
let Customer = require("../models/customer");

//Add Order
router.route("/addOrder").post(async (req, res) => {
  const { OrderID, CoverIDs, CustomerID, TotalPrice, ReferenceNo } = req.body;

  const newOrder = new Order({
    OrderID,
    CoverIDs,
    CustomerID,
    TotalPrice,
    ReferenceNo,
  });

  newOrder
    .save()
    .then(() => {
      res.status(201).json({ message: "Order Added Successfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get one order
router.route("/getOrder/:id").get(async (req, res) => {
  let OrderObjectID = req.params.id;

  //can use findOne if searching by another attribute
  const order = await Order.findById(OrderObjectID)
    .then((covers) => {
      res.json(covers);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Order", error: err.message });
    });
});

//Get All Orders
router.route("/getOrders").get((req, res) => {
  //Variable declared at line 5
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Order
router.route("/updateOrder/:id").put(async (req, res) => {
  let OrderObjectID = req.params.id;

  const { OrderID, CoverIDs, CustomerID, TotalPrice, ReferenceNo } = req.body;

  const UpdatedOrder = new Order({
    OrderID,
    CoverIDs,
    CustomerID,
    TotalPrice,
    ReferenceNo,
  });

  const update = await Order.findByIdAndUpdate(OrderObjectID, UpdatedOrder)
    .then(() => {
      res.json("Order Updated");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//Get orders by customer
router.route("/getorderbycustomer/:id").get(async (req, res) => {
  let id = req.params.id;
  try {
    const result = await Order.find({ CustomerID: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Delete Order
router.route("/deleteOrder/:id").delete(async (req, res) => {
  let OrderObjectID = req.params.id;

  await Order.findByIdAndDelete(OrderObjectID)
    .then(() => {
      res.status(200).send({ status: "Order deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Order", error: err.message });
    });
});

module.exports = router;
