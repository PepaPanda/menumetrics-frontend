import {
  parseMenuItemFormDataToSend,
  parseRestaurantFormDataToSend
} from "../helpers/parseFormDataToSend";

import useMenuItemsApi from "./useMenuItemsApi";
import useRestaurantsApi from "./useRestaurantsApi";

const useHandleFormSubmit = () => {
  const { setMenuItem } = useMenuItemsApi();
  const { setRestaurant } = useRestaurantsApi();

  return async (e, dataType, data, next) => {
    console.log(dataType);
    console.log(data);
    e.preventDefault();
    const action = e.nativeEvent.submitter.getAttribute("data-action");
    if (dataType === "restaurant") {
      const responseData = await setRestaurant(
        data._id,
        action,
        parseRestaurantFormDataToSend(data)
      );
      next(responseData, action);
    } else if (dataType === "menuitem") {
      const responseData = await setMenuItem(
        data._id,
        action,
        parseMenuItemFormDataToSend(data)
      );
      next(responseData, action);
    }
  };
};

export { useHandleFormSubmit };
