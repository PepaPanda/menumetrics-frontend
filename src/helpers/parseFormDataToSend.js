const parseMenuItemFormDataToSend = (formData) => {

    const dataToSend = {
      name: formData.name,
      restaurantId: formData.restaurantId,
      rating: formData.rating,
      carbohydrates: parseInt(formData.carbohydrates) ?? null,
      sugars: parseInt(formData.sugars) ?? null,
      fats: parseInt(formData.fats) ?? null,
      proteins: parseInt(formData.proteins) ?? null,
      salts: parseInt(formData.salts) ?? null,
      fiber: parseInt(formData.fiber) ?? null,
    }

    return dataToSend
  }

  const parseRestaurantFormDataToSend = (formData) => {
    const dataToSend = {
      name: formData.name !== '' ? formData.name : null,
      address: formData.address !== '' ? formData.address : null,
    }

    return dataToSend
  }

  export {parseMenuItemFormDataToSend, parseRestaurantFormDataToSend}