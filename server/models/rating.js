const db = require('../database');

class Rating {
    static retrieveByMenu(query, callback) {
        const restaurantId = query.restaurantId;
        const menuId = query.menu_id;
        db.query(
            "select * from rating where menu_id = $1 and restaurant_id = $2",
            [menuId, restaurantId],
            function (err, res) {
                if (err) return callback(err);
                callback(err, res);
            }
        );
    }

    static retrieveByRestaurant(query, callback) {
        const restaurantId = query.restaurantId;
        db.query(
            "select * from rating restaurant_id = $a",
            [restaurantId],
            function (err, res) {
                if (err) return callback(err);
                callback(err, res);
            }
        );
    }

    static put(n, callback) {
        db.query(
            "update rating set relevant = $1 where id = $2",
            [n.relevant, n.id],
            function (err, res) {
                if (err) return callback(err);
                return callback(err, res);
            }
        )
    }

    static insert(n, callback) {
        db.query(
            "INSERT INTO rating (score, comment, menu_id, restaurant_id, post_by) \
            VALUES ($1, $2, $3, $4, $5)",
            [n.score, n.comment, n.menu_id, n.restaurantId, n.post_by],
            (err, res) => {
                // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) {
                if (err) return callback(err);
                callback(err, res);
            }
        );
    }

}

module.exports = Rating;