const db = require("../database");

class Restaurant {
  static retrieveAll(callback) {
    db.query("select * from restaurant", function (err, res) {
      if (err.error)
        // console.log("in Retrieve all error");
        return callback(err);
      console.log("in Retrieve all");
      // console.log(res);
      callback(err, res);
    });
  }

  static retrieveRestaurantByOwnerId(node, callback) {
    db.query(
      "select * from restaurant where owner_id = $1",
      [node.ownerId],
      function (err, res) {
        if (err.error) return callback(err);
        callback(err, res);
      }
    );
  }

  static insert(n, callback) {
    // db.query('insert into cities (city_name values ($1)',function (err, res) {
    // make sure default lcoal is set to 'en' if not entered
    let l = n.locale == null ? "en" : n.locale;
    db.query(
      "INSERT INTO restaurant (name, tax_rate, address, city, state, zip_code, owner_id. locale) \
        VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [n.name, n.taxRate, n.address, n.city, n.state, n.zipCode, n.ownerId, l],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static put(n, callback) {
    const d = new Date();
    //    db.query('select * from menu where restaurant_id = $1 and category_id = $2', [restaurantId, categoryId], function (err, res) {
    let l = n.locale == null ? "en" : n.locale;
    // let idInt = parseint(obj.id);
    db.query(
      "update restaurant set name = $1, tax_rate = $2, address = $3, city = $4, state = $5, zip_code = $6, update_timestamp = $7\
            ,locale = $8 where id = $9",
      [n.name, n.taxRate, n.address, n.city, n.state, n.zipCode, d, l, n.id],
      function (err, res) {
        if (err.error) return callback(err);
        return callback(res);
      }
    );
  }
}

module.exports = Restaurant;
