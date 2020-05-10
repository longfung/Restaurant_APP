const db = require('../database');

class Topping {
    static retrieveAllByRestaurant(query, callback) {
        const restaurantId = query.restaurantId;
        const locale = query.locale;
        const entityId = query.entityId;
        db.query(
            // "select * from menu where restaurant_id = $1 and category_id = $2",
            "select c.id, c.name, c.topping_group, c.apply_order, c.apply_item, c.apply_default, c.price, c.restaurant_id, t.text as namet from topping as c \
            left join entity_t as t on c.id = t.id and t.lang = $1 and t.entity_id = $2 where c.restaurant_id = $3",
            [locale, entityId, restaurantId],
            function (err, res) {

                // db.query(`select * from category where restaurant_id = ${restaurantId}`, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(err, res);
            })
    }

    static delete(node, callback) {
        db.query(`delete from topping where id=${node.id}`, function (err, res) {
            if (err.error)
                return callback(err);
            db.query(`delete from entity_t where id=${node.id} and entity_id=${node.entityId} and restaurant_id=${node.restaurantId}`, function (err, res) {
                if (err.error)
                    return callback(err);
                callback(err, res)
            })
        })
    }

    static put(node, callback) {
        // let idInt = parseint(obj.id);
        db.query(`update topping set name = '${node.name}', topping_group = '${node.topping_group}', apply_order = ${node.apply_order}, apply_item = ${node.apply_item}, \
            apply_default = ${node.apply_default}, price = ${node.price} where id = ${node.id}`, function (err, res) {
            if (err.error)
                return callback(err);
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
            // return callback(res)
        })
    }

    static insert(node, callback) {
        db.query('INSERT INTO topping (name, topping_group, apply_order, apply_item, apply_default, price, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id',
            [node.name, node.topping_group, node.apply_order, node.apply_item, node.apply_default, node.price, node.restaurant_id],
            (err, res) => {
                // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                if (res.length > 0) {
                    const nId = res[0].id;
                    db.query(
                        "INSERT INTO entity_t (id, lang, text, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
                        [nId, node.locale, node.name, node.restaurant_id, node.entityId],
                        (err, res) => {
                            callback(res);
                        }
                    );
                }


                // callback(res);
            });
    }
}

module.exports = Topping;