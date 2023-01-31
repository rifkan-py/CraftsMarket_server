const { allOrders } = require("../controllers/orders");

const router = require("express").Router();

router.get("/", allOrders);

module.exports = router;
