const db = require("../database");

class Menu {
  static retrieveByRestaurant(query, callback) {
    const restaurantId = query.restaurantId;
    const locale = query.locale;
    const entityId = query.entityId;
    db.query(
      "select m.id, m.name, m.description, m.price_s, m.price_m, m.price_l, m.price_x, m.topping, m.rating_sum, m.rating_size, \
      m.note, m.discount, m.discount_method, m.is_new, m.image_path, m.category_id, \
      m.restaurant_id, m.available, t1.text as name_t, t2.text as description_t, t3.text as note_t from menu m \
      left join entity_t as t1 on m.id = t1.id and t1.lang = $1 and t1.entity_id = 1  \
      left join entity_t as t2 on m.id = t2.id and t2.lang = $1 and t2.entity_id = 3  \
      left join entity_t as t3 on m.id = t3.id and t3.lang = $1 and t3.entity_id = 5  \
      where m.restaurant_id = $2",
      [locale, restaurantId],
      function (err, res) {
        if (err) return callback(err);
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
        "select m.id, m.name, m.description, m.price_s, m.price_m, m.price_l, m.price_x, m.topping, m.rating_sum, m.rating_size, \
        m.note, m.discount, m.discount_method, m.is_new, m.image_path, m.category_id, \
        m.available, m.restaurant_id, t1.text as name_t, t2.text as description_t, t3.text as note_t from menu m \
        left join entity_t as t1 on m.id = t1.id and t1.lang = $1 and t1.entity_id = 1  \
        left join entity_t as t2 on m.id = t2.id and t2.lang = $1 and t2.entity_id = 3  \
        left join entity_t as t3 on m.id = t3.id and t3.lang = $1 and t3.entity_id = 5  \
        where m.restaurant_id = $2 and m.category_id = $3",
        [locale, restaurantId, categoryId],
        function (err, res) {
          if (err) return callback(err);
          callback(err, res);
        }
      );
    } else Menu.retrieveByRestaurant(query, callback);
  }

  static insert(node, callback) {
    db.query(
      "INSERT INTO menu (name, note, discount, discount_method, is_new, \
        price_s, price_m, price_l, price_x, image_path, restaurant_id, category_id, description, topping, available) \
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning id",
      [
        node.name,
        node.note,
        node.discount,
        node.discount_method,
        node.is_new,
        node.price_s,
        node.price_m,
        node.price_l,
        node.price_x,
        node.image_path,
        node.restaurant_id,
        node.category_id,
        node.description,
        node.topping,
        node.available
      ],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err) return callback(err);
        // db.query(
        //   "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
        //   [res.id, node.name, node.locale, node.restaurant_id, node.entityId],
        //   (err, res) => {
        //     callback(res);
        //   }
        // );
        const promise1 = Menu.insertNameT(res[0].id, node);
        const promise2 = Menu.insertDescT(res[0].id, node);
        const promise3 = Menu.insertNoteT(res[0].id, node);
        Promise.resolve(promise1, promise2, promise3).then(res => {
          callback(null, res);
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
    return new Promise((resolve, reject) => db.query(
      "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
      [id, node.name, node.locale, node.restaurant_id, node.entityId],
      (err, res) => {
        if (err) rejsct("err");
        resolve(res)
      }
    ));
  }

  static insertNoteT(id, node) {
    console.log("in insertNoteT" + id);
    return new Promise((resolve, reject) => db.query(
      "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
      [id, node.note, node.locale, node.restaurant_id, node.entityId],
      (err, res) => {
        if (err) rejsct("err");
        resolve(res)
      }
    ));
  }

  static updateNameT(node) {
    return new Promise((resolve, reject) => db.query(
      "update entity_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 and entity_id = $5 returning id",
      [node.name, node.id, node.locale, node.restaurant_id, 1],
      (err, res) => {
        if (err) return callback(err);
        if (res.length == 0) {
          db.query(
            "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
            [node.id, node.name, node.locale, node.restaurant_id, 1],
            (err, res) => {
              if (err) return rejsct(err);
              resolve(res);
            }
          );
        } else {
          resolve(res);
        }
      }
    ));
  }

  static updateNoteT(node) {
    // console.log("in updateNoteT" + node.note);
    return new Promise((resolve, reject) => db.query(
      "update entity_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 and entity_id = $5 returning id",
      [node.note, node.id, node.locale, node.restaurant_id, 5],
      (err, res) => {
        // console.log("in updateNoteT error log " + err + ' ' + res.length);
        if (err) return callback(err);
        if (res.length == 0) {
          db.query(
            "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
            [node.id, node.note, node.locale, node.restaurant_id, 5],
            (err, res) => {
              if (err) return reject(err);
              resolve(res);
            }
          );
        } else {
          resolve(res);
        }
      }
    ));
  }

  static updateDescT(node) {
    return new Promise((resolve, rejsct) => db.query(
      "update entity_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 and entity_id = $5 returning id",
      [node.description, node.id, node.locale, node.restaurant_id, 3],
      (err, res) => {
        if (err) return callback(err);
        if (res.length == 0) {
          db.query(
            "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
            [node.id, node.description, node.locale, node.restaurant_id, 3],
            (err, res) => {
              if (err) return reject(err);
              resolve(res);
            }
          );
        } else {
          resolve(res);
        }
      }
    ));
  }

  static async insertDescT(nId, node) {
    console.log("in insertDescT" + nId);
    return new Promise((resolve, rejsct) => db.query(
      "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
      [nId, node.description, node.locale, node.restaurant_id, 3],
      (err, res) => {
        if (err) reject(err);
        resolve(res)
      }
    )
    );
  }

  static updateRating(node, callback) {
    db.query(
      "update menu set rating_sum = $1, rating_size = $2 where id = $3",
      [node.rating_sum, node.rating_size, node.id],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err) return callback(err);
        callback(null, res);
      });
  }

  static put(node, callback) {
    db.query(
      "update menu set price_s = $1, price_m = $2, price_l = $3, price_x = $4, image_path = $5, \
       note = $11, discount = $12, discount_method = $13, is_new = $14, \
      category_id = $6, description = $7, topping = $8, available = $9 where id = $10 returning id",
      [node.price_s, node.price_m, node.price_l, node.price_x, node.image_path, node.category_id, node.description,
      node.topping, node.available, node.id, node.note, node.discount, node.discount_method, node.is_new],
      (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
        if (err) return callback(err);
        const promise1 = Menu.updateNameT(node);
        const promise2 = Menu.updateDescT(node);
        const promise3 = Menu.updateNoteT(node);
        Promise.resolve(promise1, promise2, promise3).then(res => {
          callback(null, res);
        })
          .catch((err) => callback(err))
      }
    );
  }

  static delete(id, callback) {
    db.query(`delete from menu where id=${id}`, function (err, res) {
      if (err) return callback(err);
      callback(err, res);
    });
  }
}

module.exports = Menu;
