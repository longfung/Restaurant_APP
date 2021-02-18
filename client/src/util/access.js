const axios = require("axios");
const adapter = require('axios/lib/adapters/http');

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
  topping: 4,
  note: 5,
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
    // headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": '*' },
    // })
    // .catch(err => {
    //   let errorObject = JSON.parse(JSON.stringify(err));
    //   console.log(err.message);
  });
  // return res;
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

async function updateMenuRating(menu) {
  return await axios.put(apiUrl + "/api/menu/rating", JSON.stringify(menu), {
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteMenuById(id) {
  let data = { id: id };
  return await axios.delete(apiUrl + "/api/menu", { params: data });
}

async function fetchEntityTByRestaurantId(restaurantId, lang, entityId) {
  const l_lang = lang == null ? 'en' : lang;
  let data = { restaurantId: restaurantId, locale: l_lang, entityId: entityId };
  if (entityId === Entity.category)
    return await axios.get(apiUrl + "/api/entityT/category", { params: data });
  else if (entityId === Entity.menu)
    return await axios.get(apiUrl + "/api/entityT/menu", { params: data });
  else if (entityId === Entity.desc)
    return await axios.get(apiUrl + "/api/entityT/desc", { params: data });
  else if (entityId === Entity.topping)
    return await axios.get(apiUrl + "/api/entityT/topping", { params: data });
  else if (entityId === Entity.note)
    return await axios.get(apiUrl + "/api/entityT/note", { params: data });
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

async function fetchRatingByRestaurant(restaurantId) {
  let data = { restaurantId: restaurantId };
  return await axios.get(apiUrl + "/api/rating/restaurant", { params: data });
}
async function fetchRatingByMenu(restaurantId, menuId) {
  let data = { restaurantId: restaurantId, menu_id: menuId };
  return await axios.get(apiUrl + "/api/rating/menu", { params: data });
}

async function addRating(rating) {
  return await axios.post(apiUrl + "/api/rating", JSON.stringify(rating), {
    headers: { "Content-Type": "application/json" },
  });
}

async function updateRating(rating) {
  return await axios.put(apiUrl + "/api/rating", JSON.stringify(rating), {
    headers: { "Content-Type": "application/json" },
  });
}

async function doDownload(pathId, imageName, shareContext, setImage2, setMessage) {
  if (!imageName) {
    let m = " No image name is presented !!!";
    setMessage({ status: 401, msg: m });
    return
  }
  let imageMap = shareContext.state.imageMap;
  if (imageMap && imageMap.has(imageName)) {
    if (setImage2 != null)
      setImage2(imageMap.get(imageName))
    return;
  }
  const imagePath = pathId + '/' + imageName;
  let data = { imagePath: imagePath };
  await await axios.get(apiUrl + "/api/dodownload", { params: data })
    .then(res => {
      if (!imageMap)
        imageMap = new Map();
      imageMap.set(imageName, res.data);
      shareContext.dispatch({
        type: "setImageMap",
        value: imageMap
      });
      if (setImage2 != null)
        setImage2(res.data)
    }).catch((err) => {
      let m = "image name " + imageName + " failed to retrieve image, " + err.error;
      setMessage({ status: 401, msg: m });
      return;
    })
}

async function doUpload(formdata) {
  return await axios.post(apiUrl + "/api/doupload", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// async function doDownload(pathId, imageName) {
//   const imagePath = pathId + '/' + imageName;
//   let data = { imagePath: imagePath };
//   return await axios.get(apiUrl + "/api/dodownload", { params: data });
// }

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
  updateMenuRating,
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
  fetchRatingByRestaurant,
  fetchRatingByMenu,
  addRating,
  updateRating,
  doUpload,
  doDownload,
};
