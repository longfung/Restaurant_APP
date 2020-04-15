const db = require('../database');

class Category {
    static retrieveAllByRestaurant(query, callback) {
        const restaurantId = query.restaurantId;
        const locale = query.locale;
        const entityId = query.entityId;
        db.query(
            // "select * from menu where restaurant_id = $1 and category_id = $2",
            "select c.id, c.category_name, c.category_description, c.restaurant_id, t.text as namet from category as c \
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
        db.query(`delete from category where id=${node.id}`, function (err, res) {
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
        db.query(`update category set category_name = '${node.category_name}', category_description = '${node.category_description}' 
            where id = ${node.id};`, function (err, res) {
            if (err.error)
                return callback(err);
            db.query(
                "update entity_t set text = $1 where id = $2 and lang = $3 and restaurant_id = $4 and entity_id = $5 returning id",
                [node.category_name, node.id, node.locale, node.restaurantId, node.entityId],
                (err, res) => {
                    if (err.error) return callback(err);
                    if (res.length == 0) {
                        db.query(
                            "INSERT INTO entity_t (id, text, lang, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
                            [node.id, node.category_name, node.locale, node.restaurantId, node.entityId],
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
        db.query('INSERT INTO category (category_name, category_description, restaurant_id) VALUES ($1, $2, $3) returning id',
            [node.category_name, node.category_description, node.restaurantId],
            (err, res) => {
                // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                if (res.length > 0) {
                    const nId = res[0].id;
                    db.query(
                        "INSERT INTO entity_t (id, lang, text, restaurant_id, entity_id) VALUES ($1, $2, $3, $4, $5)",
                        [nId, node.locale, node.category_name, node.restaurantId, node.entityId],
                        (err, res) => {
                            callback(res);
                        }
                    );
                }


                // callback(res);
            });
    }
}

module.exports = Category;