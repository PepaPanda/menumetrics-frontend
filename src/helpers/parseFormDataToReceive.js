import { defaultMenuItem, defaultRestaurant } from "../data/defaults";

const parseMenuItemFormDataToReceive = apiData => {
  if (!apiData) {
    return defaultMenuItem;
  }

  const dataToReceive = {
    _id: apiData._id || "",
    name: apiData.name || "",
    restaurantId: apiData.restaurantId || "",
    rating: apiData.rating || false,
    carbohydrates: parseInt(apiData.carbohydrates) || "",
    sugars: parseInt(apiData.sugars) || "",
    fats: parseInt(apiData.fats) || "",
    proteins: parseInt(apiData.proteins) || "",
    salts: parseInt(apiData.salts) || "",
    fiber: parseInt(apiData.fiber) || ""
  };

  return dataToReceive;
};

const parseRestaurantFormDataToReceive = apiData => {
  if (!apiData) {
    return defaultRestaurant;
  }

  const dataToReceive = {
    _id: apiData._id || "",
    name: apiData.name || "",
    address: apiData.address || ""
  };

  return dataToReceive;
};

export { parseMenuItemFormDataToReceive, parseRestaurantFormDataToReceive };
