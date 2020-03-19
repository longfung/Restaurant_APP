const db = require('../database');

class User {
    static retrieveByUsername(username, callback) {
        db.query('select * from auth where username = $1', [username], function (err, res) {
           if (err.error)
               return callback(err);
           callback ( err, res);
       })
    }

    static retrieveById(id, callback) {
        db.query('select * from auth where id = $1', [id], function (err, res) {
        if (err.error)
            return callback(err);
        callback ( err, res);
        })
    }

    static insert(node, callback) {
        db.query('INSERT INTO auth (username, password, email, phone) VALUES ($1, $2, $3, $4)', 
            [node.username, node.password, node.email, node.phone], 
            (err, res) => {
            // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                callback(res);
            });         
    }

    static put(node, callback) {
            db.query('update auth set username = $1, password = $2, email = $3, phone = $4 where id = $5',  
            [node.username, node.password, node.email, node.phone, node.id], 
            (err, res) => {
            // db.query('INSERT INTO restaurant (name VALUES ($1)', function (err, res) { 
                if (err.error)
                    return callback(err);
                callback(res);
            });         
    }   

    static delete(id, callback) {
        db.query(`delete from auth where id=${id}`, function(err, res) {
            if (err.error)
                return callback(err);
            callback(err, res)
        }) 
    }

}

module.exports = User;