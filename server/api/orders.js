var express = require("express");

var Orders = require("../models/orders");

var router = express.Router();

router.get("/active", (req, res) => {
  console.log("get order by active" + JSON.stringify(req.query));

  var node = req.query;
  // var categoryId = req.query.categoryId;
  Orders.retrieveByActive(node, (err, orders) => {
    // console.log(err);
    // console.log(res);
    if (!err) return res.json(err);
    // console.log(rest)
    return res.json(orders);
  });
});

router.get("/", (req, res) => {
  console.log("get Orders by restaurant");
  var node = req.query;
  Orders.retrieveAllByRestaurant(node, (err, orders) => {
    // console.log(err);s
    // console.log(res);
    if (!err) return res.json(err);
    // console.log(rest)
    return res.json(orders);
  });
});

router.get("/:id", (req, res) => {
  console.log("get order by id");
  var node = req.query.id;
  Orders.retrieveById(node, (err, orders) => {
    // console.log(err);s
    // console.log(res);
    if (err.error) return res.json(err);
    if (orders && orders.length == 0) {
      return res.status(404).json({ error: "order not found!!" });
    }
    return res.json(orders[0]);
  });
});

router.get("/date", (req, res) => {
  console.log("get order by date" + JSON.stringify(req.query));

  var node = req.query;
  const status = req.query.status;
  // var node = req.query.restaurant_id;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  Orders.retrieveByDate(node, (err, orders) => {
    // console.log(err);
    // console.log(res);
    if (!err) return res.json(err);
    // console.log(rest)
    return res.json(orders);
  });
});



router.delete("/", (req, res) => {
  const query = req.query;
  Orders.delete(query, (err, orders) => {
    if (err.error) return res.json(err);
    return res.json(orders);
  });
});

router.post("/", (req, res) => {
  console.log("in QueueA Add" + req.body);
  var node = req.body;
  Orders.insert(node, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.put("/", (req, res) => {
  console.log("in QueueA Put" + req.body);
  const data = req.body;
  Orders.put(data, (err, result) => {
    if (err.error) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
