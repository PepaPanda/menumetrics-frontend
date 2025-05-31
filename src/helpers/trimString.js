const trimString = (string, length) => {
  if (string.length > length) {
    const trimmed = string.slice(0, length - 3);
    return `${trimmed}...`;
  }

  return string;
};

export default trimString;
