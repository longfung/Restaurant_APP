const db = require("../database");

class EntityT {
  static retrieveMenuTByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    const entityId = query.entityId;
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select m.id, m.name, t.lang, t.text as nameT from menu as m \
        left join entity_t as t on m.id = t.id and t.lang = $1 and t.entity_id = $2 where m.restaurant_id = $3",
      [locale, entityId, restaurantId],
      function (err, res) {
        if (err) return callback(err);
        callback(err, res);
      }
    );
  }

  static retrieveDescTByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    const entityId = query.entityId;
    // console.log("in EntityT Desc: " + entityId);
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select m.id, m.description, t.lang, t.text as nameT from menu as m \
        left join entity_t as t on m.id = t.id and t.lang = $1 and t.entity_id = $2 where m.restaurant_id = $3",
      [locale, entityId, restaurantId],
      function (err, res) {
        if (err) return callback(err);
        callback(err, res);
      }
    );
  }
  static retrieveCategoryTByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    const entityId = query.entityId;
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select c.id, c.category_name as name, t.lang, t.text as namet from category as c \
        left join entity_t as t on c.id = t.id and t.lang = $1 and t.entity_id = $2 where c.restaurant_id = $3",
      [locale, entityId, restaurantId],
      function (err, res) {
        if (err) return callback(err);
        callback(err, res);
      }
    );
  }

  static retrieveToppingTByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    const entityId = query.entityId;
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select c.id, c.name, t.lang, t.text as namet from topping as c \
        left join entity_t as t on c.id = t.id and t.lang = $1 and t.entity_id = $2 where c.restaurant_id = $3",
      [locale, entityId, restaurantId],
      function (err, res) {
        if (err) return callback(err);
        callback(err, res);
      }
    );
  }

  static insert(node, callback) {
    db.query(
      "INSERT INTO entity_t (id, lang, text, entity_id, restaurant_id) VALUES ($1, $2, $3, $4)",
      [node.id, node.namet, node.locale, node.entityId, node.restaurant_id],
      (err, res) => {
        callback(res);
      }
    );
  }

  static put(node, callback) {
    db.query(
      "update entity_t set text = $1 where id = $2 and lang = $3 and entity_id = $4 and restaurant_id = $5 returning id",
      [node.namet, node.id, node.locale, node.entityId, node.restaurantId],
      (err, res) => {
        if (err) return callback(err);
        if (res.length == 0) {
          db.query(
            "INSERT INTO entity_t (id, text, lang, entity_id, restaurant_id) VALUES ($1, $2, $3, $4, $5)",
            [node.id, node.namet, node.locale, node.entityId, node.restaurantId],
            (err, res) => {
              if (err)
                return callback(err);
              else
                callback(err, res);
            }
          );
        } else {
          callback(err, res);
        }
      }
    );
  }

  static delete(node, callback) {
    db.query(
      `delete from entity_t where id=${node.id} and lang='${node.locale}'`,
      function (err, res) {
        if (err.error) return callback(err);
        callback(err, res);
      }
    );
  }
}

module.exports = EntityT;
