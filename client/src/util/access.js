const axios = require('axios')

async function fetchRestuarantByOwnerId (id) {
    let data = {ownerId: id};
    return await axios.get('/api/restaurant/:ownerId', {params:data})
    // .catch(err => console.log(err.error));
 }

 async function performLogin (username, password) {
    let data = JSON.stringify({
        username: username,
        password: password
    });
    return await axios.post('/api/user/login', data, {
            headers: {"Content-Type": "application/json"}
        })
    }

    
 
 module.exports = {
     fetchRestuarantByOwnerId,
     performLogin
 }