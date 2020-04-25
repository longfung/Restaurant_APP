const axios = require("axios");

const Entity = {
  menu: 1,
  category: 2,
  desc: 3
}

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

async function fetchCategoryByRestaurantId(restaurantId, lang) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: Entity.category };
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

async function deleteCategoryById(id, restaurantId) {
  let data = { id: id, entityId: Entity.category, restaurantId: restaurantId };
  return await axios.delete("/api/category", { params: data });
}

async function fetchMenuByRestaurantId(restaurantId, lang) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: Entity.menu };
  return await axios.get("/api/menu", { params: data });
}

async function fetchMenuByRestaurantCategoryId(restaurantId, categoryId, lang) {
  let data = { restaurantId: restaurantId, categoryId: categoryId, locale: lang, entityId: Entity.menu };
  return await axios.get("/api/menu/category", { params: data });
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

async function fetchEntityTByRestaurantId(restaurantId, lang, entityId) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: entityId };
  if (entityId == Entity.category)
    return await axios.get("/api/entityT/category", { params: data });
  else if (entityId == Entity.menu)
    return await axios.get("/api/entityT/menu", { params: data });
  else if (entityId == Entity.desc)
    return await axios.get("/api/entityT/desc", { params: data });
}

async function addEntityT(entityT) {
  return await axios.post("/api/entityT", JSON.stringify(entityT), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateEntityT(entityT) {
  return await axios.put("/api/entityT", JSON.stringify(entityT), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteEntityTById(id, lang) {
  let data = { id: id, locale: lang };
  return await axios.delete("/api/entityT", { params: data });
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
  Entity,
  fetchRestuarantByOwnerId,
  performLogin,
  addRestaurant,
  updateRestaurant,
  fetchCategoryByRestaurantId,
  addCategory,
  updateCategory,
  deleteCategoryById,
  fetchMenuByRestaurantId,
  fetchMenuByRestaurantCategoryId,
  addMenu,
  updateMenu,
  deleteMenuById,
  fetchUserById,
  addUser,
  updateUser,
  fetchEntityTByRestaurantId,
  addEntityT,
  updateEntityT,
  deleteEntityTById,
};
