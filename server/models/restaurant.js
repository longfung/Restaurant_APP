const db = require('../database');

class Restaurant {
    static retrieveAll (callback) {
        db.query('select * from restaurant', function (err, res) {
            if (err.error) 
            // console.log("in Retrieve all error");
                return callback(err); 
            console.log("in Retrieve all"); 
            // console.log(res);
            callback(err, res);
        });
    }

    static insert (node, callback) {
        // db.query('insert into cities (city_name values ($1)',function (err, res) {
        db.query('INSERT INTO restaurant (name, zip_code, state) VALUES ($1, $2, $3)', [node.name, node.zipCode, node.state], (err, res) => {
        // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Restaurant; 