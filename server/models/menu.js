const db = require('../database');

class Menu {
    static retrieveByRestaurant(restaurantId, callback) {
         db.query('select * from menu where restaurant_id = $1', [restaurantId], function (err, res) {
            if (err.error)
                return callback(err);
            callback ( err, res);
        })
    }

    static retrieveByCategory(query, callback) {
        const restaurantId = query.restaurantId;
        const categoryId = query.categoryId;
        db.query('select * from menu where restaurant_id = $1 and category_id = $2', [restaurantId, categoryId], function (err, res) {
            if (err.error)
                return callback(err);
            callback (err, res);
        })
    }

    static insert(node, callback) {
        db.query('INSERT INTO menu (name, price, image_path, restaurant_id, category_id) VALUES ($1, $2, $3, $4, $5)', 
            [node.name, node.price, node.image_path, node.restaurant_id, node.category_id], 
            (err, res) => {
            // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                callback(res);
            });         
    }

    static put(node, callback) {
            db.query('update menu set name = $1, price = $2, image_path = $3, category_id = $4 where id = $5',  
            [node.name, node.price, node.image_path, node.category_id, node.id], 
            (err, res) => {
            // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                callback(res);
            });         
    }   

    static delete(id, callback) {
        db.query(`delete from menu where id=${id}`, function(err, res) {
            if (err.error)
                return callback(err);
            callback(err, res)
        }) 
    }

}

module.exports = Menu;