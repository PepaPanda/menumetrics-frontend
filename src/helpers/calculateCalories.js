const calculateCalories = ({
  carbohydrates = 0,
  fats = 0,
  proteins = 0,
  fiber = 0
}) => {
  const carbCalories = carbohydrates * 4;
  const fatCalories = fats * 9;
  const proteinCalories = proteins * 4;
  const fiberCalories = fiber * 2;
  return carbCalories + fatCalories + proteinCalories + fiberCalories;
};

export default calculateCalories;
