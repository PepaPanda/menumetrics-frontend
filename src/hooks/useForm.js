import { useState } from "react";
import { defaultRestaurant, defaultMenuItem } from "../data/defaults";
import {
  parseMenuItemFormDataToReceive,
  parseRestaurantFormDataToReceive
} from "../helpers/parseFormDataToReceive";
const useForm = formType => {
  const [formData, setFormData] = useState(() => {
    if (formType === "restaurant") return defaultRestaurant;
    if (formType === "menuitem") return defaultMenuItem;
    return {};
  });

  const setRestaurantFormData = (e, isEvent = true) => {
    //if this is not event
    if (!isEvent) {
      const parsed = parseRestaurantFormDataToReceive(e);
      setFormData(parsed);
      return;
    }

    const value = e.target.value;
    const name = e.target.name;

    setFormData({ ...formData, [name]: value });
  };

  const setMenuItemFormData = (e, isEvent = true) => {
    //if this is not event
    if (!isEvent) {
      const parsed = parseMenuItemFormDataToReceive(e);
      setFormData(parsed);
      return;
    }

    const value = e.target.value;
    const name = e.target.name;

    if (name === "rating") {
      setFormData({ ...formData, rating: e.target.checked });
      return;
    }
    setFormData(parseMenuItemFormDataToReceive({ ...formData, [name]: value }));
  };

  let processAndSetFormData;
  if (formType === "restaurant") {
    processAndSetFormData = setRestaurantFormData;
  } else if (formType === "menuitem") {
    processAndSetFormData = setMenuItemFormData;
  }

  return [formData, processAndSetFormData];
};

export default useForm;
