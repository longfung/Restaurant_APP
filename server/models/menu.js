const db = require("../database");

class Menu {
  static retrieveByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select m.id, m.name, m.price, m.image_path, m.category_id, m.restaurant_id, t.text as name_t from menu m \
        left join menu_t t on m.id = t.id and t.lang = $1 where m.restaurant_id = $2",
      [locale, restaurantId],
      function (err, res) {
        if (err.error) return callback(err);
        callback(err, res);
      }
    );
  }

  static retrieveByCategory(query, callback) {
    const restaurantId = query.restaurantId;
    const categoryId = query.categoryId;
    const locale = query.locale;
    if (categoryId) {
      db.query(
        // "select * from menu where restaurant_id = $1 and category_id = $2",
        "select m.id, m.name, m.price, m.image_path, m.category_id, m.restaurant_id, t.text as name_t from menu m \
        left join menu_t as t on m.id = t.id and t.lang = $1 where .restaurant_id = $2 and category_id = 3",
        [locale, restaurantId, categoryId],
        function (err, res) {
          if (err.error) return callback(err);
          callback(err, res);
        }
      );
    } else Menu.retrieveByRestaurant(restaurantId, callback);
  }

  static insert(node, callback) {
    db.query(
      "INSERT INTO menu (name, price, image_path, restaurant_id, category_id) VALUES ($1, $2, $3, $4, $5)",
      [
        node.name,
        node.price,
        node.image_path,
        node.restaurant_id,
        node.category_id,
      ],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err.error) return callback(err);
        db.query(
          "INSERT INTO menu_t (id, lang, text, restaurant_id) VALUES ($1, $2, $3, $4)",
          [rest.id, node.name, node.locale, node.restaurant_id],
          (err, res) => {
            callback(res);
          }
        );
      }
    );
  }

  static put(node, callback) {
    db.query(
      "update menu set price = $1, image_path = $2, category_id = $3 where id = $4 returning id",
      [node.price, node.image_path, node.category_id, node.id],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err.error) return callback(err);
        db.query(
          "update menu_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 returning id",
          [node.name, node.id, node.locale, node.restaurant_id],
          (err, res) => {
            if (err.error) return callback(err);
            if (res.length == 0) {
              db.query(
                "INSERT INTO menu_t (id, text, lang, restaurant_id) VALUES ($1, $2, $3, $4)",
                [node.id, node.name, node.locale, node.restaurant_id],
                (err, res) => {
                  if (err.error) return callback(err);
                  callback(res);
                }
              );
            } else {
              callback(res);
            }
          }
        );
      }
    );
  }

  static delete(id, callback) {
    db.query(`delete from menu where id=${id}`, function (err, res) {
      if (err.error) return callback(err);
      callback(err, res);
    });
  }
}

module.exports = Menu;
