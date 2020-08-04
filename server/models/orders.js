const db = require('../database');

class Orders {
    static retrieveByRestaurant(query, callback) {
        const restaurantId = query.restaurantId;
        db.query("select * from orders where restaurant_id = $1", [restaurantId], function (err, res) {
            if (err.error) return callback(err);
            callback(err, res);
        });
    }

    static retrieveById(id, callback) {
        db.query("select * from orders where id = $1", [id], function (err, res) {
            if (err.error) return callback(err);
            callback(err, res);
        });
    }

    static retrieveByOrderId(query, callback) {
        const restaurantId = query.restaurantId;
        const order_id = query.order_id;
        db.query("select * from orders where id = $1", [id], function (err, res) {
            if (err.error) return callback(err);
            callback(err, res);
        });
    }

    static retrieveByDate(query, callback) {
        const restaurantId = query.restaurantId;
        const date_id = query.date_id;
        db.query("select * from orders where restaurant_id = $1 and date_id = $2", [restaurantId, date_id], function (err, res) {
            if (err.error) return callback(err);
            callback(err, res);
        });
    }

    static retrieveByActive(query, callback) {
        const restaurantId = query.restaurantId;
        const date_id = query.date_id;
        const s1 = query.s1;
        const s2 = query.s2;
        db.query("select * from orders where restaurant_id = $1 and date_id = $2 and (status = $3 or status = $4)",
            [restaurantId, date_id, s1, s2], function (err, res) {
                if (err.error) return callback(err);
                callback(err, res);
            });
    }

    static delete(id, callback) {
        db.query(`delete from orders where id=${id}`, function (err, res) {
            if (err.error) return callback(err);
            callback(err, res);
        });
    }

    static put(node, callback) {
        console.log("model order put, status = " + node.status);
        const d = new Date();
        db.query(
            "update orders set status = $1, cart = $2, topping_order_result = $3, topping_apply_order = $4, \
            restaurant_id = $5, date_id = $6, order_id = $7, name = $8 where id = $9",
            [node.status, node.cart, node.topping_order_result, node.topping_apply_order, node.restaurant_id, node.date_id, node.order_id, node.name, node.id],
            (err, res) => {
                // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
                if (err.error) return callback(err);
                callback(res);
            }
        );
    }

    static insert(node, callback) {
        db.query(
            "INSERT INTO orders (status, cart, topping_order_result, topping_apply_order, restaurant_id, date_id, order_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id",
            [node.status, node.cart, node.topping_order_result, node.topping_apply_order, node.restaurant_id, node.date_id, node.order_id, node.name],
            (err, res) => {
                // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
                console.log("Order id " + res[0].id);
                if (err.error) return callback(err);
                callback(res);
            }
        );
    }
}

module.exports = Orders;