const axios = require("axios");
const adapter = require('axios/lib/adapters/http');
// const { debug } = require("request-promise");
// const { MdAccessAlarm } = require("react-icons/md");
// const apiUrl = `http://localhost:8080`;
let apiUrl = ``;
if (process.env.REACT_APP_DB_HOST)
  console.log("dbhost " + process.env.REACT_APP_DB_HOST);
else {
  apiUrl = `http://localhost:8080`
  console.log("no DB_HOST defined")
}

// const apiUrl = ``;
const Entity = {
  menu: 1,
  category: 2,
  desc: 3,
  topping: 4
}

const Status = {
  open: 1,
  submit: 2,
  pending: 3,
  itemComplete: 4,
  orderComplete: 5,
  paid: 6,
  close: 7
}

// axios.defaults.port = 5000;

async function fetchRestuarantByOwnerId(id) {
  let data = {
    ownerId: id,
  };
  return await axios.get(apiUrl + "/api/restaurant/:ownerId", { params: data });
  // .catch(err => console.log(err.error));
}

async function addRestaurant(rest) {
  return await axios.post(apiUrl + "/api/restaurant", JSON.stringify(rest), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateRestaurant(rest) {
  return await axios.put(apiUrl + "/api/restaurant", JSON.stringify(rest), {
    headers: { "Content-Type": "application/json" },
  });
}

async function performLogin(username, password) {
  let data = JSON.stringify({ username: username, password: password });
  return await axios.post(apiUrl + "/api/user/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchCategoryByRestaurantId(restaurantId, lang) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: Entity.category };
  return await axios.get(apiUrl + "/api/category", { params: data });
}

async function addCategory(category) {
  return await axios.post(apiUrl + "/api/category", JSON.stringify(category), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateCategory(category) {
  return await axios.put(apiUrl + "/api/category", JSON.stringify(category), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteCategoryById(id, restaurantId) {
  let data = { id: id, entityId: Entity.category, restaurantId: restaurantId };
  return await axios.delete(apiUrl + "/api/category", { params: data });
}

async function fetchToppingByRestaurantId(restaurantId, lang) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: Entity.topping };
  return await axios.get(apiUrl + "/api/topping", { params: data });
}

async function addTopping(topping) {
  return await axios.post(apiUrl + "/api/topping", JSON.stringify(topping), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateTopping(topping) {
  return await axios.put(apiUrl + "/api/topping", JSON.stringify(topping), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteToppingById(id, restaurantId) {
  let data = { id: id, entityId: Entity.category, restaurantId: restaurantId };
  return await axios.delete(apiUrl + "/api/topping", { params: data });
}

async function fetchMenuByRestaurantId(restaurantId, lang) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: Entity.menu };
  return await axios.get(apiUrl + "/api/menu", { params: data });
}

async function fetchMenuByRestaurantCategoryId(restaurantId, categoryId, lang) {
  let data = { restaurantId: restaurantId, categoryId: categoryId, locale: lang, entityId: Entity.menu };
  return await axios.get(apiUrl + "/api/menu/category", { params: data });
}

async function addMenu(menu) {
  return await axios.post(apiUrl + "/api/menu", JSON.stringify(menu), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateMenu(menu) {
  return await axios.put(apiUrl + "/api/menu", JSON.stringify(menu), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteMenuById(id) {
  let data = { id: id };
  return await axios.delete(apiUrl + "/api/menu", { params: data });
}

async function fetchEntityTByRestaurantId(restaurantId, lang, entityId) {
  let data = { restaurantId: restaurantId, locale: lang, entityId: entityId };
  if (entityId === Entity.category)
    return await axios.get(apiUrl + "/api/entityT/category", { params: data });
  else if (entityId === Entity.menu)
    return await axios.get(apiUrl + "/api/entityT/menu", { params: data });
  else if (entityId === Entity.desc)
    return await axios.get(apiUrl + "/api/entityT/desc", { params: data });
  else if (entityId === Entity.topping)
    return await axios.get(apiUrl + "/api/entityT/topping", { params: data });
}

async function addEntityT(entityT) {
  return await axios.post(apiUrl + "/api/entityT", JSON.stringify(entityT), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateEntityT(entityT) {
  return await axios.put(apiUrl + "/api/entityT", JSON.stringify(entityT), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteEntityTById(id, lang) {
  let data = { id: id, locale: lang };
  return await axios.delete(apiUrl + "/api/entityT", { params: data });
}

async function fetchUserById(id) {
  let data = { userId: id };
  return await axios.get(apiUrl + "/api/user/:id", { params: data });
}

async function addUser(user) {
  return await axios.post(apiUrl + "/api/user", JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateUser(user) {
  let data = JSON.stringify(user);
  return await axios.put(apiUrl + "/api/user", data, {
    headers: { "Content-Type": "application/json" },
  });
}

async function fetchOrdersById(id) {
  debugger;
  let data = { userId: id };
  return await axios.get(apiUrl + "/api/orders/:id", { params: data });
}

async function fetchOrdersByDate(restaurantId, dateId) {
  debugger;
  let data = { restaurantId: restaurantId, date_id: dateId };
  return await axios.get(apiUrl + "/api/orders/date", { params: data });
}

async function fetchOrdersByActive(restaurantId, dateId) {
  debugger;
  let data = { restaurantId: restaurantId, date_id: dateId, s1: Status.submit, s2: Status.itemComplete };
  return await axios.get(apiUrl + "/api/orders/active", { params: data });
}

async function addOrders(order) {
  return await axios.post(apiUrl + "/api/orders", JSON.stringify(order), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateOrders(order) {
  let data = JSON.stringify(order);
  return await axios.put(apiUrl + "/api/orders", data, {
    headers: { "Content-Type": "application/json" },
  });
}


module.exports = {
  Entity,
  Status,
  fetchRestuarantByOwnerId,
  performLogin,
  addRestaurant,
  updateRestaurant,
  fetchToppingByRestaurantId,
  addTopping,
  updateTopping,
  deleteToppingById,
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
  fetchOrdersById,
  fetchOrdersByDate,
  fetchOrdersByActive,
  addOrders,
  updateOrders,
};
