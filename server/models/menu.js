const db = require("../database");

class Menu {
  static retrieveByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    const entityId = query.entityId;
    db.query(
      //   "select * from menu where restaurant_id = $1",
      "select m.id, m.name, m.description, m.price_s, m.price_m, m.price_l, m.price_x, \
        m.image_path, m.category_id, m.restaurant_id, t.text as name_t from menu m \
        left join entity_t t on m.id = t.id and t.lang = $1 and t.entity_id = $2 where m.restaurant_id = $3",
      [locale, entityId, restaurantId],
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
    const entityId = query.entityId;
    if (categoryId) {
      db.query(
        // "select * from menu where restaurant_id = $1 and category_id = $2",
        "select m.id, m.name, m.description, m.price_s, m.price_m, m.price_l, m.price_x, \
        m.image_path, m.category_id, m.restaurant_id, t.text as name_t from menu m \
        left join entity_t as t on m.id = t.id and t.lang = $1 and t.entity_id = $2 where m.restaurant_id = $3 and category_id = $4",
        [locale, entityId, restaurantId, categoryId],
        function (err, res) {
          if (err.error) return callback(err);
          callback(err, res);
        }
      );
    } else Menu.retrieveByRestaurant(restaurantId, callback);
  }

  static insert(node, callback) {
    db.query(
      "INSERT INTO menu (name, price_s, price_m, price_l, price_x, image_path, restaurant_id, category_id, description) \
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id",
      [
        node.name,
        node.price_s,
        node.price_m,
        node.price_l,
        node.price_x,
        node.image_path,
        node.restaurant_id,
        node.category_id,
        node.description
      ],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err.error) return callback(err);
        // db.query(
        //   "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
        //   [res.id, node.name, node.locale, node.restaurant_id, node.entityId],
        //   (err, res) => {
        //     callback(res);
        //   }
        // );
        const promise1 = Menu.insertNameT(res[0].id, node);
        const promise2 = Menu.insertDescT(res[0].id, node);
        Promise.resolve(promise1, promise2).then(res => {
          callback(res);
        })
          .catch((err) => callback(err))
      }
    );
  }

  // static insertNameT(id, node, callback) {
  //   db.query(
  //     "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
  //     [id, node.name, node.locale, node.restaurant_id, 1],
  //     (err, res) => {
  //       callback(res);
  //     }
  //   );
  // } 

  static insertNameT(id, node) {
    console.log("in insertNameT" + id);
    return new Promise((resolve, rejsct) => db.query(
      "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
      [id, node.name, node.locale, node.restaurant_id, node.entityId],
      (err, res) => {
        if (err.error) rejsct("err");
        resolve(res)
      }
    ));
  }

  static async insertDescT(nId, node) {
    console.log("in insertDescT" + nId);
    return new Promise((resolve, rejsct) => db.query(
      "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
      [nId, node.description, node.locale, node.restaurant_id, 3],
      (err, res) => {
        if (err.error) rejsct("err");
        resolve(res)
      }
    )
    );
  }

  static put(node, callback) {
    db.query(
      "update menu set price_s = $1, price_m = $2, price_l = $3, price_x = $4, image_path = $5, \
      category_id = $6, description = $7 where id = $8 returning id",
      [node.price_s, node.price_m, node.price_l, node.price_x, node.image_path, node.category_id, node.description, node.id],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err.error) return callback(err);
        db.query(
          "update entity_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 and entity_id = $5 returning id",
          [node.name, node.id, node.locale, node.restaurant_id, node.entityId],
          (err, res) => {
            if (err.error) return callback(err);
            if (res.length == 0) {
              db.query(
                "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
                [node.id, node.name, node.locale, node.restaurant_id, node.entityId],
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
