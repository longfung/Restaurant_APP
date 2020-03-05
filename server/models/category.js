const db = require('../database');

class Category {
    static retrieveAllByRestaurant(restaurantId, callback) {
        db.query(`select * from category where restaurant_id = ${restaurantId}`, function (err, res) {
            if (err.error)
                return callback(err);
            callback ( err, res);
        })
    } 

    static delete(id, callback) {
        db.query(`delete from category where id=${id}`, function(err, res) {
            if (err.error)
                return callback(err);
            callback(err, res)
        }) 
    }

    static put(obj, callback) {
        // let idInt = parseint(obj.id);
        db.query(`update category set category_name = '${obj.category_name}', category_description = '${obj.category_description}' 
            where id = ${obj.id};`, function(err, res) {
                if (err.error) 
                    return callback(err);
                return callback(res)
            }) 
        }
        
    static insert(node, callback) {
        db.query('INSERT INTO category (category_name, category_description, restaurant_id) VALUES ($1, $2, $3)', 
            [node.category_name, node.category_description, node.restaurant_id], 
            (err, res) => {
            // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                callback(res);
            });        
    }
}

module.exports = Category;