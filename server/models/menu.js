const db = require('../database');

class Menu {
    static retrieveByRestaurant(node, callback) {
        db.query("select * from menu wehre resturant_id = $1"), [node.restairant_id], function (err, res) {
            if (err)
                res.callback(err);
            callback ( err, res);
        }
    }

    static insert(node, callback) {
        db.query('INSERT INTO menu (name, price, image_path) VALUES ($1, $2, $3)', 
            [node.name, node.price, node.path], 
            (err, res) => {
            // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                callback(res);
            });        
    }
}

module.exports = Menu;