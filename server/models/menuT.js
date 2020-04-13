const db = require("../database");

class MenuT {
  static retrieveByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select m.id, m.name, t.lang, t.text as nameT from menu m \
        left join menu_t t on m.id = t.id and t.lang = $1 where m.restaurant_id = $2",
      [locale, restaurantId],
      function (err, res) {
        if (err.error) return callback(err);
        callback(err, res);
      }
    );
  }

  static insert(node, callback) {
    db.query(
      "INSERT INTO menu_t (id, lang, text, restaurant_id) VALUES ($1, $2, $3, $4)",
      [node.id, node.name, node.locale, node.restaurant_id],
      (err, res) => {
        callback(res);
      }
    );
  }

  static put(node, callback) {
    db.query(
      "update menu_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 returning id",
      [node.nameT, node.id, node.locale, node.restaurantId],
      (err, res) => {
        if (err.error) return callback(err);
        if (res.length == 0) {
          db.query(
            "INSERT INTO menu_t (id, text, lang, restaurant_id) VALUES ($1, $2, $3, $4)",
            [node.id, node.nameT, node.locale, node.restaurantId],
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

  static delete(node, callback) {
    db.query(
      `delete from menuT where id=${node.id} and lang='${node.locale}'`,
      function (err, res) {
        if (err.error) return callback(err);
        callback(err, res);
      }
    );
  }
}

module.exports = MenuT;
