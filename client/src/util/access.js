const axios = require("axios");

async function fetchRestuarantByOwnerId(id) {
  let data = {
    ownerId: id,
  };
  return await axios.get("/api/restaurant/:ownerId", { params: data });
  // .catch(err => console.log(err.error));
}

async function addRestaurant(rest) {
  let data = JSON.stringify(rest);
  return await axios.post("/api/restaurant", rest, {
    headers: {
      "Content-Text": "application/json",
    },
  });
}

async function updateRestaurant(rest) {
  let data = JSON.stringify(rest);
  return await axios.put("/api/restaurant", rest, {
    headers: {
      "Content-Text": "application/json",
    },
  });
}

async function performLogin(username, password) {
  let data = JSON.stringify({ username: username, password: password });
  return await axios.post("/api/user/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchCategoryByRestaurantId(restaurantId) {
  let data = { restaurant_id: restaurantId };
  return await axios.get("/api/category", { params: data });
}

async function addCategory(category) {
  return await axios.post("/api/category", JSON.stringify(category), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateCategory(category) {
  return await axios.put("/api/category", JSON.stringify(category), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteCategory(id) {
  let data = { id: id };
  return await axios.delete("/api/category", { params: data });
}

async function fetchMenuByRestaurantId(restaurantId, lang) {
  let data = { restaurantId: restaurantId, locale: lang };
  return await axios.get("/api/menu", { params: data });
}

async function addMenu(menu) {
  return await axios.post("/api/menu", JSON.stringify(menu), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateMenu(menu) {
  return await axios.put("/api/menu", JSON.stringify(menu), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteMenuById(id) {
  let data = { id: id };
  return await axios.delete("/api/menu", { params: data });
}

async function fetchUserById(id) {
  let data = { userId: id };
  return await axios.get("/api/user/:id", { params: data });
}

async function addUser(user) {
  return await axios.post("/api/user", JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateUser(user) {
  let data = JSON.stringify(user);
  return await axios.put("/api/user", data, {
    headers: { "Content-Type": "application/json" },
  });
}

module.exports = {
  fetchRestuarantByOwnerId,
  performLogin,
  addRestaurant,
  updateRestaurant,
  fetchCategoryByRestaurantId,
  addCategory,
  updateCategory,
  deleteCategory,
  fetchMenuByRestaurantId,
  addMenu,
  updateMenu,
  deleteMenuById,
  fetchUserById,
  addUser,
  updateUser,
};
